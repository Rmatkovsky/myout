import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';
import _isEmpty from 'lodash/isEmpty';

class AvatarComponent extends Component {
    renderImg() {
        const { img } = this.props;
        return (!_isEmpty(img))
            ? <img src={`${img.thumbnail.url}?${new Date().getTime()}`} alt="" />
            : null;
    }

    render() {
        const {
            classname,
            handleClick,
        } = this.props;
        const classNameAvatar = cl({
            [classname]: true,
        });
        return (
            <div
              className={classNameAvatar}
              onClick={handleClick}
            >
                {this.renderImg()}
            </div>

        );
    }
}

AvatarComponent.defaultProps = {
    classname: 'avatar',
    img: {},
    handleClick: () => {},
};

AvatarComponent.propTypes = {
    classname: PropTypes.string.isRequired,
    img: PropTypes.object.isRequired,
    handleClick: PropTypes.func.isRequired,
};

export default AvatarComponent;
