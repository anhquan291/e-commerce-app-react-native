import React from "react";
import { StyleSheet, View } from "react-native";
import PaymentFormView from "./PaymentFormView";
/**
 * The class renders a view with PaymentFormView
 */
export const AddSubscriptionView = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.cardFormWrapper}>
        <PaymentFormView {...props} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoText: {
    fontSize: 18,
    textAlign: "center",
  },
});
