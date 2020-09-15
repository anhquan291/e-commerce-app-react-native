import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  AsyncStorage,
} from "react-native";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, fetchCart, fetchFavorite } from "../../reducers";
//Colors
import Colors from "../../utils/Colors";
//Animation
import Animated from "react-native-reanimated";
//Components
import Banners from "../../db/Banners";
import { Header, MyCarousel, CategorySection, FloatButton } from "./components";
import Skeleton from "../../components/Loaders/SkeletonLoading";
import Snackbar from "../../components/Notification/Snackbar";
//FloatButton
import { Portal, Provider } from "react-native-paper";

//height
const { height } = Dimensions.get("window");

export const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);
  const products = useSelector((state) => state.store.products);
  const notification = useSelector((state) => state.auth.notification);
  const rings = products.filter((ring) => ring.type === "ring");
  const bracelets = products.filter((bracelet) => bracelet.type === "bracelet");
  const stones = products.filter((stone) => stone.type === "stone");
  // const isLoading = useSelector((state) => state.auth.isLoading);
  //fetch Api
  useEffect(() => {
    setLoading(true);
    // AsyncStorage.removeItem("isFirstTime");
    const fetching = async () => {
      try {
        await dispatch(fetchProducts());
        await dispatch(fetchCart());
        await dispatch(fetchFavorite());
        setLoading(false);
      } catch (err) {
        alert(err);
      }
    };
    fetching();
  }, [user.userid]);

  //Header Animation
  const scrollY = new Animated.Value(0);
  if (loading) {
    return (
      <View style={styles.center}>
        <Skeleton />
      </View>
    );
  }
  // console.log(Header);
  return (
    <View style={styles.container}>
      <Provider>
        <Header
          scrollPoint={scrollY}
          navigation={navigation}
          products={products}
        ></Header>
        <Portal>
          <FloatButton />
        </Portal>
        <Animated.ScrollView
          style={{ width: "100%" }}
          showsVerticalScrollIndicator={false}
          bounces={Platform.OS === "android" ? true : false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: { contentOffset: { y: scrollY } },
              },
            ],
            { useNativeDriver: true }
          )}
        >
          <View style={styles.banner}>
            <MyCarousel products={Banners} />
          </View>
          <CategorySection
            data={bracelets}
            navigation={navigation}
            name='Vòng Thạch Anh'
            bg={require("../../assets/Images/bg1.jpg")}
          />
          <CategorySection
            data={rings}
            navigation={navigation}
            name='Nhẫn Đá Quý'
            bg={require("../../assets/Images/bg2.jpg")}
          />
          <CategorySection
            data={stones}
            navigation={navigation}
            name='Đá Ruby'
            bg={require("../../assets/Images/bg3.jpg")}
          />
        </Animated.ScrollView>
        {Object.keys(notification).length === 0 ? (
          <View />
        ) : (
          <Snackbar
            checkVisible={true}
            message={
              Object.keys(user).length === 0
                ? notification
                : notification + " " + user.name
            }
          />
        )}
      </Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light_bg,
    marginTop: Platform.OS === "android" ? 75 : height < 668 ? 75 : 100,
  },
  banner: {
    marginTop: 0,
  },
  category: {
    height: 518,
    marginHorizontal: 10,
    marginVertical: 10,
    paddingVertical: 20,
    borderRadius: 20,
    backgroundColor: "transparent",
    overflow: "hidden",
  },
});
