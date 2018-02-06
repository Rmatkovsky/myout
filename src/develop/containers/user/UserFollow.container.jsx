import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import UserFollowPage from '../../components/pages/user/UserFollow.page';

import { getUserById, getFollowing, getFollowers } from '../../actions/user.actions';
import { handlePush } from '../../utils/history.helper';
import routes from '../../constants/routes.constant';

class UserFollowContainer extends Component {
    constructor() {
        super();

        this.state = {
            filter: '',
        };

        this.handleSelectFilter = this.handleSelectFilter.bind(this);
    }
    componentWillMount() {
        const { handleGetUser, match: { params } } = this.props;
        handleGetUser({ id: params.id });
    }

    componentWillReceiveProps(nextProps) {
        const { match: { path } } = nextProps;
        const filter = (path.indexOf('followers')) !== -1 ? 'followers' : 'following';

        if (filter !== this.state.filter) {
            this.state.filter = filter;
            this.prepareFollows();
        }
        return true;
    }

    handleSelectFilter(code) {
        const { user } = this.props;
        const pathname =
            code === 'following' ? routes.user.following(user.current.id) : routes.user.followers(user.current.id);

        handlePush({ pathname });
    }

    prepareFollows() {
        const { handleGetFollowing, handleGetFollowers, match: { params } } = this.props;
        const { filter } = this.state;
        const handleAction = filter === 'followers' ? handleGetFollowers : handleGetFollowing;

        handleAction({ id: params.id });
    }

    render() {
        const { user, currentUser } = this.props;
        const { filter } = this.state;

        return (
            <UserFollowPage
              user={user.payload}
              followsData={user[filter]}
              currentUser={currentUser}
              filter={filter}
              handleSelectFilter={this.handleSelectFilter}
            />
        );
    }
}

UserFollowContainer.propTypes = {
    user: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    handleGetFollowing: PropTypes.func.isRequired,
    handleGetFollowers: PropTypes.func.isRequired,
    handleGetUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    api: state.api,
    user: state.user,
    currentUser: state.user.current,
    acceptances: state.trophy.current.acceptances || [],
});

const mapDispatchToProps = dispatch => ({
    handleGetUser: bindActionCreators(getUserById, dispatch),
    handleGetFollowing: bindActionCreators(getFollowing, dispatch),
    handleGetFollowers: bindActionCreators(getFollowers, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserFollowContainer);

