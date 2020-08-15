import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  StatusBar,
  Alert,
} from 'react-native';
//Drawer
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Drawer } from 'react-native-paper';
//Color
import Colors from '../constants/Colors';
import TextGeo from './UI/TextGeo';
//Icon
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
// Action
import * as AuthActions from '../store/actions/authActions';
//Link
import OpenURLButton from './Link/OpenURL';

const fbURL = 'https://www.facebook.com/daquyankhangthinhvuong/';
const youtubeURL = 'https://www.youtube.com/';

const CustomDrawer = (props) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const Logout = () => {
    Alert.alert('Đăng Xuất', 'Bạn có chắc muốn đăng xuất?', [
      {
        text: 'Hủy',
        style: 'cancel',
      },
      {
        text: 'Đồng ý',
        onPress: () => {
          dispatch(AuthActions.Logout());
          props.navigation.navigate('Home');
        },
      },
    ]);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Image
          style={styles.logo}
          source={require('../assets/Images/logo1.png')}
        />
      </View>
      <DrawerContentScrollView {...props}>
        <View>
          {Object.keys(user).length === 0 ? (
            <></>
          ) : (
            <>
              <View style={styles.actionButton}>
                <TextGeo
                  style={{
                    color: Colors.green,
                    fontSize: 20,
                    paddingHorizontal: 10,
                  }}
                >
                  Hi, {user.name}
                </TextGeo>
                <FontAwesome5
                  name='smile-beam'
                  size={24}
                  color={Colors.lighter_green}
                />
              </View>
            </>
          )}
          <DrawerItemList {...props} />
          <Drawer.Section style={styles.drawerSection}></Drawer.Section>

          <View style={styles.social}>
            <OpenURLButton url={fbURL}>
              <Image
                style={{ resizeMode: 'contain', width: 80, height: 80 }}
                source={require('../assets/Images/social1.png')}
              />
            </OpenURLButton>
            <OpenURLButton url={youtubeURL}>
              <Image
                style={{ resizeMode: 'contain', width: 80, height: 80 }}
                source={require('../assets/Images/social3.png')}
              />
            </OpenURLButton>
            <OpenURLButton url={fbURL}>
              <Image
                style={{ resizeMode: 'contain', width: 80, height: 80 }}
                source={require('../assets/Images/social2.png')}
              />
            </OpenURLButton>
          </View>
        </View>
      </DrawerContentScrollView>
      {Object.keys(user).length === 0 ? (
        <></>
      ) : (
        <DrawerItem
          onPress={Logout}
          label={() => (
            <View style={styles.logout}>
              <MaterialCommunityIcons
                name='logout'
                size={25}
                style={{ marginRight: 30 }}
                color={Colors.dark}
              />
              <TextGeo style={{ fontSize: 16, color: Colors.dark }}>
                Đăng xuất
              </TextGeo>
            </View>
          )}
        />
      )}

      <View style={styles.version}>
        <DrawerItem
          label={() => (
            <TextGeo
              style={{ fontFamily: 'geoMetricItalic', color: Colors.grey }}
            >
              CatTuong App Version 1.0
            </TextGeo>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  logo: {
    resizeMode: 'contain',
    width: '80%',
    height: 100,
  },
  logoutSection: {
    backgroundColor: Colors.lighter_green,
    borderRadius: 5,
    marginHorizontal: 10,
    height: 50,
    marginVertical: 20,
  },
  actionButton: {
    flexDirection: 'row',
    marginHorizontal: 10,
    height: 40,
    marginBottom: 10,
  },
  drawerSection: {
    marginTop: 10,
  },
  social: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  logout: {
    display: 'flex',
    flexDirection: 'row',
  },
  version: {
    height: 60,
    borderTopWidth: 1,
    borderTopColor: Colors.light_grey,
  },
});

export default CustomDrawer;
