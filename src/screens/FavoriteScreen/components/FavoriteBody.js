import React from "react";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
//Colors
import Colors from "../../../utils/Colors";
//Text
import CustomText from "../../../components/UI/CustomText";
import { FavoriteItem } from "./FavoriteItem";
import Messages from "../../../messages/user";
//PropTypes check
import PropTypes from "prop-types";

export const FavoriteBody = ({
  navigation,
  FavoriteProducts,
  user,
  loadFavoriteProducts,
  isRefreshing,
}) => {
  return (
    <>
      {Object.keys(user).length === 0 ? (
        <View style={styles.center}>
          <CustomText>{Messages["user.login.require"]}</CustomText>
          <View
            style={{
              borderWidth: 1,
              paddingHorizontal: 15,
              paddingVertical: 10,
              backgroundColor: Colors.lighter_green,
              borderRadius: 5,
              borderColor: Colors.lighter_green,
              marginTop: 10,
            }}
          >
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <CustomText style={{ color: "#fff" }}>Tiếp tục</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      ) : FavoriteProducts.length === 0 ? (
        <View style={styles.center}>
          <CustomText style={{ fontSize: 16 }}>
            Không có sản phẩm trong mục yêu thích
          </CustomText>
          <CustomText style={{ fontSize: 16 }}>
            Bắt đầu thêm sản phẩm nào !
          </CustomText>
        </View>
      ) : (
        <FlatList
          data={FavoriteProducts}
          onRefresh={loadFavoriteProducts}
          refreshing={isRefreshing}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return <FavoriteItem navigation={navigation} item={item} />;
          }}
        />
      )}
    </>
  );
};

FavoriteBody.propTypes = {
  user: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  FavoriteProducts: PropTypes.array.isRequired,
};
const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
});
