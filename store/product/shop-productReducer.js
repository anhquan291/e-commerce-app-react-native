import { FETCH_PRODUCTS } from './productActions';
import { FIRST_OPEN } from './checkFirstTimeActions';

const initialState = {
  products: [],
  isFirstOpen: false,
};
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
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
