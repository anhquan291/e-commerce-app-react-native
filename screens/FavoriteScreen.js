import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
//Redux
import { useSelector } from 'react-redux';
//Colors
import Colors from '../constants/Colors';
//Icon
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
//Component
import FavoriteItem from '../components/Product/FavoriteItem';
//Text
import TextGeo from '../components/UI/TextGeo';

const { height } = Dimensions.get('window');

const FavoriteScreen = (props) => {
  const user = useSelector((state) => state.auth.user);
  const FavoriteProducts = useSelector((state) => state.fav.favoriteList);
  // console.log(FavoriteProducts);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ position: 'absolute', bottom: 5, left: 15, zIndex: 10 }}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('HomeTab')}
          >
            <Ionicons
              style={{ marginBottom: 10 }}
              name='md-arrow-back'
              size={25}
              color='#fff'
            />
          </TouchableOpacity>
        </View>
        <TextGeo style={styles.title}> Sản Phẩm Yêu Thích </TextGeo>
        <View
          style={{ position: 'absolute', bottom: 5, right: 15, zIndex: 10 }}
        >
          <MaterialCommunityIcons
            style={{ marginBottom: 10 }}
            name='heart-multiple'
            size={25}
            color={Colors.red}
          />
        </View>
      </View>
      {Object.keys(user).length === 0 ? (
        <View style={styles.center}>
          <TextGeo style={{ fontSize: 16 }}>
            Bạn cần đăng nhập để xem sản phẩm yêu thích!
          </TextGeo>
          <View
            style={{
              borderWidth: 1,
              paddingHorizontal: 15,
              paddingVertical: 5,
              borderColor: Colors.lighter_green,
              borderRadius: 5,
            }}
          >
            <TouchableOpacity
              onPress={() => props.navigation.navigate('SignUp')}
            >
              <TextGeo style={{ fontSize: 16, color: Colors.lighter_green }}>
                Tiếp tục
              </TextGeo>
            </TouchableOpacity>
          </View>
        </View>
      ) : FavoriteProducts.length === 0 ? (
        <View style={styles.center}>
          <TextGeo style={{ fontSize: 16 }}>
            Không có sản phẩm trong mục yêu thích
          </TextGeo>
          <TextGeo style={{ fontSize: 16 }}>
            Bắt đầu thêm sản phẩm nào !
          </TextGeo>
        </View>
      ) : (
        <FlatList
          data={FavoriteProducts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return <FavoriteItem navigation={props.navigation} item={item} />;
          }}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  header: {
    width: '100%',
    backgroundColor: Colors.lighter_green,
    justifyContent: 'flex-end',
    height: Platform.OS === 'android' ? 70 : height < 668 ? 70 : 90,
    paddingVertical: 10,
  },
  title: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
  },
});
export default FavoriteScreen;
