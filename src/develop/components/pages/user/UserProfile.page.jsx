import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import UserFollowContainer from '../../../containers/user/UserFollow.container';
import UserSettingsContainer from '../../../containers/user/UserSettings.container';
import UserLikedPostContainer from '../../../containers/user/UserLikedPost.container';
import UserManagePostsContainer from '../../../containers/user/UserManagePosts.container';
import UserCreditsContainer from '../../../containers/user/UserCredits.container';
import UserOwnPostsContainer from '../../../containers/user/UserOwnPosts.container';
import UserNotificationsContainer from '../../../containers/user/UserNotifications.container';

import UserInfoComponent from '../../user/UserInfo';
import UserMenuComponent from '../../user/UserMenu';

class UserProfilePage extends Component {
    render() {
        const {
            user,
            currentUser,
        } = this.props;

        if (!currentUser) {
            return null;
        }

        return (
            <div className="main-container">
                <div className="left-menu profile-unfix">
                    <UserInfoComponent currentUser={currentUser} user={user} />
                    <UserMenuComponent user={user} currentUser={currentUser} />
                </div>
                <div className="right-container">
                    <Route exact name="User Profile page" path="/users/:id" component={UserOwnPostsContainer} />
                    <Route
                      exact
                      name="User Profile page"
                      path="/users/:id/notifications"
                      component={UserNotificationsContainer}
                    />
                    <Route exact name="User Following" path="/users/:id/following" component={UserFollowContainer} />
                    <Route exact name="User Followers" path="/users/:id/followers" component={UserFollowContainer} />
                    <Route
                      exact
                      name="User Settings"
                      path="/users/:id/settings"
                      component={UserSettingsContainer}
                    />
                    <Route
                      exact
                      name="User Settings Posts your liked"
                      path="/users/:id/posts/liked"
                      component={UserLikedPostContainer}
                    />
                    <Route
                      exact
                      name="User Settings Posts manage"
                      path="/users/:id/posts/manage"
                      component={UserManagePostsContainer}
                    />
                    <Route
                      exact
                      name="User Credits"
                      path="/users/:id/credits"
                      component={UserCreditsContainer}
                    />
                </div>
            </div>
        );
    }
}

UserProfilePage.propTypes = {
    user: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
};

export default UserProfilePage;
