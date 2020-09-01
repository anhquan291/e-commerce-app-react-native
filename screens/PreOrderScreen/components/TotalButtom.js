import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../../utils/Colors';
//Text
import CustomText from '../../../components/UI/CustomText';

const TotalButtom = ({ toPayment }) => {
  return (
    <View style={styles.total}>
      <TouchableOpacity onPress={toPayment}>
        <View style={styles.buttom}>
          <CustomText style={{ color: '#fff', fontSize: 16 }}>
            Tiến hành đặt hàng
          </CustomText>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  total: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingHorizontal: 10,
  },
  buttom: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 5,
  },
});

export default TotalButtom;
