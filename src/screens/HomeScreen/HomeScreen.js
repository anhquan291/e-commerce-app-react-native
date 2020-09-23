import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  FlatList,
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
import {
  Carousel,
  Header,
  CategorySection,
  FloatButton,
  categories,
} from "./components";
import Skeleton from "../../components/Loaders/SkeletonLoading";
import Snackbar from "../../components/Notification/Snackbar";
//FloatButton
import { Portal, Provider } from "react-native-paper";
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
//height
const { height } = Dimensions.get("window");

export const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  //Header Animation
  let scrollY = new Animated.Value(0);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);
  const products = useSelector((state) => state.store.products);
  const notification = useSelector((state) => state.auth.notification);
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
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <Skeleton />
      </View>
    );
  }

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
        <AnimatedFlatList
          style={{ width: "100%" }}
          showsVerticalScrollIndicator={false}
          bounces={Platform.OS === "android" ? true : false}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [
              {
                nativeEvent: { contentOffset: { y: scrollY } },
              },
            ],
            { useNativeDriver: true }
          )}
          data={categories}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <CategorySection
              name={item.name}
              bg={item.bg}
              data={products}
              navigation={navigation}
            />
          )}
          ListHeaderComponent={() => (
            <View style={styles.banner}>
              <Carousel />
            </View>
          )}
        />
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
});
