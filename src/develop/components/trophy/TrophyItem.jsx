import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';
import _isEmpty from 'lodash/isEmpty';
import { Link, NavLink } from 'react-router-dom';
import MetaTags from 'react-meta-tags';

import LikeContainer from '../../containers/challenge/Like.container';

import AvatarComponent from '../../components/challenge/Avatar';
import MediaPreviewComponent from '../../components/challenge/MediaPreview';
import MoreComponent from '../../components/challenge/More';

import routes from '../../constants/routes.constant';

import { MODAL_POPUP_PHOTOS } from '../../constants/modals.constant';

import { handlePush } from '../../utils/history.helper';
import { getOneMediaPost } from '../../utils/helper';

class TrophyItemComponent extends Component {
    static handleRedirectDetails(id) {
        handlePush({ pathname: routes.trophy.id(id) });
    }

    constructor(props) {
        super(props);

        this.state = {
            expand: false,
        };

        this.handleExpand = this.handleExpand.bind(this);
        this.handleOpenPrize = this.handleOpenPrize.bind(this);
    }

    handleExpand() {
        this.setState({ expand: !this.state.expand });
    }

    handleOpenPrize() {
        const { item } = this.props;
        const { handleOpenModal } = this.context;

        handleOpenModal(MODAL_POPUP_PHOTOS, { index: 0, photos_data: [item.prize_photo_data], type: 'photo' });
    }

    renderTrophyNoWinner() {
        const { item } = this.props;
        const nameCredit = item.acceptance_cost <= 1 ? 'credit' : 'credits';

        return (
            <div className="trophy-winner">
                <span className="cup-no-winner" />
                <div className="winner-name">
                    {item.acceptance_cost ? `${item.acceptance_cost} ${nameCredit}` : 'Free'}
                </div>
                <div className="additional-info">
                    <span className="time-left">{item.deadline}</span>
                    {item.created_at} | <i className="views_count" />{item.views_count}
                </div>
            </div>
        );
    }

    renderTrophyWinner() {
        const { item } = this.props;

        return (
            <div className="trophy-winner">
                <NavLink to={routes.user.id(item.winner.id)}>
                    <AvatarComponent classname="avatar-round" img={item.winner.avatar_data} />
                    <div className="winner-name">Winner</div>
                </NavLink>
                <div className="additional-info">
                    <span className="time-left" />
                    {item.created_at} | <i className="views_count" />{item.views_count}
                </div>
            </div>
        );
    }

    renderTrophyPrize() {
        const { item } = this.props;
        const classNameImagePrize = cl('prize-img', {
            default: _isEmpty(item.prize_photo_data),
        });
        return (
            <div className="prize">
                <span className={classNameImagePrize}>
                    {
                        !_isEmpty(item.prize_photo_data)
                            ? <img
                              src={item.prize_photo_data.thumbnail.url}
                              alt="prize"
                              onClick={this.handleOpenPrize}
                            />
                            : null
                    }
                </span>
                <span className="title">Prize</span>
                <span className="description">{item.prize}</span>
                <div className="clearfix" />
            </div>
        );
    }

    renderTrophy() {
        const { item } = this.props;
        const { expand } = this.state;
        const classNameExpand = cl('expand', {
            hide: item.description.length < 226 || expand,
        });
        const classNameDescription = cl('description', {
            collapse: item.description.length > 226 && !expand,
        });

        return (
            <div className="activity">
                {!_isEmpty(item.winner) ? this.renderTrophyWinner() : this.renderTrophyNoWinner()}
                <div className="title">
                    <Link to={routes.trophy.id(item.id)}>{item.title}</Link>
                </div>
                <div className={classNameDescription}>
                    {item.description}
                </div>
                <div className={classNameExpand} onClick={this.handleExpand}>
                    Expand text...
                </div>
                {this.renderTrophyPrize()}
            </div>
        );
    }

    render() {
        const {
            user,
            item,
        } = this.props;

        const classNamePost = cl('post-view item', {
            trophy: item.type === 'trophy',
        });
        const postUrl = `${window.location.origin}/trophy/${item.id}`;

        return (
            <div className={classNamePost}>
                <MetaTags>
                    <meta property="og:url" content={postUrl} />
                    <meta property="og:title" content={item.title} />
                    <meta property="og:description" content={item.description} />
                    <meta property="og:image" content={getOneMediaPost(item).thumbnail.url} />
                </MetaTags>

                {this.renderTrophy()}
                <MediaPreviewComponent item={item} />
                <div className="info-bar">
                    <div className="pull-left">
                        <div
                          className="info icons challenges"
                          onClick={TrophyItemComponent.handleRedirectDetails.bind(this, item.id)}
                        >
                            {item.accepted_count}
                        </div>
                    </div>
                    <div className="pull-right">
                        <LikeContainer item={item} type="view" />
                        <div
                          className="info icons comments"
                          onClick={TrophyItemComponent.handleRedirectDetails.bind(this, item.id)}
                        >
                            {item.comments_count}
                        </div>
                        <MoreComponent user={user} challenge={item} type="trophy" />
                    </div>
                </div>
            </div>
        );
    }
}

TrophyItemComponent.contextTypes = {
    handleOpenModal: PropTypes.func.isRequired,
};

TrophyItemComponent.propTypes = {
    user: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
};

export default TrophyItemComponent;
