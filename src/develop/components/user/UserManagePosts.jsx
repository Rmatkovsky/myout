import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _isNumber from 'lodash/isNumber';
import _isEmpty from 'lodash/isEmpty';
import { Link } from 'react-router-dom';

import FilterComponent from '../challenge/Filter';

import { MODAL_CONFIRM_DELETE } from '../../constants/modals.constant';
import routes from '../../constants/routes.constant';

class UserManagePostsComponent extends Component {
    static renderMedia(item) {
        const isVideo = !_isEmpty(item.video_data);

        return (
            <div className="profile-post__img">
                {
                    isVideo
                        ? <img src={item.video_data.thumbnail.url} alt={item.title} />
                        : <img src={item.photos_data[0].thumbnail.url} alt={item.title} />
                }
            </div>
        );
    }

    constructor() {
        super();

        this.state = {
            checked: [],
            all: false,
            hidden: [],
        };

        this.handleClickItem = this.handleClickItem.bind(this);
        this.handleClickAll = this.handleClickAll.bind(this);
        this.handleDeleteAllPosts = this.handleDeleteAllPosts.bind(this);
        this.handleDeletePosts = this.handleDeletePosts.bind(this);
    }

    handleDeleteAllPosts() {
        const { handleOpenModal } = this.context;
        const { items } = this.props;

        return handleOpenModal(MODAL_CONFIRM_DELETE, {
            handleSubmit: this.handleCallbackDeletePost.bind(this, items.map(item => item.id)),
            text: [
                'Are you sure you want to delete',
                (<br />),
                'these challenges?',
            ],
        });
    }

    handleDeletePosts(id) {
        const { handleOpenModal } = this.context;
        const { checked } = this.state;
        const additionalText = checked.length > 1 ? 'these challenges' : 'this challenge';

        if (_isNumber(id)) {
            return handleOpenModal(MODAL_CONFIRM_DELETE, {
                handleSubmit: this.handleCallbackDeletePost.bind(this, [id]),
                text: [
                    'Are you sure you want to delete',
                    (<br />),
                    `${additionalText}?`,
                ],
            });
        }

        return handleOpenModal(MODAL_CONFIRM_DELETE, {
            handleSubmit: this.handleCallbackDeletePost.bind(this, checked),
            text: [
                'Are you sure you want to delete',
                (<br />),
                `${additionalText}?`,
            ],
        });
    }

    handleCallbackDeletePost(ids) {
        const { handleDeletePosts } = this.props;
        const { hidden, checked } = this.state;

        this.state.hidden = hidden.concat(checked);
        this.state.checked = [];
        handleDeletePosts({ ids });
    }

    handleClickAll(e) {
        const { items } = this.props;
        const { checked } = this.state;

        if (e.target.checked) {
            return items.forEach((item) => {
                if (checked.indexOf(item.id) === -1) {
                    checked.push(item.id);
                }
            });
        }

        return this.setState({ checked: [] });
    }

    handleClickItem(e) {
        const { checked } = this.state;
        const index = checked.indexOf(+e.target.value);

        if (e.target.checked) {
            return checked.push(+e.target.value);
        }

        if (index !== -1) {
            return checked.splice(index, 1);
        }

        return null;
    }

    renderItem(item) {
        const { checked } = this.state;
        return (
            <div className="profile-post__container" key={JSON.stringify(item)}>
                <label>
                    <input
                      className="checkbox-default"
                      type="checkbox"
                      name={`item${item.id}`}
                      value={item.id}
                      checked={checked.indexOf(item.id) !== -1}
                      onClick={this.handleClickItem}
                    />
                    <span className="checkbox-custom" />
                </label>
                <div className="profile-post__item">
                    <Link to={routes.challenge.id(item.id)}>
                        {UserManagePostsComponent.renderMedia(item)}
                        <div className="profile-post__info">
                            <div className="profile-post__title">{item.title}</div>
                            <div className="profile-post__desc">
                                {item.description}
                            </div>
                        </div>
                    </Link>
                </div>
                <button className="delete-btn" onClick={this.handleDeletePosts.bind(this, item.id)}>Delete</button>
            </div>
        );
    }

    render() {
        const {
            user,
            items,
            filters,
            activeFilter,
            handleSelectFilter,
        } = this.props;
        const { checked, hidden } = this.state;
        return (
            <div className="post-manage__wrap">
                <div className="post-filter__wrap m-dropdown">
                    <FilterComponent
                      filters={filters}
                      activeFilter={activeFilter}
                      handleSelectFilter={handleSelectFilter}
                    />
                </div>
                <div className="profile-post__header">
                    <div className="delete-group">
                        {
                            checked.length ? [
                                (<label>
                                    <input
                                      className="checkbox-default"
                                      type="checkbox"
                                      onClick={this.handleClickAll}
                                    />
                                    <span className="checkbox-custom" />
                                </label>),
                                (<button
                                  className="delete-btn"
                                  onClick={this.handleDeletePosts}
                                >
                                    Delete ({ checked.length })
                                </button>),
                            ]
                            : null
                        }
                    </div>
                    {
                        !checked.length ?
                            <button
                              className="delete-all-btn"
                              onClick={this.handleDeleteAllPosts}
                            >
                                Delete all ({ user.posts_count })
                            </button>
                            : null
                    }
                </div>
                {
                    items.map((item) => {
                        if (hidden.indexOf(item.id) === -1) {
                            return this.renderItem(item);
                        }
                        return null;
                    })
                }
            </div>
        );
    }
}

UserManagePostsComponent.contextTypes = {
    handleOpenModal: PropTypes.func.isRequired,
};

UserManagePostsComponent.propTypes = {
    user: PropTypes.object.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleDeletePosts: PropTypes.func.isRequired,
    filters: PropTypes.arrayOf(PropTypes.object).isRequired,
    activeFilter: PropTypes.string.isRequired,
    handleSelectFilter: PropTypes.func.isRequired,
};

export default UserManagePostsComponent;
