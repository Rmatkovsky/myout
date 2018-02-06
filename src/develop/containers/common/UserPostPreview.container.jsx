import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _isEmpty from 'lodash/isEmpty';

import { handleReplace } from '../../utils/history.helper';

import { getChallenge, getAcceptances as getChallengeAcceptances } from '../../actions/challenge.actions';
import { getTrophy, getAcceptances as getTrophyAcceptances } from '../../actions/trophy.actions';

import routes from '../../constants/routes.constant';

import ChallengePage from '../../components/pages/user/Challenge.page';
import TrophyPage from '../../components/pages/user/Trophy.page';

import AcceptanceContainer from '../../containers/user/Acceptance.container';

class ChallengeContainer extends Component {
    componentWillMount() {
        const {
            match: { params },
            handleGetChallenge,
            handleGetTrophy,
        } = this.props;

        switch (params.type) {
            case 'challenge': return handleGetChallenge(params.id);
            case 'trophy': return handleGetTrophy(params.id);
            case 'acceptance': return params.id;
            default: return handleReplace({ pathname: routes.auth.login() });
        }
    }

    componentDidMount() {
        const { match: { params }, isAuthorized } = this.props;

        if (isAuthorized) {
            switch (params.type) {
                case 'challenge': return handleReplace({ pathname: routes.challenge.id(params.id) });
                case 'trophy': return handleReplace({ pathname: routes.trophy.id(params.id) });
                case 'acceptance': return handleReplace({ pathname: routes.acceptance.id(params.id) });
                default: return handleReplace({ pathname: routes.news.all() });
            }
        }
        return null;
    }

    componentWillReceiveProps(nextProps) {
        const { match: { params }, isAuthorized } = this.props;

        if (isAuthorized !== nextProps.isAuthorized && nextProps.isAuthorized) {
            switch (params.type) {
                case 'challenge': return handleReplace({ pathname: routes.challenge.id(params.id) });
                case 'trophy': return handleReplace({ pathname: routes.trophy.id(params.id) });
                case 'acceptance': return handleReplace({ pathname: routes.acceptance.id(params.id) });
                default: return handleReplace({ pathname: routes.news.all() });
            }
        }
        return null;
    }

    render() {
        const {
            api,
            challenge,
            trophy,
            categories,
            acceptances,
            handleGetChallengeAcceptances,
            handleGetTrophyAcceptances,
            match,
        } = this.props;

        switch (match.params.type) {
            case 'challenge':
                if ((!_isEmpty(challenge) && challenge.type !== match.params.type)) {
                    return handleReplace({ pathname: routes.main.notfound() });
                }
                return (
                    <ChallengePage
                      api={api}
                      categories={categories}
                      acceptances={acceptances}
                      challenge={challenge}
                      handleGetAcceptances={handleGetChallengeAcceptances}
                    />
                );
            case 'trophy':
                if ((!_isEmpty(trophy) && trophy.type !== match.params.type)) {
                    return handleReplace({ pathname: routes.main.notfound() });
                }
                return (
                    <TrophyPage
                      api={api}
                      categories={categories}
                      acceptances={acceptances}
                      trophy={trophy}
                      handleGetAcceptances={handleGetTrophyAcceptances}
                    />
                );
            case 'acceptance':
                return (
                    <AcceptanceContainer match={match} />
                );
            default: return handleReplace({ pathname: routes.main.notfound() });
        }
    }
}

ChallengeContainer.propTypes = {
    api: PropTypes.object.isRequired,
    isAuthorized: PropTypes.bool.isRequired,
    acceptances: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    challenge: PropTypes.object.isRequired,
    trophy: PropTypes.object.isRequired,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleGetChallenge: PropTypes.func.isRequired,
    handleGetTrophy: PropTypes.func.isRequired,
    handleGetChallengeAcceptances: PropTypes.func.isRequired,
    handleGetTrophyAcceptances: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    api: state.api,
    user: state.user.payload,
    isAuthorized: state.user.isAuthorized,
    categories: state.common.categories,
    challenge: state.challenges.current,
    trophy: state.trophy.current,
    acceptances: state.challenges.current.acceptances || [],
});

const mapDispatchToProps = dispatch => ({
    handleGetChallengeAcceptances: bindActionCreators(getChallengeAcceptances, dispatch),
    handleGetTrophyAcceptances: bindActionCreators(getTrophyAcceptances, dispatch),
    handleGetChallenge: bindActionCreators(getChallenge, dispatch),
    handleGetTrophy: bindActionCreators(getTrophy, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeContainer);
