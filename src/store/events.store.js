import axios from "axios";
import {BASE_URL, PAGE_SIZE} from "../request.hook";

const initialState = {
    data: [],
    error: null,
    loading: false,
    page: 0
};

export const setLoading = loading => ({
    type: 'SET_LOADING',
    loading
});

export const setData = data => ({
    type: 'SET_DATA',
    data
});

export const setError = error => ({
    type: 'SET_ERROR',
    error
});

export const setPage = page => (dispatch, getState) => {
    dispatch({
        type: 'SET_PAGE',
        page
    });
    dispatch(request(getState().page))
};

export const request = (page = 0, method = "GET") => dispatch => {
    dispatch(setLoading(true));
    axios({
        url: "/events?" + new URLSearchParams({
            accept: "application/vnd.github.v3+json",
            per_page: PAGE_SIZE,
            page
        }).toString(),
        baseURL: BASE_URL,
        method,
        headers: {"Accept": "application/vnd.github.v3+json"}
    }).then(response => {
        dispatch(setData(response.data));
    }).catch(error => {
        dispatch(setError(error.message));
    });
};

const requestReducer = (state = initialState, action) => {
    switch (action.type){
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.loading,
                error: null
            };
        case 'SET_DATA':
            return {
                ...state,
                data: action.data,
                loading: false
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.error,
                loading: false
            };
        case 'SET_PAGE':
            return {
                ...state,
                page: action.page
            };
        default:
            return state
    }
};

export default requestReducer
