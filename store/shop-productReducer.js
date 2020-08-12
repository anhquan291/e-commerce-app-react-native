import {
  FETCH_PRODUCTS,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  FIRST_OPEN,
} from "./shop-actions";

const initialState = {
  products: [],
  favProducts: [],
  isFirstOpen: false,
};
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
      };
    case ADD_FAVORITE:
      const existingIndex = state.favProducts.findIndex(
        (product) => product._id === action.id
      );
      if (existingIndex >= 0) {
        const updatedFavProducts = [...state.favProducts];
        updatedFavProducts.splice(existingIndex, 1);
        return { ...state, favProducts: updatedFavProducts };
      } else {
        const product = state.products.find(
          (product) => product._id === action.id
        );
        return { ...state, favProducts: state.favProducts.concat(product) };
      }
    case REMOVE_FAVORITE:
      return {
        ...state,
        favoriteProducts: state.favoriteProducts.filter(
          (product) => product._id !== action.productId
        ),
      };
    case FIRST_OPEN: {
      return {
        ...state,
        isFirstOpen: true,
      };
    }
    default:
      return state;
  }
};

export default productReducer;
