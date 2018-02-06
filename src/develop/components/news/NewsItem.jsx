import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';
import { NavLink } from 'react-router-dom';
import _isEmpty from 'lodash/isEmpty';

import LikeContainer from '../../containers/challenge/Like.container';

import AvatarComponent from '../../components/challenge/Avatar';
import IconCategoriesComponent from '../../components/challenge/IconCategories';
import MediaPreviewComponent from '../../components/challenge/MediaPreview';
import MoreComponent from '../../components/challenge/More';

import routes from '../../constants/routes.constant';

import { MODAL_POPUP_PHOTOS } from '../../constants/modals.constant';

import { handlePush } from '../../utils/history.helper';

class ChallengeViewComponent extends Component {
    static getLinkPost(item) {
        switch (item.type) {
            case 'challenge': return routes.challenge.id(item.id);
            case 'trophy': return routes.trophy.id(item.id);
            default: return item.initial_post.type === 'challenge'
                ? routes.challenge.id(item.initial_post.id)
                : routes.trophy.id(item.initial_post.id);
        }
    }

    static makeWording(text, values) {
        const splittedText = text.split('?');
        const formattedText = [];
        splittedText.forEach((st, k) => {
            formattedText.push(st);
            if (values[k]) {
                const {
                    id,
                    name,
                } = values[k];
                formattedText.push((<NavLink to={routes.user.userProfile(id)} className="name">{name}</NavLink>));
            }
        });
        return formattedText;
    }

    constructor(props) {
        super(props);

        this.state = {
            expand: false,
        };

        this.handleExpand = this.handleExpand.bind(this);
        this.handleOpenPrize = this.handleOpenPrize.bind(this);
    }

    handleOpenPrize() {
        const { item } = this.props;
        const { handleOpenModal } = this.context;

        handleOpenModal(MODAL_POPUP_PHOTOS, { index: 0, photos_data: [item.prize_photo_data], type: 'photo' });
    }

    handleExpand() {
        this.setState({ expand: !this.state.expand });
    }

    handleRedirectDetails(id) {
        const { item } = this.props;
        if (item.type === 'trophy') {
            return handlePush({ pathname: routes.trophy.id(id) });
        } else if (item.type === 'challenge') {
            return handlePush({ pathname: routes.challenge.id(id) });
        }
        return handlePush({ pathname: routes.acceptance.id(id) });
    }

    renderChallenge() {
        const { item, categories } = this.props;
        const { expand } = this.state;
        const classNameExpand = cl('expand', {
            hide: item.description.length < 226 || expand,
        });
        const classNameDescription = cl('description', {
            collapse: item.description.length > 226 && !expand,
        });
        const classNameActivity = cl({
            activity: item.wording,
        });
        return (
            <div className={classNameActivity}>
                {
                    item.wording ?
                        <div className="position info">
                            {
                                ChallengeViewComponent.makeWording(item.wording, item.wording_users)
                            }
                        </div>
                        : null
                }
                {
                    item.wording ? <span className="time">{item.time}</span> : null
                }
                <div className="author-info">
                    <NavLink to={routes.user.id(item.user.id)}>
                        <AvatarComponent classname="avatar" img={item.user.avatar_data} />
                        <div className="name">
                            {item.user.name}
                        </div>
                    </NavLink>
                    <div className="additional">
                        {item.created_at} | <i className="views_count" />{item.views_count}
                        <IconCategoriesComponent categoryId={item.category_id} categories={categories} />
                    </div>
                </div>
                <div className="title">
                    <NavLink to={ChallengeViewComponent.getLinkPost(item)}>{item.title}</NavLink>
                </div>
                <div className={classNameDescription}>
                    {item.description}
                </div>
                <div className={classNameExpand} onClick={this.handleExpand}>
                    Expand text...
                </div>
            </div>
        );
    }

    renderAccept() {
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
                <div className="position-acceptance info">
                    <NavLink to={routes.user.id(item.user.id)}>
                        <AvatarComponent img={item.wording_users[0].avatar_data} classname="avatar" />
                    </NavLink>
                    {
                        ChallengeViewComponent.makeWording(item.wording, item.wording_users)
                    }
                    &nbsp;
                    <NavLink to={ChallengeViewComponent.getLinkPost(item)} className="title">{item.title}</NavLink>
                </div>
                <span className="time">{item.time}</span>
                <div className={classNameDescription}>
                    {item.description}
                </div>
                <div className={classNameExpand} onClick={this.handleExpand}>
                    Expand text...
                </div>
            </div>
        );
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
                    <div className="winner-name">{item.winner.name}</div>
                </NavLink>
                <div className="additional-info">
                    <span className="time-left">{item.deadline}</span>
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
                <div className="position-acceptance info">
                    {
                        ChallengeViewComponent.makeWording(item.wording, item.wording_users)
                    }
                </div>
                <span className="time">{item.time}</span>
                {!_isEmpty(item.winner) ? this.renderTrophyWinner() : this.renderTrophyNoWinner()}
                <div className="title">
                    <NavLink to={routes.trophy.id(item.id)}>{item.title}</NavLink>
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

    renderTopHeader() {
        const { item } = this.props;

        switch (item.type) {
            case 'challenge': return this.renderChallenge();
            case 'trophy': return this.renderTrophy();
            default: return this.renderAccept();
        }
    }

    renderInfoBarAcceptance() {
        const {
            user,
            item,
        } = this.props;
        const isDelete = user.id === item.user.id;

        return (
            <div className="info-bar acceptance">
                <div className="pull-left" />
                <div className="pull-right">
                    <LikeContainer item={item} type="view" />
                    <div
                      className="info icons comments"
                      onClick={this.handleRedirectDetails.bind(this, item.id)}
                    >
                        {item.comments_count}
                    </div>
                    {<MoreComponent user={user} challenge={item} type="acceptance" isDelete={isDelete} />}
                </div>
            </div>
        );
    }

    renderInfoBar() {
        const {
            user,
            item,
        } = this.props;
        const isDelete = user.id === item.user.id;

        return (
            <div className="info-bar">
                <div className="pull-left">
                    <div
                      className="info icons challenges"
                      onClick={this.handleRedirectDetails.bind(this, item.id)}
                    >
                        {item.accepted_count}
                    </div>
                </div>
                <div className="pull-right">
                    <LikeContainer item={item} type="view" />
                    <div
                      className="info icons comments"
                      onClick={this.handleRedirectDetails.bind(this, item.id)}
                    >
                        {item.comments_count}
                    </div>
                    <MoreComponent user={user} challenge={item} type="challenge" isDelete={isDelete} />
                </div>
            </div>
        );
    }

    render() {
        const {
            item,
        } = this.props;
        const isAcceptance = !item.type;

        const classNamePost = cl('post-view item', {
            trophy: item.type === 'trophy',
        });

        return (
            <div className={classNamePost}>
                {this.renderTopHeader()}
                <MediaPreviewComponent item={item} />
                {isAcceptance ? this.renderInfoBarAcceptance() : this.renderInfoBar()}
            </div>
        );
    }
}

ChallengeViewComponent.contextTypes = {
    handleOpenModal: PropTypes.func.isRequired,
};

ChallengeViewComponent.propTypes = {
    user: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ChallengeViewComponent;
