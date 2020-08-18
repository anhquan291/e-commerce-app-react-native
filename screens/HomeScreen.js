import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
//Redux
import { useSelector, useDispatch } from 'react-redux';
//Action
import * as FavoriteActions from '../store/favorite/favoriteActions';
import * as ProductActions from '../store/product/productActions';
//Colors
import Colors from '../constants/Colors';
//Animation
import Animated from 'react-native-reanimated';
//Components
import Header from '../components/UI/Header';
import Banners from '../db/Banners';
import Carousel from '../components/UI/Carousel';
import CategorySection from '../components/UI/CategorySection';
import Skeleton from '../components/Loaders/SkeletonLoading';

//height
const { height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const products = useSelector((state) => state.store.products);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  //fetch Api
  useEffect(() => {
    let unmounted = false;
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
    return () => {
      unmounted.current = true;
    };
  }, []);
  useEffect(() => {
    let unmounted = false;
    setLoading(true);
    const fetching = async () => {
      try {
        await dispatch(FavoriteActions.fetchFavorite());
        setLoading(false);
      } catch (err) {
        throw err;
      }
    };
    fetching();
    return () => {
      unmounted.current = true;
    };
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
          bg={require('../assets/Images/bg1.jpg')}
        />
        <CategorySection
          data={products}
          user={user}
          navigation={navigation}
          name='Nhẫn Đá Quý'
          bg={require('../assets/Images/bg2.jpg')}
        />
        <CategorySection
          data={products}
          user={user}
          navigation={navigation}
          name='Đá Ruby'
          bg={require('../assets/Images/bg3.jpg')}
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
