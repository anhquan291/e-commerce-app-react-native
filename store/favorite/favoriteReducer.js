import {
  FETCH_FAVORITE,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  FAVORITE_LOADING,
  FAVORITE_FAILURE,
} from "./favoriteActions";

const initialState = {
  favoriteList: [],
  isLoading: false,
};
export const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case FAVORITE_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case FAVORITE_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case FETCH_FAVORITE:
      return {
        ...state,
        favoriteList: action.favoriteList,
        isLoading: false,
      };
    case ADD_FAVORITE:
      const newItem = action.addItem;
      state.favoriteList.push(newItem);
      return {
        ...state,
        isLoading: false,
      };
    case REMOVE_FAVORITE:
      const id = action.itemId;
      const newList = state.favoriteList.filter((item) => item._id !== id);
      return {
        ...state,
        favoriteList: newList,
        isLoading: false,
      };
    default:
      return state;
  }
};
