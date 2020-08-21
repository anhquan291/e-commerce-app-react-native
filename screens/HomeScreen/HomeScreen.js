import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
//Redux
import { useSelector, useDispatch } from 'react-redux';
//Action
import * as FavoriteActions from '../../store/favorite/favoriteActions';
import * as ProductActions from '../../store/product/productActions';
import * as CartActions from '../../store/cart/cartActions';
//Colors
import Colors from '../../utils/Colors';
//Animation
import Animated from 'react-native-reanimated';
//Components
import Header from './components/Header';
import Banners from '../../db/Banners';
import Carousel from './components/Carousel';
import CategorySection from './components/CategorySection';
import Skeleton from '../../components/Loaders/SkeletonLoading';
import Snackbar from '../../components/Notification/Snackbar';
//Message

//height
const { height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const products = useSelector((state) => state.store.products);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const notification = useSelector((state) => state.auth.notification);

  //fetch Api
  useEffect(() => {
    setLoading(true);
    const fetching = async () => {
      try {
        await dispatch(ProductActions.fetchProducts());
      } catch (err) {
        throw err;
      }
    };
    fetching();
    setLoading(false);
  }, []);
  useEffect(() => {
    setLoading(true);
    const fetching = async () => {
      try {
        await dispatch(FavoriteActions.fetchFavorite());
        await dispatch(CartActions.fetchCart());
        setLoading(false);
      } catch (err) {
        throw err;
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
  return (
    <View style={styles.container}>
      <Header
        scrollPoint={scrollY}
        navigation={navigation}
        products={products}
      ></Header>
      {Object.keys(notification).length === 0 ? (
        <View />
      ) : (
        <Snackbar
          checkVisible={true}
          message={
            Object.keys(user).length === 0
              ? notification
              : notification + ' ' + user.name
          }
        />
      )}

      <Animated.ScrollView
        style={{ width: '100%' }}
        showsVerticalScrollIndicator={false}
        bounces={Platform.OS === 'android' ? true : false}
        scrollEventThrottle={16}
        onScroll={Animated.event([
          {
            nativeEvent: { contentOffset: { y: scrollY } },
          },
          { useNativeDriver: true },
        ])}
      >
        <View style={styles.banner}>
          <Carousel products={Banners} />
        </View>
        <CategorySection
          data={products}
          user={user}
          navigation={navigation}
          name='Vòng Thạch Anh'
          bg={require('../../assets/Images/bg1.jpg')}
        />
        <CategorySection
          data={products}
          user={user}
          navigation={navigation}
          name='Nhẫn Đá Quý'
          bg={require('../../assets/Images/bg2.jpg')}
        />
        <CategorySection
          data={products}
          user={user}
          navigation={navigation}
          name='Đá Ruby'
          bg={require('../../assets/Images/bg3.jpg')}
        />
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light_bg,
    marginTop: Platform.OS === 'android' ? 75 : height < 668 ? 75 : 100,
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
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
});

export default HomeScreen;
