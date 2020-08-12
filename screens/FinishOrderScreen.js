import React from 'react';
import { View, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
//Icon
import { AntDesign } from '@expo/vector-icons';
import TextGeo from '../components/UI/TextGeo';
import Colors from '../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
const { height } = Dimensions.get('window');

const FinishOrderScreen = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.info}>
        <View>
          <AntDesign
            name='checkcircleo'
            size={24}
            size={100}
            color={Colors.blue}
          />
        </View>
        <TextGeo style={styles.title}>
          Cảm ơn, bạn đã đặt hàng thành công ^^
        </TextGeo>
      </View>
      <View style={styles.id}>
        <TextGeo style={styles.title}>
          Chúng tôi sẽ xác nhận đơn hàng của bạn sớm nhất có thể.
        </TextGeo>
        {/* <TextGeo
          style={{
            fontSize: 16,
            color: Colors.blue,
            textDecorationLine: 'underline',
          }}
          selectable={true}
        >
          {id}
        </TextGeo> */}
      </View>
      <View style={styles.buttom}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
          <TextGeo style={{ ...styles.title, color: '#fff' }}>
            Quay lại trang chủ
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
    backgroundColor: Colors.blue,
    width: 200,
    paddingVertical: 10,
    borderRadius: 5,
  },
});

export default FinishOrderScreen;
