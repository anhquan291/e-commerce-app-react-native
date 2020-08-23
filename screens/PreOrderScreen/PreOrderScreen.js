import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
//Icon
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../utils/Colors';
//Address
import Address from '../../components/UI/Address';
//PreOrderItem
import PreOrderItem from './components/PreOrderItem';
//Redux
import { useDispatch, useSelector } from 'react-redux';

//Number
import NumberFormat from '../../components/UI/NumberFormat';
//Text
import CustomText from '../../components/UI/CustomText';
import { ScrollView } from 'react-native-gesture-handler';
//Steps
import OrderSteps from '../../components/UI/OrderSteps';

const { height, width } = Dimensions.get('window');

const PreOrderScreen = (props) => {
  const unmounted = useRef(false);
  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);
  const carts = useSelector((state) => state.cart.cartItems);
  const [loading, setLoading] = useState(false);
  const { cartItems, total, cartId } = props.route.params;
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [province, setProvince] = useState('');
  const [town, setTown] = useState('');
  const getInfor = (name, phone, address, province, town) => {
    setName(name);
    setPhone(phone);
    setAddress(address);
    setProvince(province);
    setTown(town);
  };
  let orderItems = [];
  cartItems.map((item) => {
    orderItems.push({ item: item.item._id, quantity: item.quantity });
  });

  const fullAddress = `${address}, ${town} ,${province}`;
  //action Add Order
  const addOrder = async () => {
    // try {
    //   setLoading(true);
    //   if (
    //     name.length < 6 ||
    //     phone.length != 10 ||
    //     address.length < 5 ||
    //     province.length < 5 ||
    //     town.length < 5
    //   ) {
    //     Alert.alert(
    //       'Thông tin không hợp lệ',
    //       'Bạn vui lòng nhập đẩy đủ thông tin',
    //       [{ text: 'Nhập lại' }],
    //       { cancelable: false }
    //     );
    //     setLoading(false);
    //   } else {
    //     setLoading(false);
    //     if (!unmounted.current) {
    //       props.navigation.navigate('Payment', {
    //         fullAddress,
    //         orderItems,
    //         phone,
    //         total,
    //         cartId,
    //       });
    //     }
    //   }
    // } catch (err) {
    //   throw err;
    // }
    props.navigation.navigate('Payment', {
      fullAddress,
      orderItems,
      phone,
      total,
      cartId,
    });
  };
  useEffect(() => {
    if (carts.items.length === 0) {
      props.navigation.goBack();
    }
  }, [carts.items]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ position: 'absolute', bottom: 5, left: 15, zIndex: 10 }}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Ionicons
              style={{ marginBottom: 10 }}
              name='md-arrow-back'
              size={25}
              color='#fff'
            />
          </TouchableOpacity>
        </View>

        <View style={styles.orderStepsContainer}>
          <CustomText style={styles.title}> Địa chỉ giao hàng </CustomText>
          <View style={styles.orderSteps}>
            <OrderSteps position={1} />
          </View>
        </View>

        <View />
      </View>
      <ScrollView>
        <Address getInfor={getInfor} />
        <View>
          <CustomText style={{ ...styles.title, marginVertical: 0 }}>
            Tóm tắt đơn hàng
          </CustomText>
          {cartItems.map((item) => {
            return (
              <View key={item.item.createdAt}>
                <PreOrderItem item={item} />
              </View>
            );
          })}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#fff',
              marginBottom: 65,
              marginTop: 10,
              paddingHorizontal: 10,
            }}
          >
            <CustomText style={{ fontSize: 15, color: Colors.text }}>
              Thành tiền
            </CustomText>
            <NumberFormat price={total.toString()} />
          </View>
        </View>
      </ScrollView>
      <View style={styles.total}>
        <View
          style={{
            width: '100%',
            height: 50,
            backgroundColor: Colors.red,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            marginBottom: 5,
          }}
        >
          <TouchableOpacity onPress={addOrder}>
            {loading ? (
              <ActivityIndicator size='small' color='#fff' />
            ) : (
              <CustomText style={{ color: '#fff', fontSize: 16 }}>
                Tiến hành đặt hàng
              </CustomText>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    width: width,
    backgroundColor: Colors.lighter_green,
    height: 100,
  },
  title: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
  },
  total: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  orderStepsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
  },
  orderSteps: {
    width: (width * 50) / 100,
    marginVertical: 5,
  },
});

export default PreOrderScreen;
