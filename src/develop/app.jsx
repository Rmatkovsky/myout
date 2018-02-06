import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import Root from './containers/Root';

import store from './store/root.store';
import routes from './config/appRoutes';
import appHistory from './config/appHistory';

export default () => {
    render(
        <AppContainer>
            <Root
              store={store}
              routes={routes}
              appHistory={appHistory}
            />
        </AppContainer>,

        document.getElementById('r-view'),
    );

    if (module.hot) {
        module.hot.accept('./containers/Root', () => {
            render(
                <AppContainer>
                    <Root
                      store={store}
                      routes={routes}
                      appHistory={appHistory}
                    />
                </AppContainer>,

                document.getElementById('r-view'),
            );
        });
    }
};
