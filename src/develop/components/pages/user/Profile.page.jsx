import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AvatarComponent from '../../challenge/Avatar';

import UserInfoComponent from '../../user/UserInfo';

class ProfilePage extends Component {
    render() {
        const { user } = this.props;
        return (
            <div className="main-container">
                <div className="left-menu">
                    <UserInfoComponent user={user} />
                    <div className="user-profile__menu">
                        <ul>
                            <li>
                                <a className="user-profile__item">
                                    <i className="icon-settings" />
                                    Settings
                                </a>
                            </li>
                            <li>
                                <a className="user-profile__item active">
                                    <i className="icon-notifications" />
                                    Notifications
                                </a>
                            </li>
                            <li>
                                <a className="user-profile__item">
                                    <i className="icon-credits" />
                                    Credits
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="right-container">
                    <div className="m-profile-container">
                        <div className="c-profile clearfix">
                            <AvatarComponent classname="c-profile__avatar" img={user.avatar_data} />
                            <div className="c-profile__name tablet">
                                John Doe
                            </div>
                            <div className="c-profile__group">
                                <div className="c-profile__follow">
                                    <div className="c-profile__followers">
                                        54
                                        <div className="c-profile__follow__desc">followers</div>
                                    </div>
                                    <div className="c-profile__following">
                                        99
                                        <div className="c-profile__follow__desc">following</div>
                                    </div>
                                </div>
                                <button className="c-profile__follow-btn">Follow</button>
                            </div>
                            <div className="c-profile__name phone">
                                John Doe
                            </div>
                            <div className="c-profile__status">
                                Hi mates! I’m artist from London.
                                Love music and extreme games!
                                Hi mates! I’m artist from London.
                                Love music and extreme games!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ProfilePage.propTypes = {
    user: PropTypes.object.isRequired,
};

export default ProfilePage;
