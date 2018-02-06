import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { deletePost } from '../../actions/challenge.actions';
import { MODAL_CONFIRM_DELETE } from '../../constants/modals.constant';

class DeletePostContainer extends Component {
    constructor() {
        super();

        this.handleCallback = this.handleCallback.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleCallback() {
        const { item: { id }, handleDeletePost, handleCustomRemove } = this.props;

        handleDeletePost({ id });
        handleCustomRemove();
    }

    handleOnClick(e) {
        const { type } = this.props;
        const { handleOpenModal } = this.context;
        const additionalText = type === 'challenge' ? 'this Challenge?' : 'this Accept?';

        e.stopPropagation();
        handleOpenModal(MODAL_CONFIRM_DELETE, {
            handleSubmit: this.handleCallback,
            text: [
                'Are you sure you want to delete',
                (<br />),
                additionalText,
            ],
        });
    }

    render() {
        const { user, item, isDelete } = this.props;
        return (
            user.id === item.user.id || isDelete
                ? <span onClick={this.handleOnClick}>Delete</span>
                : null
        );
    }
}

DeletePostContainer.contextTypes = {
    handleOpenModal: PropTypes.func.isRequired,
};

DeletePostContainer.propTypes = {
    user: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    isDelete: PropTypes.bool.isRequired,
    handleDeletePost: PropTypes.func.isRequired,
    handleCustomRemove: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    user: state.user.payload,
});


const mapDispatchToProps = dispatch => ({
    handleDeletePost: bindActionCreators(deletePost, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeletePostContainer);
