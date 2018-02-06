import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import filterUserSettingsConstant from '../../constants/filterUserSettings.constant';
import UserManagePostsComponent from '../../components/user/UserManagePosts';

import { getPosts } from '../../actions/user.actions';
import { deletePosts, clearDataState } from '../../actions/challenge.actions';
import { handlePush } from '../../utils/history.helper';

import routes from '../../constants/routes.constant';

class UserManagePostsContainer extends Component {
    constructor() {
        super();

        this.state = {
            activeFilter: 'postsManage',
        };

        this.handleSelectFilter = this.handleSelectFilter.bind(this);
    }

    componentWillMount() {
        const { match: { params }, handleGetPosts, handleClearDataState } = this.props;

        handleClearDataState();
        handleGetPosts({ user_id: params.id });
    }

    handleSelectFilter(code) {
        const { user } = this.props;
        handlePush({ pathname: routes.user[code](user.payload.id) });
    }

    render() {
        const { user, posts, handleDeletePosts } = this.props;
        const { activeFilter } = this.state;

        return (
            <UserManagePostsComponent
              user={user.payload}
              items={posts}
              handleDeletePosts={handleDeletePosts}
              filters={filterUserSettingsConstant}
              activeFilter={activeFilter}
              handleSelectFilter={this.handleSelectFilter}
            />
        );
    }
}

UserManagePostsContainer.propTypes = {
    match: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    posts: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleGetPosts: PropTypes.func.isRequired,
    handleDeletePosts: PropTypes.func.isRequired,
    handleClearDataState: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    api: state.api,
    user: state.user,
    posts: state.challenges.payload,
});

const mapDispatchToProps = dispatch => ({
    handleGetPosts: bindActionCreators(getPosts, dispatch),
    handleDeletePosts: bindActionCreators(deletePosts, dispatch),
    handleClearDataState: bindActionCreators(clearDataState, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserManagePostsContainer);
