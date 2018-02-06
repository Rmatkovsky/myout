import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateUserWithoutRedirect } from '../../actions/user.actions';

import ProfileSettingsPage from '../../components/pages/user/ProfileSettingsPage';
import filterUserSettingsConstant from '../../constants/filterUserSettings.constant';
import { handlePush } from '../../utils/history.helper';
import routes from '../../constants/routes.constant';

class UserSettingsContainer extends Component {
    constructor() {
        super();

        this.state = {
            activeFilter: 'settings',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitVerifyEmail = this.handleSubmitVerifyEmail.bind(this);
        this.handleSubmitVerifyPhone = this.handleSubmitVerifyPhone.bind(this);
        this.handleSelectFilter = this.handleSelectFilter.bind(this);
    }

    handleSubmit(formData) {
        const { handleUpdateUser } = this.props;

        handleUpdateUser(formData);
    }

    handleSubmitVerifyEmail(formData) {
        formData.typePopup = 'email';

        this.handleSubmit(formData);
    }

    handleSubmitVerifyPhone(formData) {
        formData.typePopup = 'phone';

        this.handleSubmit(formData);
    }

    handleSelectFilter(code) {
        const { user } = this.props;
        handlePush({ pathname: routes.user[code](user.payload.id) });
    }

    render() {
        const { user } = this.props;
        const { activeFilter } = this.state;

        return (
            <ProfileSettingsPage
              initialValues={user.payload}
              errorData={user.errorData}
              handleSubmit={this.handleSubmit}
              filters={filterUserSettingsConstant}
              activeFilter={activeFilter}
              handleSelectFilter={this.handleSelectFilter}
              handleSubmitVerifyEmail={this.handleSubmitVerifyEmail}
              handleSubmitVerifyPhone={this.handleSubmitVerifyPhone}
            />
        );
    }
}

UserSettingsContainer.contextTypes = {
    handleOpenModal: PropTypes.func.isRequired,
};

UserSettingsContainer.propTypes = {
    user: PropTypes.object.isRequired,
    handleUpdateUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    api: state.api,
    user: state.user,
});

const mapDispatchToProps = dispatch => ({
    handleUpdateUser: bindActionCreators(updateUserWithoutRedirect, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingsContainer);
