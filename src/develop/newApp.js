import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../develop/containers/common/Login.container';

import * as Routes from '../develop/config/appRoutes';

const App = () => (
    <Routes.Layout>
        <Switch>
            <Route
              exact
              name="Terms"
              path="/terms"
              component={Routes.TermsPage}
            />
            <Route
              exact
              name="Main"
              path="/"
              component={Routes.MainPage}
            />
            <Route
              exact
              name="SignUp"
              path="/signup"
              component={Routes.SignUpPage}
            />
            <Route
                exact
                name="Login"
                path="/login"
                component={Login}
            />
        </Switch>
    </Routes.Layout>
);

export default App;
