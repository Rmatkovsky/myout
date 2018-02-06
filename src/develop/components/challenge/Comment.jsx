import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import cl from 'classnames';
import { NavLink } from 'react-router-dom';

import { MODAL_REPORT_POST } from '../../constants/modals.constant';

import AvatarComponent from '../../components/challenge/Avatar';

import LikeContainer from '../../containers/challenge/Like.container';
import DeleteCommentContainer from '../../containers/comment/Delete.container';
import routes from '../../constants/routes.constant';

class ChallengeCommentComponent extends Component {
    constructor() {
        super();

        this.state = {
            openReport: false,
        };

        this.handleCommentClick = this.handleCommentClick.bind(this);
        this.handleOpenReport = this.handleOpenReport.bind(this);
    }

    getUserPathname() {
        const { user, item } = this.props;

        if (_isEmpty(user)) {
            return routes.auth.login();
        }

        return routes.user.id(item.user.id);
    }

    handleOpenReport(e) {
        this.state.openReport = true;
        const { handleOpenMenu } = this.context;

        e.stopPropagation();
        handleOpenMenu();
    }

    handleOpenModalReport(spam = false) {
        const { item } = this.props;
        const { handleOpenModal } = this.context;
        handleOpenModal(MODAL_REPORT_POST, { item, type: 'comment', spam });
    }

    handleCommentClick() {
        const { user, item, handleSetFocus } = this.props;
        if (user.id !== item.user.id) {
            handleSetFocus(`@${item.user.name}, `);
        }
    }

    render() {
        const {
            item,
            user,
            isDelete,
            handleDeleteComment,
        } = this.props;
        const { openReport } = this.state;
        const { closeMenu } = this.context;

        const classNameComment = cl('comment-item', {
            [`comment${item.id}`]: true,
        });
        const classNameReport = cl('more-menu', {
            active: !closeMenu && openReport,
        });

        if (_isEmpty(item)) {
            return null;
        }

        return (
            <div className={classNameComment}>
                <NavLink to={this.getUserPathname()}>
                    <AvatarComponent img={item.user.avatar_data} />
                </NavLink>
                <div className="author-info">
                    <NavLink to={this.getUserPathname()}>
                        <span className="author-name">{item.user.name}</span>
                    </NavLink>
                    <div className="comment-text" onClick={this.handleCommentClick}>
                        {item.text}
                    </div>
                    <div className="comment-info">
                        <div className="date">{item.created_at}</div>
                        <LikeContainer item={item} type="comment" />
                        {
                            user.id !== item.user.id && !_isEmpty(user)
                                ? <div className="reply" onClick={this.handleCommentClick} />
                                : null
                        }
                        <DeleteCommentContainer
                          user={user}
                          item={item}
                          isDelete={isDelete}
                          handleRemoveDOMComment={handleDeleteComment}
                        />
                        {
                            user.id !== item.user.id && !_isEmpty(user)
                                ? <div className="report" onClick={this.handleOpenReport}>
                                    <ul className={classNameReport}>
                                        <li onClick={this.handleOpenModalReport.bind(this, true)}>
                                            It&#39;s spam
                                        </li>
                                        <li onClick={this.handleOpenModalReport.bind(this, false)}>
                                            It&#39;s inappropriate
                                        </li>
                                    </ul>
                                </div>
                                : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}

ChallengeCommentComponent.contextTypes = {
    closeMenu: PropTypes.bool.isRequired,
    handleOpenModal: PropTypes.func.isRequired,
    handleOpenMenu: PropTypes.func.isRequired,
};

ChallengeCommentComponent.defaultProps = {
    item: {},
    isDelete: false,
};

ChallengeCommentComponent.propTypes = {
    user: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    isDelete: PropTypes.bool,
    handleDeleteComment: PropTypes.func.isRequired,
    handleSetFocus: PropTypes.func.isRequired,
};

export default ChallengeCommentComponent;
