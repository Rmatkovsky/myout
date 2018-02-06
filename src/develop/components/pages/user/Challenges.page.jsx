import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MenuComponent from '../../common/Menu';
import ChallengeComponent from '../../challenge/ViewItem';
import FilterComponent from '../../challenge/Filter';
import FilterByTypeComponent from '../../challenge/FilterByType';
import AttentionComponent from '../../common/Attention';

class ChallengesPage extends Component {
    constructor() {
        super();

        this.state = {
            removeChallenges: [],
        };
    }

    handleRemoveChallenge(id) {
        const { removeChallenges } = this.state;
        removeChallenges.push(id);
    }

    render() {
        const {
            user,
            challenges,
            categories,
            filterChallenges,
            sort,
            filter,
            handleSelectFilter,
            handleSelectMediaFilter,
        } = this.props;
        const { removeChallenges } = this.state;

        return (
            <div className="main-container">
                <MenuComponent categories={categories} />
                <div className="right-container">
                    <div className="post-filter__wrap m-dropdown">
                        <FilterComponent
                          filters={filterChallenges}
                          activeFilter={sort}
                          handleSelectFilter={handleSelectFilter}
                        />
                        <FilterByTypeComponent setFilter={handleSelectMediaFilter} filter={filter} />
                    </div>
                    {
                        challenges.map(challenge => (
                            removeChallenges.indexOf(challenge.id) === -1 ?
                                <ChallengeComponent
                                  user={user}
                                  key={JSON.stringify(challenge)}
                                  item={challenge}
                                  categories={categories}
                                  handleRemove={this.handleRemoveChallenge.bind(this, challenge.id)}
                                />
                            : null
                        ))
                    }
                    {
                        !challenges.length
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
ChallengesPage.defaultProps = {
    challenges: [],
    categories: [],
    filterChallenges: [],
};

ChallengesPage.propTypes = {
    user: PropTypes.object.isRequired,
    sort: PropTypes.string.isRequired,
    filter: PropTypes.string.isRequired,
    filterChallenges: PropTypes.arrayOf(PropTypes.object).isRequired,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    challenges: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleSelectFilter: PropTypes.func.isRequired,
    handleSelectMediaFilter: PropTypes.func.isRequired,
};

export default ChallengesPage;
