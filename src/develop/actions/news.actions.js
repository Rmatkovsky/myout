import api from '../api/config';
import {
    createAction,
    success,
    failure,
    request,
} from '../utils/actions.helper';
import {
    GET_NEWS,
    NEWS_SET_FILTER,
    CLEAR_NEWS_DATA_STATE,
} from './types/news.types';

export const getNews = params => (dispatch) => {
    dispatch(request(GET_NEWS));
    api.news.getAll(params).then(
        response => dispatch(success(GET_NEWS, response.data.news_feed)),
        error => dispatch(failure(GET_NEWS, error)),
    );
};

export const setFilter = params => (dispatch) => {
    dispatch(success(NEWS_SET_FILTER, params));
};

export const clearDataState = () => createAction(CLEAR_NEWS_DATA_STATE);
