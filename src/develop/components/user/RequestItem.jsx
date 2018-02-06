import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AvatarComponent from '../../components/challenge/Avatar';

class RequestItemComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            disable: false,
        };
        this.handleClickAccept = this.handleClickAccept.bind(this);
        this.handleClickDecline = this.handleClickDecline.bind(this);
    }

    handleClickAccept(e) {
        const { item, handleAcceptRequest } = this.props;

        e.stopPropagation();
        this.setState({ disable: true });
        handleAcceptRequest(item.id);
    }

    handleClickDecline(e) {
        const { item, handleDeclineRequest } = this.props;

        e.stopPropagation();
        handleDeclineRequest(item.id);
    }

    render() {
        const { disable } = this.state;
        const {
            item,
        } = this.props;
        return (
            <div className="post-notifications__item" key={JSON.stringify(item)}>
                <div className="post-notifications__list">
                    <AvatarComponent
                      classname="post-notifications__author-img"
                      img={item.sender.avatar_data}
                    />
                    <div className="post-notifications__info">
                        <div className="post-notifications__desc">
                            <span className="post-notifications__author-name">{item.sender.name} </span>
                            <span className="some-action">has requested access to your profile</span>
                        </div>
                    </div>
                </div>
                <div className="post-notifications__btns">
                    <button className="follow-btn" onClick={this.handleClickAccept} disabled={disable}>Accept</button>
                    <button className="follow-btn unfollow" onClick={this.handleClickDecline}>Decline</button>
                </div>
            </div>
        );
    }
}

RequestItemComponent.propTypes = {
    item: PropTypes.object.isRequired,
    handleAcceptRequest: PropTypes.func.isRequired,
    handleDeclineRequest: PropTypes.func.isRequired,
};

export default RequestItemComponent;
