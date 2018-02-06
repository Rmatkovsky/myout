import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import UserPostsLikedComponent from '../../components/user/UserPostsLiked';
import filterUserSettingsConstant from '../../constants/filterUserSettings.constant';

import { getPostsLiked } from '../../actions/user.actions';
import { handlePush } from '../../utils/history.helper';
import routes from '../../constants/routes.constant';

class UserLikedPostContainer extends Component {
    constructor() {
        super();

        this.state = {
            activeFilter: 'postsLiked',
        };

        this.handleSelectFilter = this.handleSelectFilter.bind(this);
    }

    componentWillMount() {
        const { handleGetPostsLiked } = this.props;

        handleGetPostsLiked();
    }

    handleSelectFilter(code) {
        const { user } = this.props;
        handlePush({ pathname: routes.user[code](user.payload.id) });
    }

    render() {
        const { user } = this.props;
        const { activeFilter } = this.state;

        return (
            <UserPostsLikedComponent
              user={user.payload}
              items={user.liked}
              filters={filterUserSettingsConstant}
              activeFilter={activeFilter}
              handleSelectFilter={this.handleSelectFilter}
            />
        );
    }
}

UserLikedPostContainer.propTypes = {
    // api: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    handleGetPostsLiked: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
    api: state.api,
    user: state.user,
});

const mapDispatchToProps = dispatch => ({
    handleGetPostsLiked: bindActionCreators(getPostsLiked, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserLikedPostContainer);
