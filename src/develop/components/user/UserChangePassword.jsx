import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateUserWithoutRedirect } from '../../actions/user.actions';

import ChangePasswordForm from './form/ChangePassword';

class ChangePasswordComponent extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(formData) {
        const { handleUpdateUser } = this.props;

        handleUpdateUser(formData);
    }

    render() {
        const { user } = this.props;

        return (
            <ChangePasswordForm errorData={user.errorData} onSubmit={this.handleSubmit} />
        );
    }
}

ChangePasswordComponent.propTypes = {
    user: PropTypes.object.isRequired,
    handleUpdateUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    user: state.user,
});

const mapDispatchToProps = dispatch => ({
    handleUpdateUser: bindActionCreators(updateUserWithoutRedirect, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordComponent);
