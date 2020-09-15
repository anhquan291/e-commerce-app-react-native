import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TextInput, Button } from "react-native-paper";
import Colors from "../../utils/Colors";
//Redux
import { useDispatch, useSelector } from "react-redux";
//Action
import { EditInfo } from "../../reducers";
//Loader
import Loader from "../../components/Loaders/Loader";

export const EditProfileScreen = (props) => {
  const { user } = props.route.params;
  const loading = useSelector((state) => state.auth.isLoading);
  const [address, setAddress] = useState(user.address);
  const [phone, setPhone] = useState(user.phone);
  const [disableButton, setDisableBotton] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.phone !== phone || user.address !== address) {
      setDisableBotton(false);
    }
  }, [address, phone]);

  const updateInfoHandler = async () => {
    if (phone.length === 10 && address.length >= 6) {
      try {
        await dispatch(EditInfo(phone, address));
        props.navigation.navigate("Profile");
      } catch (err) {
        alert(err);
      }
    } else {
      return Alert.alert("Error", "Thông tin không hợp lệ. Vui lòng nhập lại", [
        {
          text: "OK",
        },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? <Loader /> : <></>}
      <View style={styles.backIcon}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <MaterialCommunityIcons name='arrow-left' size={30} color='black' />
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.infoContainer}>
          <TextInput
            label='Email'
            value={user.email}
            disabled
            mode='outlined'
            theme={{ colors: { primary: Colors.leave_green } }}
            selectionColor={Colors.leave_green}
            style={{ marginVertical: 10 }}
          />
          <TextInput
            label='Phone'
            value={phone}
            mode='outlined'
            theme={{ colors: { primary: Colors.leave_green } }}
            selectionColor={Colors.leave_green}
            onChangeText={(text) => setPhone(text)}
            style={{ marginVertical: 10 }}
            keyboardType='numeric'
            returnKeyType='done'
          />
          <TextInput
            label='Address'
            value={address}
            mode='outlined'
            theme={{ colors: { primary: Colors.leave_green } }}
            selectionColor={Colors.leave_green}
            onChangeText={(text) => setAddress(text)}
            style={{ marginVertical: 10 }}
            autoCapitalize='words'
          />
        </View>
        <View style={styles.button}>
          <Button
            icon='update'
            mode='contained'
            loading={loading}
            disabled={disableButton}
            onPress={updateInfoHandler}
            style={{
              height: 50,
              justifyContent: "center",
              backgroundColor: Colors.leave_green,
              marginHorizontal: 10,
            }}
          >
            Update Your Information
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backIcon: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  infoContainer: {
    paddingHorizontal: 10,
  },
  button: {
    marginTop: 30,
  },
});
