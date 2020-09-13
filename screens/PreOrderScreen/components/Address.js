import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet, Dimensions, Platform } from "react-native";
//Select box
import RNPickerSelect from "react-native-picker-select";
import { MaterialIcons } from "@expo/vector-icons";
//Provinces
import ProvincesData from "../../../utils/ProvincesData";
import Provinces from "../../../utils/Proinces";
//Colors
import Colors from "../../../utils/Colors";
//PropTypes check
import PropTypes from "prop-types";

const { width } = Dimensions.get("window");
// TextInput.defaultProps.allowFontScaling = false;

const Address = ({ getInfo }) => {
  const [selectedProvince, setselectedProvince] = useState("");
  const [selectedTown, setselectedTown] = useState("");
  const initialTown = [{ label: "Chọn Quận/Huyện", value: "1" }];
  const [getTowns, setGetTowns] = useState(initialTown);
  //Filter Towns
  const townsFilter = useCallback(
    (name) => {
      if (name === "1") {
        setselectedTown("");
      } else {
        const towns = ProvincesData.filter(
          (province) => province.name === name
        );
        const town = towns.map((town) => {
          const result = Object.keys(town.cities).map((key) => {
            return town.cities[key];
          });
          const townsFilter = result.map((town) => {
            return { label: town, value: town };
          });
          return townsFilter;
        });
        setselectedProvince(name);
        setGetTowns(town[0]);
      }
    },
    [selectedProvince]
  );
  //get Address
  useEffect(() => {
    getInfo(selectedProvince, selectedTown);
  }, [selectedProvince, selectedTown]);
  //Show Icon
  const showIconPlatform =
    Platform.OS === "android" ? (
      <></>
    ) : (
      <MaterialIcons
        style={styles.icon}
        name='keyboard-arrow-down'
        size={25}
        color='black'
      />
    );
  return (
    <View style={styles.container}>
      <View style={[styles.boxSelect, { marginTop: 15 }]}>
        <View>
          <RNPickerSelect
            onValueChange={(value) => townsFilter(value)}
            placeholder={{ label: "Tỉnh/Thành phố", value: "1" }}
            items={Provinces}
            style={pickerSelectStyles}
            allowFontScaling={false}
          />
        </View>
        {showIconPlatform}
      </View>
      <View style={styles.boxSelect}>
        <View>
          <RNPickerSelect
            onValueChange={(value) => setselectedTown(value)}
            placeholder={{ label: "Quận/Huyện", value: "" }}
            items={getTowns}
            value={selectedTown}
            style={pickerSelectStyles}
            allowFontScaling={false}
          />
        </View>
        {showIconPlatform}
      </View>
    </View>
  );
};

Address.propTypes = {
  getInfo: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 10, backgroundColor: "#fff" },
  boxSelect: {
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 60,
    justifyContent: "space-between",
    marginBottom: 15,
    paddingHorizontal: 10,
    borderColor: Colors.text,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  icon: {
    position: "absolute",
    right: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 15,
    color: "black",
    paddingVertical: 10,
    width: width,
  },
  inputAndroid: {
    fontSize: 15,
    color: "black",
    paddingVertical: 10,
    paddingRight: width - 30,
  },
});

export default Address;
