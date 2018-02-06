import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setFollow, unsetFollow, sendRequestFollow } from '../../actions/user.actions';

class UserFollowButtonComponent extends Component {
    static renderRequestedStatus() {
        return (
            <button className="follow-btn unfollow">Request Sent</button>
        );
    }

    constructor() {
        super();

        this.handleSetFollow = this.handleSetFollow.bind(this);
        this.handleUnsetFollow = this.handleUnsetFollow.bind(this);
        this.handleSendRequest = this.handleSendRequest.bind(this);
    }

    handleSetFollow() {
        const { user: { id }, handleSetFollowUser } = this.props;

        handleSetFollowUser({ id });
    }

    handleUnsetFollow() {
        const { user: { id }, handleUnsetFollowUser } = this.props;

        handleUnsetFollowUser({ id });
    }

    handleSendRequest() {
        const { user: { id }, handleSendRequestFollow } = this.props;

        handleSendRequestFollow({ id });
    }

    renderRequestSent() {
        return (
            <button className="follow-btn" onClick={this.handleSendRequest}>Follow</button>
        );
    }

    renderFollow() {
        return (
            <button className="follow-btn" onClick={this.handleSetFollow}>Follow</button>
        );
    }

    renderUnfollow() {
        return (
            <button className="follow-btn unfollow" onClick={this.handleUnsetFollow}>Unfollow</button>
        );
    }

    render() {
        const { user, currentUser } = this.props;

        if (currentUser.id === user.id) {
            return null;
        }

        const isNotAccess = user.private && !user.followed_by_me;

        if (isNotAccess) {
            return user.following_requested
                ? UserFollowButtonComponent.renderRequestedStatus()
                : this.renderRequestSent();
        }

        return user.followed_by_me ? this.renderUnfollow() : this.renderFollow();
    }
}

UserFollowButtonComponent.defaultProps = {
    user: {},
};

UserFollowButtonComponent.propTypes = {
    user: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    handleSetFollowUser: PropTypes.func.isRequired,
    handleUnsetFollowUser: PropTypes.func.isRequired,
    handleSendRequestFollow: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    currentUser: state.user.payload,
});

const mapDispatchToProps = dispatch => ({
    handleSetFollowUser: bindActionCreators(setFollow, dispatch),
    handleUnsetFollowUser: bindActionCreators(unsetFollow, dispatch),
    handleSendRequestFollow: bindActionCreators(sendRequestFollow, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserFollowButtonComponent);
