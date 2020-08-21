import React from 'react';
import { View, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
//Icon
import { AntDesign } from '@expo/vector-icons';
import CustomText from '../../components/UI/CustomText';
import Colors from '../../utils/Colors';
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
        <CustomText style={styles.title}>
          Link được gửi về email:
          <CustomText
            style={{
              fontSize: 16,
              color: Colors.blue,
              textDecorationLine: 'underline',
            }}
            selectable={true}
          >
            {value.email}
          </CustomText>
        </CustomText>
      </View>
      <View style={styles.id}>
        <CustomText style={styles.title}>
          Vui lòng kiểm tra hòm thư của bạn.{' '}
        </CustomText>
      </View>
      <View style={styles.buttom}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('SignUpScreen')}
        >
          <CustomText style={{ ...styles.title, color: '#fff' }}>
            Quay lại trang đăng nhập
          </CustomText>
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
