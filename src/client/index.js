import { render } from 'react-dom';
import React, { Component } from 'react';
import { loadComponents } from 'loadable-components';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import App from '../develop/config/appRoutes';
import appHistory from '../develop/config/appHistory';
import configureStore from '../develop/store/root.store';

const preloadedState = window.__PRELOADED_STATE__;

delete window.__PRELOADED_STATE__;


const store = configureStore(preloadedState);

class Main extends Component {
    render() {
        return (
            <App {...this.props} />
        );
    }
}

// Create a styleManager instance.

loadComponents().then(() => {
    render(
        <Provider store={store}>
            <ConnectedRouter history={appHistory}>
                <Main />
            </ConnectedRouter >
        </Provider>,
    document.getElementById('r-view'),
);
});
