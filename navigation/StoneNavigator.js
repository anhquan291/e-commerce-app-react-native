import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//Icon
import { MaterialCommunityIcons } from '@expo/vector-icons';
//Color
import Colors from '../constants/Colors';
//Custom Drawer
import CustomDrawer from '../components/CustomDrawer';
import TextGeo from '../components/UI/TextGeo';
//Screens
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import IntroScreen from '../screens/IntroScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import SignUpScreen from '../screens/SignupScreen';
import ContactScreen from '../screens/ContactScreen';
import CartScreen from '../screens/CartScreen';
import ProductScreen from '../screens/ProductScreen';
import OrderScreen from '../screens/OrderScreen';
import PreOrderScreen from '../screens/PreOrderScreen';
import FinishOrderScreen from '../screens/FinishOrderScreen';
import ForgetPwScreen from '../screens/ForgetPwScreen';
import ResetPwScreen from '../screens/ResetPwScreen';
import FinishResetPwScreen from '../screens/FinishResetPwScreen';
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
    <IntroStack.Screen
      name='SignUpScreen'
      component={SignUpScreen}
      options={{ headerShown: false }}
    />
    <IntroStack.Screen
      name='ForgetPwScreen'
      component={ForgetPwScreen}
      options={{ headerShown: false }}
    />
    <IntroStack.Screen
      name='FinishResetScreen'
      component={FinishResetPwScreen}
      options={{ headerShown: false }}
    />
  </IntroStack.Navigator>
);

const AuthStack = createStackNavigator();
export const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name='SignUpScreen'
      component={SignUpScreen}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name='ForgetPwScreen'
      component={ForgetPwScreen}
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

export const TabScreen = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused }) => {
        let iconName;
        const color = focused ? Colors.light_green : Colors.grey;
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
      activeTintColor: Colors.light_green,
      inactiveTintColor: Colors.grey,
      labelStyle: {
        fontFamily: 'geoMetric',
      },
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
      options={({ navigation }) => ({
        tabBarLabel: 'Yêu thích',
      })}
    />
    <Tab.Screen
      name='Cart'
      component={CartStackScreen}
      options={({ navigation }) => ({
        tabBarLabel: 'Giỏ hàng',
      })}
    />
  </Tab.Navigator>
);
export const DrawerNavigator = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <Drawer.Navigator
      initialRouteName='IntroSlide'
      drawerContent={(props) => <CustomDrawer {...props} />}
      drawerContentOptions={{
        activeTintColor: Colors.grey,
        itemStyle: { marginVertical: 3 },
      }}
    >
      {/* <Drawer.Screen name="IntroSlide" component={IntroStackScreen} /> */}
      <Drawer.Screen
        name='HomeTab'
        component={TabScreen}
        options={({ navigation }) => ({
          title: ({ focused }) => (
            <TextGeo
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: focused ? Colors.lighter_green : Colors.grey,
              }}
            >
              Trang chủ
            </TextGeo>
          ),
          drawerIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name='home-outline'
              size={25}
              color={focused ? Colors.lighter_green : Colors.grey}
            />
          ),
        })}
      />
      <Drawer.Screen
        name='Order'
        component={OrderScreen}
        options={({ navigation }) => ({
          title: ({ focused }) => (
            <TextGeo
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: focused ? Colors.lighter_green : Colors.grey,
              }}
            >
              Đơn hàng
            </TextGeo>
          ),
          drawerIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name='receipt'
              size={25}
              color={focused ? Colors.lighter_green : Colors.grey}
            />
          ),
        })}
      />
      <Drawer.Screen
        name='Contact'
        component={ContactScreen}
        options={({ navigation }) => ({
          title: ({ focused }) => (
            <TextGeo
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: focused ? Colors.lighter_green : Colors.grey,
              }}
            >
              Liên hệ
            </TextGeo>
          ),
          drawerIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name='contacts'
              size={25}
              color={focused ? Colors.lighter_green : Colors.grey}
            />
          ),
        })}
      />
      {Object.keys(user).length === 0 ? (
        <Drawer.Screen
          name='SignUp'
          component={AuthStackScreen}
          options={({ navigation }) => ({
            title: ({ focused }) => (
              <TextGeo
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: focused ? Colors.lighter_green : Colors.grey,
                }}
              >
                Đăng nhập
              </TextGeo>
            ),
            drawerIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name='login'
                size={25}
                color={focused ? Colors.lighter_green : Colors.grey}
              />
            ),
          })}
        />
      ) : (
        <></>
      )}
    </Drawer.Navigator>
  );
};
