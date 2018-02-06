import _isArray from 'lodash/isArray';

import {
    GET_NEWS,
    GET_NEWS_ONE,
    NEWS_SET_FILTER,
    CLEAR_NEWS_DATA_STATE,
} from '../actions/types/news.types';

const INITIAL_STATE = {
    payload: [],
    current: {},
    pagination: {
        offset: 0,
        limit: 10,
    },
    error: false,
    errorData: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case GET_NEWS:
            return getNews(state, action);
        case GET_NEWS_ONE:
            return getNewsOne(state, action);
        case NEWS_SET_FILTER:
            return setFilter(state, action);
        case CLEAR_NEWS_DATA_STATE:
            return clearDataState(state);
        default:
            return state;
    }
};

function getNewsOne(state, action) {
    return {
        ...state,
        current: !action.error ? action.payload : {},
    };
}

function getNews(state, action) {
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
        pagination: {
            ...state.pagination,
            ...action.payload.pagination,
        },
    };
}

function clearDataState() {
    return {
        ...INITIAL_STATE,
    };
}
