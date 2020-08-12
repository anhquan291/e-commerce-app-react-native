import React from 'react';
import { View, StyleSheet } from 'react-native';
//Color
import Colors from '../../constants/Colors';
//number format
import NumberFormat from 'react-number-format';
//Text
import TextGeo from '../UI/TextGeo';

const Number = (props) => {
  return (
    <NumberFormat
      value={props.price}
      displayType={'text'}
      thousandSeparator={true}
      suffix={' đ'}
      renderText={(formattedValue) => (
        <View
          style={
            props.color
              ? { ...styles.priceContainer, backgroundColor: props.color }
              : styles.container
          }
        >
          <TextGeo style={{ ...styles.price, ...props.style }}>
            {formattedValue}
          </TextGeo>
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
    paddingTop: Platform.OS === 'android' ? 0 : 5,
    paddingBottom: Platform.OS === 'android' ? 5 : 0,
  },
});

export default Number;
