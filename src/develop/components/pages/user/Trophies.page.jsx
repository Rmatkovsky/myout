import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuComponent from '../../common/Menu';

import AttentionComponent from '../../common/Attention';
import TrophyItemComponent from '../../trophy/TrophyItem';
import FilterComponent from '../../challenge/Filter';


class TrophiesPage extends Component {
    render() {
        const {
            user,
            trophy,
            categories,
            filterTrophies,
            activeFilter,
            handleSelectFilter,
        } = this.props;

        return (
            <div className="trophy main-container">
                <MenuComponent />
                <div className="right-container">
                    <div className="post-filter__wrap m-dropdown">
                        <FilterComponent
                          filters={filterTrophies}
                          activeFilter={activeFilter}
                          handleSelectFilter={handleSelectFilter}
                        />
                    </div>
                    {
                        trophy.map(item => (
                            <TrophyItemComponent key={item.id} user={user} item={item} categories={categories} />
                        ))
                    }
                    {
                        !trophy.length
                            ? <AttentionComponent
                              text={[
                                  'Sorry, there are no results matching this criteria.',
                                  <br />,
                                  'Please try other options',
                              ]}
                            />
                            : null
                    }
                </div>
            </div>
        );
    }
}

TrophiesPage.propTypes = {
    user: PropTypes.object.isRequired,
    activeFilter: PropTypes.string.isRequired,
    trophy: PropTypes.arrayOf(PropTypes.object).isRequired,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    filterTrophies: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleSelectFilter: PropTypes.func.isRequired,
};

export default TrophiesPage;
