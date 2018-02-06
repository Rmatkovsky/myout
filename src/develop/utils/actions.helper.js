import { clearObject } from './helper';

// Action structure
// {
//     type: '',
//     payload: {} | [],
//     error: true,
//     meta: {}
// }

export const createAction = (type, payload, meta, error = false) => {
    const action = {
        type,
        payload,
        error,
        meta,
    };

    return clearObject(action);
};

export const request = type => createAction(type, {}, { loading: true }, false);

export const success = (type, payload, meta = {}) => createAction(type, payload, { ...meta, loading: false }, false);

export const failure = (type, payload, meta = {}) => createAction(type, payload, { ...meta, loading: false }, true);
