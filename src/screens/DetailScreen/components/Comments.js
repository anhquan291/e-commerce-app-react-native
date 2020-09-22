import React, { useRef } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Modalize } from "react-native-modalize";
import comments from "../../../db/Comments";

const { height } = Dimensions.get("window");

export const Comments = () => {
  const modalizeRef = useRef(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };
  return (
    <View>
      <TouchableOpacity onPress={onOpen}>
        <Text>Open the modal</Text>
      </TouchableOpacity>
      <Modalize
        ref={modalizeRef}
        modalHeight={500}
        modalStyle={{ backgroundColor: "red" }}
      >
        <Text>Comments</Text>
      </Modalize>
    </View>
  );
};
