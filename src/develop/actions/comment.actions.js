import { bindActionCreators } from 'redux';

import api from '../api/config';

import {
    // createAction,
    success,
    failure,
    request,
} from '../utils/actions.helper';

import { closeModal } from './common.actions';

import {
    ADD_COMMENT_TROPHY,
    ADD_COMMENT_CHALLENGE,
    ADD_COMMENT_ACCEPTANCE,
    ADD_TROPHY_COMMENT_ACCEPTANCES,
    SET_LIKE_COMMENT,
    UNSET_LIKE_COMMENT,
    DELETE_COMMENT,
} from './types/comment.types';

import normalizr from '../utils/mappers/challenges.mapper';

export const addCommentTrophy = params => (dispatch) => {
    dispatch(request(ADD_COMMENT_TROPHY));
    api.comment.addComment(params)
        .then(
            response => dispatch(success(ADD_COMMENT_TROPHY, normalizr.res.getComment(response.data.comment))),
            error => dispatch(failure(ADD_COMMENT_TROPHY, error)),
        );
};


export const addCommentChallenge = params => (dispatch) => {
    dispatch(request(ADD_COMMENT_CHALLENGE));
    api.comment.addComment(params)
        .then(
            response => dispatch(success(ADD_COMMENT_CHALLENGE, normalizr.res.getComment(response.data.comment))),
            error => dispatch(failure(ADD_COMMENT_CHALLENGE, error)),
        );
};

export const addCommentAcceptance = params => (dispatch) => {
    dispatch(request(ADD_COMMENT_ACCEPTANCE));
    api.comment.addComment(params)
        .then(
            response => dispatch(success(ADD_COMMENT_ACCEPTANCE, {
                ...normalizr.res.getComment(response.data.comment),
                parent_id: params.id,
            })),
            error => dispatch(failure(ADD_COMMENT_ACCEPTANCE, error)),
        );
};

export const addTrophyCommentAcceptance = params => (dispatch) => {
    dispatch(request(ADD_TROPHY_COMMENT_ACCEPTANCES));
    api.comment.addComment(params)
        .then(
            response => dispatch(success(ADD_TROPHY_COMMENT_ACCEPTANCES, {
                ...normalizr.res.getComment(response.data.comment),
                parent_id: params.id,
            })),
            error => dispatch(failure(ADD_TROPHY_COMMENT_ACCEPTANCES, error)),
        );
};

export const deleteComment = params => (dispatch) => {
    dispatch(request(DELETE_COMMENT));
    api.comment.deleteComment(params)
        .then(
            (response) => {
                dispatch(success(DELETE_COMMENT, normalizr.res.getComment(response.data.comment)));
                bindActionCreators(closeModal, dispatch)();
            },
            error => dispatch(failure(DELETE_COMMENT, error)),
        );
};

export const setCommentLike = params => (dispatch) => {
    dispatch(request(SET_LIKE_COMMENT));
    api.comment.setLike(params.id)
        .then(
            () => dispatch(success(SET_LIKE_COMMENT)),
            error => dispatch(failure(SET_LIKE_COMMENT, error)),
        );
};

export const unsetCommentLike = params => (dispatch) => {
    dispatch(request(UNSET_LIKE_COMMENT));
    api.comment.unsetLike(params.id)
        .then(
            () => dispatch(success(UNSET_LIKE_COMMENT)),
            error => dispatch(failure(UNSET_LIKE_COMMENT, error)),
        );
};
