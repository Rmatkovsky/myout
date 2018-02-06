import Base from './config/Base';

import ep from '../constants/endPoints.constant';
// import normalizr from '../utils/mappers/user.mapper';

class UserAPI extends Base {

    createUser(params) {
        const url = ep.auth.signup();
        return this.apiClient.post(url, params);
    }

    loginedUser(params) {
        const url = ep.auth.login();
        return this.apiClient.post(url, params);
    }

    getUser() {
        const url = ep.profile.me();
        return this.apiClient.get(url);
    }

    getUserById(params) {
        const url = ep.user.byId(params.id);
        return this.apiClient.get(url);
    }

    getPosts(params) {
        const url = ep.user.getPosts();
        return this.apiClient.get(url, params);
    }

    recoveryPassword(params) {
        const url = ep.auth.recovery();
        return this.apiClient.post(url, params);
    }

    resetPassword(params) {
        const url = ep.profile.resetPassword();
        return this.apiClient.put(url, params);
    }

    updateUser(params) {
        const url = ep.profile.update();
        // const paramsUser = normalizr.req.updateUser(params);
        return this.apiClient.put(url, { user: params });
    }

    isExistsName(params) {
        const url = ep.user.uniqueName();
        return this.apiClient.get(url, params);
    }

    isExistsEmail(params) {
        const url = ep.user.uniqueEmail();
        return this.apiClient.get(url, params);
    }

    userLogout() {
        const url = ep.auth.logout();
        return this.apiClient.delete(url);
    }

    setFollow(params) {
        const url = ep.user.follow(params.id);
        return this.apiClient.post(url);
    }

    unsetFollow(params) {
        const url = ep.user.follow(params.id);
        return this.apiClient.delete(url);
    }

    sendFollowRequest(params) {
        const url = ep.user.sendRequest();
        return this.apiClient.post(url, { receiver_id: params.id });
    }

    getFollowing(params) {
        const url = ep.user.following(params.id);
        return this.apiClient.get(url, params);
    }

    getFollowers(params) {
        const url = ep.user.followers(params.id);
        return this.apiClient.get(url, params);
    }

    facebookConnected(params) {
        const url = ep.user.facebookConnect();
        return this.apiClient.post(url, params);
    }

    getPostsLiked() {
        const url = ep.user.getPostsLiked();
        return this.apiClient.get(url);
    }

    sendVerifyEmail(params) {
        const url = ep.user.sendVerifyEmail();
        return this.apiClient.put(url, { token: params.code });
    }

    sendVerifyPhone(params) {
        const url = ep.user.sendVerifyPhone();
        return this.apiClient.put(url, { token: params.code });
    }

    resendVerifyEmail() {
        const url = ep.user.resendVerifyEmail();
        return this.apiClient.post(url);
    }

    resendVerifyPhone() {
        const url = ep.user.resendVerifyPhone();
        return this.apiClient.post(url);
    }

    sendMessage(params) {
        const url = ep.support.sendMessage();
        return this.apiClient.post(url, params);
    }

    getChat(params) {
        const url = ep.support.getChat();
        return this.apiClient.get(url, params);
    }

    getNotifications(params) {
        const url = ep.user.getNotifications();
        return this.apiClient.get(url, params);
    }

    getFollowingRequested() {
        const url = ep.user.getFollowingRequested();
        return this.apiClient.get(url);
    }

    acceptRequest(params) {
        const url = ep.user.acceptRequest(params.id);
        return this.apiClient.put(url);
    }

    declineRequest(params) {
        const url = ep.user.declineRequest(params.id);
        return this.apiClient.delete(url);
    }
}

export default UserAPI;
