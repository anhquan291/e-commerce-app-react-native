import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionPresets,
} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//Icon
import { MaterialCommunityIcons } from '@expo/vector-icons';
//Color
import Colors from '../utils/Colors';
//Custom Drawer
import CustomDrawer from './CustomDrawer';
import CustomText from '../components/UI/CustomText';
//Screens
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import DetailScreen from '../screens/DetailScreen/DetailScreen';
import IntroScreen from '../screens/IntroScreen/IntroScreen';
import FavoriteScreen from '../screens/FavoriteScreen/FavoriteScreen';
import FirstScreen from '../screens/FirstScreen/FirstScreen';
import SignupScreen from '../screens/SignupScreen/SignupScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import ContactScreen from '../screens/ContactScreen/ContactScreen';
import CartScreen from '../screens/CartScreen/CartScreen';
import ProductScreen from '../screens/ProductScreen/ProductScreen';
import OrderScreen from '../screens/OrderScreen/OrderScreen';
import PreOrderScreen from '../screens/PreOrderScreen/PreOrderScreen';
import PaymentScreen from '../screens/PaymentScreen/PaymentScreen';
import FinishOrderScreen from '../screens/PreOrderScreen/FinishOrderScreen';
import ForgetPwScreen from '../screens/ResetPwScreen/ForgetPwScreen';
import ResetPwScreen from '../screens/ResetPwScreen/ResetPwScreen';
import FinishResetPwScreen from '../screens/ResetPwScreen/FinishResetPwScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import EditProfileScreen from '../screens/ProfileScreen/EditProfileScreen';
//redux
import { useSelector } from 'react-redux';

//create Navigator
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const IntroStack = createStackNavigator();
export const IntroStackScreen = () => (
  <IntroStack.Navigator>
    <IntroStack.Screen
      name='IntroScreen'
      component={IntroScreen}
      options={{ headerShown: false }}
    />
  </IntroStack.Navigator>
);

const LoginStack = createStackNavigator();
export const LoginStackScreen = () => (
  <LoginStack.Navigator
    screenOptions={{
      headerShown: false,
      gestureEnabled: true,
      cardOverlayEnabled: true,
      ...TransitionPresets.ModalPresentationIOS,
    }}
    mode='modal'
  >
    <LoginStack.Screen
      name='LoginScreen'
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <LoginStack.Screen
      name='ForgetPwScreen'
      component={ForgetPwScreen}
      options={{ headerShown: false }}
    />
  </LoginStack.Navigator>
);

const AuthStack = createStackNavigator();
export const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name='FirstScreen'
      component={FirstScreen}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name='LoginScreen'
      component={LoginStackScreen}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name='SignupScreen'
      component={SignupScreen}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name='FinishResetScreen'
      component={FinishResetPwScreen}
      options={{ headerShown: false }}
    />
  </AuthStack.Navigator>
);

const FavoriteStack = createStackNavigator();
export const FavoriteStackScreen = () => (
  <FavoriteStack.Navigator
    screenOptions={{
      cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
    }}
  >
    <FavoriteStack.Screen
      name='FavoriteScreen'
      component={FavoriteScreen}
      options={{ headerShown: false }}
    />
    <FavoriteStack.Screen
      name='Detail'
      component={DetailScreen}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name='Reset'
      component={ResetPwScreen}
      options={{ headerShown: false }}
    />
  </FavoriteStack.Navigator>
);

const CartStack = createStackNavigator();
export const CartStackScreen = () => (
  <CartStack.Navigator>
    <CartStack.Screen
      name='CartScreen'
      component={CartScreen}
      options={{ headerShown: false }}
    />
    <CartStack.Screen
      name='Payment'
      component={PaymentScreen}
      options={{ headerShown: false }}
    />
    <CartStack.Screen
      name='PreOrderScreen'
      component={PreOrderScreen}
      options={{ headerShown: false }}
    />
  </CartStack.Navigator>
);

const ProductStack = createStackNavigator();
export const ProductStackScreen = () => (
  <ProductStack.Navigator
    screenOptions={{
      cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
    }}
  >
    <ProductStack.Screen
      name='ProductScreen'
      component={ProductScreen}
      options={{ headerShown: false }}
    />
    <ProductStack.Screen
      name='DetailScreen'
      component={DetailScreen}
      options={{ headerShown: false }}
    />
    <ProductStack.Screen
      name='CartScreen'
      component={CartStackScreen}
      options={{ headerShown: false }}
    />
  </ProductStack.Navigator>
);

const ProfileStack = createStackNavigator();

export const ProfileStackScreen = () => (
  <ProfileStack.Navigator
    screenOptions={{
      headerShown: false,
      gestureEnabled: true,
      cardOverlayEnabled: true,
      ...TransitionPresets.ModalPresentationIOS,
    }}
    mode='modal'
  >
    <ProfileStack.Screen
      name='Profile'
      component={ProfileScreen}
      options={{ headerShown: false }}
    />
    <ProfileStack.Screen
      name='ProfileEdit'
      component={EditProfileScreen}
      options={{ headerShown: false }}
    />
  </ProfileStack.Navigator>
);

const HomeStack = createStackNavigator();
export const HomeStackScreen = () => (
  <HomeStack.Navigator
    screenOptions={{
      cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
    }}
  >
    <HomeStack.Screen
      name='Home'
      component={HomeScreen}
      //animationEnabled: false , nằm trong option
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      name='Detail'
      component={DetailScreen}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      name='Cart'
      component={CartStackScreen}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      name='Product'
      component={ProductStackScreen}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      name='FinishOrder'
      component={FinishOrderScreen}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      name='ResetPw'
      component={ResetPwScreen}
      options={{ headerShown: false }}
    />
  </HomeStack.Navigator>
);

export const TabScreen = () => {
  const carts = useSelector((state) => state.cart.cartItems);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          const color = focused ? Colors.lighter_green : Colors.grey;
          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Favorite') {
            iconName = focused ? 'heart-multiple' : 'heart-multiple-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          }
          // You can return any component that you like here!
          return (
            <MaterialCommunityIcons name={iconName} size={25} color={color} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: Colors.lighter_green,
        inactiveTintColor: Colors.grey,
        labelStyle: {},
        style: {
          // borderTopLeftRadius: 15,
          // borderTopRightRadius: 15,
          // position: "absolute",
        },
      }}
    >
      <Tab.Screen
        name='HomeTab'
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Trang chủ',
        }}
      />
      <Tab.Screen
        name='Favorite'
        component={FavoriteStackScreen}
        options={() => ({
          tabBarLabel: 'Yêu thích',
        })}
      />
      <Tab.Screen
        name='Cart'
        component={CartStackScreen}
        options={() => ({
          tabBarLabel: 'Giỏ hàng',
          tabBarBadge: carts.items.length === 0 ? null : carts.items.length,
        })}
      />
    </Tab.Navigator>
  );
};
export const DrawerNavigator = () => {
  const user = useSelector((state) => state.auth.user);
  const drawers = [
    {
      name: 'HomeTab',
      screen: TabScreen,
      label: 'Trang Chủ',
      icon: 'home-outline',
    },
    {
      name: 'Order',
      screen: OrderScreen,
      label: 'Đơn Hàng',
      icon: 'receipt',
    },
    {
      name: 'Contact',
      screen: ContactScreen,
      label: 'Liên Hệ',
      icon: 'contacts',
    },
  ];

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      drawerContentOptions={{
        activeTintColor: Colors.grey,
        itemStyle: { marginVertical: 3 },
      }}
    >
      {drawers.map(({ name, icon, label, screen }) => {
        return (
          <Drawer.Screen
            key={name}
            name={name}
            component={screen}
            options={() => ({
              title: ({ focused }) => (
                <CustomText
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: focused ? Colors.lighter_green : Colors.grey,
                  }}
                >
                  {label}
                </CustomText>
              ),
              drawerIcon: ({ focused }) => (
                <MaterialCommunityIcons
                  name={icon}
                  size={23}
                  color={focused ? Colors.lighter_green : Colors.grey}
                />
              ),
            })}
          />
        );
      })}

      {Object.keys(user).length === 0 ? (
        <Drawer.Screen
          name='SignUp'
          component={AuthStackScreen}
          options={() => ({
            title: ({ focused }) => (
              <CustomText
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  color: focused ? Colors.lighter_green : Colors.grey,
                }}
              >
                Đăng nhập
              </CustomText>
            ),
            drawerIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name='login'
                size={23}
                color={focused ? Colors.lighter_green : Colors.grey}
              />
            ),
          })}
        />
      ) : (
        <Drawer.Screen
          name='Profile'
          component={ProfileStackScreen}
          options={() => ({
            title: ({ focused }) => (
              <CustomText
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  color: focused ? Colors.lighter_green : Colors.grey,
                }}
              >
                Thông Tin Cá Nhân
              </CustomText>
            ),
            drawerIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name='face-profile'
                size={25}
                color={focused ? Colors.lighter_green : Colors.grey}
              />
            ),
          })}
        />
      )}
    </Drawer.Navigator>
  );
};
