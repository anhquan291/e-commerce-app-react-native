import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import KeyboardSpacer from "react-native-keyboard-spacer";
import PaymentFormView from "./PaymentFormView";
/**
 * The class renders a view with PaymentFormView
 */
export default class AddSubscriptionView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.cardFormWrapper}>
          <PaymentFormView {...this.props} />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoText: {
    fontSize: 18,
    textAlign: "center",
  },
});
