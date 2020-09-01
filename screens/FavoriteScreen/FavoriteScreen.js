import React from 'react';
import { View, StyleSheet } from 'react-native';
//Redux
import { useSelector } from 'react-redux';
//Component
import Header from './components/Header';
import FavoriteBody from './components/FavoriteBody';

const FavoriteScreen = ({ navigation }) => {
  const user = useSelector((state) => state.auth.user);
  const FavoriteProducts = useSelector((state) => state.fav.favoriteList);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <FavoriteBody
        user={user}
        FavoriteProducts={FavoriteProducts}
        navigation={navigation}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default FavoriteScreen;
