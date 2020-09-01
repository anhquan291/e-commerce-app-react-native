import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  FlatList,
  Text,
} from 'react-native';
//redux
import { useSelector } from 'react-redux';
//Component
import ProductBody from './components/ProductBody';
import Header from './components/Header';
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
          <Header
            navigation={props.navigation}
            searchFilterFunction={searchFilterFunction}
          />
        </View>
      </TouchableWithoutFeedback>
      <ProductBody
        navigation={props.navigation}
        productsFilter={productsFilter}
      />
      {/* <View style={styles.footer}>
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
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  footer: {
    marginTop: 5,
    flex: 1,
  },
});

export default ProductScreen;
