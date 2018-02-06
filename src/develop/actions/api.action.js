import {
    success,
} from '../utils/actions.helper';

import {
    SET_API_HANDLEBACK,
    SET_API_PAGINATOR,
    SET_API_PARAMS,
    DELETE_API_HANDLEBACK,
} from './types/api.types';

export const setParams = params => (dispatch) => {
    dispatch(success(SET_API_PARAMS, params));
};

export const setPagination = params => (dispatch) => {
    dispatch(success(SET_API_PAGINATOR, params));
};

export const setHandleBack = () => (dispatch) => {
    dispatch(success(SET_API_HANDLEBACK));
};

export const deleteHandleBack = params => (dispatch) => {
    dispatch(success(DELETE_API_HANDLEBACK, params));
};
