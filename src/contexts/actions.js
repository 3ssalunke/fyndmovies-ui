import {
  CLEAR_SEARCHED_MOVIES,
  FETCH_MOVIES,
  SET_POPULAR_MOVIES,
  SET_SEARCHED_MOVIES,
} from "./constants";

const getURL = (params) => {
  let searchText = params?.searchText,
    pageNumber = params?.pageNumber;
  let url = `${process.env.REACT_APP_HOSTNAME}/movies`;
  if (searchText && !pageNumber)
    url = `${process.env.REACT_APP_HOSTNAME}/movies?search=${searchText}`;
  if (pageNumber && !searchText)
    url = `${process.env.REACT_APP_HOSTNAME}/movies?page=${pageNumber}`;
  if (pageNumber && searchText)
    url = `${process.env.REACT_APP_HOSTNAME}/movies?search=${searchText}&&page=${pageNumber}`;

  return url;
};

export const setPopularMovies = async (dispatch, params) => {
  dispatch({ type: FETCH_MOVIES });
  const url = getURL(params);
  const res = await fetch(url);
  const {
    result: { movies },
  } = await res.json();
  dispatch({ type: SET_POPULAR_MOVIES, payload: movies });
};

export const setSearchedMovies = async (dispatch, params) => {
  dispatch({ type: FETCH_MOVIES });
  const url = getURL(params);
  const res = await fetch(url);
  const {
    result: { movies },
  } = await res.json();
  dispatch({ type: SET_SEARCHED_MOVIES, payload: movies });
};

export const clearSearchedMovies = (dispatch) => {
  dispatch({ type: CLEAR_SEARCHED_MOVIES });
  setPopularMovies(dispatch);
};
