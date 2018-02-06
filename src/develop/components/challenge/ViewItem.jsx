import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';
import { NavLink } from 'react-router-dom';

import LikeContainer from '../../containers/challenge/Like.container';

import IconCategoriesComponent from '../../components/challenge/IconCategories';
import MediaPreviewComponent from '../../components/challenge/MediaPreview';
import MoreComponent from '../../components/challenge/More';

import routes from '../../constants/routes.constant';

import { handlePush } from '../../utils/history.helper';
import AvatarComponent from './Avatar';

class NewsViewComponent extends Component {
    static handleRedirectDetails(id) {
        handlePush({ pathname: routes.challenge.id(id) });
    }

    constructor(props) {
        super(props);

        this.state = {
            expand: false,
        };

        this.handleExpand = this.handleExpand.bind(this);
    }

    handleExpand() {
        this.setState({ expand: !this.state.expand });
    }

    render() {
        const {
            user,
            item,
            categories,
            handleRemove,
        } = this.props;
        const { expand } = this.state;
        const classNameExpand = cl('expand', {
            hide: item.description.length < 226 || expand,
        });
        const classNameDescription = cl('description', {
            collapse: item.description.length > 226 && !expand,
        });
        const isDelete = user.id === item.user.id;

        return (
            <div className="post-view item" id={item.id}>
                <div className="author-info">
                    <NavLink to={routes.user.id(item.user.id)}>
                        <AvatarComponent classname="avatar" img={item.user.avatar_data} />
                        <div className="name">
                            {item.user.name}
                        </div>
                    </NavLink>
                    <div className="additional">
                        {item.created_at} | <i className="views_count" />{item.views_count}
                        <IconCategoriesComponent categoryId={item.category_id} categories={categories} />
                    </div>
                </div>
                <div className="title">
                    <NavLink to={routes.challenge.id(item.id)}>{item.title}</NavLink>
                </div>
                <div className={classNameDescription}>
                    {item.description}
                </div>
                <div className={classNameExpand} onClick={this.handleExpand}>
                    Expand text...
                </div>
                <MediaPreviewComponent item={item} />
                <div className="info-bar">
                    <div className="pull-left">
                        <div
                          className="info icons challenges"
                          onClick={NewsViewComponent.handleRedirectDetails.bind(this, item.id)}
                        >
                            {item.accepted_count}
                        </div>
                    </div>
                    <div className="pull-right">
                        <LikeContainer item={item} type="view" />
                        <div
                          className="info icons comments"
                          onClick={NewsViewComponent.handleRedirectDetails.bind(this, item.id)}
                        >
                            {item.comments_count}
                        </div>
                        <MoreComponent
                          user={user}
                          challenge={item}
                          type="challenge"
                          isDelete={isDelete}
                          handleRemove={handleRemove}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

NewsViewComponent.propTypes = {
    user: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleRemove: PropTypes.func.isRequired,
};

export default NewsViewComponent;
