import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';
import _isEmpty from 'lodash/isEmpty';
import { NavLink } from 'react-router-dom';
import MetaTags from 'react-meta-tags';

import LikeContainer from '../../containers/challenge/Like.container';

import routes from '../../constants/routes.constant';

import ChallengeCommentComponent from '../../components/challenge/Comment';
import AvatarComponent from '../../components/challenge/Avatar';
import MediaPreviewComponent from '../../components/challenge/MediaPreview';
import MoreComponent from '../../components/challenge/More';

import AddCommentContainer from '../../containers/challenge/AddComment.container';
import { getOneMediaPost } from '../../utils/helper';

class AcceptItemComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expand: true,
            deleteComments: [],
            commentContainerFocus: false,
        };

        this.handleExpand = this.handleExpand.bind(this);
        this.handleDeleteComment = this.handleDeleteComment.bind(this);
        this.handleSetFocus = this.handleSetFocus.bind(this);
    }

    componentDidUpdate(prevProps) {
        const { item } = this.props;

        if (item.comments.length !== prevProps.item.comments.length) {
            const commentBlock = document.querySelector(`.post${item.id} .comment-items-block`);
            if (commentBlock) {
                commentBlock.scroll(0, 10000000);
            }
        }
    }

    getUserPathname() {
        const { user, item } = this.props;

        if (_isEmpty(user)) {
            return routes.auth.login();
        }

        return routes.user.id(item.user.id);
    }

    handleSetFocus(value) {
        this.setState({ commentContainerFocus: value });
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
            item,
            type,
            isDelete,
            handleRemove,
        } = this.props;
        const { expand, deleteComments, commentContainerFocus } = this.state;

        if (_isEmpty(item)) {
            return null;
        }

        const classNameAcceptance = cl('acceptance post-details item', {
            [`post${item.id}`]: true,
        });

        const classNameExpand = cl('expand', {
            hide: item.description.length < 226 || expand,
        });
        const classNameDescription = cl('description', {
            collapse: item.description.length > 226 && !expand,
        });
        const postUrl = `${window.location.origin}/acceptance/${item.id}`;
        const isDeleteComment = item.user.id === user.id;

        return (
            <div className={classNameAcceptance}>
                <MetaTags>
                    <meta property="og:url" content={postUrl} />
                    <meta property="og:title" content={item.title} />
                    <meta property="og:description" content={item.description} />
                    <meta property="og:image" content={getOneMediaPost(item).thumbnail.url} />
                </MetaTags>

                <div className="info">
                    <div className="author-info">
                        <NavLink to={this.getUserPathname()}>
                            <AvatarComponent img={item.user.avatar_data} classname="avatar" />
                            <div className="name">
                                {item.user.name}
                            </div>
                        </NavLink>
                        <div className="additional">
                            {item.created_at} | <i className="views_count" />{item.views_count}
                        </div>
                    </div>
                    <div className={classNameDescription}>
                        {item.description}
                    </div>
                    <div className={classNameExpand} onClick={this.handleExpand}>
                        Expand text...
                    </div>
                    <MediaPreviewComponent item={item} />
                </div>
                <div className="comments">
                    <ul className="info-bar-details">
                        <li className="info-bar-details__like">
                            <LikeContainer item={item} type="details" />
                        </li>
                        <li className="info-bar-details__comments">
                            <i className="icons comments" />
                            {item.comments_count}
                        </li>
                        <li className="info-bar-details__more">
                            <MoreComponent
                              user={user}
                              challenge={item}
                              type="acceptance"
                              isDelete={isDelete}
                              handleRemove={handleRemove}
                            />
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
                                  isDelete={isDeleteComment}
                                  item={comment}
                                />
                                : null
                        ))}
                    </div>
                    <AddCommentContainer
                      handleChangeCommentsCount={() => {}}
                      setFocus={commentContainerFocus}
                      handleSetFocus={this.handleSetFocus}
                      user={user}
                      item={item}
                      type={type}
                    />
                </div>
            </div>
        );
    }
}

AcceptItemComponent.propTypes = {
    type: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    isDelete: PropTypes.bool.isRequired,
    handleRemove: PropTypes.func.isRequired,
};

export default AcceptItemComponent;
