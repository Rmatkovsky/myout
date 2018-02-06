import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';

import { Provider } from 'react-redux';
import { getLoadableState } from 'loadable-components/server';

import App from '../develop/config/appRoutes';
import render from './render';

import configureStore from '../develop/store/root.store';

const app = express();
app.use(express.static('./public'));

app.get('*', async (req, res) => {
    const context = {};
    const store = configureStore();

    const appWithRouter = (
        <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
                <App />
            </StaticRouter>
        </Provider>
    );

    if (context.url) {
        res.redirect(context.url);
        return;
    }

    const preloadedState = store.getState();

    const loadableState = await getLoadableState(appWithRouter);

    const html = ReactDOMServer.renderToString(appWithRouter);

    res.status(200).send(render(html, loadableState, preloadedState));
});

app.listen(3000, () => console.log('Demo app listening on port 3000'));
