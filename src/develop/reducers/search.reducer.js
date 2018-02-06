import _isArray from 'lodash/isArray';
import _findIndex from 'lodash/findIndex';

import {
    GET_SEARCH_USERS,
    GET_SEARCH_CHALLENGES,
    SET_SEARCH,
    SET_SEARCH_FILTER,
    CLEAR_SEARCH_DATA_STATE,
    CLEAR_SEARCH_RESULTS_DATA_STATE,
} from '../actions/types/search.types';

import {
    SET_USER_FOLLOW,
    UNSET_USER_FOLLOW,
    SEND_FOLLOW_REQUEST,
} from '../actions/types/user.types';

const INITIAL_STATE = {
    payload: [],
    pagination: {
        offset: 0,
        limit: 10,
        search: '',
    },
    tab: 'users',
    error: false,
    errorData: false,
};

export default (state = Object.assign({}, INITIAL_STATE), action) => {
    switch (action.type) {

        case GET_SEARCH_USERS:
        case GET_SEARCH_CHALLENGES:
            return getSearch(state, action);

        case SET_SEARCH:
            return setSearch(state, action);

        case SET_SEARCH_FILTER:
            return setFilter(state, action);

        case CLEAR_SEARCH_DATA_STATE:
            return clearDataState();

        case SET_USER_FOLLOW:
        case UNSET_USER_FOLLOW:
        case SEND_FOLLOW_REQUEST:
            return followUser(state, action);

        case CLEAR_SEARCH_RESULTS_DATA_STATE:
            return clearDataStateResults(state);
        default:
            return state;
    }
};

function getSearch(state, action) {
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

function setSearch(state, action) {
    return {
        ...state,
        pagination: {
            ...state.pagination,
            search: action.payload.search,
        },
    };
}

function followUser(state, action) {
    const results = JSON.parse(JSON.stringify(state.payload));

    if (!action.error) {
        const indexResult = _findIndex(results, i => i.id === action.payload.id);
        if (indexResult !== -1) {
            results[indexResult].followed_by_me = action.payload.followed_by_me;
            results[indexResult].followers_count = action.payload.followers_count;
            results[indexResult].following_requested = action.payload.following_requested;
        }
    }

    return {
        ...state,
        payload: results,
    };
}

function setFilter(state, action) {
    return {
        ...state,
        pagination: {
            ...state.pagination,
            ...action.payload.pagination,
        },
        tab: action.payload.tab || state.tab,
    };
}

function clearDataStateResults(state) {
    return {
        ...{
            payload: [],
            pagination: {
                offset: 0,
                limit: 10,
                search: '',
            },
            tab: 'users',
            error: false,
            errorData: false,
        },
        tab: state.tab,
    };
}

function clearDataState() {
    return {
        ...INITIAL_STATE,
    };
}
