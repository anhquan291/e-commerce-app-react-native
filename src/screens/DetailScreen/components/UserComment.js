import React from "react";
import { View, StyleSheet, Image, Platform } from "react-native";
import CustomText from "../../../components/UI/CustomText";
import Colors from "../../../utils/Colors";

const UserComment = ({ comment }) => {
  return (
    <View style={styles.userCommentContainer}>
      <View style={styles.profileContainer}>
        <Image
          style={styles.profilePic}
          source={require("../../../assets/Images/defaultprofile.jpg")}
        />
      </View>
      <View style={{ justifyContent: "center", width: "80%" }}>
        <CustomText style={styles.name}>{comment.username}</CustomText>
        <CustomText>{comment.content}</CustomText>
      </View>
    </View>
  );
};

export default UserComment;

const styles = StyleSheet.create({
  userCommentContainer: {
    flexDirection: "row",
    paddingVertical: 20,
    borderBottomColor: Colors.grey,
    borderBottomWidth: 1,
  },
  profileContainer: {
    justifyContent: "center",
    marginRight: 10,
  },
  profilePic: {
    resizeMode: Platform.OS === "android" ? "cover" : "contain",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: Colors.grey,
    marginBottom: 5,
  },
});
