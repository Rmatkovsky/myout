import { bindActionCreators } from 'redux';
import api from '../api/config';
import {
    createAction,
    success,
    failure,
    request,
} from '../utils/actions.helper';

import {
    closeModal, openModal,
} from './common.actions';

import {
    SET_REDIRECT,
    GET_USER_BY_ID,
    CREATE_USER,
    GET_USER_POSTS,
    LOGIN_USER,
    UPDATE_USER,
    RECOVERY_PASSWORD,
    RESET_PASSWORD,
    CLEAR_DATA_STATE,
    CLEAR_STATE_EXIST_EMAIL,
    IS_EXIST_USER,
    USER_LOADED,
    USER_UNLOADED,
    USER_LOGOUT,
    SET_USER_FOLLOW,
    UNSET_USER_FOLLOW,
    IS_EXIST_EMAIL,
    UPDATE_PROMOCODE,
    CLEAR_ERROR_DATA_STATE,
    GET_USER_FOLLOWERS,
    GET_USER_FOLLOWING,
    SEND_FOLLOW_REQUEST,
    USER_FACEBOOK_CONNECTED,
    GET_POSTS_LIKED,
    SEND_VERIFY_PHONE,
    SEND_VERIFY_EMAIL,
    RESEND_VERIFY_EMAIL,
    RESEND_VERIFY_PHONE,
    USER_SEND_MESSAGE,
    USER_INITIAL_CHAT,
    CLEAR_TEMP_DATA_STATE,
    GET_USER_FOLLOWING_REQUESTED,
    GET_USER_NOTIFICATIONS,
    CLEAR_STATE_NOTIFICATIONS,
    USER_ACCEPT_FOLLOWING_REQUEST,
    USER_DECLINE_FOLLOWING_REQUEST,
} from './types/user.types';


import { handleReplace, handlePush } from '../utils/history.helper';
import normalizr from '../utils/mappers/user.mapper';

import routes from '../constants/routes.constant';
import { MODAL_POPUP_VERIFYING, MODAL_POPUP_FACEBOOK_ERROR } from '../constants/modals.constant';

export const setRedirect = params => (dispatch) => {
    dispatch(createAction(SET_REDIRECT, params));
};

export const createUser = params => (dispatch) => {
    api.user.createUser(params).then(
        (response) => {
            const nData = normalizr.res.userLoaded(response.data.user);

            dispatch(success(CREATE_USER, nData));
            handleReplace({ pathname: routes.auth.promo() });
        },
        error => dispatch(failure(CREATE_USER, error)),
    );
};

export const updateUserWithoutRedirect = params => (dispatch) => {
    api.user.updateUser(params).then(
        (response) => {
            const nData = normalizr.res.userLoaded(response.data.user);

            dispatch(success(UPDATE_USER, nData));
            if (params.typePopup) {
                bindActionCreators(openModal, dispatch)(MODAL_POPUP_VERIFYING, {
                    type: params.typePopup,
                });
            }
        },
        error => dispatch(failure(UPDATE_USER, error)),
    );
};

export const updateUser = params => (dispatch) => {
    dispatch(request(UPDATE_USER));
    api.user.updateUser(params).then(
        (response) => {
            const nData = normalizr.res.userLoaded(response.data.user);

            dispatch(success(UPDATE_USER, nData));
            handleReplace({ pathname: routes.challenges.all() });
        },
        error => dispatch(failure(UPDATE_USER, error)),
    );
};

export const facebookConnect = params => (dispatch) => {
    api.user.facebookConnected(params).then(
        (response) => {
            const nData = normalizr.res.userLoaded(response.data.user);

            dispatch(success(USER_FACEBOOK_CONNECTED, nData));
        },
        (error) => {
            bindActionCreators(openModal, dispatch)(MODAL_POPUP_FACEBOOK_ERROR, { error });
            dispatch(failure(USER_FACEBOOK_CONNECTED, error));
        },
    );
};

export const updatePromo = params => (dispatch) => {
    api.user.updateUser(params).then(
        (response) => {
            const nData = normalizr.res.userLoaded(response.data.user);

            dispatch(success(UPDATE_PROMOCODE, nData));
            handleReplace({ pathname: routes.challenge.all() });
        },
        error => dispatch(failure(UPDATE_PROMOCODE, error)),
    );
};

export const recoveryPassword = params => (dispatch) => {
    dispatch(request(RECOVERY_PASSWORD));
    api.user.recoveryPassword(params).then(
        () => {
            dispatch(success(RECOVERY_PASSWORD, { result: true }));
        },
        error => dispatch(failure(RECOVERY_PASSWORD, error)),
    );
};

export const resetPassword = params => (dispatch) => {
    dispatch(request(RESET_PASSWORD));
    api.user.resetPassword(params).then(
        () => {
            dispatch(success(RESET_PASSWORD));
            handleReplace({ pathname: routes.main.home() });
        },
        error => dispatch(failure(RESET_PASSWORD, error)),
    );
};

/**
 * Action: fired when a user session has been established (or re-established).
 */
export const userLoaded = redirect => (dispatch) => {
    dispatch(request(USER_LOADED));
    api.user.getUser().then(
        (response) => {
            const nData = normalizr.res.userLoaded(response.data.user);

            dispatch(success(USER_LOADED, nData));
            handlePush({ pathname: redirect || routes.news.all() });
            setRedirect(false);
        },
        () => {
            dispatch(failure(USER_UNLOADED, { redirect }));
            if (!redirect) {
                return null;
            }
            if (redirect.indexOf('preview') !== -1) {
                return handlePush({ pathname: redirect });
            }
            if (redirect) {
                return handlePush({ pathname: routes.auth.login() });
            }

            return null;
        },
    );
};

export const userLogout = () => (dispatch) => {
    dispatch(request(USER_LOGOUT));
    api.user.userLogout().then(
        () => {
            dispatch(success(USER_LOGOUT));
        },
        () => dispatch(failure(USER_LOGOUT)),
    );
};

export const loginedUser = params => (dispatch) => {
    dispatch(request(LOGIN_USER));
    api.user.loginedUser(params).then(
        (response) => {
            const nData = normalizr.res.userLoaded(response.data.user);
            dispatch(success(LOGIN_USER, nData));
            handlePush({ pathname: params.redirect || routes.news.all() });
            setRedirect(false);
        },
        error => dispatch(failure(LOGIN_USER, error)),
    );
};

export const isExistUser = params => (dispatch) => {
    dispatch(request(IS_EXIST_USER));
    api.user.isExistsName(params).then(
        (response) => {
            dispatch(success(IS_EXIST_USER, response));
        },
        error => dispatch(failure(IS_EXIST_USER, error)),
    );
};

export const isExistEmail = params => (dispatch) => {
    dispatch(request(IS_EXIST_EMAIL));
    api.user.isExistsEmail(params).then(
        (response) => {
            dispatch(success(IS_EXIST_EMAIL, response));
        },
        error => dispatch(failure(IS_EXIST_EMAIL, error)),
    );
};

export const setFollow = params => (dispatch) => {
    api.user.setFollow(params).then(
        (response) => {
            dispatch(success(SET_USER_FOLLOW, response.data.user));
        },
        error => dispatch(failure(SET_USER_FOLLOW, error)),
    );
};

export const unsetFollow = params => (dispatch) => {
    api.user.unsetFollow(params).then(
        (response) => {
            dispatch(success(UNSET_USER_FOLLOW, response.data.user));
        },
        error => dispatch(failure(UNSET_USER_FOLLOW, error)),
    );
};

export const sendRequestFollow = params => (dispatch) => {
    dispatch(request(SEND_FOLLOW_REQUEST));
    api.user.sendFollowRequest(params).then(
        (response) => {
            const nData = response.data.user;
            dispatch(success(SEND_FOLLOW_REQUEST, nData));
        },
        () => {
            dispatch(failure(SEND_FOLLOW_REQUEST));
        },
    );
};

export const getFollowing = params => (dispatch) => {
    api.user.getFollowing(params).then(
        (response) => {
            dispatch(success(GET_USER_FOLLOWING, response.data.users));
        },
        error => dispatch(failure(GET_USER_FOLLOWING, error)),
    );
};

export const getFollowers = params => (dispatch) => {
    api.user.getFollowers(params).then(
        (response) => {
            dispatch(success(GET_USER_FOLLOWERS, response.data.users));
        },
        error => dispatch(failure(GET_USER_FOLLOWERS, error)),
    );
};

export const getUserById = params => (dispatch) => {
    dispatch(request(GET_USER_BY_ID));
    api.user.getUserById(params).then(
        (response) => {
            const nData = normalizr.res.userLoaded(response.data.user);
            dispatch(success(GET_USER_BY_ID, nData));
        },
        () => {
            dispatch(failure(GET_USER_BY_ID));
        },
    );
};

export const getPosts = params => (dispatch) => {
    dispatch(request(GET_USER_POSTS));
    api.user.getPosts(params).then(
        (response) => {
            const nData = response.data.posts;
            dispatch(success(GET_USER_POSTS, nData));
        },
        () => {
            dispatch(failure(GET_USER_POSTS));
        },
    );
};

export const getPostsLiked = params => (dispatch) => {
    api.user.getPostsLiked(params).then(
        (response) => {
            const nData = response.data.posts;
            dispatch(success(GET_POSTS_LIKED, nData));
        },
        () => {
            dispatch(failure(GET_POSTS_LIKED));
        },
    );
};

export const sendVerifyEmail = params => (dispatch) => {
    api.user.sendVerifyEmail(params).then(
        (result) => {
            dispatch(success(SEND_VERIFY_EMAIL, result));
            bindActionCreators(closeModal, dispatch)();
        },
        err => dispatch(failure(SEND_VERIFY_EMAIL, err)),
    );
};

export const sendVerifyPhone = params => (dispatch) => {
    api.user.sendVerifyPhone(params).then(
        (result) => {
            dispatch(success(SEND_VERIFY_PHONE, result));
            bindActionCreators(closeModal, dispatch)();
        },
        error => dispatch(failure(SEND_VERIFY_PHONE, error)),
    );
};

export const resendVerifyEmail = () => (dispatch) => {
    api.user.resendVerifyEmail().then(
        () => {
            dispatch(success(RESEND_VERIFY_EMAIL));
        },
        () => {
            dispatch(failure(RESEND_VERIFY_EMAIL));
        },
    );
};

export const resendVerifyPhone = () => (dispatch) => {
    api.user.resendVerifyPhone().then(
        () => {
            dispatch(success(RESEND_VERIFY_PHONE));
        },
        () => {
            dispatch(failure(RESEND_VERIFY_PHONE));
        },
    );
};

export const sendMessage = params => (dispatch) => {
    api.user.sendMessage(params).then(
        () => {
            dispatch(success(USER_SEND_MESSAGE));
            bindActionCreators(closeModal, dispatch)();
        },
        error => dispatch(failure(USER_SEND_MESSAGE, error)),
    );
};

export const initialChat = params => (dispatch) => {
    api.user.getChat(params).then(
        () => {
            dispatch(success(USER_INITIAL_CHAT));
        },
        error => dispatch(failure(USER_INITIAL_CHAT, error)),
    );
};

export const getNotifications = params => (dispatch) => {
    dispatch(request(GET_USER_NOTIFICATIONS));

    api.user.getNotifications(params).then(
        (response) => {
            const nData = response.data.notifications;
            dispatch(success(GET_USER_NOTIFICATIONS, nData));
        },
        () => {
            dispatch(failure(GET_USER_NOTIFICATIONS));
        },
    );
};

export const getFollowingRequested = params => (dispatch) => {
    dispatch(request(GET_USER_FOLLOWING_REQUESTED));

    api.user.getFollowingRequested(params).then(
        (response) => {
            const nData = response.data.following_requests;
            dispatch(success(GET_USER_FOLLOWING_REQUESTED, nData));
        },
        () => {
            dispatch(failure(GET_USER_FOLLOWING_REQUESTED));
        },
    );
};

export const acceptFollowingRequest = params => (dispatch) => {
    dispatch(request(USER_ACCEPT_FOLLOWING_REQUEST));

    api.user.acceptRequest(params).then(
        (response) => {
            const nData = response.data.following_requests;
            dispatch(success(USER_ACCEPT_FOLLOWING_REQUEST, nData));
        },
        () => {
            dispatch(failure(USER_ACCEPT_FOLLOWING_REQUEST));
        },
    );
};

export const declineFollowingRequest = params => (dispatch) => {
    dispatch(request(USER_DECLINE_FOLLOWING_REQUEST));

    api.user.declineRequest(params).then(
        (response) => {
            const nData = response.data.following_requests;
            dispatch(success(USER_DECLINE_FOLLOWING_REQUEST, nData));
        },
        () => {
            dispatch(failure(USER_DECLINE_FOLLOWING_REQUEST));
        },
    );
};

export const clearStateNotifications = () => createAction(CLEAR_STATE_NOTIFICATIONS);
export const clearStateExistEmail = () => createAction(CLEAR_STATE_EXIST_EMAIL);
export const clearDataState = () => createAction(CLEAR_DATA_STATE);
export const clearTempDataState = () => createAction(CLEAR_TEMP_DATA_STATE);
export const clearErrorDataState = () => createAction(CLEAR_ERROR_DATA_STATE);
