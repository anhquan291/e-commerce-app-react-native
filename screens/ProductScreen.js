import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  FlatList,
  Text,
} from 'react-native';
//redux
import { useSelector } from 'react-redux';
//icon
import { Ionicons } from '@expo/vector-icons';
//Component
import HorizontalItem from '../components/Product/HorizontalItem';
import SearchInput from '../components/Search/SearchInput';
//Color
import Colors from '../constants/Colors';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import ShareItem from '../components/Product/ShareItem';
//width height
const { height } = Dimensions.get('window');

const ProductScreen = (props) => {
  const products = useSelector((state) => state.store.products);
  const [productsFilter, setproductsFilter] = useState(products);
  const searchFilterFunction = (text) => {
    const data = products.filter((product) =>
      product.filename.toLowerCase().includes(text.toLowerCase())
    );
    setproductsFilter(data);
  };
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={styles.header}>
            <View
              style={{ position: 'absolute', left: 0, top: 40, zIndex: 10 }}
            >
              <TouchableOpacity
                onPress={() => {
                  props.navigation.goBack();
                }}
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: Colors.light_grey,
                  borderRadius: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Ionicons name='ios-arrow-back' size={20} color='black' />
              </TouchableOpacity>
            </View>
            <View
              style={{
                position: 'absolute',
                right: 0,
                top: 40,
                zIndex: 10,
                width: 40,
                height: 40,
                backgroundColor: Colors.light_grey,
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShareItem
                imageURL='https://www.facebook.com/daquyankhangthinhvuong/'
                title='Facebook Link'
                message='Facebook Link'
              />
            </View>
            <SearchInput inputValue={searchFilterFunction} />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.footer}>
        <ScrollableTabView
          initialPage={0}
          renderTabBar={() => <ScrollableTabBar />}
          tabBarUnderlineStyle={{
            backgroundColor: Colors.light_green,
            height: 2,
          }}
          tabBarActiveTextColor={Colors.light_green}
          tabBarInactiveTextColor={Colors.grey}
          tabBarTextStyle={{
            fontFamily: 'geoMetricBold',
            fontSize: 15,
            paddingTop: 3,
          }}
        >
          <View tabLabel='Vòng chuỗi'>
            {productsFilter.length === 0 ? (
              <View style={styles.center}>
                <Text style={{ color: Colors.grey }}>
                  Không tìm thấy sản phầm
                </Text>
              </View>
            ) : (
              <FlatList
                data={productsFilter}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => {
                  return (
                    <HorizontalItem item={item} navigation={props.navigation} />
                  );
                }}
              />
            )}
          </View>
          <View tabLabel='Nhẫn'></View>
          <View tabLabel='Đá quý'></View>
          <View tabLabel='Khác'></View>
        </ScrollableTabView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    marginHorizontal: 20,
  },
  center: {
    alignItems: 'center',
    marginTop: 30,
  },
  title: {
    marginTop: height < 668 ? 90 : 110,
  },
  titleText: {
    fontSize: height < 668 ? 30 : 37,
    fontFamily: 'geoMetricBold',
    color: Colors.text,
  },
  inputBox: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    height: height < 668 ? 45 : 60,
    alignItems: 'center',
    backgroundColor: Colors.light_grey,
    borderRadius: 15,
  },
  input: {
    marginLeft: 10,
    borderWidth: 0,
    fontSize: 16,
    width: '97%',
  },
  footer: {
    marginTop: 5,
    flex: 1,
  },
});

export default ProductScreen;
