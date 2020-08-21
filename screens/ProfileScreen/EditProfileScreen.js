import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextInput, Button } from 'react-native-paper';
import Colors from '../../utils/Colors';
//Redux
import { useDispatch } from 'react-redux';
//Action
import * as AuthActions from '../../store/auth/authActions';
import Loader from '../../components/Loaders/Loader';

const EditProfileScreen = (props) => {
  const { user } = props.route.params;
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(user.address);
  const [phone, setPhone] = useState(user.phone);
  const [disableButton, setDisableBottom] = useState(true);

  const dispatch = useDispatch();
  const unmounted = useRef(false);
  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);
  const updateInfoHandler = async () => {
    setLoading(true);
    if (phone.length !== 10 || address.length <= 6) {
      setLoading(false);
      return alert('Thông tin không hợp lệ');
    } else if (user.phone == phone && user.address === address) {
      setLoading(false);
      return alert('Thông tin trùng với thông tin cũ');
    }
    await dispatch(AuthActions.EditInfo(phone, address));
    setLoading(false);

    if (!unmounted.current) {
      Alert.alert('Cập nhật', 'Cập nhật thành công', [
        {
          text: 'Ok',
        },
      ]);
    }
  };

  useEffect(() => {});

  return (
    <View style={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <View style={styles.backIcon}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <MaterialCommunityIcons
                name='arrow-left'
                size={30}
                color='black'
              />
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
                style={{ height: 50, marginVertical: 10 }}
              />
              <TextInput
                label='Phone'
                value={phone}
                mode='outlined'
                theme={{ colors: { primary: Colors.leave_green } }}
                selectionColor={Colors.leave_green}
                onChangeText={(text) => setPhone(text)}
                style={{ height: 50, marginVertical: 10, fontSize: 18 }}
                keyboardType='numbers-and-punctuation'
              />
              <TextInput
                label='Address'
                value={address}
                mode='outlined'
                theme={{ colors: { primary: Colors.leave_green } }}
                selectionColor={Colors.leave_green}
                onChangeText={(text) => setAddress(text)}
                style={{ height: 50, marginVertical: 10, fontSize: 18 }}
              />
            </View>
            <View style={styles.button}>
              <Button
                icon='update'
                mode='contained'
                // disabled={disableButton}
                onPress={updateInfoHandler}
                style={{
                  height: 50,
                  justifyContent: 'center',
                  backgroundColor: Colors.leave_green,
                  marginHorizontal: 10,
                }}
              >
                Update Your Information
              </Button>
            </View>
          </View>
        </>
      )}
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

export default EditProfileScreen;
