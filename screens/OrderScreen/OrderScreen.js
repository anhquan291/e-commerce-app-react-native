import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';

//Redux
import { useSelector, useDispatch } from 'react-redux';
//Action
import * as OrderActions from '../../store/order/orderActions';
//Colors
import Colors from '../../utils/Colors';
// OrderItem
import OrderItem from './components/OrderItem';
//Icon
import CustomText from '../../components/UI/CustomText';
import Header from './components/Header';
import OrderBody from './components/OrderBody';
import SkeletonLoadingCart from '../../components/Loaders/SkeletonLoadingCart';

const { height } = Dimensions.get('window');

const OrderScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const orders = useSelector((state) => state.order.orders);
  const dispatch = useDispatch();
  const loadOrders = useCallback(async () => {
    setLoading(true);
    setIsRefreshing(true);
    try {
      await dispatch(OrderActions.fetchOrder());
    } catch (err) {
      alert(err.message);
    }
    setIsRefreshing(false);
    setLoading(false);
  }, [dispatch, setIsRefreshing]);
  useEffect(() => {
    loadOrders();
  }, [user.userid]);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      {loading ? (
        <View style={styles.centerLoader}>
          <SkeletonLoadingCart />
        </View>
      ) : (
        <OrderBody
          user={user}
          orders={orders}
          isRefreshing={isRefreshing}
          loadOrders={loadOrders}
          navigation={navigation}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerLoader: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: Platform.OS === 'android' ? 70 : height < 668 ? 70 : 90,
  },
});

export default OrderScreen;
