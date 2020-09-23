import React from "react";
import { TouchableOpacity, Share } from "react-native";
//icon
import { FontAwesome } from "@expo/vector-icons";

const ShareItem = ({ imageURL, title, message, color }) => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        title: title,
        message: message,
        url: imageURL,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <TouchableOpacity onPress={onShare}>
      <FontAwesome name='share-square-o' size={25} color='white' />
    </TouchableOpacity>
  );
};

export default ShareItem;
