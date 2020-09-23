import { API_URL } from "../../utils/Config";
import { timeoutPromise } from "../../utils/Tools";
export const FAVORITE_LOADING = "FAVORITE_LOADING";
export const FAVORITE_FAILURE = "FAVORITE_FAILURE";
export const FETCH_FAVORITE = "FETCH_FAVORITE";
export const ADD_FAVORITE = "ADD_FAVORITE";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";

//Fetch Favorite
export const fetchFavorite = () => {
  return async (dispatch, getState) => {
    const user = getState().auth.user;
    if (user.userid != undefined) {
      dispatch({
        type: FAVORITE_LOADING,
      });
      try {
        const response = await timeoutPromise(
          fetch(`${API_URL}/favoriteList`, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "auth-token": user.token,
            },
            method: "GET",
          })
        );
        if (!response.ok) {
          dispatch({
            type: FAVORITE_FAILURE,
          });
          throw new Error("Something went wrong!, can't get favorite list");
        }
        const resData = await response.json();

        const filterUserFavorite = resData.content.filter(
          (userFavorite) => userFavorite.userId === user.userid
        );
        let items = [];
        if (filterUserFavorite.length > 0) {
          items = filterUserFavorite[0].items;
        }
        dispatch({
          type: FETCH_FAVORITE,
          favoriteList: items,
        });
      } catch (err) {
        throw err;
      }
    }
    return;
  };
};
//Add Favorite
export const addFavorite = (item) => {
  return async (dispatch, getState) => {
    dispatch({
      type: FAVORITE_LOADING,
    });
    const user = getState().auth.user;
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/favoriteList/post`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "auth-token": user.token,
          },
          method: "POST",
          body: JSON.stringify({
            userId: user.userid,
            items: [
              {
                item: item._id,
              },
            ],
          }),
        })
      );
      if (!response.ok) {
        dispatch({
          type: FAVORITE_FAILURE,
        });
        throw new Error("Something went wrong!");
      }
      dispatch({
        type: ADD_FAVORITE,
        addItem: item,
      });
    } catch (err) {
      throw err;
    }
  };
};
export const removeFavorite = (id) => {
  return async (dispatch, getState) => {
    dispatch({
      type: FAVORITE_LOADING,
    });
    const user = getState().auth.user;
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/favoriteList/${user.userid}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "auth-token": user.token,
          },
          method: "PATCH",
          body: JSON.stringify({
            item: id,
          }),
        })
      );
      if (!response.ok) {
        dispatch({
          type: FAVORITE_FAILURE,
        });
        throw new Error("Something went wrong!");
      }
      dispatch({
        type: REMOVE_FAVORITE,
        itemId: id,
      });
    } catch (err) {
      throw err;
    }
  };
};
