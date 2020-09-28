import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
//Animatable
import * as Animatable from "react-native-animatable";
//icon
import { AntDesign } from "@expo/vector-icons";
//import CustomText
import CustomText from "../../../components/UI/CustomText";
//Color
import Colors from "../../../utils/Colors";
//number format
import NumberFormat from "../../../components/UI/NumberFormat";
//PropTypes check
import PropTypes from "prop-types";

const { width, height } = Dimensions.get("window");

export const DetailBody = ({ item, color }) => {
  return (
    <View style={[styles.footer]}>
      <Animatable.View
        animation="lightSpeedIn"
        delay={1000}
        style={styles.footer_header}
      >
        <CustomText selectable={true} style={{ ...styles.title, color }}>
          {item.filename}
        </CustomText>
        <NumberFormat
          style={{ color: "#fff", fontSize: 13 }}
          price={item.price}
          color={color}
        />
      </Animatable.View>
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Animatable.View animation="bounceIn" delay={1600}>
          <AntDesign name="star" size={15} color={color} />
        </Animatable.View>
        <Animatable.View animation="bounceIn" delay={1700}>
          <AntDesign name="star" size={15} color={color} />
        </Animatable.View>
        <Animatable.View animation="bounceIn" delay={1800}>
          <AntDesign name="star" size={15} color={color} />
        </Animatable.View>
        <Animatable.View animation="bounceIn" delay={1900}>
          <AntDesign name="star" size={15} color={color} />
        </Animatable.View>
        <Animatable.View animation="bounceIn" delay={2000}>
          <AntDesign name="star" size={15} color={color} />
        </Animatable.View>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        delay={1000}
        style={styles.description}
      >
        <CustomText
          style={{
            ...styles.title,
            fontWeight: "500",
            marginTop: 20,
            marginBottom: 10,
            textDecorationLine: "underline",
          }}
        >
          Chi tiết
        </CustomText>
        <View style={styles.infoContainer}>
          <CustomText>Màu sắc: </CustomText>
          <CustomText style={{ color: color }}>{item.color}</CustomText>
        </View>
        <View style={styles.infoContainer}>
          <CustomText>Tình trạng: </CustomText>
          <CustomText>{item.standard}</CustomText>
        </View>
        <View style={styles.infoContainer}>
          <CustomText>Xuất xứ: </CustomText>
          <CustomText>{item.origin}</CustomText>
        </View>
        <CustomText
          style={{
            ...styles.title,
            textDecorationLine: "underline",
            fontWeight: "500",
            marginBottom: 10,
          }}
        >
          Miêu tả
        </CustomText>
        <CustomText selectable={true} style={styles.detail}>
          {item.description}
        </CustomText>
      </Animatable.View>
    </View>
  );
};

DetailBody.propTypes = {
  item: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  footer: {
    width,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 10,
    marginTop: 200,
    borderRadius: 30,
  },
  footer_header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 17,
    color: Colors.text,
  },
  detail: {
    fontSize: 15,
    lineHeight: 20,
  },

  price: {
    color: "#fff",
  },
  description: {
    marginTop: 10,
  },
  infoContainer: {
    marginBottom: 10,
    flexDirection: "row",
  },
});
