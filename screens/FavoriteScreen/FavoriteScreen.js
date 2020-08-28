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
import Colors from '../../utils/Colors';
//Icon
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
//Component
import FavoriteItem from './components/FavoriteItem';
//Text
import CustomText from '../../components/UI/CustomText';

const { height } = Dimensions.get('window');

const FavoriteScreen = (props) => {
  const user = useSelector((state) => state.auth.user);
  const FavoriteProducts = useSelector((state) => state.fav.favoriteList);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ position: 'absolute', bottom: 5, left: 15, zIndex: 10 }}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('HomeTab')}
          >
            <Ionicons
              name='ios-arrow-back'
              size={28}
              color={Colors.lighter_green}
            />
          </TouchableOpacity>
        </View>
        <CustomText style={styles.title}> Sản Phẩm Yêu Thích </CustomText>
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
          <CustomText>Bạn cần đăng nhập để xem giỏ hàng!</CustomText>
          <View
            style={{
              borderWidth: 1,
              paddingHorizontal: 15,
              paddingVertical: 10,
              backgroundColor: Colors.lighter_green,
              borderRadius: 5,
              borderColor: Colors.lighter_green,
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => props.navigation.navigate('SignUp')}
            >
              <CustomText style={{ color: '#fff' }}>Tiếp tục</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      ) : FavoriteProducts.length === 0 ? (
        <View style={styles.center}>
          <CustomText style={{ fontSize: 16 }}>
            Không có sản phẩm trong mục yêu thích
          </CustomText>
          <CustomText style={{ fontSize: 16 }}>
            Bắt đầu thêm sản phẩm nào !
          </CustomText>
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
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  header: {
    width: '100%',
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    height: Platform.OS === 'android' ? 70 : height < 668 ? 70 : 90,
    paddingVertical: 10,
  },
  title: {
    textAlign: 'center',
    color: Colors.lighter_green,
    fontSize: 20,
    fontWeight: '500',
  },
});
export default FavoriteScreen;
