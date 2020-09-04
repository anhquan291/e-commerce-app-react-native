import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
//Color
import Colors from '../../../utils/Colors';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import HorizontalItem from './HorizontalItem';

const ProductBody = ({ navigation, productsFilter }) => {
  return (
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
                return <HorizontalItem item={item} navigation={navigation} />;
              }}
            />
          )}
        </View>
        <View tabLabel='Nhẫn'></View>
        <View tabLabel='Đá quý'></View>
      </ScrollableTabView>
    </View>
  );
};
const styles = StyleSheet.create({
  footer: {
    marginTop: 5,
    flex: 1,
  },
});

export default ProductBody;
