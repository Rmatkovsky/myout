import React, { Component } from 'react';

class PostsLikedSettingsPage extends Component {
    render() {
        return (
            <div className="main-container">
                <div className="left-menu">
                    {/* <UserInfoComponent /> */}
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
                    <div className="post-liked__wrap">

                        <div className="profile-post__item">
                            <div className="profile-post__img" />
                            <div className="profile-post__info">
                                <div className="profile-post__title">Hello guys! Can you outdance?</div>
                                <div className="profile-post__desc">
                                    Hi mates! Its a beautiful day and I prepared for you a challenge. Lectus sit,
                                    magna odio sed similique imperdiet adipiscing nibh.
                                </div>
                            </div>
                        </div>
                        <div className="profile-post__item trophy">
                            <div className="profile-post__img" />
                            <div className="profile-post__info">
                                <div className="profile-post__title">Hello guys! Can you outdance?</div>
                                <div className="profile-post__desc">
                                    Hi mates! Its a beautiful day and I prepared for you a challenge. Lectus sit,
                                    magna odio sed similique imperdiet adipiscing nibh.
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default PostsLikedSettingsPage;
