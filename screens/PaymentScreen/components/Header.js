import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import Colors from "../../../utils/Colors";
//Text
import CustomText from "../../../components/UI/CustomText";
//Steps
import OrderSteps from "../../../components/UI/OrderSteps";
import { Ionicons } from "@expo/vector-icons";
const { width } = Dimensions.get("window");

const Header = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <View style={{ position: "absolute", bottom: 20, left: 15, zIndex: 10 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="ios-arrow-back"
            size={28}
            color={Colors.lighter_green}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.orderStepsContainer}>
        <CustomText style={styles.title}> Phương Thức Thanh Toán </CustomText>
        <View style={styles.orderSteps}>
          <OrderSteps position={2} />
        </View>
      </View>
      <View />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: width,
    backgroundColor: "#fff",
    height: Platform.OS === "ios" ? 120 : 100,
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 1,
  },
  title: {
    textAlign: "center",
    color: Colors.lighter_green,
    fontSize: 18,
    fontWeight: "500",
  },
  orderStepsContainer: {
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    justifyContent: "flex-end",
  },
  orderSteps: {
    width: (width * 50) / 100,
    marginVertical: 5,
  },
});

export default Header;
