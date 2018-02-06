import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';

import AcceptItemComponent from '../../acceptance/AcceptItem';
import UserAdditionalInfo from '../../../components/challenge/UserAdditionalInfo';
import LikeContainer from '../../../containers/challenge/Like.container';
import MoreComponent from '../../../components/challenge/More';

import { handleBack, handlePush } from '../../../utils/history.helper';

import routes from '../../../constants/routes.constant';
import { getOneMediaPost } from '../../../utils/helper';

class AcceptancePage extends Component {
    handleClickClose() {
        const { user } = this.props;

        if (_isEmpty(user)) {
            return handlePush({ pathname: routes.auth.login() });
        }

        return handleBack();
    }

    render() {
        const {
            user,
            acceptance,
            categories,
            item,
        } = this.props;

        if (_isEmpty(item) || _isEmpty(acceptance)) {
            return null;
        }

        const itemUserId = _isEmpty(item.winner) ? item.user.id : item.winner.id;
        const { isDelete } = (!_isEmpty(user)) ? itemUserId === user.id : false;

        return (
            <div className="challenge">
                <div className="challenge-slide squeeze unfix">
                    <div className="close" onClick={this.handleClickClose.bind(this)} />
                    <div className="challenge-slide__img-wrap">
                        <img
                          className="challenge-slide__img"
                          src={getOneMediaPost(item).thumbnail.url}
                          alt={item.title}
                        />
                    </div>
                    <UserAdditionalInfo user={user} categories={categories} item={item} />
                    <ul className="info-bar-details">
                        <li className="info-bar-details__like">
                            <LikeContainer item={item} type="details" />
                        </li>
                        <li className="info-bar-details__comments">
                            <i className="icons comments" />
                            {item.comments_count}
                        </li>
                        <li className="info-bar-details__challenges">
                            <i className="icons challenges" />
                            {item.accepted_count}
                        </li>
                        <li className="info-bar-details__more">
                            <MoreComponent
                              user={user}
                              challenge={item}
                              type="challenge"
                              isDelete={isDelete}
                              handleRemove={handlePush.bind(this, { pathname: routes.challenges.all() })}
                            />
                        </li>
                    </ul>

                </div>
                <div className="acceptances preview">
                    <div className="header-title">
                        <span className="title">Challenge accept</span>
                    </div>
                    <AcceptItemComponent
                      key={acceptance.id}
                      item={acceptance}
                      user={user}
                      type={item.type}
                      handleRemove={() => {}}
                    />
                </div>

            </div>
        );
    }
}
AcceptancePage.defaultProps = {
    api: {},
    user: {},
    categories: [],
    item: {},
    acceptance: {},
};

AcceptancePage.propTypes = {
    user: PropTypes.object.isRequired,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    item: PropTypes.object.isRequired,
    acceptance: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AcceptancePage;
