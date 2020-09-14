import React from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
//import CustomText
import CustomText from "../../../components/UI/CustomText";
//icon
import { MaterialCommunityIcons } from "@expo/vector-icons";
//Color
import Colors from "../../../utils/Colors";
//number format
import NumberFormat from "../../../components/UI/NumberFormat";
//PropTypes check
import PropTypes from "prop-types";

const { width, height } = Dimensions.get("window");

export class ModalComp extends React.PureComponent {
  render() {
    const {
      item,
      color,
      modalVisible,
      setModalVisible,
      navigation,
    } = this.props;
    const moveToCart = () => {
      setModalVisible(false);
      navigation.navigate("Cart");
    };

    return (
      <Modal
        style={{
          flex: 1,
        }}
        animationType='slide'
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.modalContainer}></View>
        <View style={styles.modal}>
          <TouchableOpacity
            animation='zoomIn'
            style={styles.close}
            onPress={() => setModalVisible(false)}
          >
            <MaterialCommunityIcons
              name='window-close'
              size={24}
              color={color}
            />
          </TouchableOpacity>

          <View
            style={{ width: "90%", flexDirection: "row", alignItems: "center" }}
          >
            <MaterialCommunityIcons
              name='check-circle-outline'
              color={color}
              size={20}
            />
            <CustomText style={{ ...styles.success, color }}>
              Sản phẩm đã được thêm vào giỏ hàng
            </CustomText>
          </View>
          <View style={styles.modelInfo}>
            <View
              style={{ borderRadius: 20, width: "45%", overflow: "hidden" }}
            >
              <Image
                source={{ uri: item.thumb }}
                style={{
                  height: 100,
                  resizeMode: "stretch",
                }}
              />
            </View>
            <View style={styles.quantity}>
              <View>
                <CustomText style={{ ...styles.title, fontSize: 15 }}>
                  {item.filename}
                </CustomText>
                <CustomText style={{ fontSize: 12, color: Colors.grey }}>
                  Cung cấp bởi Cát Tường
                </CustomText>
              </View>
              <CustomText
                style={{ marginTop: 5, fontSize: 14, color: Colors.text }}
              >
                Thành tiền:
              </CustomText>
              <NumberFormat price={item.price} />
            </View>
          </View>
          <View
            style={{
              height: 55,
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={[
                styles.addCart,
                {
                  backgroundColor: color,
                },
              ]}
              onPress={moveToCart}
            >
              <CustomText style={styles.actionText}>Xem Giỏ Hàng</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

ModalComp.propTypes = {
  item: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  actionText: {
    fontSize: 15,
    textAlign: "center",
    color: "#fff",
  },

  modalContainer: {
    position: "absolute",
    backgroundColor: "black",
    opacity: 0.7,
    top: 0,
    width: width,
    height: height,
  },
  modal: {
    backgroundColor: "#fff",
    width: "100%",
    bottom: 0,
    position: "absolute",
    zIndex: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  addCart: {
    width: "75%",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
    height: 50,
    width: "100%",
  },
  success: {
    marginLeft: 10,
    fontSize: 15,
  },
  close: {
    position: "absolute",
    top: 20,
    right: 10,
    zIndex: 20,
  },
  modelInfo: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: 20,
  },
  quantity: {
    width: "48%",
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: 15,
  },
});
