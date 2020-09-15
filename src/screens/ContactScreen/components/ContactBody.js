import React from "react";
import { View, StyleSheet } from "react-native";
//Text
import CustomText from "../../../components/UI/CustomText";
import { TextIcon } from "./TextIcon";

export const ContactBody = () => {
  return (
    <View style={styles.footer}>
      <CustomText style={styles.title}>contact us</CustomText>
      <View style={styles.info}>
        <TextIcon
          icon={require("../../../components/IconAnimation/location.json")}
          text='14 Phan Ngữ'
          url='mailto: anhquan291@gmail.com'
        />
        <TextIcon
          icon={require("../../../components/IconAnimation/email3.json")}
          text='Anhquan291@gmail.com'
          url='mailto: anhquan291@gmail.com'
        />
        <TextIcon
          icon={require("../../../components/IconAnimation/phone2.json")}
          text='0968729194'
          url='tel:0968729194'
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "500",
    textTransform: "uppercase",
  },
  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginTop: -20,
  },
  info: {
    marginTop: 20,
  },
});
