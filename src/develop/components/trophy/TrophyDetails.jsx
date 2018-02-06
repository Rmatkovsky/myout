import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';
import _isEmpty from 'lodash/isEmpty';
import { Link, NavLink } from 'react-router-dom';

import LikeContainer from '../../containers/challenge/Like.container';

import ChallengeCommentComponent from '../../components/challenge/Comment';
import MediaPreviewComponent from '../../components/challenge/MediaPreview';
import AvatarComponent from '../../components/challenge/Avatar';
import MoreComponent from '../../components/challenge/More';

import AddCommentContainer from '../../containers/challenge/AddComment.container';

import { handleBack } from '../../utils/history.helper';
import routes from '../../constants/routes.constant';
import { MODAL_POPUP_PHOTOS } from '../../constants/modals.constant';

class TrophyDetailsComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            deleteComments: [],
            commentContainerFocus: false,
        };

        this.handleBackToCategory = this.handleBackToCategory.bind(this);
        this.handleDeleteComment = this.handleDeleteComment.bind(this);
        this.handleSetFocus = this.handleSetFocus.bind(this);
        this.handleOpenPrize = this.handleOpenPrize.bind(this);
    }

    componentDidUpdate(prevProps) {
        const { item } = this.props;

        if (_isEmpty(item) || _isEmpty(prevProps.item)) {
            return null;
        }
        if (item.comments.length !== prevProps.item.comments.length) {
            const commentBlock = document.querySelector('.comment-items-block');
            if (commentBlock) {
                return commentBlock.scroll(0, 10000000);
            }
        }
        return null;
    }

    handleSetFocus(value) {
        this.setState({ commentContainerFocus: value });
    }

    handleBackToCategory() {
        const {
            handleSetHandleBack,
        } = this.props;

        handleSetHandleBack();
        handleBack();
    }

    handleDeleteComment(id) {
        this.state.deleteComments.push(id);
    }

    handleOpenPrize() {
        const { item } = this.props;
        const { handleOpenModal } = this.context;

        handleOpenModal(MODAL_POPUP_PHOTOS, { index: 0, photos_data: [item.prize_photo_data], type: 'photo' });
    }

    renderTrophyNoWinner() {
        const { item } = this.props;

        return (
            <div className="trophy-winner">
                <span className="cup-no-winner" />
                <div className="winner-name">{item.acceptance_cost ? `${item.acceptance_cost} credit` : 'Free'}</div>
                <div className="additional-info">
                    <span className="time-left">{item.deadline} </span>
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
        const classNameDescription = cl('description');

        return (
            <div className="activity">
                {!_isEmpty(item.winner) ? this.renderTrophyWinner() : this.renderTrophyNoWinner()}
                <div className="title">
                    <Link to={routes.trophy.id(item.id)}>{item.title}</Link>
                </div>
                <div className={classNameDescription}>
                    {item.description}
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
        const { deleteComments, commentContainerFocus } = this.state;

        if (_isEmpty(item)) {
            return null;
        }

        return (
            <div className="post-details item trophy">
                <div className="close" onClick={this.handleBackToCategory} />
                <div className="info">
                    {this.renderTrophy()}
                    <MediaPreviewComponent item={item} />
                </div>
                <div className="comments">
                    <ul className="info-bar-details trophy">
                        <li className="info-bar-details__challenges">
                            <i className="icons challenges" />
                            {item.accepted_count}
                        </li>
                        <li className="info-bar-details__comments">
                            <i className="icons comments" />
                            {item.comments_count}
                        </li>
                        <li className="info-bar-details__like">
                            <LikeContainer item={item} type="details" />
                        </li>
                        <li className="info-bar-details__more">
                            <MoreComponent user={user} challenge={item} type="trophy" />
                        </li>
                    </ul>
                    <div className="comment-items-block">
                        {item.comments.map(comment => (
                            (deleteComments.indexOf(comment.id) === -1)
                                ? <ChallengeCommentComponent
                                  handleSetFocus={this.handleSetFocus}
                                  handleDeleteComment={this.handleDeleteComment}
                                  key={comment.id}
                                  user={user}
                                  item={comment}
                                />
                                : null
                        ))}
                    </div>
                    <AddCommentContainer
                      setFocus={commentContainerFocus}
                      handleSetFocus={this.handleSetFocus}
                      user={user}
                      item={item}
                      type="trophy"
                    />
                </div>
            </div>
        );
    }
}

TrophyDetailsComponent.contextTypes = {
    handleOpenMenu: PropTypes.func.isRequired,
    closeMenu: PropTypes.bool.isRequired,
    handleOpenModal: PropTypes.func.isRequired,
};

TrophyDetailsComponent.propTypes = {
    item: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    handleSetHandleBack: PropTypes.func.isRequired,
};

export default TrophyDetailsComponent;
