import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import queryString from 'query-string';

import ResetPasswordPage from '../../components/pages/user/ResetPassword.page';

import { handlePush } from '../../utils/history.helper';

import routes from '../../constants/routes.constant';

import { resetPassword } from '../../actions/user.actions';

class ResetPasswordContainer extends Component {
    constructor(props) {
        super(props);

        this.handleResetPassword = this.handleResetPassword.bind(this);
    }

    componentWillMount() {
        const { location } = this.props;
        const parsedLocation = queryString.parse(location.search);

        if (!parsedLocation.token) {
            handlePush({ pathname: routes.main.home() });
        }
    }

    handleResetPassword(formData) {
        const { handlerResetPassword, location } = this.props;
        const parsedLocation = queryString.parse(location.search);

        formData.token = parsedLocation.token;
        handlerResetPassword(formData);
    }

    render() {
        return (
            <ResetPasswordPage
              onSubmit={this.handleResetPassword}
            />
        );
    }
}

ResetPasswordContainer.propTypes = {
    location: PropTypes.object.isRequired,
    handlerResetPassword: PropTypes.func.isRequired,
};

const mapStateToProps = (state, location) => ({
    location: location.location,
});

const mapDispatchToProps = dispatch => ({
    handlerResetPassword: bindActionCreators(resetPassword, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordContainer);
