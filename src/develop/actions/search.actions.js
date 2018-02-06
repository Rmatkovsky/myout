import api from '../api/config';
import {
    createAction,
    success,
    failure,
    request,
} from '../utils/actions.helper';
import {
    GET_SEARCH_USERS,
    GET_SEARCH_CHALLENGES,
    SET_SEARCH,
    SET_SEARCH_FILTER,
    CLEAR_SEARCH_DATA_STATE,
    CLEAR_SEARCH_RESULTS_DATA_STATE,
} from './types/search.types';

export const getUsersSearch = params => (dispatch) => {
    dispatch(request(GET_SEARCH_USERS));
    api.search.getUsersSearch(params).then(
        response => dispatch(success(GET_SEARCH_USERS, response.data.users)),
        error => dispatch(failure(GET_SEARCH_USERS, error)),
    );
};

export const getChallengesSearch = params => (dispatch) => {
    dispatch(request(GET_SEARCH_CHALLENGES));
    api.search.getChallengesSearch(params).then(
        response => dispatch(success(GET_SEARCH_CHALLENGES, response.data.posts)),
        error => dispatch(failure(GET_SEARCH_CHALLENGES, error)),
    );
};

export const setSearch = params => (dispatch) => {
    dispatch(success(SET_SEARCH, params));
};

export const setFilter = params => (dispatch) => {
    dispatch(success(SET_SEARCH_FILTER, params));
};

export const clearDataResults = () => createAction(CLEAR_SEARCH_RESULTS_DATA_STATE);
export const clearDataState = () => createAction(CLEAR_SEARCH_DATA_STATE);
