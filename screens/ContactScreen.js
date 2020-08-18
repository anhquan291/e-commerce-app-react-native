import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Text,
  Dimensions,
} from 'react-native';
//Text
import TextGeo from '../components/UI/TextGeo';
//Icon
import { MaterialCommunityIcons } from '@expo/vector-icons';
//Color
import Colors from '../constants/Colors';

const { height } = Dimensions.get('window');

const ContactScreen = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            position: 'absolute',
            top: height < 668 ? 30 : 50,
            left: 15,
            zIndex: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              props.navigation.toggleDrawer();
            }}
          >
            <MaterialCommunityIcons name='menu' size={25} color='#fff' />
          </TouchableOpacity>
        </View>
        <Image
          style={styles.image}
          source={require('../assets/Images/logoTextWhite.png')}
        />
      </View>
      <View style={styles.footer}>
        <TextGeo style={styles.title}>Liên hệ với chúng tôi</TextGeo>
        <View style={styles.info}>
          <TextGeo style={styles.text}>Địa chỉ: 14 Phan Ngữ</TextGeo>
          <View style={{ flexDirection: 'row' }}>
            <TextGeo style={styles.text}>Email: </TextGeo>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('mailto: anhquan291@gmail.com');
              }}
            >
              <TextGeo
                style={{
                  ...styles.text,
                  color: Colors.lighter_green,
                }}
              >
                anhquan291@gmail.com
              </TextGeo>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TextGeo style={styles.text}>Số điện thoại: </TextGeo>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('tel:0944942540');
              }}
            >
              <TextGeo
                style={{
                  ...styles.text,
                  color: Colors.lighter_green,
                }}
              >
                0944942540
              </TextGeo>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    alignItems: 'center',
    height: 200,
    backgroundColor: Colors.light_green,
    justifyContent: 'center',
  },
  image: {
    marginTop: 15,
    height: 70,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    color: Colors.text,
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginTop: -20,
  },
  text: {
    marginTop: 5,
    fontSize: 17,
  },
});

export default ContactScreen;
