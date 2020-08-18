import {
  FETCH_FAVORITE,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
} from './favoriteActions';

const initialState = {
  favoriteList: [],
};
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FAVORITE:
      return {
        ...state,
        favoriteList: action.favoriteList,
      };
    case ADD_FAVORITE:
      const newItem = action.addItem;
      state.favoriteList.push(newItem);
      return {
        ...state,
      };
    case REMOVE_FAVORITE:
      const id = action.itemId;
      const newList = state.favoriteList.filter((item) => item._id !== id);
      return {
        ...state,
        favoriteList: newList,
      };
    default:
      return state;
  }
};

export default productReducer;
