import React, { useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
//import CustomText
import CustomText from '../../../components/UI/CustomText';
//icon
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
//Animatable
import * as Animatable from 'react-native-animatable';
//Redux
import { useDispatch, useSelector } from 'react-redux';
//Action
import { addToCart, removeFavorite, addFavorite } from '../../../reducers';
import Messages from '../../../messages/user';
import Colors from '../../../utils/Colors';

//PropTypes check
import PropTypes from 'prop-types';

export const ActionButton = ({
  user,
  item,
  color,
  setShowSnackbar,
  FavoriteProducts,
  setModalVisible,
  setMessage,
}) => {
  const dispatch = useDispatch();
  const cartLoading = useSelector((state) => state.cart.isLoading);
  const unmounted = useRef(false);
  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);
  //Set Colors
  const addToCartAct = async () => {
    if (Object.keys(user).length === 0) {
      setMessage(Messages['user.login.require']);
      setShowSnackbar(true);
    } else {
      try {
        await dispatch(addToCart(item, user.token));
        setModalVisible(true);
      } catch (err) {
        throw err;
      }
    }
  };
  const toggleFavorite = () => {
    if (Object.keys(user).length === 0) {
      setMessage(Messages['user.login.require']);
      setShowSnackbar(true);
    } else if (FavoriteProducts) {
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
            onPress: () => dispatch(removeFavorite(item._id)),
          },
        ],
      );
    } else {
      dispatch(addFavorite(item));
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
              source={require('../../../components/IconAnimation/heart.json')}
              autoPlay={FavoriteProducts}
              loop={false}
            />
          ) : (
            <Ionicons name='ios-heart-empty' size={27} color={color} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.addCart, { backgroundColor: color }]}
          onPress={addToCartAct}
        >
          {cartLoading ? (
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
  FavoriteProducts: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  action: {
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  addCart: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 50,
  },
  favorite: {
    width: '18%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    paddingTop: 5,
    borderRadius: 5,
    height: 50,
  },
  actionText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#fff',
  },
});
