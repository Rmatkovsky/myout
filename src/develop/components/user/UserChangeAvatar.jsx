import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateUserWithoutRedirect } from '../../actions/user.actions';

import { getOrientation, resetOrientation } from '../../utils/helper';

class UserChangeAvatarComponent extends Component {
    constructor() {
        super();

        this.handleFileUpload = this.handleFileUpload.bind(this);
    }

    handleFileUpload(e) {
        const { handleUpdateAvatar } = this.props;
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
            const base64 = reader.result;
            getOrientation(file, (orientation) => {
                resetOrientation(base64, orientation, (newFile) => {
                    handleUpdateAvatar({ avatar: newFile });
                });
            });
        };
    }

    render() {
        return (
            <span className="change-desc">
                <span className="change-desc__pos">Change</span>
                <input type="file" className="upload" onChange={this.handleFileUpload} />
            </span>
        );
    }
}

UserChangeAvatarComponent.propTypes = {
    handleUpdateAvatar: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    user: state.user,
});

const mapDispatchToProps = dispatch => ({
    handleUpdateAvatar: bindActionCreators(updateUserWithoutRedirect, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserChangeAvatarComponent);
