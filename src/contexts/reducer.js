import {
  CLEAR_MOVIES,
  FETCH_MOVIES,
  LOGIN_USER,
  LOGOUT_USER,
  SET_POPULAR_MOVIES,
  SET_SEARCHED_MOVIES,
} from "./constants";

export const initialState = {
  movies: [],
  loading: false,
  loggedInUser: null,
};

export const moviesReducer = (state, action) => {
  switch (action.type) {
    case FETCH_MOVIES:
      return {
        ...state,
        loading: true,
      };
    case SET_POPULAR_MOVIES:
      return {
        ...state,
        movies: [...state.movies, ...action.payload],
        loading: false,
      };
    case SET_SEARCHED_MOVIES:
      return {
        ...state,
        movies: [...action.payload],
        loading: false,
      };
    case CLEAR_MOVIES:
      return {
        ...state,
        movies: [],
      };
    default:
      return {
        ...state,
      };
  }
};

const userReducer = (state, action) => {
  switch (action.payload) {
    case LOGIN_USER:
      return {
        ...state,
        loggedInUser: { ...action.payload },
      };
    case LOGOUT_USER:
      return {
        ...state,
        loggedInUser: null,
      };
    default:
      return {
        ...state,
      };
  }
};

const combineReducers = (reducers) => {
  return (state, action) => {
    return Object.keys(reducers).reduce((acc, prop) => {
      return {
        ...acc,
        ...reducers[prop]({ [prop]: acc[prop] }, action),
      };
    }, state);
  };
};

export const combinedReducers = combineReducers({
  moviesReducer,
  userReducer,
});
