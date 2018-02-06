import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from '../reducers/root.reducer';

import appHistory from '../../develop/config/appHistory';

const middlewares = [routerMiddleware(appHistory), thunkMiddleware];

if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line global-require
    const loggerMiddleware = require('redux-logger')();

    middlewares.push(loggerMiddleware);
}

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStoreWithMiddleware = composeEnhancers(applyMiddleware(...middlewares))(createStore);

export default function configureStore(initialState = {}) {
    const store = createStoreWithMiddleware(
        rootReducer,
        initialState,
    );

    if (module.hot) {
        module.hot.accept('../reducers/root.reducer.js', () => {
            store.replaceReducer(rootReducer);
        });
    }

    return store;
}
