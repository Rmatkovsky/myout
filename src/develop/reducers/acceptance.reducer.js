import {
    GET_ACCEPTANCE,
} from '../actions/types/challenge.types';

const INITIAL_STATE = {
    payload: {},
    error: false,
    errorData: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ACCEPTANCE:
            return getAcceptance(state, action);
        default:
            return state;
    }
};


function getAcceptance(state, action) {
    return {
        ...state,
        payload: action.payload,
        error: action.error,
        errorData: action.error ? action.payload : false,
        meta: action.meta,
    };
}
