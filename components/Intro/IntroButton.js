import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Colors from '../../constants/Colors';
import TextGeo from '../UI/TextGeo';
const { height } = Dimensions.get('window');

const IntroButton = ({ navigation, EnterApp }) => {
  return (
    <View style={styles.button}>
      <View style={[styles.signIn, { width: '35%' }]}>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <TextGeo style={styles.textSign}>Đăng Nhập</TextGeo>
        </TouchableOpacity>
      </View>
      <View style={[styles.signIn, { width: '60%' }]}>
        <TouchableOpacity onPress={EnterApp}>
          <TextGeo style={styles.textSign}>Tiếp Tục Mua Sắm</TextGeo>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: height < 668 ? 80 : 130,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 15,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    borderColor: '#fff',
    borderWidth: 1,
    backgroundColor: Colors.lighter_green,
  },
  icon: {
    marginTop: 2,
    marginLeft: 10,
  },
  textSign: {
    fontSize: 15,
    color: '#fff',
  },
});

export default IntroButton;
