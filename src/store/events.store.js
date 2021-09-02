import axios from 'axios';
import {BASE_URL, PAGE_SIZE, UPDATE_TIME} from '../config';

const initialState = {
  data: [],
  error: null,
  loading: false,
  toUpdate: 0,
};

export const setLoading = loading => ({
  type: 'SET_LOADING',
  loading,
});

export const setData = data => (dispatch, getState) => {
  const {toUpdate} = getState();
  toUpdate && clearTimeout(toUpdate);
  dispatch({
    type: 'SET_DATA',
    data,
    toUpdate: setTimeout(
      () =>
        dispatch({
          type: 'SET_READY_TO_UPDATE',
        }),
      UPDATE_TIME * 1000,
    ),
  });
};

export const setError = error => ({
  type: 'SET_ERROR',
  error,
});

export const request =
  (page = 0, method = 'GET') =>
  dispatch => {
    dispatch(setLoading(true));
    axios({
      url:
        '/events?' +
        new URLSearchParams({
          accept: 'application/vnd.github.v3+json',
          per_page: PAGE_SIZE,
          page,
        }).toString(),
      baseURL: BASE_URL,
      method,
      headers: {Accept: 'application/vnd.github.v3+json'},
    })
      .then(response => {
        if (response.status === 200) {
          dispatch(setData(response.data));
        } else {
          dispatch(setError(response.error));
        }
      })
      .catch(error => {
        dispatch(setError(error.message));
      });
  };

const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.loading,
        error: initialState.error,
      };
    case 'SET_DATA':
      return {
        ...state,
        data: action.data,
        toUpdate: action.toUpdate,
        loading: initialState.loading,
      };
    case 'SET_ERROR':
      return {
        ...state,
        toUpdate: initialState.toUpdate,
        error: action.error,
        loading: initialState.loading,
      };
    case 'SET_READY_TO_UPDATE':
      return {
        ...state,
        toUpdate: initialState.toUpdate,
      };
    default:
      return state;
  }
};

export default requestReducer;
