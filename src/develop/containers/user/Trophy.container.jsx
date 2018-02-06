import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setHandleBack } from '../../actions/api.action';
import { getTrophy, getAcceptances } from '../../actions/trophy.actions';

import TrophyPage from '../../components/pages/user/Trophy.page';

class TrophyContainer extends Component {
    componentWillMount() {
        const {
            match: { params },
            handleGetTrophy,
        } = this.props;

        handleGetTrophy(params.id);
    }

    render() {
        const {
            api,
            user,
            trophy,
            acceptances,
            handleGetAcceptances,
            handleSetHandleBack,
        } = this.props;

        return (
            <TrophyPage
              api={api}
              user={user}
              acceptances={acceptances}
              trophy={trophy}
              handleGetAcceptances={handleGetAcceptances}
              handleSetHandleBack={handleSetHandleBack}
            />
        );
    }
}

TrophyContainer.propTypes = {
    api: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    acceptances: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    trophy: PropTypes.object.isRequired,
    handleGetTrophy: PropTypes.func.isRequired,
    handleGetAcceptances: PropTypes.func.isRequired,
    handleSetHandleBack: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    api: state.api,
    user: state.user.payload,
    isAuthorized: state.user.isAuthorized,
    trophy: state.trophy.current,
    acceptances: state.trophy.current.acceptances || [],
});

const mapDispatchToProps = dispatch => ({
    handleGetAcceptances: bindActionCreators(getAcceptances, dispatch),
    handleGetTrophy: bindActionCreators(getTrophy, dispatch),
    handleSetHandleBack: bindActionCreators(setHandleBack, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrophyContainer);
