import React, { useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
//import CustomText
import CustomText from "../../../components/UI/CustomText";
//icon
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
//Animatable
import * as Animatable from "react-native-animatable";
//Redux
import { useDispatch } from "react-redux";
//Action
import * as CartActions from "../../../store/cart/cartActions";
import * as FavoriteActions from "../../../store/favorite/favoriteActions";
import Messages from "../../../messages/user";
import Colors from "../../../utils/Colors";

//PropTypes check
import PropTypes from "prop-types";

const ActionButton = ({
  user,
  item,
  color,
  setShowSnackbar,
  setIsAddingCart,
  FavoriteProducts,
  isAddingCart,
  setModalVisible,
  setMessage,
}) => {
  const dispatch = useDispatch();
  const unmounted = useRef(false);
  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);
  //Set Colors
  const addToCart = async () => {
    if (Object.keys(user).length === 0) {
      setMessage(Messages["user.login.require"]);
      setShowSnackbar(true);
      if (!unmounted.current) {
        const interval = setInterval(() => {
          setShowSnackbar(false);
        }, 7500);
        return () => clearInterval(interval);
      }
    } else {
      try {
        setIsAddingCart(true);
        await dispatch(CartActions.addToCart(item, user.token));
        setIsAddingCart(false);
        setModalVisible(true);
      } catch (err) {
        throw err;
      }
    }
  };
  const toggleFavorite = () => {
    if (Object.keys(user).length === 0) {
      setMessage(Messages["user.login.require"]);
      setShowSnackbar(true);
      const interval = setInterval(() => {
        setShowSnackbar(false);
      }, 7500);
      if (!unmounted.current) {
        return () => clearInterval(interval);
      }
    } else if (FavoriteProducts) {
      Alert.alert(
        "Bỏ yêu thích",
        "Bạn có muốn bỏ sản phẩm ra khỏi mục yêu thích?",
        [
          {
            text: "Hủy",
            style: "cancel",
          },
          {
            text: "Đồng ý",
            onPress: () => dispatch(FavoriteActions.removeFavorite(item._id)),
          },
        ]
      );
    } else {
      dispatch(FavoriteActions.addFavorite(item));
    }
  };
  return (
    <Animatable.View
      delay={1500}
      animation='fadeInUp'
      style={styles.actionContainer}
    >
      <View style={styles.action}>
        <TouchableOpacity
          onPress={toggleFavorite}
          style={[styles.favorite, { borderColor: color }]}
        >
          {FavoriteProducts ? (
            <LottieView
              source={require("../../../components/IconAnimation/heart.json")}
              autoPlay={FavoriteProducts}
              loop={false}
            />
          ) : (
            <Ionicons name='ios-heart-empty' size={27} color={color} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.addCart, { backgroundColor: color }]}
          onPress={addToCart}
        >
          {isAddingCart ? (
            <ActivityIndicator size='small' color='#fff' />
          ) : (
            <CustomText style={styles.actionText}>Thêm vào giỏ hàng</CustomText>
          )}
        </TouchableOpacity>
      </View>
    </Animatable.View>
  );
};

ActionButton.propTypes = {
  item: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
  setShowSnackbar: PropTypes.func.isRequired,
  setIsAddingCart: PropTypes.func.isRequired,
  FavoriteProducts: PropTypes.bool.isRequired,
  isAddingCart: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  action: {
    flexDirection: "row",
    height: 80,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: Colors.grey,
  },
  addCart: {
    width: "75%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    height: 60,
  },
  favorite: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    paddingTop: 5,
    borderRadius: 10,
    height: 60,
  },
  actionText: {
    fontSize: 15,
    textAlign: "center",
    color: "#fff",
  },
});

export default ActionButton;
