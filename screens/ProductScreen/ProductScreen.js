import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
//redux
import { useSelector } from "react-redux";
//Component
import { ProductBody, Header } from "./components";

export const ProductScreen = (props) => {
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  footer: {
    marginTop: 5,
    flex: 1,
  },
});
