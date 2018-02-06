import { bindActionCreators } from 'redux';

import api from '../api/config';
import {
    createAction,
    success,
    failure,
    request,
} from '../utils/actions.helper';

import {
    closeModal,
    openModal,
} from './common.actions';

import {
    GET_ACCEPTANCES,
    GET_CHALLENGE,
    GET_CHALLENGES,
    GET_MORE_CHALLENGES,
    SEND_REPORT,
    SET_CHALLENGE_LIKE,
    UNSET_CHALLENGE_LIKE,
    DELETE_POST,
    CLEAR_FEED_DATA_STATE,
    DELETE_POSTS,
    SEND_INVITE_POST,
    GET_ACCEPTANCE,
    CLEAR_CHALLENGE_DATA_STATE,
} from './types/challenge.types';

import { MODAL_REPORT_SUCCESS } from '../constants/modals.constant';

import normalizr from '../utils/mappers/challenges.mapper';

export const getAll = params => (dispatch) => {
    dispatch(request(GET_CHALLENGES));
    api.challenges.getAll(params).then(
        (response) => {
            const nData = normalizr.res.getChallenges(response.data.posts);

            dispatch(success(GET_CHALLENGES, nData));
        },
        error => dispatch(failure(GET_CHALLENGES, error)),
    );
};

export const getChallenges = params => (dispatch) => {
    dispatch(request(GET_CHALLENGES));
    api.challenges.getByType(params).then(
        (response) => {
            const nData = normalizr.res.getChallenges(response.data.posts);

            dispatch(success(GET_CHALLENGES, nData));
        },
        error => dispatch(failure(GET_CHALLENGES, error)),
    );
};

export const loadMoreChallenges = params => (dispatch) => {
    dispatch(request(GET_MORE_CHALLENGES));
    api.challenges.getByType(params).then(
        (response) => {
            const nData = normalizr.res.getChallenges(response.data.posts);

            dispatch(success(GET_MORE_CHALLENGES, nData));
        },
        error => dispatch(failure(GET_MORE_CHALLENGES, error)),
    );
};

export const getChallenge = params => (dispatch) => {
    dispatch(request(GET_CHALLENGE));
    api.challenges.getById(params).then(
        (response) => {
            const nData = normalizr.res.getChallenge(response.data.post);

            dispatch(success(GET_CHALLENGE, nData));
        },
        error => dispatch(failure(GET_CHALLENGE, error)),
    );
};

export const getAcceptances = params => (dispatch) => {
    dispatch(request(GET_ACCEPTANCES));

    api.challenges.getAcceptances(params).then(
        (response) => {
            const nData = normalizr.res.getAcceptances(response.data.acceptances);

            dispatch(success(GET_ACCEPTANCES, nData));
        },
        error => dispatch(failure(GET_ACCEPTANCES, error)),
    );
};

export const getAcceptance = params => (dispatch) => {
    dispatch(request(GET_ACCEPTANCE));

    api.challenges.getById(params).then(
        (response) => {
            const nData = normalizr.res.getAcceptance(response.data.post);

            dispatch(success(GET_ACCEPTANCE, nData));
        },
        error => dispatch(failure(GET_ACCEPTANCE, error)),
    );
};

export const sendReport = params => (dispatch) => {
    dispatch(request(SEND_REPORT));
    api.challenges.sendReport(params).then(
        () => {
            dispatch(success(SEND_REPORT));
            bindActionCreators(openModal, dispatch)(MODAL_REPORT_SUCCESS, {});
        },
        error => dispatch(failure(SEND_REPORT, error)),
    );
};

export const setLike = params => (dispatch) => {
    dispatch(request(SET_CHALLENGE_LIKE));
    api.challenges.setLike(params.id)
        .then(
            () => dispatch(success(SET_CHALLENGE_LIKE)),
            error => dispatch(failure(SET_CHALLENGE_LIKE, error)),
        );
};

export const unsetLike = params => (dispatch) => {
    dispatch(request(UNSET_CHALLENGE_LIKE));
    api.challenges.unsetLike(params.id)
        .then(
            () => dispatch(success(UNSET_CHALLENGE_LIKE)),
            error => dispatch(failure(UNSET_CHALLENGE_LIKE, error)),
        );
};


export const deletePost = params => (dispatch) => {
    dispatch(request(DELETE_POST));
    api.challenges.delete(params.id)
        .then(
            () => dispatch(success(DELETE_POST)),
            error => dispatch(failure(DELETE_POST, error)),
        );
};

export const clearDataState = () => createAction(CLEAR_FEED_DATA_STATE);
export const clearCurrentDataState = () => createAction(CLEAR_CHALLENGE_DATA_STATE);

export const deletePosts = params => (dispatch) => {
    dispatch(request(DELETE_POSTS));
    api.challenges.deleteAll(params)
        .then(
            () => bindActionCreators(closeModal, dispatch)(),
            error => dispatch(failure(DELETE_POSTS, error)),
        );
};

export const sendInvite = params => (dispatch) => {
    api.challenges.sendInvite(params)
        .then(
            response => dispatch(success(SEND_INVITE_POST, response.data)),
            error => dispatch(failure(SEND_INVITE_POST, error)),
        );
};

