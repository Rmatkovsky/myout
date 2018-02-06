import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import _isEmpty from 'lodash/isEmpty';

import AvatarComponent from './Avatar';
import IconCategoriesComponent from './IconCategories';
import routes from '../../constants/routes.constant';

class UserAdditionalInfo extends Component {
    getUserPathname() {
        const { user, item } = this.props;

        if (_isEmpty(user)) {
            return routes.auth.login();
        }

        const userId = _isEmpty(item.winner) ? item.user.id : item.winner.id;

        return routes.user.id(userId);
    }

    render() {
        const { item, categories } = this.props;

        return (
            <div className="author-info">
                <NavLink to={this.getUserPathname()}>
                    <AvatarComponent
                      img={_isEmpty(item.winner) ? item.user.avatar_data : item.winner.avatar_data}
                      classname="avatar"
                    />
                    <div className="name">
                        {_isEmpty(item.winner) ? item.user.name : item.winner.name}
                    </div>
                </NavLink>
                <div className="additional relative">
                    {item.created_at} | <i className="views_count" />{item.views_count}
                    <IconCategoriesComponent categoryId={item.category_id} categories={categories} />
                </div>
            </div>
        );
    }
}

UserAdditionalInfo.propTypes = {
    user: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default UserAdditionalInfo;
