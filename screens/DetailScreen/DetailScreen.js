import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Modal,
  Dimensions,
  Alert,
  Image,
} from 'react-native';
//Animatable
import * as Animatable from 'react-native-animatable';
//icon
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
//Color
import Colors from '../../utils/Colors';
//number format
import NumberFormat from '../../components/UI/NumberFormat';
//import CustomText
import CustomText from '../../components/UI/CustomText';
//Redux
import { useDispatch, useSelector } from 'react-redux';
//Action
import * as CartActions from '../../store/cart/cartActions';
import * as FavoriteActions from '../../store/favorite/favoriteActions';
//Icon
import LottieView from 'lottie-react-native';
import ShareItem from '../../components/UI/ShareItem';
import Snackbar from '../../components/Notification/Snackbar';

const { width, height } = Dimensions.get('window');

const DetailScreen = (props) => {
  const dispatch = useDispatch();
  const { item } = props.route.params;
  const user = useSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [isAddingCart, setIsAddingCart] = useState(false);
  //type
  const type = item.color;
  const [modalVisible, setModalVisible] = useState(false);
  //Favorite
  const FavoriteProducts = useSelector((state) =>
    state.fav.favoriteList.some((product) => product._id === item._id)
  );
  const unmounted = useRef(false);
  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);
  const addToCart = async () => {
    try {
      if (Object.keys(user).length === 0) {
        setMessage('Bạn cần đăng nhập để mua hàng');
        setShowSnackbar(true);
        const interval = setInterval(() => {
          setShowSnackbar(false);
        }, 8000);
        if (!unmounted.current) {
          return () => clearInterval(interval);
        }
      } else {
        setIsAddingCart(true);
        await dispatch(CartActions.addToCart(item, user.token));
        setIsAddingCart(false);
        setModalVisible(true);
      }
    } catch (err) {
      throw err;
    }
  };
  const toggleFavorite = () => {
    if (Object.keys(user).length === 0) {
      Alert.alert('Đăng Nhập', 'Bạn cần đăng nhập để thêm vào mục yêu thích', [
        {
          text: 'OK',
        },
      ]);
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
            onPress: () => dispatch(FavoriteActions.removeFavorite(item._id)),
          },
        ]
      );
    } else {
      dispatch(FavoriteActions.addFavorite(item));
    }
  };

  const moveToCart = () => {
    setModalVisible(false);
    props.navigation.navigate('Cart');
  };
  //Set Colors
  let color;
  const colorCheck = () => {
    switch (type) {
      case 'yellow':
        return (color = Colors.yellow);
      case 'green':
        return (color = Colors.green);
      case 'purple':
        return (color = Colors.purple);
      case 'blue':
        return (color = Colors.water);
      case 'pink':
        return (color = Colors.straw);
      default:
        return (color = Colors.bg);
    }
  };
  colorCheck();

  return (
    <View style={styles.container}>
      {showSnackbar ? (
        <Snackbar checkVisible={showSnackbar} message={message} />
      ) : (
        <View />
      )}
      <View style={styles.topBar}>
        <View style={styles.backIconContainer}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}
            style={styles.goBackIcon}
          >
            <Ionicons name='ios-arrow-back' size={23} color='black' />
          </TouchableOpacity>
        </View>
        <Image
          source={require('../../assets/Images/logoNoText.png')}
          style={{
            width: height < 668 ? 100 : 120,
            resizeMode: 'contain',
          }}
        />
        <View style={styles.shareIcon}>
          <ShareItem
            imageURL={item.url}
            title={item.filename}
            message={item.filename}
          />
        </View>
      </View>

      <View
        style={{
          height: 250,
        }}
      >
        <Animatable.Image
          animation='fadeIn'
          duration={500}
          delay={500}
          source={{ uri: item.url }}
          style={styles.image}
          onLoadStart={() => {
            setIsLoading(true);
          }}
          onLoadEnd={() => setIsLoading(false)}
        />
        {isLoading && <ActivityIndicator size='small' color={Colors.grey} />}
      </View>
      <Animatable.View
        animation='slideInUp'
        delay={500}
        duration={500}
        style={styles.footer}
      >
        <ScrollView>
          <Animatable.View
            animation='lightSpeedIn'
            delay={1000}
            style={styles.footer_header}
          >
            <CustomText selectable={true} style={{ ...styles.title, color }}>
              {item.filename}
            </CustomText>
            <NumberFormat
              style={{ color: '#fff', fontSize: 13 }}
              price={item.price}
              color={color}
            />
          </Animatable.View>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Animatable.View animation='bounceIn' delay={1600}>
              <MaterialCommunityIcons name='star' size={20} color={color} />
            </Animatable.View>
            <Animatable.View animation='bounceIn' delay={1700}>
              <MaterialCommunityIcons name='star' size={20} color={color} />
            </Animatable.View>
            <Animatable.View animation='bounceIn' delay={1800}>
              <MaterialCommunityIcons name='star' size={20} color={color} />
            </Animatable.View>
            <Animatable.View animation='bounceIn' delay={1900}>
              <MaterialCommunityIcons name='star' size={20} color={color} />
            </Animatable.View>
            <Animatable.View animation='bounceIn' delay={2000}>
              <MaterialCommunityIcons
                name='star-half'
                size={20}
                color={color}
              />
            </Animatable.View>
          </View>
          <Animatable.View
            animation='fadeInUpBig'
            delay={1000}
            style={styles.description}
          >
            <CustomText selectable={true} style={styles.detail}>
              {item.description}
            </CustomText>
            <View style={styles.infoContainer}>
              <CustomText style={{ color: Colors.text }}>Màu sắc: </CustomText>
              <CustomText style={{ color: color }}>{item.color}</CustomText>
            </View>
            <View style={styles.infoContainer}>
              <CustomText style={{ color: Colors.text }}>
                Tình trạng:{' '}
              </CustomText>
              <CustomText style={{ color: Colors.text }}>
                {item.standard}
              </CustomText>
            </View>
            <View style={styles.infoContainer}>
              <CustomText style={{ color: Colors.text }}>Xuất xứ: </CustomText>
              <CustomText style={{ color: Colors.text }}>
                {item.origin}
              </CustomText>
            </View>
          </Animatable.View>
        </ScrollView>
      </Animatable.View>
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
                source={require('../../components/IconAnimation/heart.json')}
                autoPlay={FavoriteProducts}
                loop={false}
              />
            ) : (
              <Ionicons name='ios-heart-empty' size={26} color={Colors.straw} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.addCart, { backgroundColor: color }]}
            onPress={addToCart}
          >
            {isAddingCart ? (
              <ActivityIndicator size='small' color='#fff' />
            ) : (
              <CustomText style={styles.actionText}>
                Thêm vào giỏ hàng
              </CustomText>
            )}
          </TouchableOpacity>
        </View>
      </Animatable.View>

      <Modal
        style={{
          flex: 1,
        }}
        animationType='slide'
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.modalContainer}></View>
        <View style={styles.modal}>
          <TouchableOpacity
            animation='zoomIn'
            style={styles.close}
            onPress={() => setModalVisible(false)}
          >
            <MaterialCommunityIcons
              name='window-close'
              size={24}
              color={color}
            />
          </TouchableOpacity>

          <View
            style={{ width: '90%', flexDirection: 'row', alignItems: 'center' }}
          >
            <MaterialCommunityIcons
              name='check-circle-outline'
              color={color}
              size={20}
            />
            <CustomText style={{ ...styles.success, color }}>
              Sản phẩm đã được thêm vào giỏ hàng
            </CustomText>
          </View>
          <View style={styles.modelInfo}>
            <View
              style={{ borderRadius: 20, width: '45%', overflow: 'hidden' }}
            >
              <Image
                source={{ uri: item.thumb }}
                style={{
                  height: 100,
                  resizeMode: 'stretch',
                }}
              />
            </View>
            <View style={styles.quantity}>
              <View>
                <CustomText style={{ ...styles.title, fontSize: 15 }}>
                  {item.filename}
                </CustomText>
                <CustomText style={{ fontSize: 12, color: Colors.grey }}>
                  Cung cấp bởi Cát Tường
                </CustomText>
              </View>
              <CustomText
                style={{ marginTop: 5, fontSize: 14, color: Colors.text }}
              >
                Thành tiền:
              </CustomText>
              <NumberFormat price={item.price} />
            </View>
          </View>
          <View
            style={{
              height: 55,
              borderTopWidth: 1,
              justifyContent: 'center',
              borderTopColor: Colors.grey,
            }}
          >
            <TouchableOpacity
              style={[
                styles.addCart,
                {
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 30,
                  backgroundColor: color,
                  height: 50,
                  width: '100%',
                },
              ]}
              onPress={moveToCart}
            >
              <CustomText style={styles.actionText}>Xem Giỏ Hàng</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topBar: {
    marginTop: 40,
    height: height < 668 ? 20 : 50,
    width: '100%',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  goBackIcon: {
    width: 40,
  },
  shareIcon: {
    width: 40,
    alignItems: 'flex-end',
  },
  image: {
    height: 250,
    resizeMode: 'contain',
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    marginBottom: 60,
  },
  footer_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 17,
    color: Colors.text,
  },
  success: {
    marginLeft: 10,
    fontSize: 15,
  },
  price: {
    color: '#fff',
  },
  description: {
    marginTop: 20,
  },
  infoContainer: {
    marginTop: 20,
    flexDirection: 'row',
  },
  detail: {
    color: Colors.text,
  },
  actionContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    zIndex: 30,
  },
  action: {
    flexDirection: 'row',
    height: height < 668 ? 60 : 70,
    justifyContent: 'space-between',
    marginHorizontal: 20,
    backgroundColor: '#fff',
    paddingVertical: 5,
  },
  addCart: {
    width: '75%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  favorite: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    paddingTop: 5,
    borderRadius: 10,
  },
  actionText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#fff',
  },
  modalContainer: {
    position: 'absolute',
    backgroundColor: 'black',
    opacity: 0.7,
    top: 0,
    width: width,
    height: height,
  },
  modal: {
    backgroundColor: Colors.light_grey,
    width: '100%',
    height: height * 0.4,
    bottom: 0,
    position: 'absolute',
    zIndex: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  close: {
    position: 'absolute',
    top: 20,
    right: 10,
    zIndex: 20,
  },
  modelInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 20,
  },
  quantity: {
    width: '48%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 15,
  },
});

export default DetailScreen;
