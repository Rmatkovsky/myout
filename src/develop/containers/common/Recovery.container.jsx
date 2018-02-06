import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import RecoveryPage from '../../components/pages/common/Recovery.page';

import { handlePush } from '../../utils/history.helper';

import routes from '../../constants/routes.constant';

import { recoveryPassword, clearDataState } from '../../actions/user.actions';

class RecoveryContainer extends PureComponent {
    static handleCancel() {
        handlePush({ pathname: routes.main.home() });
    }

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        const { handleClearDataState } = this.props;

        handleClearDataState();
    }

    handleSubmit(formData) {
        const { handlerecoveryPassword } = this.props;
        handlerecoveryPassword(formData);
    }

    render() {
        const { user } = this.props;
        return (
            <RecoveryPage
              user={user}
              onSubmit={this.handleSubmit}
              handleCancel={RecoveryContainer.handleCancel}
            />
        );
    }
}

RecoveryContainer.propTypes = {
    user: PropTypes.object.isRequired,
    handlerecoveryPassword: PropTypes.func.isRequired,
    handleClearDataState: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    user: state.user,
    // credential: {}, // state.user.credential,
    // settings: {}, // state.user.settings,
});

const mapDispatchToProps = dispatch => ({
    handlerecoveryPassword: bindActionCreators(recoveryPassword, dispatch),
    handleClearDataState: bindActionCreators(clearDataState, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecoveryContainer);
