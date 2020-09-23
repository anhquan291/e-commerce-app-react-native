import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionPresets,
} from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//Icon
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
//Color
import Colors from "../utils/Colors";
//Custom Drawer
import CustomDrawer from "./CustomDrawer";
import CustomText from "../components/UI/CustomText";
//Auth Screens
import { AuthScreen } from "../screens/AuthScreen";
import { IntroScreen } from "../screens/IntroScreen";
import { SignupScreen } from "../screens/SignupScreen";
import { LoginScreen } from "../screens/LoginScreen";
//Reset Screens
import { ForgetPwScreen } from "../screens/ForgetPasswordScreen";
import { ResetPwScreen } from "../screens/ResetPwScreen";
import { FinishResetPwScreen } from "../screens/FinishResetPwScreen";
//Home Screens
import { HomeScreen } from "../screens/HomeScreen";
import { ContactScreen } from "../screens/ContactScreen";
//Product Screens
import { CartScreen } from "../screens/CartScreen";
import { DetailScreen } from "../screens/DetailScreen";
import { FavoriteScreen } from "../screens/FavoriteScreen";
import { ProductScreen } from "../screens/ProductScreen";
//Order Screens
import { OrderScreen } from "../screens/OrderScreen";
import { PreOrderScreen } from "../screens/PreOrderScreen";
import { PaymentScreen } from "../screens/PaymentScreen";
import { AddCreditCardScreen } from "../screens/PaymentScreen";
import { FinishOrderScreen } from "../screens/FinishOrderScreen";
//Profile Screens
import { ProfileScreen } from "../screens/ProfileScreen";
import { EditProfileScreen } from "../screens/ProfileScreen";
//redux
import { useSelector } from "react-redux";

//create Navigator

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
      name='AuthScreen'
      component={AuthScreen}
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
  </FavoriteStack.Navigator>
);

const PaymentStack = createStackNavigator();
export const PaymentStackScreen = () => (
  <PaymentStack.Navigator
    screenOptions={{
      headerShown: false,
      gestureEnabled: true,
      cardOverlayEnabled: true,
      ...TransitionPresets.ModalPresentationIOS,
    }}
  >
    <PaymentStack.Screen
      name='PaymentScreen'
      component={PaymentScreen}
      options={{ headerShown: false }}
    />
    <PaymentStack.Screen
      name='AddCreditCardScreen'
      component={AddCreditCardScreen}
      options={{ headerShown: false }}
    />
  </PaymentStack.Navigator>
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
    <CartStack.Screen
      name='Payment'
      component={PaymentStackScreen}
      options={{ headerShown: false }}
    />
    <CartStack.Screen
      name='AddCreditCardScreen'
      component={AddCreditCardScreen}
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

//Tab
const Tab = createBottomTabNavigator();

export const TabScreen = () => {
  const carts = useSelector((state) => state.cart.cartItems);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          const color = focused ? Colors.lighter_green : Colors.grey;
          if (route.name === "HomeTab") {
            iconName = "home";
          } else if (route.name === "Favorite") {
            iconName = "hearto";
          } else if (route.name === "Cart") {
            iconName = "shoppingcart";
          }
          return <AntDesign name={iconName} size={23} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: Colors.lighter_green,
        inactiveTintColor: Colors.grey,
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
          tabBarLabel: "Trang chủ",
        }}
      />
      <Tab.Screen
        name='Favorite'
        component={FavoriteStackScreen}
        options={() => ({
          tabBarLabel: "Yêu thích",
        })}
      />
      <Tab.Screen
        name='Cart'
        component={CartStackScreen}
        options={() => ({
          tabBarLabel: "Giỏ hàng",
          tabBarBadge: carts.items.length === 0 ? null : carts.items.length,
        })}
      />
    </Tab.Navigator>
  );
};

//Drawer
const Drawer = createDrawerNavigator();
export const DrawerNavigator = () => {
  const user = useSelector((state) => state.auth.user);
  const drawers = [
    {
      name: "HomeTab",
      screen: TabScreen,
      label: "Trang Chủ",
      icon: "home-outline",
    },
    {
      name: "Order",
      screen: OrderScreen,
      label: "Đơn Hàng",
      icon: "receipt",
    },
    {
      name: "Contact",
      screen: ContactScreen,
      label: "Liên Hệ",
      icon: "contacts",
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
                    fontWeight: "500",
                    color: focused ? Colors.lighter_green : Colors.grey,
                    fontFamily: "Roboto-Medium",
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
                  fontWeight: "500",
                  color: focused ? Colors.lighter_green : Colors.grey,
                  fontFamily: "Roboto-Medium",
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
                  fontWeight: "500",
                  color: focused ? Colors.lighter_green : Colors.grey,
                  fontFamily: "Roboto-Medium",
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
