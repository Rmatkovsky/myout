import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { handlePush } from '../../utils/history.helper';

import UserFollowButtonComponent from '../user/UserFollowButton';
import AvatarComponent from '../../components/challenge/Avatar';

import routes from '../../constants/routes.constant';

class SearchItemComponent extends Component {
    handleClickNav() {
        const { item } = this.props;
        const { handleCloseMenu } = this.context;

        handleCloseMenu();
        handlePush({ pathname: routes.user.userProfile(item.id) });
    }
    render() {
        const { item } = this.props;
        return (
            <div className="c-search__item">
                <div className="c-search__item__user">
                    <a onClick={this.handleClickNav.bind(this)}>
                        <AvatarComponent img={item.avatar_data} />
                    </a>
                    <div className="c-search__item__name">
                        <a onClick={this.handleClickNav.bind(this)}>{item.name}</a>
                    </div>
                    <div className="c-search__item__additional">
                        {item.followers_count} Followers | {item.posts_count} Challenges
                    </div>
                </div>
                <UserFollowButtonComponent user={item} />
            </div>
        );
    }
}

SearchItemComponent.contextTypes = {
    handleCloseMenu: PropTypes.func.isRequired,
};

SearchItemComponent.propTypes = {
    item: PropTypes.object.isRequired,
};

export default SearchItemComponent;
