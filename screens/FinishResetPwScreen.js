import React from 'react';
import { View, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
//Icon
import { AntDesign } from '@expo/vector-icons';
import TextGeo from '../components/UI/TextGeo';
import Colors from '../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
const { height } = Dimensions.get('window');

const FinishResetPwScreen = (props) => {
  const { value } = props.route.params;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.info}>
        <View>
          <AntDesign
            name='checkcircleo'
            size={24}
            size={100}
            color={Colors.lighter_green}
          />
        </View>
        <TextGeo style={styles.title}>
          Link mật khẩu đã được gửi về email:
          <TextGeo
            style={{
              fontSize: 16,
              color: Colors.blue,
              textDecorationLine: 'underline',
            }}
            selectable={true}
          >
            {value.email}
          </TextGeo>
        </TextGeo>
      </View>
      <View style={styles.id}>
        <TextGeo style={styles.title}>
          Vui lòng kiểm tra hòm thư của bạn.{' '}
        </TextGeo>
      </View>
      <View style={styles.buttom}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('SignUpScreen')}
        >
          <TextGeo style={{ ...styles.title, color: '#fff' }}>
            Quay lại trang đăng nhập
          </TextGeo>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  info: {
    marginTop: height / 4,
    alignItems: 'center',
  },
  id: {
    flexDirection: 'row',
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.text,
  },
  buttom: {
    marginTop: 20,
    backgroundColor: Colors.lighter_green,
    width: 200,
    paddingVertical: 10,
    borderRadius: 5,
  },
});

export default FinishResetPwScreen;
