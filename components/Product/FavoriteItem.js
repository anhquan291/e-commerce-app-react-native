import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Alert,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
//Redux
import { useDispatch } from 'react-redux';
// Action
import * as FavoriteActions from '../../store/favorite/favoriteActions';
import * as CartActions from '../../store/cart/cartActions';
//Color
import Colors from '../../constants/Colors';
//number format
import NumberFormat from 'react-number-format';
//Text
import TextGeo from '../UI/TextGeo';
//PropTypes check
import PropTypes from 'prop-types';

const renderRightAction = (text, color, action, x, progress) => {
  const trans = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [x, 0],
  });
  return (
    <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
      <TouchableOpacity
        style={[styles.rightAction, { backgroundColor: color }]}
        onPress={action}
      >
        <Text style={styles.actionText}>{text}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const FavoriteItem = ({ navigation, item }) => {
  const [isLoading, setIsLoading] = useState(true);
  const unmounted = useRef(false);
  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);
  const dispatch = useDispatch();
  const addToCart = async () => {
    try {
      await dispatch(CartActions.addToCart(item));
      if (!unmounted.current) {
        Alert.alert('Thêm thành công', 'Sản phẩm đã được thêm vào giỏ hàng', [
          {
            text: 'OK',
          },
        ]);
      }
    } catch (err) {
      throw err;
    }
  };
  const removeFavorite = () => {
    Alert.alert(
      'Bỏ yêu thích',
      'Bạn có muốn bỏ sản phẩm ra khỏi mục yêu thích?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Đồng ý',
          onPress: () => dispatch(FavoriteActions.removeFavorite(item._id)),
        },
      ]
    );
  };
  const RightActions = (progress) => {
    return (
      <View style={{ width: 170, flexDirection: 'row' }}>
        {renderRightAction('Thêm vào giỏ', '#ffab00', addToCart, 140, progress)}
        {renderRightAction(
          'Bỏ thích',
          Colors.red,
          removeFavorite,
          30,
          progress
        )}
      </View>
    );
  };
  return (
    <View>
      <Swipeable
        friction={2}
        rightThreshold={20}
        renderRightActions={RightActions}
      >
        <View style={styles.itemContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Detail', { item: item })}
            style={{ marginLeft: 5, width: '30%', marginRight: 10 }}
          >
            <Image
              style={{
                height: 70,
                width: '100%',
                resizeMode: 'stretch',
                borderRadius: 10,
              }}
              source={{ uri: item.thumb }}
              onLoadStart={() => {
                setIsLoading(true);
              }}
              onLoadEnd={() => setIsLoading(false)}
            />
            {isLoading && (
              <ActivityIndicator
                size='small'
                color={Colors.grey}
                style={{ position: 'absolute', left: 0, right: 0, top: 40 }}
              />
            )}
          </TouchableOpacity>
          <View style={styles.info}>
            <TextGeo style={styles.title}>{item.filename}</TextGeo>
            <TextGeo style={styles.subText}>{item.type}</TextGeo>
            <View style={styles.rateContainer}>
              <NumberFormat
                value={item.price}
                displayType={'text'}
                thousandSeparator={true}
                suffix={' đ'}
                renderText={(formattedValue) => (
                  <View style={styles.priceContainer}>
                    <TextGeo style={styles.price}>{formattedValue}</TextGeo>
                  </View>
                )}
              />
            </View>
          </View>
        </View>
      </Swipeable>
    </View>
  );
};

FavoriteItem.propTypes = {
  item: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  itemContainer: {
    height: 90,
    flexDirection: 'row',
    backgroundColor: Colors.light_grey,
    marginVertical: 6,
    borderRadius: 0,
    alignItems: 'center',
  },
  info: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    width: '70%',
  },
  title: {
    fontSize: 15,
  },
  subText: {
    fontSize: 13,

    color: Colors.grey,
  },
  rateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
  },
  rate: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 5,
  },
  score: {
    fontSize: 12,
    marginLeft: 5,
    color: Colors.grey,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 13,
    color: Colors.red,
  },
  action: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  rightAction: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
    flexDirection: 'row',
    height: 90,
  },
  actionText: {
    color: 'white',
    fontSize: 11,
    backgroundColor: 'transparent',
    padding: 5,
  },
});

export default FavoriteItem;
