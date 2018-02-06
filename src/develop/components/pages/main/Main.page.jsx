import React from 'react';
import PropTypes from 'prop-types';

import { handlePush } from '../../../utils/history.helper';
import routes from '../../../constants/routes.constant';

const MainPage = () => ((
    <div className="main">
        <div className="container main-form">
            <p className="notice">
                Please choose an option
            </p>

            <br />
            <div className="group-button">
                <button
                  className="custom-btn pull-left"
                  onClick={() => { handlePush({ pathname: routes.auth.signup() }); }}
                >
                    Sign up
                </button>
                <button
                  type="submit"
                  className="custom-btn submit pull-right"
                  onClick={() => { handlePush({ pathname: routes.main.terms() }); }}
                >
                    Log in
                </button>
            </div>
        </div>
    </div>
));

MainPage.propTypes = {
    user: PropTypes.object.isRequired,
};

export default MainPage;
