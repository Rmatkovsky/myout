import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ReferralCodePage from '../../components/pages/user/ReferralCode.page';

import { handlePush } from '../../utils/history.helper';

import routes from '../../constants/routes.constant';

import { updatePromo, clearErrorDataState } from '../../actions/user.actions';

class ReferralCodeContainer extends Component {
    static handleSkipPage() {
        handlePush({ pathname: routes.challenges.all() });
    }

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        const { user, isAuthorized } = this.props;

        if (!isAuthorized && user.payload.guest_promocode) {
            handlePush({ pathname: routes.main.home() });
        }
    }

    handleSubmit(value) {
        const { user, handleUpdatePromo } = this.props;

        handleUpdatePromo({ ...user, guest_promocode: value });
    }

    render() {
        const { user, handleClearDataState } = this.props;

        return (
            <ReferralCodePage
              user={user}
              handleSubmit={this.handleSubmit}
              handleClearDataState={handleClearDataState}
              handleSkipPage={ReferralCodeContainer.handleSkipPage}
            />
        );
    }
}

ReferralCodeContainer.propTypes = {
    user: PropTypes.object.isRequired,
    isAuthorized: PropTypes.object.isRequired,
    handleUpdatePromo: PropTypes.func.isRequired,
    handleClearDataState: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    user: state.user,
    isAuthorized: state.user.isAuthorized,
    form: state.form.referral,
});

const mapDispatchToProps = dispatch => ({
    handleUpdatePromo: bindActionCreators(updatePromo, dispatch),
    handleClearDataState: bindActionCreators(clearErrorDataState, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReferralCodeContainer);
