import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import MetaTags from 'react-meta-tags';

import ChallengeDetailsComponent from '../../../components/challenge/DetailsItem';
import UserAdditionalInfo from '../../../components/challenge/UserAdditionalInfo';
import LikeContainer from '../../../containers/challenge/Like.container';
import MoreComponent from '../../../components/challenge/More';

import AcceptancesPage from '../../../components/pages/challenge/Acceptances.page';

import {
    getOneMediaPost,
    setScrollDirectionSqueeze,
    unsetScrollDirectionSqueeze,
} from '../../../utils/helper';
import { handlePush } from '../../../utils/history.helper';

import routes from '../../../constants/routes.constant';

class ChallengePage extends Component {
    componentDidMount() {
        setScrollDirectionSqueeze();
    }

    componentWillUnmount() {
        unsetScrollDirectionSqueeze();
    }

    render() {
        const {
            api,
            user,
            challenge,
            isDelete,
            acceptances,
            categories,
            handleGetAcceptances,
            handleSetHandleBack,
        } = this.props;

        if (_isEmpty(challenge)) {
            return null;
        }

        if (challenge.type !== 'challenge') {
            return handlePush({ pathname: routes.main.notfound() });
        }

        const postUrl = `${window.location.origin}/challenge/${challenge.id}`;

        return (
            <div className="challenge">
                <MetaTags>
                    <meta property="og:url" content={postUrl} />
                    <meta property="og:title" content={challenge.title} />
                    <meta property="og:description" content={challenge.description} />
                    <meta property="og:image" content={getOneMediaPost(challenge).thumbnail.url} />
                </MetaTags>

                <div className="challenge-slide">
                    <div className="challenge-slide__img-wrap">
                        <img
                          className="challenge-slide__img"
                          src={getOneMediaPost(challenge).thumbnail.url}
                          alt={challenge.title}
                        />
                    </div>
                    <UserAdditionalInfo user={user} categories={categories} item={challenge} />
                    <ul className="info-bar-details">
                        <li className="info-bar-details__like">
                            <LikeContainer item={challenge} type="details" />
                        </li>
                        <li className="info-bar-details__comments">
                            <i className="icons comments" />
                            {challenge.comments_count}
                        </li>
                        <li className="info-bar-details__challenges">
                            <i className="icons challenges" />
                            {challenge.accepted_count}
                        </li>
                        <li className="info-bar-details__more">
                            <MoreComponent
                              user={user}
                              challenge={challenge}
                              type="challenge"
                              isDelete={isDelete}
                              handleRemove={ChallengeDetailsComponent.handleCustomeRemove}
                            />
                        </li>
                    </ul>

                </div>
                <ChallengeDetailsComponent
                  api={api}
                  user={user}
                  challenge={challenge}
                  categories={categories}
                  handleSetHandleBack={handleSetHandleBack}
                />
                <AcceptancesPage
                  user={user}
                  item={challenge}
                  acceptances={acceptances}
                  handleGetAcceptances={handleGetAcceptances}
                />
            </div>
        );
    }
}
ChallengePage.defaultProps = {
    api: {},
    user: {},
    categories: [],
    challenge: {},
    acceptances: [],
};

ChallengePage.propTypes = {
    api: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    challenge: PropTypes.object.isRequired,
    acceptances: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleGetAcceptances: PropTypes.func.isRequired,
    handleSetHandleBack: PropTypes.func.isRequired,
    isDelete: PropTypes.bool.isRequired,
};

export default ChallengePage;
