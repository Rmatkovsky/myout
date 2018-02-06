import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import _isEmpty from 'lodash/isEmpty';

import AvatarComponent from '../../components/challenge/Avatar';

import routes from '../../constants/routes.constant';

class NotificationItemComponent extends Component {
    static makeWording(text, values) {
        const splittedText = text.split('?');
        const formattedText = [];
        splittedText.forEach((st, k) => {
            formattedText.push(st);
            if (values[k]) {
                const {
                    id,
                    name,
                } = values[k];
                formattedText.push(
                    (
                        <NavLink
                          to={routes.user.userProfile(id)}
                          className="post-notifications__author-name"
                        >
                            {name}
                        </NavLink>
                    ),
                );
            }
        });
        return formattedText;
    }

    renderDefault() {
        const { item } = this.props;

        return (
            <div className="post-notifications__item">
                <div className="post-notifications__list">
                    <AvatarComponent classname="post-notifications__author-img" img={item.users[0].avatar_data} />
                    <div className="post-notifications__info">
                        <div className="post-notifications__desc">
                            <span className="some-action">
                                {NotificationItemComponent.makeWording(item.wording, item.users)}
                            </span>
                            <div className="post-notifications__events-list">
                                <ul>
                                    {
                                        item.posts.map(() => (
                                            <li>
                                                <a>
                                                    <img src="https://outdoo-app-main.s3.amazonaws.com/uploads/user/avatar/225/thumbnail_18447141_10213624415104525_6243066035151518389_n.jpg" alt="" />
                                                </a>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderFollowing() {
        const { item } = this.props;

        return (
            <div className="post-notifications__item" key={JSON.stringify(item)}>
                <div className="post-notifications__list">
                    <AvatarComponent classname="post-notifications__author-img" img={item.users[0].avatar_data} />
                    <div className="post-notifications__info">
                        <span className="some-action">
                            {NotificationItemComponent.makeWording(item.wording, item.users)}
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    renderInvite() {
        const { item } = this.props;

        return (
            <div className="post-notifications__item">
                <div className="post-notifications__list">
                    <AvatarComponent classname="post-notifications__author-img" img={item.users[0].avatar_data} />
                    <div className="post-notifications__info">
                        <span className="some-action">
                            {NotificationItemComponent.makeWording(item.wording, item.users)}
                        </span>
                    </div>
                </div>
                <div className="accept-warning">To accept please use your mobile app</div>
            </div>
        );
    }

    renderTrophy() {
        const { item } = this.props;

        return (
            <div className="post-notifications__item trophy">
                <div className="post-notifications__list">
                    <div className="post-notifications__author-img" />
                    <div className="post-notifications__info">
                        Hi mates! Its a beautiful day and I prepared for you a challenge. Lectus sit
                    </div>
                    <div className="post-notifications__event-img">
                        <a>
                            <img src="https://outdoo-app-main.s3.amazonaws.com/uploads/user/avatar/102/thumbnail_15032782_1331818076852779_590932832668122753_n.jpg" alt="" />
                        </a>
                    </div>
                    {item.time}
                </div>
            </div>
        );
    }

    renderComment() {
        const { item } = this.props;

        return (
            <div className="post-notifications__item" key={JSON.stringify(item)}>
                <div className="post-notifications__list">
                    <AvatarComponent classname="post-notifications__author-img" img={item.users[0].avatar_data} />
                    <div className="post-notifications__info">
                        <span className="some-action">
                            {NotificationItemComponent.makeWording(item.wording, item.users)}:&nbsp;
                        </span>
                        {item.comment_text}
                        <div className="post-notifications__data">{item.time}</div>
                    </div>
                    <div className="post-notifications__event-img">
                        <a>
                            <img src="https://outdoo-app-main.s3.amazonaws.com/uploads/user/avatar/102/thumbnail_15032782_1331818076852779_590932832668122753_n.jpg" alt="" />
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const { item } = this.props;

        if (_isEmpty(item)) {
            return null;
        }

        if (item.followed_users.length !== 0) {
            return this.renderFollowing();
        }

        if (item.comment_text) {
            return this.renderComment();
        }

        if (item.post_won) {
            return this.renderTrophy();
        }

        if (item.acceptance_request_created) {
            return this.renderInvite();
        }

        return this.renderDefault();
    }
}

NotificationItemComponent.propTypes = {
    item: PropTypes.object.isRequired,
};

export default NotificationItemComponent;
