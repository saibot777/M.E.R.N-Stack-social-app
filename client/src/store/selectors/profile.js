import axios from 'axios';
import {PROFILE_LOADING, GET_PROFILE, GET_PROFILES, CLEAR_CURRENT_PROFILE, GET_ERRORS, SET_CURRENT_USER} from "../actions";
import {api} from "../../environment/dev";

export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());

    axios.get(`${api}/profiles`)
        .then(res => dispatch({
            type: GET_PROFILE,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_PROFILE,
            payload: {}
        }))
};

export const getProfileByHandle = handle => dispatch => {
    dispatch(setProfileLoading());

    axios.get(`${api}/profiles/handle/${handle}`)
        .then(res => dispatch({
            type: GET_PROFILE,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_PROFILE,
            payload: null
        }))
};


export const createProfile = (profileData, history) => dispatch => {
    axios
        .post(`${api}/profiles/create`, profileData)
        .then(res => history.push('/dashboard'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

export const addExperience = (expData, history) => dispatch => {
    axios
        .post(`${api}/profiles/add_experience`, expData)
        .then(res => history.push('/dashboard'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

export const addEducation = (eduData, history) => dispatch => {
    axios
        .post(`${api}/profiles/add_education`, eduData)
        .then(res => history.push('/dashboard'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

export const deleteExperience = id => dispatch => {
    axios
        .delete(`${api}/profiles/experience/${id}`)
        .then(res => dispatch({
            type: GET_PROFILE,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

export const deleteEducation = id => dispatch => {
    axios
        .delete(`${api}/profiles/education/${id}`)
        .then(res => dispatch({
            type: GET_PROFILE,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

export const deleteAccount = () => dispatch => {
    if (window.confirm('Are you sure? This cannot be undone!')) {
        axios
            .delete(`${api}/profiles`)
            .then(res => dispatch({
                type: SET_CURRENT_USER,
                payload: {}
            }))
            .catch(err => dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }));
    }
};

export const getProfiles = () => dispatch => {
    dispatch(setProfileLoading());
    axios
        .get(`${api}/profiles/list`)
        .then(res => dispatch({
            type: GET_PROFILES,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_PROFILES,
            payload: null
        }));
};

const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
};

export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
};