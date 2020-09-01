import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
//Redux
import { useDispatch } from "react-redux";
//Action
import * as CartActions from "../../../store/cart/cartActions";
//Text
import CustomText from "../../../components/UI/CustomText";
//Colors
import Colors from "../../../utils/Colors";
import CartItem from "./CartItem";
import Messages from "../../../messages/user";

const CartBody = ({ navigation, user, carts, loadCarts, isRefreshing }) => {
  const dispatch = useDispatch();
  const onRemove = (itemId) => {
    Alert.alert("Bỏ giỏ hàng", "Bạn có chắc bỏ sản phẩm khỏi giỏ hàng?", [
      {
        text: "Hủy",
      },
      {
        text: "Đồng ý",
        onPress: () => {
          dispatch(CartActions.removeFromCart(carts._id, itemId));
        },
      },
    ]);
  };
  return (
    <View style={styles.footer}>
      {Object.keys(user).length === 0 ? (
        <View style={styles.center}>
          <CustomText>{Messages["user.login.require"]}</CustomText>
          <View style={styles.nextButton}>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <CustomText style={{ color: "#fff" }}>Tiếp tục</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      ) : carts.items.length === 0 ? (
        <View style={styles.center}>
          <CustomText style={{ fontSize: 16 }}>
            Chưa có sản phẩm nào trong giỏ hàng
          </CustomText>
        </View>
      ) : (
        <FlatList
          data={carts.items}
          onRefresh={loadCarts}
          refreshing={isRefreshing}
          keyExtractor={(item) => item.item._id}
          renderItem={({ item }) => {
            return (
              <CartItem
                item={item}
                onRemove={() => onRemove(item.item._id)}
                onAdd={() => {
                  dispatch(CartActions.addToCart(item.item, user.token));
                }}
                onDes={() => {
                  dispatch(
                    CartActions.decCartQuantity(carts._id, item.item._id)
                  );
                }}
              />
            );
          }}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  footer: {
    flex: 1,
  },
  nextButton: {
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: Colors.lighter_green,
    borderRadius: 5,
    borderColor: Colors.lighter_green,
    marginTop: 10,
  },
  center: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CartBody;
