import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import UserNotificationsPage from '../../components/pages/user/UserNotifications.page';

import UserNotificationsConstant from '../../constants/userNotifications.constant';

import {
    getNotifications,
    getFollowingRequested,
    acceptFollowingRequest,
    declineFollowingRequest,
    /* clearStateNotifications */ } from '../../actions/user.actions';

class UserNotificationsContainer extends Component {
    constructor() {
        super();

        this.state = {
            filter: 'you',
            declined: [],
        };

        this.handleSelectFilter = this.handleSelectFilter.bind(this);
        this.prepareRecord = this.prepareRecord.bind(this);
        this.handleAcceptRequest = this.handleAcceptRequest.bind(this);
        this.handleDeclineRequest = this.handleDeclineRequest.bind(this);
    }

    componentDidMount() {
        const { handleGetNotifications } = this.props;
        const { filter } = this.state;

        handleGetNotifications({ filter });
    }

    handleSelectFilter(code) {
        this.state.filter = code;
        this.prepareRecord();
    }

    handleAcceptRequest(id) {
        const { handleAcceptFollowingRequest } = this.props;
        handleAcceptFollowingRequest({ id });
    }

    handleDeclineRequest(id) {
        const { declined } = this.state;
        const { handleDeclineFollowingRequest } = this.props;

        declined.push(id);
        this.setState({ declined });
        handleDeclineFollowingRequest({ id });
    }

    prepareRecord() {
        const { handleGetNotifications, handleGetFollowingRequested } = this.props;
        const { filter } = this.state;

        // handleClearStateNotifications();
        if (filter !== 'requests') {
            return handleGetNotifications({ filter });
        }

        return handleGetFollowingRequested();
    }

    render() {
        const { user } = this.props;
        const { filter, declined } = this.state;
        const isRequests = filter === 'requests';

        return (
            <UserNotificationsPage
              declined={declined}
              activeFilter={filter}
              filters={UserNotificationsConstant}
              handleSelectFilter={this.handleSelectFilter}
              isRequests={isRequests}
              items={isRequests ? user.following_requested : user.notifications}
              handleAcceptRequest={this.handleAcceptRequest}
              handleDeclineRequest={this.handleDeclineRequest}
            />
        );
    }
}

UserNotificationsContainer.propTypes = {
    user: PropTypes.object.isRequired,
    handleGetNotifications: PropTypes.func.isRequired,
    handleGetFollowingRequested: PropTypes.func.isRequired,
    handleAcceptFollowingRequest: PropTypes.func.isRequired,
    handleDeclineFollowingRequest: PropTypes.func.isRequired,
    // handleClearStateNotifications: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    api: state.api,
    user: state.user,
    posts: state.challenges.payload,
});

const mapDispatchToProps = dispatch => ({
    handleGetNotifications: bindActionCreators(getNotifications, dispatch),
    handleGetFollowingRequested: bindActionCreators(getFollowingRequested, dispatch),
    handleAcceptFollowingRequest: bindActionCreators(acceptFollowingRequest, dispatch),
    handleDeclineFollowingRequest: bindActionCreators(declineFollowingRequest, dispatch),
    // handleClearStateNotifications: bindActionCreators(clearStateNotifications, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserNotificationsContainer);
