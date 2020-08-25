import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Dimensions,
} from 'react-native';
//Text
import CustomText from '../../components/UI/CustomText';
//Icon
import { MaterialCommunityIcons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
//Color
import Colors from '../../utils/Colors';

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
          source={require('../../assets/Images/logoTextWhite.png')}
        />
      </View>
      <View style={styles.footer}>
        <CustomText style={styles.title}>contact us</CustomText>
        <View style={styles.info}>
          <View style={styles.detailContainer}>
            <LottieView
              source={require('../../components/IconAnimation/location.json')}
              autoPlay
              loop
              resizeMode='contain'
              style={{ height: 50, marginRight: 20 }}
            />
            <CustomText style={styles.text}>14 Phan Ngữ</CustomText>
          </View>

          <View style={styles.detailContainer}>
            <LottieView
              source={require('../../components/IconAnimation/email3.json')}
              autoPlay
              loop
              resizeMode='contain'
              style={{ height: 50, marginRight: 20 }}
            />
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('mailto: anhquan291@gmail.com');
              }}
            >
              <CustomText style={styles.text}>Anhquan291@gmail.com</CustomText>
            </TouchableOpacity>
          </View>
          <View style={styles.detailContainer}>
            <LottieView
              source={require('../../components/IconAnimation/phone2.json')}
              autoPlay
              loop
              resizeMode='contain'
              style={{ height: 50, marginRight: 20 }}
            />
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('tel:0968729194');
              }}
            >
              <CustomText style={styles.text}>0968729194</CustomText>
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
    fontWeight: '500',
    textTransform: 'uppercase',
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
  info: {
    marginTop: 20,
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ContactScreen;
