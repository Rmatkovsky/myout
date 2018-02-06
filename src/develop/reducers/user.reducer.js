import _has from 'lodash/has';
import _isEmpty from 'lodash/isEmpty';
import _isObject from 'lodash/isObject';
import _findIndex from 'lodash/findIndex';
import _isArray from 'lodash/isArray';

import {
    SET_REDIRECT,
    CREATE_USER,
    GET_USER,
    GET_USER_BY_ID,
    GET_POSTS_LIKED,
    LOGIN_USER,
    UPDATE_USER,
    IS_EXIST_USER,
    IS_EXIST_EMAIL,
    RECOVERY_PASSWORD,
    USER_LOGOUT,
    USER_LOADED,
    USER_UNLOADED,
    UPDATE_PROMOCODE,
    SET_USER_FOLLOW,
    UNSET_USER_FOLLOW,
    CLEAR_STATE_EXIST_EMAIL,
    CLEAR_DATA_STATE,
    CLEAR_ERROR_DATA_STATE,
    GET_USER_FOLLOWERS,
    GET_USER_FOLLOWING,
    SEND_FOLLOW_REQUEST,
    SEND_VERIFY_PHONE,
    SEND_VERIFY_EMAIL,
    CLEAR_TEMP_DATA_STATE,
    GET_USER_NOTIFICATIONS,
    CLEAR_STATE_NOTIFICATIONS,
    GET_USER_FOLLOWING_REQUESTED,
} from '../actions/types/user.types';

const INITIAL_STATE = {
    payload: {},
    error: false,
    errorData: false,
    isAuthorized: false,
    isRecovery: false,
    isExistEmail: false,
    redirect: false,
    followers: [],
    following: [],
    liked: [],
    notifications: [],
    following_requested: [],
};

export default (state = Object.assign({}, INITIAL_STATE), action) => {
    switch (action.type) {

        case CREATE_USER:
            return createUser(state, action);

        case GET_USER:
        case USER_LOADED:
        case LOGIN_USER:
            return getUser(state, action);

        case GET_USER_BY_ID:
            return getCurrentUser(state, action);

        case UPDATE_USER:
        case UPDATE_PROMOCODE:
            return updateUser(state, action);

        case RECOVERY_PASSWORD:
            return recoveryPassword(state, action);

        case IS_EXIST_USER:
            return isExistUser(state, action);

        case IS_EXIST_EMAIL:
            return isExistEmail(state, action);

        case CLEAR_STATE_EXIST_EMAIL:
            return clearStateExistEmail(state);

        case SET_REDIRECT:
            return setRedirect(state, action);

        case USER_UNLOADED:
            return userUnloaded(state, action);

        case SET_USER_FOLLOW:
        case UNSET_USER_FOLLOW:
            return followUser(state, action);

        case GET_USER_FOLLOWERS:
            return getFollowers(state, action);

        case GET_USER_FOLLOWING:
            return getFollowing(state, action);
        case SEND_FOLLOW_REQUEST:
            return sendFollowRequest(state, action);
        case GET_POSTS_LIKED:
            return getPostsLiked(state, action);

        case SEND_VERIFY_EMAIL:
            return sendVerifyEmail(state, action);

        case SEND_VERIFY_PHONE:
            return sendVerifyPhone(state, action);

        case GET_USER_NOTIFICATIONS:
            return getUserNotifications(state, action);

        case GET_USER_FOLLOWING_REQUESTED:
            return getUserRequests(state, action);

        case CLEAR_DATA_STATE:
        case USER_LOGOUT:
            return clearDataState();
        case CLEAR_ERROR_DATA_STATE:
            return clearErrorDataState(state);
        case CLEAR_TEMP_DATA_STATE:
            return clearTempDataState(state);

        case CLEAR_STATE_NOTIFICATIONS:
            return cleareStateNotifications(state);

        default:
            return state;
    }
};

function setRedirect(state, action) {
    return {
        ...state,
        redirect: action.payload,
    };
}

function createUser(state, action) {
    return {
        ...state,
        payload: action.error ? {} : action.payload,
        error: action.error,
        errorData: action.error ? action.payload : {},
        isAuthorized: !action.error,
    };
}

function clearStateExistEmail(state) {
    return {
        ...state,
        isExistEmail: false,
    };
}

function clearDataState() {
    return {
        ...INITIAL_STATE,
    };
}

function clearErrorDataState(state) {
    return {
        ...state,
        error: INITIAL_STATE.error,
        errorData: INITIAL_STATE.errorData,
    };
}

function getUser(state, action) {
    if (_isEmpty(action.payload)) {
        return {
            ...state,
        };
    }
    return {
        ...state,
        payload: action.error ? state.payload : action.payload,
        error: action.error,
        errorData: action.error ? action.payload : false,
        meta: action.meta,
        isAuthorized: !_isObject(action.error) ? !action.error : false,
    };
}

function getCurrentUser(state, action) {
    if (_isEmpty(action.payload)) {
        return {
            ...state,
        };
    }
    return {
        ...state,
        current: action.error ? state.current : action.payload,
        error: action.error,
        errorData: action.error ? action.payload : false,
        meta: action.meta,
    };
}

function updateUser(state, action) {
    return {
        ...state,
        payload: action.error ? state.payload : action.payload,
        error: action.error,
        errorData: action.error ? action.payload : {},
        meta: action.meta,
    };
}

function recoveryPassword(state, action) {
    return {
        ...state,
        payload: action.error ? state.payload : action.payload,
        error: action.error,
        errorData: action.error ? action.payload : {},
        isRecovery: !!action.payload.result,
    };
}

function isExistUser(state, action) {
    const isUnique = _has(action.payload, 'data.unique') ? action.payload.data.unique : true;
    const payload =
        !isUnique
            ? { data: { ...state.payload.data, name: ['Username has already been taken'] } }
            : state.payload.data;

    return {
        ...state,
        payload: {
            ...state.payload,
            ...payload,
        },
        error: !isUnique,
        errorData: {
            ...payload,
        },
    };
}

function userUnloaded(state, action) {
    return {
        ...INITIAL_STATE,
        redirect: action.payload.redirect,
    };
}

function isExistEmail(state, action) {
    const isUnique = _has(action.payload, 'data.unique') ? action.payload.data.unique : true;

    return {
        ...state,
        isExistEmail: !isUnique,
    };
}

function followUser(state, action) {
    const following = JSON.parse(JSON.stringify(state.following));
    const followers = JSON.parse(JSON.stringify(state.followers));
    let followingCount = state.current.following_count;
    let followersCount = state.current.followers_count;

    if (!action.error) {
        const followingIndexResult = _findIndex(following, i => i.id === action.payload.id);
        const followersIndexResult = _findIndex(followers, i => i.id === action.payload.id);
        if (followingIndexResult !== -1) {
            following[followingIndexResult].followed_by_me = action.payload.followed_by_me;
            following[followingIndexResult].following_count = action.payload.following_count;
            following[followingIndexResult].followers_count = action.payload.followers_count;
            following[followingIndexResult].following_requested = action.payload.following_requested;
        }
        if (followersIndexResult !== -1) {
            followers[followersIndexResult].followed_by_me = action.payload.followed_by_me;
            followers[followersIndexResult].followers_count = action.payload.followers_count;
            followers[followersIndexResult].following_count = action.payload.following_count;
            followers[followersIndexResult].following_requested = action.payload.following_requested;
        }
    }

    if (action.payload.id === state.current.id) {
        followingCount = _isEmpty(action.error) ? action.payload.following_count : followingCount;
        followersCount = _isEmpty(action.error) ? action.payload.followers_count : followersCount;
    } else {
        followingCount =
            action.payload.followed_by_me ? state.current.following_count + 1 : state.current.following_count - 1;
    }

    return {
        ...state,
        current: state.current ? {
            ...state.current,
            followed_by_me: _isEmpty(action.error) ? action.payload.followed_by_me : state.current.followed_by_me,
            following_count: followingCount,
            followers_count: followersCount,
        } : {},
        following,
        followers,
    };
}

function getFollowers(state, action) {
    return {
        ...state,
        followers: action.payload,
    };
}

function getFollowing(state, action) {
    return {
        ...state,
        following: action.payload,
    };
}

function sendFollowRequest(state, action) {
    return {
        ...state,
        current: {
            ...state.current,
            following_requested: !action.error,
        },
    };
}

function getPostsLiked(state, action) {
    return {
        ...state,
        liked: action.payload,
    };
}

function sendVerifyEmail(state, action) {
    return {
        ...state,
        payload: {
            ...state.payload,
            email_verified: !action.error,
        },
        error: action.error,
        errorData: action.error ? action.payload : {},
    };
}

function sendVerifyPhone(state, action) {
    return {
        ...state,
        payload: {
            ...state.payload,
            phone_verified: !action.error,
        },
        error: action.error,
        errorData: action.error ? action.payload : {},
    };
}

function clearTempDataState(state) {
    return {
        ...state,
        followers: INITIAL_STATE.followers,
        following: INITIAL_STATE.following,
        liked: INITIAL_STATE.liked,
    };
}

function getUserNotifications(state, action) {
    const payload = _isArray(action.payload) ? action.payload : [];

    return {
        ...state,
        notifications: !action.error ? payload : [],
    };
}

function getUserRequests(state, action) {
    const payload = _isArray(action.payload) ? action.payload : [];

    return {
        ...state,
        following_requested: !action.error ? payload : [],
    };
}

function cleareStateNotifications(state) {
    return {
        ...state,
        notifications: INITIAL_STATE.notifications,
    };
}
