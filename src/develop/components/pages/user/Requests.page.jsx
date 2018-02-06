import React, { Component } from 'react';

class RequestsPage extends Component {
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
                    <div className="post-notifications__wrap">

                        <div className="post-notifications__item">
                            <div className="post-notifications__list">
                                <div className="post-notifications__author-img">
                                    <img src="https://outdoo-app-main.s3.amazonaws.com/uploads/user/avatar/96/thumbnail_1505301397.jpg" alt="" />
                                </div>
                                <div className="post-notifications__info">
                                    <div className="post-notifications__desc">
                                        <span className="post-notifications__author-name">Bob </span>
                                        <span className="some-action">has requested access to your profile</span>
                                    </div>
                                </div>
                            </div>
                            <div className="post-notifications__btns">
                                <button className="follow-btn">Accept</button>
                                <button className="follow-btn unfollow">Decline</button>
                            </div>
                        </div>
                        <div className="post-notifications__item">
                            <div className="post-notifications__list">
                                <div className="post-notifications__author-img">
                                    <img src="https://outdoo-app-main.s3.amazonaws.com/uploads/user/avatar/96/thumbnail_1505301397.jpg" alt="" />
                                </div>
                                <div className="post-notifications__info">
                                    <div className="post-notifications__desc">
                                        <span className="post-notifications__author-name">Bob </span>
                                        <span className="some-action">has requested access to your profile</span>
                                    </div>
                                </div>
                            </div>
                            <div className="post-notifications__btns">
                                <button className="follow-btn">Accept</button>
                                <button className="follow-btn unfollow">Decline</button>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        );
    }
}

export default RequestsPage;
