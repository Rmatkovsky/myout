import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuComponent from '../../common/Menu';

import AttentionComponent from '../../common/Attention';
import NewsViewComponent from '../../news/NewsItem';

class NewsPage extends Component {
    render() {
        const {
            user,
            news,
            categories,
        } = this.props;

        return (
            <div className="news main-container">
                <MenuComponent />
                <div className="right-container">
                    {
                        news.map(item => (
                            <NewsViewComponent user={user} item={item} categories={categories} />
                        ))
                    }
                    {
                        !news.length
                            ? <AttentionComponent
                              text={[
                                  'You don\'t follow anyone, please follow',
                                  <br />,
                                  'to be aware about them here',
                              ]}
                            />
                            : null
                    }
                </div>
            </div>
        );
    }
}

NewsPage.propTypes = {
    user: PropTypes.object.isRequired,
    news: PropTypes.arrayOf(PropTypes.object).isRequired,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NewsPage;
