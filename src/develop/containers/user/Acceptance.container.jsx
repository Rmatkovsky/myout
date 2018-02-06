import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _isEmpty from 'lodash/isEmpty';

import { handleReplace } from '../../utils/history.helper';

import { getChallenge, getAcceptance } from '../../actions/challenge.actions';

import routes from '../../constants/routes.constant';

import AcceptancePage from '../../components/pages/user/Acceptance.page';

class AcceptanceContainer extends Component {
    componentWillMount() {
        const {
            match: { params },
            handleGetAcceptance,
        } = this.props;

        handleGetAcceptance(params.id);
    }

    componentWillReceiveProps(nextProps) {
        const { acceptance, handleGetChallenge } = this.props;

        if (!_isEmpty(nextProps.acceptance) && !nextProps.acceptance.parent_id) {
            return handleReplace({ pathname: routes.main.notfound() });
        }

        if (acceptance.id !== nextProps.acceptance.id) {
            handleGetChallenge(nextProps.acceptance.parent_id);
        }

        return null;
    }

    render() {
        const {
            api,
            user,
            challenge,
            categories,
            acceptance,
        } = this.props;

        return (
            <AcceptancePage
              api={api}
              user={user}
              categories={categories}
              acceptance={acceptance}
              item={challenge}
            />
        );
    }
}

AcceptanceContainer.propTypes = {
    api: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    acceptance: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    challenge: PropTypes.object.isRequired,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleGetChallenge: PropTypes.func.isRequired,
    handleGetAcceptance: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    api: state.api,
    user: state.user.payload,
    isAuthorized: state.user.isAuthorized,
    categories: state.common.categories,
    challenge: state.challenges.current,
    acceptance: state.acceptance.payload,
});

const mapDispatchToProps = dispatch => ({
    handleGetAcceptance: bindActionCreators(getAcceptance, dispatch),
    handleGetChallenge: bindActionCreators(getChallenge, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AcceptanceContainer);
