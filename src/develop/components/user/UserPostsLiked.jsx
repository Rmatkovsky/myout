import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';
import { NavLink } from 'react-router-dom';

import FilterComponent from '../challenge/Filter';

import routes from '../../constants/routes.constant';

class UserPostsLikedComponent extends Component {
    static renderMedia(item) {
        const isVideo = item.video_data;

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

    render() {
        const {
            items,
            filters,
            activeFilter,
            handleSelectFilter,
        } = this.props;
        return (
            <div className="post-liked__wrap">
                <div className="post-filter__wrap m-dropdown">
                    <FilterComponent
                      filters={filters}
                      activeFilter={activeFilter}
                      handleSelectFilter={handleSelectFilter}
                    />
                </div>
                {
                    items.map((item) => {
                        const classNameItem = cl('profile-post__item', {
                            trophy: item.type === 'trophy',
                        });
                        return (
                            <div className={classNameItem}>
                                <NavLink
                                  to={
                                    item.type === 'trophy'
                                        ? routes.trophy.id(item.id) : routes.challenge.id(item.id)
                                  }
                                >
                                    {UserPostsLikedComponent.renderMedia(item)}
                                </NavLink>
                                <div className="profile-post__info">
                                    <div className="profile-post__title">
                                        <NavLink
                                          to={
                                            item.type === 'trophy'
                                             ? routes.trophy.id(item.id) : routes.challenge.id(item.id)
                                          }
                                        >{item.title}</NavLink>
                                    </div>
                                    <div className="profile-post__desc">
                                        {item.description}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>);
    }
}
UserPostsLikedComponent.defaultProps = {
    items: [],
};

UserPostsLikedComponent.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    filters: PropTypes.arrayOf(PropTypes.object).isRequired,
    activeFilter: PropTypes.string.isRequired,
    handleSelectFilter: PropTypes.func.isRequired,
};

export default UserPostsLikedComponent;
