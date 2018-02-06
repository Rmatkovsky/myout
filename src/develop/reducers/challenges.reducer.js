import _isArray from 'lodash/isArray';
import _findIndex from 'lodash/findIndex';
import _isEmpty from 'lodash/isEmpty';

import {
    GET_ACCEPTANCES,
    GET_CHALLENGE,
    GET_CHALLENGES,
    CLEAR_FEED_DATA_STATE,
    GET_MORE_CHALLENGES,
    CLEAR_CHALLENGE_DATA_STATE,
} from '../actions/types/challenge.types';

import {
    ADD_COMMENT_ACCEPTANCE,
    ADD_COMMENT_CHALLENGE,
    DELETE_COMMENT,
} from '../actions/types/comment.types';

import { GET_USER_POSTS } from '../actions/types/user.types';

const INITIAL_STATE = {
    payload: [],
    current: {},
    error: false,
    errorData: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case GET_CHALLENGE:
            return getChallenge(state, action);
        case GET_CHALLENGES:
        case GET_USER_POSTS:
            return getChallenges(state, action);
        case GET_ACCEPTANCES:
            return getAcceptances(state, action);
        case CLEAR_FEED_DATA_STATE:
            return clearDataState(state);
        case ADD_COMMENT_CHALLENGE:
            return addCommentChallenge(state, action);
        case ADD_COMMENT_ACCEPTANCE:
            return addCommentAcceptance(state, action);
        case GET_MORE_CHALLENGES:
            return loadMoreChallenges(state, action);

        case CLEAR_CHALLENGE_DATA_STATE:
            return clearCurrentDataState(state);

        case DELETE_COMMENT:
            return deleteCommentAcceptance(state, action);
        default:
            return state;
    }
};

function addCommentChallenge(state, action) {
    if (_isEmpty(action.payload)) {
        return {
            ...state,
        };
    }

    const challenges = state.payload;
    const indexChallenge = _findIndex(challenges, i => i.id === action.payload.post_id);

    if (indexChallenge !== -1) {
        challenges[indexChallenge].comments_count += 1;
    }

    return {
        ...state,
        payload: challenges,
        current: {
            ...state.current,
            comments_count: state.current.comments_count + 1,
            comments: [
                ...state.current.comments,
                action.payload,
            ],
        },
    };
}

function addCommentAcceptance(state, action) {
    const acceptances = JSON.parse(JSON.stringify(state.current.acceptances));

    if (!_isEmpty(action.payload) && action.payload.parent_id) {
        const indexAcceptance = _findIndex(state.current.acceptances, i => i.id === action.payload.parent_id);
        const commentsCount = acceptances[indexAcceptance].comments_count;
        delete action.payload.parent_id;
        acceptances[indexAcceptance].comments.push(action.payload);
        acceptances[indexAcceptance].comments_count = commentsCount + 1;
    }

    return {
        ...state,
        current: {
            ...state.current,
            acceptances,
        },
    };
}

function deleteCommentAcceptance(state, action) {
    if (_isEmpty(action.payload)) {
        return {
            ...state,
        };
    }

    if (state.current.id === action.payload.post_id) {
        return {
            ...state,
            current: {
                ...state.current,
                comments_count: state.current.comments_count - 1,
            },
        };
    }
    const acceptances = (!_isEmpty(state.current.acceptances))
      ? JSON.parse(JSON.stringify(state.current.acceptances)) : [];

    const indexAcceptance = _findIndex(state.current.acceptances, i => i.id === action.payload.post_id);

    if (indexAcceptance !== -1) {
        const commentsCount = acceptances[indexAcceptance].comments_count;
        acceptances[indexAcceptance].comments_count = commentsCount - 1;
    }

    return {
        ...state,
        current: {
            ...state.current,
            acceptances,
        },
    };
}


function getChallenge(state, action) {
    return {
        ...state,
        current: !action.error ? action.payload : {},
        error: action.error,
        errorData: action.error ? action.payload : false,
        meta: action.meta,
    };
}

function getChallenges(state, action) {
    const payload = _isArray(action.payload) ? action.payload : [];
    return {
        ...state,
        payload: [
            ...state.payload,
            ...payload,
        ],
        error: action.error,
        errorData: action.error ? action.payload : false,
        meta: action.meta,
    };
}

function loadMoreChallenges(state, action) {
    const payload = _isArray(action.payload) ? action.payload : [];
    return {
        ...state,
        payload: [
            ...state.payload,
            ...payload,
        ],
        error: action.error,
        errorData: action.error ? action.payload : false,
        meta: action.meta,
    };
}

function getAcceptances(state, action) {
    const payload = _isArray(action.payload) ? action.payload : [];

    return {
        ...state,
        current: {
            ...state.current,
            acceptances: payload,
        },
    };
}

function clearDataState() {
    return {
        ...INITIAL_STATE,
    };
}

function clearCurrentDataState(state) {
    return {
        ...state,
        current: INITIAL_STATE.current,
    };
}
