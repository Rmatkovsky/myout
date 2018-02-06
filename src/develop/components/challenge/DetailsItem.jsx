import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';
import _isEmpty from 'lodash/isEmpty';
import { NavLink } from 'react-router-dom';

import LikeContainer from '../../containers/challenge/Like.container';

import ChallengeCommentComponent from '../../components/challenge/Comment';
import UserAdditionalInfo from '../../components/challenge/UserAdditionalInfo';
import MediaPreviewComponent from '../../components/challenge/MediaPreview';
import MoreComponent from '../../components/challenge/More';

import AddCommentContainer from '../../containers/challenge/AddComment.container';

import { handleBack, handlePush, handleReplace } from '../../utils/history.helper';

import routes from '../../constants/routes.constant';

class ChallengeDetailsComponent extends Component {
    static handleCustomeRemove() {
        handleReplace({ pathname: routes.challenges.all() });
    }

    constructor(props) {
        super(props);

        this.state = {
            expand: true,
            deleteComments: [],
            commentContainerFocus: false,
        };

        this.handleExpand = this.handleExpand.bind(this);
        this.handleBackToCategory = this.handleBackToCategory.bind(this);
        this.handleDeleteComment = this.handleDeleteComment.bind(this);
        this.handleSetFocus = this.handleSetFocus.bind(this);
    }

    componentDidUpdate(prevProps) {
        const { challenge } = this.props;

        if (_isEmpty(challenge) || _isEmpty(prevProps.challenge)) {
            return null;
        }
        if (challenge.comments.length !== prevProps.challenge.comments.length) {
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
            user,
            handleSetHandleBack,
        } = this.props;

        if (_isEmpty(user)) {
            return handlePush({ pathname: routes.auth.login() });
        }

        handleSetHandleBack();
        return handleBack();
    }

    handleExpand() {
        this.setState({ expand: !this.state.expand });
    }

    handleDeleteComment(id) {
        this.state.deleteComments.push(id);
    }

    render() {
        const {
            user,
            categories,
            challenge,
        } = this.props;
        const { expand, deleteComments, commentContainerFocus } = this.state;
        const isDelete = user.id === challenge.user.id;

        if (_isEmpty(challenge)) {
            return null;
        }

        const classNameExpand = cl('expand', {
            hide: challenge.description.length < 226 || expand,
        });
        const classNameDescription = cl('description', {
            collapse: challenge.description.length > 226 && !expand,
        });

        return (
            <div className="post-details item">
                <div className="close" onClick={this.handleBackToCategory} />
                <div className="info">
                    <UserAdditionalInfo categories={categories} item={challenge} />
                    <div className="title">
                        <NavLink to={routes.challenge.id(challenge.id)}>{challenge.title}</NavLink>
                    </div>
                    <div className={classNameDescription}>
                        {challenge.description}
                    </div>
                    <div className={classNameExpand} onClick={this.handleExpand}>
                        Expand text...
                    </div>
                    <MediaPreviewComponent item={challenge} />
                </div>
                <div className="comments">
                    <ul className="info-bar-details">
                        <li className="info-bar-details__challenges">
                            <i className="icons challenges" />
                            {challenge.accepted_count}
                        </li>
                        <li className="info-bar-details__comments">
                            <i className="icons comments" />
                            {challenge.comments_count}
                        </li>
                        <li className="info-bar-details__like">
                            <LikeContainer item={challenge} type="details" />
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
                    <div className="comment-items-block">
                        {challenge.comments.map(comment => (
                            (deleteComments.indexOf(comment.id) === -1)
                            ? <ChallengeCommentComponent
                              handleSetFocus={this.handleSetFocus}
                              handleDeleteComment={this.handleDeleteComment}
                              key={comment.id}
                              user={user}
                              item={comment}
                              isDelete={isDelete}
                            />
                            : null
                        ))}
                    </div>
                    <AddCommentContainer
                      setFocus={commentContainerFocus}
                      handleSetFocus={this.handleSetFocus}
                      user={user}
                      item={challenge}
                      type="challenge"
                    />
                </div>
            </div>
        );
    }
}

ChallengeDetailsComponent.contextTypes = {
    handleOpenMenu: PropTypes.func.isRequired,
    closeMenu: PropTypes.bool.isRequired,
};

ChallengeDetailsComponent.propTypes = {
    challenge: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired,
    handleSetHandleBack: PropTypes.func.isRequired,
};

export default ChallengeDetailsComponent;
