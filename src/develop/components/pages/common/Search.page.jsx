import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MenuComponent from '../../common/Menu';
import SearchItemComponent from '../../common/SearchItem';
import ChallengeComponent from '../../challenge/ViewItem';
import TrophyItemComponent from '../../trophy/TrophyItem';

import AttentionComponent from '../../../components/common/Attention';
import FilterComponent from '../../challenge/Filter';

class SearchPage extends Component {
    renderItems() {
        const { activeFilter, items, user, categories } = this.props;

        if (activeFilter === 'challenges') {
            return items.map(item => (
                item.type === 'trophy'
                    ? <TrophyItemComponent user={user} item={item} />
                    : <ChallengeComponent user={user} item={item} categories={categories} />
            ));
        }

        return items.map(item => (
            <li>
                <SearchItemComponent item={item} />
            </li>
        ));
    }

    render() {
        const {
            activeFilter,
            items,
            filters,
            handleSelectFilter,
        } = this.props;

        return (
            <div className="main-container">
                <MenuComponent />
                <div className="right-container search-p">
                    <div className="post-filter__wrap">
                        <FilterComponent
                          activeFilter={activeFilter}
                          filters={filters}
                          handleSelectFilter={handleSelectFilter}
                        />
                    </div>
                    <ul className="search__results__list">
                        {this.renderItems()}
                    </ul>
                    {
                        !items.length ?
                            <AttentionComponent
                              text={[
                                  'Sorry, there are no results matching this criteria.',
                                  <br />,
                                  'Please try other options.',
                              ]}
                            />
                            : null
                    }
                </div>
            </div>

        );
    }
}

SearchPage.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    user: PropTypes.object.isRequired,
    activeFilter: PropTypes.string.isRequired,
    filters: PropTypes.arrayOf(PropTypes.object).isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleSelectFilter: PropTypes.func.isRequired,
};

export default SearchPage;

