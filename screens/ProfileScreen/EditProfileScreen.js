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

const EditProfileScreen = (props) => {
  const { user } = props.route.params;
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(user.address);
  const [phone, setPhone] = useState(user.phone);
  const [disableButton, setDisableBottom] = useState(false);
  const dispatch = useDispatch();
  console.log(user);
  const unmounted = useRef(false);
  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);
  // useEffect(() => {
  //   if (address.length >= 6 && user.address !== address) {
  //     return setDisableBottom(false);
  //   }
  // }, [address, phone]);

  const updateInfoHandler = async () => {
    setLoading(true);

    await dispatch(AuthActions.EditInfo(phone, address));
    setLoading(false);
  };

  return (
    <View style={styles.container}>
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
              justifyContent: 'center',
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

export default EditProfileScreen;
