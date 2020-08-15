import { API_URL } from '../../constants/Config';
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/product`, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error("Something went wrong!, can't get the products");
      }
      const resData = await response.json();
      dispatch({
        type: FETCH_PRODUCTS,
        products: resData.content,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
