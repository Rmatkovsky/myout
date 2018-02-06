import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import UserFollowButtonComponent from './UserFollowButton';
import UserChangeAvatarComponent from './UserChangeAvatar';

import routes from '../../constants/routes.constant';

class UserInfoComponent extends Component {
    render() {
        const { user, currentUser } = this.props;

        return (
            <div className="c-profile">
                {/* <AvatarComponent classname="c-profile__avatar" img={currentUser.avatar_data} /> */}
                <div className="c-profile__avatar">
                    {
                        currentUser.avatar_data
                            ? <img
                              src={`${currentUser.avatar_data.thumbnail.url}?${new Date().getTime()}`}
                              alt={currentUser.name}
                            />
                            : null
                    }
                    {
                        currentUser.id === user.id
                            ? <div className="change-avatar-wrap">
                                <div className="change-avatar" />
                                <UserChangeAvatarComponent />
                            </div>
                            : null
                    }
                </div>
                <div className="c-profile__name">
                    {currentUser.name}
                </div>
                <div className="c-profile__follow">
                    <NavLink to={routes.user.followers(currentUser.id)}>
                        <div className="c-profile__followers">
                            {currentUser.followers_count}
                            <div className="c-profile__follow__desc">followers</div>
                        </div>
                    </NavLink>
                    <NavLink to={routes.user.following(currentUser.id)}>
                        <div className="c-profile__following">
                            {currentUser.following_count}
                            <div className="c-profile__follow__desc">following</div>
                        </div>
                    </NavLink>
                </div>
                <div className="c-profile__status">
                    {currentUser.bio}
                </div>
                <UserFollowButtonComponent user={currentUser} />
            </div>
        );
    }
}
UserInfoComponent.defaultProps = {
    currentUser: {
        avatar_data: {
            thumbnail: {},
        },
    },
};

UserInfoComponent.propTypes = {
    user: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
};

export default UserInfoComponent;
