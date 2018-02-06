import api from '../api/config';
import {
    createAction,
    success,
    failure,
    request,
} from '../utils/actions.helper';
import {
    GET_TROPHY,
    GET_TROPHY_ACCEPTANCES,
    GET_TROPHIES,
    TROPHY_SET_FILTER,
    CLEAR_TROPHY_DATA_STATE,
    CLEAR_DATA_STATE,
} from './types/trophy.types';

import normalizr from '../utils/mappers/trophy.mapper';

export const getTrophies = params => (dispatch) => {
    dispatch(request(GET_TROPHIES));
    api.trophy.getAll(params).then(
        response => dispatch(success(GET_TROPHIES, normalizr.res.getTrophies(response.data.posts))),
        error => dispatch(failure(GET_TROPHIES, error)),
    );
};

export const getTrophy = params => (dispatch) => {
    dispatch(request(GET_TROPHY));
    api.challenges.getById(params).then(
        (response) => {
            const nData = normalizr.res.getTrophy(response.data.post);

            dispatch(success(GET_TROPHY, nData));
        },
        error => dispatch(failure(GET_TROPHY, error)),
    );
};

export const getAcceptances = params => (dispatch) => {
    dispatch(request(GET_TROPHY_ACCEPTANCES));
    api.challenges.getAcceptances(params).then(
        (response) => {
            const nData = normalizr.res.getAcceptances(response.data.acceptances);

            dispatch(success(GET_TROPHY_ACCEPTANCES, nData));
        },
        error => dispatch(failure(GET_TROPHY_ACCEPTANCES, error)),
    );
};

export const setFilter = params => (dispatch) => {
    dispatch(success(TROPHY_SET_FILTER, params));
};

export const clearDataPosts = () => createAction(CLEAR_TROPHY_DATA_STATE);
export const clearDataState = () => createAction(CLEAR_DATA_STATE);
