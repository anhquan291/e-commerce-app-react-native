import React from "react";
import {
  View,
  StyleSheet,
  Image,
  StatusBar,
  Alert,
  Text,
  Platform,
} from "react-native";
//Drawer
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useDispatch, useSelector } from "react-redux";
import { Drawer } from "react-native-paper";
//Color
import Colors from "../utils/Colors";
import CustomText from "../components/UI/CustomText";
//Icon
import { MaterialCommunityIcons } from "@expo/vector-icons";
// Action
import { Logout as LogoutAction } from "../reducers";
//Link
import { OpenURL } from "../utils/Tools";
import { TouchableOpacity } from "react-native-gesture-handler";

const fbURL = "https://www.facebook.com/daquyankhangthinhvuong/";
const youtubeURL = "https://www.youtube.com/";

//custom drawer content
export default (props) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const Logout = () => {
    Alert.alert("Đăng Xuất", "Bạn có chắc muốn đăng xuất?", [
      {
        text: "Hủy",
        style: "cancel",
      },
      {
        text: "Đồng ý",
        onPress: () => {
          dispatch(LogoutAction());
          props.navigation.navigate("Home");
        },
      },
    ]);
  };
  const { state, ...rest } = props;
  const newState = { ...state }; //copy from state before applying any filter. do not change original state
  // newState.routes = newState.routes.filter((item) => item.name !== 'Profile'); //replace "Login' with your route name

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        {Object.keys(user).length === 0 ? (
          <View style={{ alignItems: "center", marginVertical: 20 }}>
            <Image
              style={styles.logo}
              source={require("../assets/Images/logo1.png")}
            />
          </View>
        ) : (
          <>
            <View style={styles.profileContainer}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Profile")}
              >
                <Image
                  style={styles.profilePic}
                  source={
                    user.profilePicture.length === 0
                      ? require("../assets/Images/defaultprofile.png")
                      : { uri: user.profilePicture }
                  }
                />
              </TouchableOpacity>
              <View style={{ justifyContent: "center" }}>
                <Text
                  style={{
                    color: Colors.green,
                    fontSize: 18,
                    paddingHorizontal: 10,
                    paddingVertical: 0,
                  }}
                >
                  {user.name}
                </Text>
                <Text
                  style={{
                    color: Colors.grey,
                    fontSize: 15,
                    paddingHorizontal: 10,
                  }}
                >
                  See your profile
                </Text>
              </View>
            </View>
          </>
        )}
        <View>
          <DrawerItemList state={newState} {...rest} />
          <Drawer.Section style={styles.drawerSection}></Drawer.Section>
          <View style={styles.social}>
            <OpenURL url={fbURL}>
              <Image
                style={{ resizeMode: "contain", width: 80, height: 80 }}
                source={require("../assets/Images/social1.png")}
              />
            </OpenURL>
            <OpenURL url={youtubeURL}>
              <Image
                style={{ resizeMode: "contain", width: 80, height: 80 }}
                source={require("../assets/Images/social3.png")}
              />
            </OpenURL>
            <OpenURL url={fbURL}>
              <Image
                style={{ resizeMode: "contain", width: 80, height: 80 }}
                source={require("../assets/Images/social2.png")}
              />
            </OpenURL>
          </View>
        </View>
      </DrawerContentScrollView>
      {Object.keys(user).length === 0 ? (
        <></>
      ) : (
        <DrawerItem
          onPress={Logout}
          label={() => (
            <View style={styles.logout}>
              <MaterialCommunityIcons
                name="logout"
                size={25}
                style={{ marginRight: 30 }}
                color={Colors.dark}
              />
              <CustomText
                style={{
                  fontSize: 14,
                  color: Colors.dark,
                  fontWeight: "500",
                  fontFamily: "Roboto-Medium",
                }}
              >
                Đăng xuất
              </CustomText>
            </View>
          )}
        />
      )}

      <View style={styles.version}>
        <DrawerItem
          label={() => (
            <CustomText
              style={{ color: Colors.grey, fontFamily: "Roboto-LightItalic" }}
            >
              CatTuong App Version 1.0
            </CustomText>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 20,
  },
  profilePic: {
    resizeMode: Platform.OS === "android" ? "cover" : "contain",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  logo: {
    resizeMode: "contain",
    width: "80%",
    height: 100,
  },
  logoutSection: {
    backgroundColor: Colors.lighter_green,
    borderRadius: 5,
    marginHorizontal: 10,
    height: 50,
    marginVertical: 20,
  },
  actionButton: {
    flexDirection: "row",
    marginHorizontal: 10,
    height: 40,
    marginBottom: 10,
  },
  drawerSection: {
    marginTop: 10,
  },
  social: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  logout: {
    flexDirection: "row",
    alignItems: "center",
  },
  version: {
    height: 60,
    borderTopWidth: 1,
    borderTopColor: Colors.light_grey,
  },
});
