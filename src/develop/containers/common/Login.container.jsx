import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LoginPage from '../../components/pages/common/Login.page';

import { handlePush } from '../../utils/history.helper';

import routes from '../../constants/routes.constant';

import { loginedUser /* clearDataState */ } from '../../actions/user.actions';

import { isEmail } from '../../utils/validation.helper';

class LoginContainer extends PureComponent {
    static handleForgotPassword() {
        handlePush({ pathname: routes.auth.recovery() });
    }

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFacebookLogin = this.handleFacebookLogin.bind(this);
    }

    componentWillMount() {
        const { /* handleClearDataState, */ user: { isAuthorized } } = this.props;

        // handleClearDataState();
        if (isAuthorized) {
            handlePush({ pathname: routes.main.home() });
        }
    }

    componentWillReceiveProps(nextProps) {
        const { user: { isAuthorized } } = nextProps;

        if (isAuthorized) {
            handlePush({ pathname: routes.main.home() });
        }
    }

    handleFacebookLogin(response) {
        const { handleLoginedUser } = this.props;
        const requestData = {
            provider: 'facebook',
            token: response.accessToken,
        };
        handleLoginedUser(requestData);
    }

    handleSubmit(formData) {
        const {
            user,
            handleLoginedUser,
        } = this.props;
        formData.provider = 'name';
        formData.redirect = user.redirect;

        if (!isEmail(formData.name)) {
            formData.provider = 'email';
            formData.email = formData.name;
        }

        handleLoginedUser(formData);
    }

    render() {
        const { user } = this.props;

        return (
            <LoginPage
              user={user}
              onSubmit={this.handleSubmit}
              handleFacebook={this.handleFacebookLogin}
              handleForgotPassword={LoginContainer.handleForgotPassword}
            />
        );
    }
}

LoginContainer.propTypes = {
    user: PropTypes.object.isRequired,
    // handleClearDataState: PropTypes.func.isRequired,
    handleLoginedUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    user: state.user,
    // credential: {}, // state.user.credential,
    // settings: {}, // state.user.settings,
});

const mapDispatchToProps = dispatch => ({
    // handleClearDataState: bindActionCreators(clearDataState, dispatch),
    handleLoginedUser: bindActionCreators(loginedUser, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
