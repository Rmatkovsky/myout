import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import UserFollowButtonComponent from '../user/UserFollowButton';
import AvatarComponent from '../challenge/Avatar';

import routes from '../../constants/routes.constant';

class UserInfoMobileComponent extends Component {
    render() {
        const { user } = this.props;
        return (
            <div className="m-profile-container">
                <div className="c-profile clearfix">
                    <AvatarComponent img={user.avatar_data} />
                    <div className="c-profile__name tablet">
                        {user.name}
                    </div>
                    <div className="c-profile__group">
                        <div className="c-profile__follow">
                            <NavLink to={routes.user.followers(user.id)}>
                                <div className="c-profile__followers">
                                    {user.followers_count}
                                    <div className="c-profile__follow__desc">followers</div>
                                </div>
                            </NavLink>
                            <NavLink to={routes.user.following(user.id)}>
                                <div className="c-profile__following">
                                    {user.following_count}
                                    <div className="c-profile__follow__desc">following</div>
                                </div>
                            </NavLink>
                        </div>
                        <UserFollowButtonComponent user={user} />
                    </div>
                    <div className="c-profile__name phone">
                        {user.name}
                    </div>
                    <div className="c-profile__status">
                        {user.bio}
                    </div>
                </div>
            </div>
        );
    }
}

UserInfoMobileComponent.propTypes = {
    user: PropTypes.object.isRequired,
};

export default UserInfoMobileComponent;
