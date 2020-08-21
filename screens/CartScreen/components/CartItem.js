import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
//Colors
import Colors from '../../../utils/Colors';
//NumberFormat
import NumberFormat from '../../../components/UI/NumberFormat';
//Icon
import { MaterialCommunityIcons } from '@expo/vector-icons';
//PropTypes check
import PropTypes from 'prop-types';

const CartItem = ({ item, onAdd, onDes, onRemove }) => {
  const sum = +item.item.price * +item.quantity;
  const checkDesQuantity = () => {
    if (item.quantity == 1) {
      Alert.alert(
        'Xóa giỏ hàng',
        'Bạn có chắc muốn xóa sản phẩm khỏi giỏ hàng?',
        [
          {
            text: 'Hủy',
          },
          {
            text: 'Đồng ý',
            onPress: onRemove,
          },
        ]
      );
    } else {
      onDes();
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image
          style={{
            width: '100%',
            height: 90,
            resizeMode: 'stretch',
            borderRadius: 5,
          }}
          source={{ uri: item.item.thumb }}
        />
      </View>
      <View style={styles.right}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.title}>{item.item.filename}</Text>
          <View>
            <TouchableOpacity onPress={onRemove}>
              <MaterialCommunityIcons name='close' size={20} color='#000' />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={{ color: Colors.grey, fontSize: 12, marginTop: 3 }}>
          Cung cấp bởi Cát Tường
        </Text>
        <NumberFormat price={sum.toString()} />
        <View style={styles.box}>
          <TouchableOpacity onPress={checkDesQuantity} style={styles.boxMin}>
            <MaterialCommunityIcons name='minus' size={16} />
          </TouchableOpacity>
          <View>
            <Text style={styles.boxText}>{item.quantity}</Text>
          </View>
          <TouchableOpacity onPress={onAdd} style={styles.boxMin}>
            <MaterialCommunityIcons name='plus' size={16} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    height: 110,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light_grey,
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
  left: {
    width: '35%',
    height: '100%',
    alignItems: 'center',
  },
  right: {
    width: '65%',
    paddingLeft: 15,
    height: 90,
    // overflow: "hidden",
  },
  title: {
    fontSize: 14,
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: Platform.OS === 'ios' ? 30 : 25,
    backgroundColor: Colors.light_grey,
    width: 90,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  boxMin: {
    width: '30%',
    alignItems: 'center',
  },
  boxText: {
    fontSize: 12,
  },
});

export default CartItem;
