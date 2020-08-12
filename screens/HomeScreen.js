import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
//Redux
import { useSelector, useDispatch } from 'react-redux';
//Action
import * as ProductActions from '../store/shop-actions';
//Colors
import Colors from '../constants/Colors';
//Animation
import Animated from 'react-native-reanimated';
//Components
import Header from '../components/UI/Header';
import bannerTest from '../db/BannerTest';
import Carousel from '../components/UI/Carousel';
import CategorySection from '../components/UI/CategorySection';
import Skeleton from '../components/SkeletonLoading';

//height
const { height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);
  const userId = Object.keys(user).length === 0 ? user.userid : '';
  const dispatch = useDispatch();

  //fetch Api
  useEffect(() => {
    setLoading(true);
    const fetching = async () => {
      await dispatch(ProductActions.fetchProducts());
      setLoading(false);
    };
    fetching();
  }, [userId]);
  const products = useSelector((state) => state.store.products);
  //Demo data
  const demoData = products.filter(
    (product, index) => index === 1 || index === 7 || index === 4 || index === 3
  );
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
          <Carousel products={bannerTest} />
        </View>
        <CategorySection
          data={products}
          navigation={navigation}
          name='Vòng Thạch Anh'
          bg={require('../assets/Images/bg1.jpg')}
        />
        <CategorySection
          data={products}
          navigation={navigation}
          name='Nhẫn Đá Quý'
          bg={require('../assets/Images/bg2.jpg')}
        />
        <CategorySection
          data={products}
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
