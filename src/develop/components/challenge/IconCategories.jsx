import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _findIndex from 'lodash/findIndex';
import cl from 'classnames';
import _isEmpty from 'lodash/isEmpty';

class IconCategoriesComponent extends Component {
    render() {
        const {
            categories,
            categoryId,
        } = this.props;

        if (_isEmpty(categories) || !categoryId) {
            return null;
        }

        const categoryIndex = _findIndex(categories, item => item.id === categoryId);
        const classNameCategory = cl('category-icons', {
            [categories[categoryIndex].name.toLowerCase()]: true,
        });

        return (
            <i className={classNameCategory} />
        );
    }
}

IconCategoriesComponent.propTypes = {
    categoryId: PropTypes.number.isRequired,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default IconCategoriesComponent;
