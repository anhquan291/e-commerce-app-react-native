import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
//Color
import Colors from '../../utils/Colors';
//Redux
import { useSelector } from 'react-redux';
//Components
import Snackbar from '../../components/Notification/Snackbar';
import {
  Header,
  DetailBody,
  ActionButton,
  ModalComp,
  Comments,
} from './components';
import { colorCheck } from '../../utils/Tools';

export const DetailScreen = (props) => {
  const scrollY = new Animated.Value(0);
  const user = useSelector((state) => state.auth.user);
  const { item } = props.route.params;
  const [message, setMessage] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [color, setColor] = useState(Colors.lighter_green);
  //color
  const type = item.color;
  const [modalVisible, setModalVisible] = useState(false);
  //Favorite
  const FavoriteProducts = useSelector((state) =>
    state.fav.favoriteList.some((product) => product._id === item._id),
  );
  useEffect(() => {
    const checkColor = async () => {
      const getColor = await colorCheck(type);
      setColor(getColor);
    };
    checkColor();
  }, [item]);

  return (
    <View style={styles.container}>
      {showSnackbar ? (
        <Snackbar checkVisible={showSnackbar} message={message} />
      ) : (
        <View />
      )}
      <Header navigation={props.navigation} scrollY={scrollY} item={item} />

      <Animated.ScrollView
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
      >
        <DetailBody item={item} color={color} />
        <Comments />
      </Animated.ScrollView>
      <ActionButton
        item={item}
        FavoriteProducts={FavoriteProducts}
        setShowSnackbar={setShowSnackbar}
        setModalVisible={setModalVisible}
        setMessage={setMessage}
        user={user}
        color={color}
      />
      <ModalComp
        item={item}
        color={color}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        navigation={props.navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingBottom: 20 },
});
