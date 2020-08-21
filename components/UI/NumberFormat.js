import React from 'react';
import { View, StyleSheet } from 'react-native';
//Color
import Colors from '../../utils/Colors';
//number format
import NumberFormat from 'react-number-format';
//Text
import CustomText from './CustomText';

const Number = ({ price, color }, props) => {
  return (
    <NumberFormat
      value={price}
      displayType={'text'}
      thousandSeparator={true}
      suffix={' đ'}
      renderText={(formattedValue) => (
        <View
          style={
            color
              ? { ...styles.priceContainer, backgroundColor: props.color }
              : styles.container
          }
        >
          <CustomText style={{ ...styles.price, ...props.style }}>
            {formattedValue}
          </CustomText>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
  priceContainer: {
    paddingHorizontal: 7,
    paddingTop: 4,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
  },
  price: {
    color: Colors.red,
    fontSize: 14,
  },
});

export default Number;
