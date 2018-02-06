import React, { Component } from 'react';
import UserInfoComponent from '../../user/UserInfo';
// import SearchItemComponent from '../../common/SearchItem';

class SearchFollowPage extends Component {
    render() {
        return (
            <div className="main-container">
                <div className="left-menu">
                    <UserInfoComponent />
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
                            <div className="c-profile__avatar">
                                <img src="https://outdoo-app-main.s3.amazonaws.com/uploads/user/avatar/13/thumbnail_1508255494.jpg" alt="" />
                            </div>
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

                    <ul className="search__results__list">
                        <li>
                            {/* <SearchItemComponent /> */}
                        </li>
                        <li>
                            {/* <SearchItemComponent /> */}
                        </li>
                        <li>
                            {/* <SearchItemComponent /> */}
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default SearchFollowPage;
