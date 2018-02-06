import _isArray from 'lodash/isArray';
import {
    OPEN_MODAL,
    OPEN_EXTEND_MODAL,
    EXPAND_MODAL,
    SHRINK_MODAL,
    CLOSE_MODAL,
    CLOSE_EXTEND_MODAL,
} from '../actions/types/modal.types';

import {
    GET_CATEGORIES,
} from '../actions/types/common.types';

const DEFAULT_STATE = {
    categories: [],
    modal: {
        open: false,
        expand: false,
        extend: false,
        data: {},
    },
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {

        case OPEN_MODAL:
            return reduceOpenModal(state, action);

        case OPEN_EXTEND_MODAL:
            return reduceOpenExtendModal(state, action);

        case EXPAND_MODAL:
            return reduceExpandModal(state);

        case SHRINK_MODAL:
            return reduceShrinkModal(state);

        case CLOSE_MODAL:
            return reduceCloseModal(state);

        case CLOSE_EXTEND_MODAL:
            return reduceCloseExtendModal(state);

        case GET_CATEGORIES:
            return getCategories(state, action);

        default:
            return state;
    }
};

function reduceOpenModal(state, action) {
    return {
        ...state,
        modal: {
            ...state.modal,
            open: true,
            data: { ...action.payload },
        },
    };
}

function reduceExpandModal(state) {
    return {
        ...state,
        modal: {
            ...state.modal,
            expand: true,
        },
    };
}

function reduceShrinkModal(state) {
    return {
        ...state,
        modal: {
            ...state.modal,
            expand: false,
        },
    };
}

function reduceCloseModal(state) {
    return {
        ...state,
        modal: {
            ...state.modal,
            open: false,
        },
    };
}

function getCategories(state, action) {
    const payload = _isArray(action.payload.categories) ? action.payload.categories : [];
    return {
        ...state,
        categories: [...payload],
    };
}

function reduceOpenExtendModal(state, action) {
    return {
        ...state,
        modal: {
            ...state.modal,
            extend: true,
            data: { ...action.payload },
        },
    };
}

function reduceCloseExtendModal(state) {
    return {
        ...state,
        modal: {
            ...state.modal,
            extend: false,
        },
    };
}
