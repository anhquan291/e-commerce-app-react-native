import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import NumberFormat from 'react-number-format';
//PropTypes check
import PropTypes from 'prop-types';
import TextGeo from '../UI/TextGeo';

const PreOrderItem = ({ item }) => {
  const total = +item.quantity * +item.item.price;
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image
          style={{
            width: '100%',
            height: 60,
            resizeMode: 'stretch',
            borderRadius: 5,
          }}
          source={{ uri: item.item.thumb }}
        />
      </View>
      <View style={styles.right}>
        <View>
          <TextGeo style={styles.title}>{item.item.filename}</TextGeo>
        </View>
        <NumberFormat
          value={total.toString()}
          displayType={'text'}
          thousandSeparator={true}
          suffix={' đ'}
          renderText={(formattedValue) => (
            <View style={styles.priceContainer}>
              <TextGeo style={{ fontSize: 14, padding: 0 }}>
                SL: x {item.quantity}
              </TextGeo>
              <TextGeo style={styles.price}>{formattedValue}</TextGeo>
            </View>
          )}
        />
      </View>
    </View>
  );
};

PreOrderItem.propTypes = {
  item: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light_grey,
    flexDirection: 'row',
    paddingVertical: 10,
  },
  left: {
    width: '30%',
    height: '100%',
    alignItems: 'center',
  },
  right: {
    width: '70%',
    paddingLeft: 15,
  },
  title: {
    fontSize: 14,
    fontWeight: '400',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price: {
    color: Colors.red,
    fontSize: 14,
  },
});

export default PreOrderItem;
