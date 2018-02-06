import loadable from 'loadable-components';
//
export const PreviewPage = loadable(() => import('../containers/common/UserPostPreview.container'));
// export const TermsPage = loadable(() => import('../components/pages/common/Terms.page'));
//
// export const MainPage = loadable(() => import('./../containers/main/Main.container'));
const Layout = loadable(() => import('../containers/layouts/Layout.container'));
// export const SignUpPage = loadable(() => import('../containers/common/SignUp.container'));
import React from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';

import Main from './../containers/main/Main.container';
// import Layout from '../containers/layouts/Layout.container';
import SignUp from '../containers/common/SignUp.container';
import Login from '../containers/common/Login.container';
import PrivacyPage from '../components/pages/common/Privacy.page';
import RecoveryContainer from '../containers/common/Recovery.container';
import ReferralCodeContainer from '../containers/user/ReferralCode.container';
import ResetPassword from '../containers/user/ResetPassword.container';
import NoMatchPage from '../components/pages/common/NoMatch.page';
import ChallengesContainer from '../containers/user/Challenges.container';
import ChallengeContainer from '../containers/user/Challenge.container';
import AcceptanceContainer from '../containers/user/Acceptance.container';
import NewsContainer from '../containers/user/News.container';
import TrophiesContainer from '../containers/user/Trophies.container';
import TrophyContainer from '../containers/user/Trophy.container';
import SearchContainer from '../containers/user/Search.container';
// import ProfileContainer from '../containers/user/Profile.container';
import UserProfileContainer from '../containers/user/UserProfile.container';

import TermsPage from '../components/pages/common/Terms.page';
import ProfileSettingsPage from '../components/pages/user/ProfileSettingsPage';
// import PostsLikedSettingsPage from '../components/pages/user/PostsLikedSettingsPage';
import PostsManageSettingsPage from '../components/pages/user/PostsManageSettingsPage';

import { userIsAuthenticated } from '../utils/auth/auth.helper';
import SearchFollowPage from '../components/pages/common/SearchFollow.page';
// import InvitePostPage from '../components/pages/user/InvitePost.page';
import CreditsPage from '../components/pages/user/Credits.page';
// import UserNotificationsPage from '../components/pages/user/UserNotifications.page';
// import RequestsPage from '../components/pages/user/Requests.page';

import UserPostPreviewContainer from '../containers/common/UserPostPreview.container';

export default () => (
    <Layout>
        <Switch>
            <Route exact name="Main" path="/" component={Main} />
            <Route exact name="SignUp" path="/signup" component={SignUp} />
            <Route exact name="Login" path="/login" component={Login} />
            <Route exact name="Recovery" path="/recovery" component={RecoveryContainer} />
            <Route exact name="Privacy" path="/privacy" component={PrivacyPage} />
            <Route exact name="Terms" path="/terms" component={TermsPage} />
            <Route exact name="Search" path="/search" component={SearchContainer} />
            <Route name="UserProfile" path="/users/:id" component={UserProfileContainer} />

            <Route
                exact
                name="ReferralCode"
                path="/promo"
                something="pool"
                component={userIsAuthenticated(ReferralCodeContainer)}
            />
            <Route
                exact
                name="ResetPassword"
                path="/reset_password"
                component={ResetPassword}
            />
            <Route
                exact
                name="Challenges Page"
                path="/challenges/:type"
                component={userIsAuthenticated(ChallengesContainer)}
            />
            <Route
                exact
                name="Challenge Page"
                path="/challenge/:id"
                component={userIsAuthenticated(ChallengeContainer)}
            />
            <Route
                exact
                name="Challenge page preview"
                path="/:type/preview/:id"
                component={UserPostPreviewContainer}
            />
            <Route exact name="NewsFeeds" path="/news" component={NewsContainer} />
            <Route exact name="TrophyFeeds" path="/trophy" component={TrophiesContainer} />
            <Route exact name="TrophyPage" path="/trophy/:id" component={TrophyContainer} />
            <Route exact name="Acceptance page" path="/acceptance/:id" component={AcceptanceContainer} />
            <Route exact name="Terms Page" path="/terms" component={TermsPage} />

            <Redirect from="/challenges" to="/challenges/all" />

            <Route exact name="SearchFollow" path="/follow" component={SearchFollowPage} />
            <Route exact name="ProfileSettingsPage" path="/profile-update" component={ProfileSettingsPage} />
            <Route exact name="PostsManageSettingsPage" path="/manage-posts" component={PostsManageSettingsPage} />
            <Route exact name="CreditsPage" path="/credits" component={CreditsPage} />

            <Route component={NoMatchPage} />
        </Switch>
    </Layout>
);
