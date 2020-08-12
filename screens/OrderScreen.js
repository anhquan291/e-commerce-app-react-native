import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
//Redux
import { useSelector } from 'react-redux';
//Colors
import Colors from '../constants/Colors';
// OrderItem
import OrderItem from '../components/Product/OrderItem';
//Icon
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TextGeo from '../components/UI/TextGeo';

const { height } = Dimensions.get('window');

const OrderScreen = (props) => {
  const [searchValue, setSearchValue] = useState('');
  const user = useSelector((state) => state.auth.user);
  const orders = useSelector((state) => state.order.orders);
  const [orderFilter, setOrderFilter] = useState([]);
  const [notFound, setNotFound] = useState('');
  // const searchHandler = async () => {
  //   const data = await orders.filter(
  //     (order) => order.id.toString() === searchValue
  //   );
  //   setOrderFilter(data);
  //   if (data.length === 0) {
  //     setNotFound('Không tìm thấy mã đơn hàng');
  //   } else {
  //     setNotFound('');
  //   }
  // };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={{ position: 'absolute', bottom: 15, left: 15, zIndex: 10 }}
        >
          <TouchableOpacity
            onPress={() => {
              props.navigation.toggleDrawer();
            }}
          >
            <MaterialCommunityIcons name='menu' size={25} color='#fff' />
          </TouchableOpacity>
        </View>
        <TextGeo style={styles.titleHeader}>Tra cứu đơn hàng</TextGeo>
        <View />
      </View>
      <View style={styles.footer}>
        {Object.keys(user).length === 0 ? (
          <View style={styles.center}>
            <TextGeo style={{ fontSize: 16 }}>
              Bạn cần đăng nhập để xem sản phẩm yêu thích!
            </TextGeo>
            <View
              style={{
                borderWidth: 1,
                paddingHorizontal: 15,
                paddingVertical: 5,
                borderColor: Colors.lighter_green,
                borderRadius: 5,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.navigate('SignUp')}
              >
                <TextGeo style={{ fontSize: 16, color: Colors.lighter_green }}>
                  Tiếp tục
                </TextGeo>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <FlatList
            data={orders}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              return <OrderItem order={item} />;
            }}
          />
        )}

        {/* <View style={styles.search}>
          <TextInput
            placeholder='Nhập mã đơn hàng'
            clearButtonMode='while-editing'
            keyboardType='numeric'
            onChangeText={(value) => setSearchValue(value)}
          />
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.searchButton}>
            <TouchableOpacity onPress={searchHandler}>
              <TextGeo
                style={{ textAlign: 'center', fontSize: 15, color: '#fff' }}
              >
                Tìm đơn hàng
              </TextGeo>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.content}>
          <Text style={{ textAlign: 'center' }}>{notFound}</Text>
          <FlatList
            data={orderFilter}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              return <OrderItem order={item} />;
            }}
          />
        </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  header: {
    width: '100%',
    backgroundColor: Colors.lighter_green,
    justifyContent: 'flex-end',
    height: Platform.OS === 'android' ? 70 : height < 668 ? 70 : 90,
    paddingVertical: 10,
  },
  titleHeader: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
  },
  footer: {
    flex: 1,
    marginTop: 5,
    marginHorizontal: 15,
  },
  search: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 5,
  },
  searchContainer: {
    width: '100%',
    alignItems: 'center',
  },
  searchButton: {
    width: 150,
    marginVertical: 10,
    backgroundColor: Colors.blue,
    borderRadius: 5,
    paddingVertical: 10,
  },
  content: {
    marginVertical: 10,
  },
});

export default OrderScreen;
