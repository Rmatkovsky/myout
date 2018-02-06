import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { deleteComment } from '../../actions/comment.actions';

import { MODAL_CONFIRM_DELETE } from '../../constants/modals.constant';

class DeleteCommentContainer extends Component {
    constructor() {
        super();

        this.handleCallback = this.handleCallback.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleCallback() {
        const { item: { id }, handleRemoveComment, handleRemoveDOMComment } = this.props;
        handleRemoveComment(id);
        handleRemoveDOMComment(id);
    }

    handleOnClick(e) {
        const { handleOpenModal } = this.context;

        e.stopPropagation();
        handleOpenModal(MODAL_CONFIRM_DELETE, {
            handleSubmit: this.handleCallback,
            text: [
                'Are you sure you want to delete',
                (<br />),
                'this Comment?',
            ],
        });
    }

    render() {
        const { user, item, isDelete } = this.props;
        return (
            user.id === item.user.id || isDelete
            ? <div className="delete" onClick={this.handleOnClick} />
            : null
        );
    }
}

DeleteCommentContainer.contextTypes = {
    handleOpenModal: PropTypes.func.isRequired,
};


DeleteCommentContainer.propTypes = {
    user: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    isDelete: PropTypes.bool.isRequired,
    handleRemoveComment: PropTypes.func.isRequired,
    handleRemoveDOMComment: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    isAuthorized: state.user.isAuthorized,
});

const mapDispatchToProps = dispatch => ({
    handleRemoveComment: bindActionCreators(deleteComment, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteCommentContainer);
