import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';

import TrophyDetailsComponent from '../../../components/trophy/TrophyDetails';

import AcceptancesPage from '../../../components/pages/challenge/Acceptances.page';

class TrophyPage extends Component {
    static isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.bottom >= 0
        );
    }

    componentDidMount() {
        window.addEventListener('scroll', () => {
            const blockInViewport = TrophyPage.isInViewport(document.querySelector('.post-details'));
            if (blockInViewport) {
                document.querySelector('.trophy-slide').classList.remove('squeeze');
            } else {
                document.querySelector('.trophy-slide').classList.add('squeeze');
            }
        });
    }

    render() {
        const {
            api,
            user,
            acceptances,
            trophy,
            handleGetAcceptances,
            handleSetHandleBack,
        } = this.props;

        if (_isEmpty(trophy)) {
            return null;
        }

        return (
            <div className="challenge trophy">
                <TrophyDetailsComponent
                  api={api}
                  user={user}
                  item={trophy}
                  handleSetHandleBack={handleSetHandleBack}
                />
                <AcceptancesPage
                  type="trophy_acceptance"
                  user={user}
                  item={trophy}
                  acceptances={acceptances}
                  handleGetAcceptances={handleGetAcceptances}
                />
            </div>
        );
    }
}
TrophyPage.defaultProps = {
    api: {},
    user: {},
    trophy: {},
    acceptances: [],
};

TrophyPage.propTypes = {
    api: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    trophy: PropTypes.object.isRequired,
    acceptances: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleGetAcceptances: PropTypes.func.isRequired,
    handleSetHandleBack: PropTypes.func.isRequired,
};

export default TrophyPage;
