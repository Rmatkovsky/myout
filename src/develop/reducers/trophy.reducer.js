import _isArray from 'lodash/isArray';
import _isEmpty from 'lodash/isEmpty';
import _findIndex from 'lodash/findIndex';

import {
    GET_TROPHIES,
    GET_TROPHY,
    TROPHY_SET_FILTER,
    CLEAR_DATA_STATE,
    TROPHY_RESTORE_FILTER,
    CLEAR_TROPHY_DATA_STATE,
    GET_TROPHY_ACCEPTANCES,
} from '../actions/types/trophy.types';

import {
    ADD_COMMENT_TROPHY,
    ADD_TROPHY_COMMENT_ACCEPTANCES,
} from '../actions/types/comment.types';

const INITIAL_STATE = {
    payload: [],
    current: {},
    filter: 'latest',
    pagination: {
        offset: 0,
        limit: 10,
    },
    error: false,
    errorData: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case GET_TROPHIES:
            return getTrophies(state, action);
        case GET_TROPHY:
            return getTrophy(state, action);
        case TROPHY_SET_FILTER:
            return setFilter(state, action);
        case CLEAR_DATA_STATE:
            return clearDataState(state);
        case TROPHY_RESTORE_FILTER:
            return restoreFilter(state);
        case ADD_COMMENT_TROPHY:
            return addComment(state, action);
        case GET_TROPHY_ACCEPTANCES:
            return getAcceptances(state, action);
        case ADD_TROPHY_COMMENT_ACCEPTANCES:
            return addCommentAcceptance(state, action);
        case CLEAR_TROPHY_DATA_STATE:
            return clearDataPosts(state);
        default:
            return state;
    }
};

function addComment(state, action) {
    if (_isEmpty(action.payload)) {
        return {
            ...state,
        };
    }

    const trophies = state.payload;
    const indexTrophy = _findIndex(trophies, i => i.id === action.payload.post_id);

    if (indexTrophy !== -1) {
        trophies[indexTrophy].comments_count += 1;
    }

    return {
        ...state,
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

function getTrophy(state, action) {
    return {
        ...state,
        current: !action.error ? action.payload : {},
    };
}

function getTrophies(state, action) {
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

function setFilter(state, action) {
    return {
        ...state,
        filter: action.payload.filter || state.filter,
        pagination: {
            ...state.pagination,
            ...action.payload.pagination,
        },
    };
}

function restoreFilter(state) {
    return {
        ...state,
        filter: INITIAL_STATE.filter,
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


function clearDataPosts(state) {
    return {
        ...INITIAL_STATE,
        filter: state.filter,
        mediaFilter: state.mediaFilter,
    };
}

function clearDataState() {
    return {
        ...INITIAL_STATE,
    };
}
