import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { handleReplace } from '../../utils/history.helper';

import { setHandleBack } from '../../actions/api.action';
import { getChallenge, getAcceptances, clearCurrentDataState } from '../../actions/challenge.actions';

import routes from '../../constants/routes.constant';

import ChallengePage from '../../components/pages/user/Challenge.page';

class ChallengeContainer extends Component {
    componentWillMount() {
        const {
            match: { params },
            handleGetChallenge,
        } = this.props;

        handleGetChallenge(params.id);
    }

    componentWillUnmount() {
        const { handleCurrentDataState } = this.props;

        handleCurrentDataState();
    }

    render() {
        const {
            api,
            user,
            challenge,
            challengeError,
            categories,
            acceptances,
            handleGetAcceptances,
            handleSetHandleBack,
        } = this.props;

        if (challengeError) {
            handleReplace({ pathname: routes.main.notfound() });
        }

        return (
            <ChallengePage
              api={api}
              user={user}
              categories={categories}
              acceptances={acceptances}
              challenge={challenge}
              handleGetAcceptances={handleGetAcceptances}
              handleSetHandleBack={handleSetHandleBack}
            />
        );
    }
}

ChallengeContainer.propTypes = {
    api: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    acceptances: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    challenge: PropTypes.object.isRequired,
    challengeError: PropTypes.object.isRequired,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleGetChallenge: PropTypes.func.isRequired,
    handleGetAcceptances: PropTypes.func.isRequired,
    handleSetHandleBack: PropTypes.func.isRequired,
    handleCurrentDataState: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    api: state.api,
    user: state.user.payload,
    isAuthorized: state.user.isAuthorized,
    categories: state.common.categories,
    challengeError: state.challenges.error,
    challenge: state.challenges.current,
    acceptances: state.challenges.current.acceptances || [],
});

const mapDispatchToProps = dispatch => ({
    handleGetAcceptances: bindActionCreators(getAcceptances, dispatch),
    handleGetChallenge: bindActionCreators(getChallenge, dispatch),
    handleSetHandleBack: bindActionCreators(setHandleBack, dispatch),
    handleCurrentDataState: bindActionCreators(clearCurrentDataState, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeContainer);
