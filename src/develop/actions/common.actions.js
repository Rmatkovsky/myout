import api from '../api/config';

import {
    OPEN_MODAL,
    OPEN_EXTEND_MODAL,
    EXPAND_MODAL,
    SHRINK_MODAL,
    CLOSE_MODAL,
    CLOSE_EXTEND_MODAL,
} from './types/modal.types';

import {
    GET_CATEGORIES,
} from './types/common.types';

import {
    createAction,
    request,
    success,
    failure,
} from '../utils/actions.helper';

export const openModal = (key, value) => createAction(OPEN_MODAL, { key, value });
export const openExtendModal = (key, value) => createAction(OPEN_EXTEND_MODAL, { key, value });

export const expandModal = () => createAction(EXPAND_MODAL);

export const shrinkModal = () => createAction(SHRINK_MODAL);

export const closeModal = () => createAction(CLOSE_MODAL);
export const closeExtendModal = () => createAction(CLOSE_EXTEND_MODAL);

export const getCategories = () => (dispatch) => {
    dispatch(request(GET_CATEGORIES));
    api.common.getCategories().then(
        response => dispatch(success(GET_CATEGORIES, response.data)),
        err => dispatch(failure(GET_CATEGORIES, err)),
    );
};
