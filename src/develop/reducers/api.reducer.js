import {
    SET_API_REQUEST,
    SET_API_SUCCESS,
    SET_API_FAILURE,
    SET_API_PAGINATOR,
    SET_API_PARAMS,
    SET_API_HANDLEBACK,
    DELETE_API_HANDLEBACK,
    CLEAR_API_STATE,
} from '../actions/types/api.types';

export default (state = {}, action) => {
    switch (action.type) {
        case SET_API_REQUEST:
            return setApiRequest(state, action);

        case SET_API_SUCCESS:
            return setApiSuccess(state, action);

        case SET_API_FAILURE:
            return setApiFailure(state, action);

        case SET_API_PARAMS:
            return setApiParams(state, action);

        case SET_API_PAGINATOR:
            return setApiPaginator(state, action);

        case SET_API_HANDLEBACK:
            return setHandleBack(state);

        case DELETE_API_HANDLEBACK:
            return deleteHandleBack(state);

        case CLEAR_API_STATE:
            return clearState(state, action);

        default:
            return state;
    }
};

function setApiRequest(state, action) {
    return {
        ...state,
        [action.payload.key]: {
            ...state[action.payload.key],
            loading: true,
        },
    };
}

function setApiSuccess(state, action) {
    return {
        ...state,
        [action.payload.key]: {
            ...state[action.payload.key],
            ...action.payload.value,
            loading: false,
        },
    };
}

function setApiFailure(state, action) {
    return {
        ...state,
        [action.payload.key]: {
            ...state[action.payload.key],
            ...action.payload.value,
            loading: false,
            error: true,
        },
    };
}

function setApiParams(state, action) {
    return {
        ...state,
        [action.payload.key]: {
            ...state[action.payload.key],
            params: action.payload.params,
            pagination: action.payload.pagination,
        },
    };
}

function setApiPaginator(state, action) {
    return {
        ...state,
        [action.payload.key]: {
            ...state[action.payload.key],
            pagination: action.payload.value,
        },
    };
}

function setHandleBack(state) {
    return {
        ...state,
        handleBack: true,
    };
}

function deleteHandleBack(state) {
    return {
        ...state,
        handleBack: false,
    };
}

function clearState(state, action) {
    const shallowState = { ...state };

    delete shallowState[action.payload.key];

    return shallowState;
}

