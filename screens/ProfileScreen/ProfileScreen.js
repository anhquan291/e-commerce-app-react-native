import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Alert,
} from 'react-native';
import Colors from '../../utils/Colors';
import CustomText from '../../components/UI/CustomText';
import { FontAwesome5 } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import Loader from '../../components/Loaders/Loader';
//Redux
import { useDispatch, useSelector } from 'react-redux';
//Action
import * as AuthActions from '../../store/auth/authActions';

const { width, height } = Dimensions.get('window');

const ProfileScreen = (props) => {
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);
  const [imageUri, setImageUri] = useState('');
  const [filename, setFilename] = useState('');
  const [type, setType] = useState('');
  const [uploadButton, setUploadButton] = useState(true);
  const dispatch = useDispatch();
  const unmounted = useRef(false);
  console.log(user);
  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);
  const UploadProfile = async () => {
    setLoading(true);
    try {
      await dispatch(AuthActions.UploadProfilePic(imageUri, filename, type));
      setLoading(false);
      setUploadButton(true);
      if (!unmounted.current) {
        Alert.alert('Cập nhật', 'Cập nhật thành công', [
          {
            text: 'Ok',
          },
        ]);
      }
    } catch (err) {
      throw err;
    }
  };
  const _pickImage = async () => {
    try {
      if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          return alert(
            'Sorry, we need camera roll permissions to make this work!'
          );
        }
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });
      if (!result.cancelled) {
        let localUri = result.uri;
        let filename = localUri.split('/').pop();
        setImageUri(result.uri);
        setFilename(filename);
        setType(result.type);
        setUploadButton(false);
        // ImagePicker saves the taken photo to disk and returns a local URI to it
      }
    } catch (E) {
      console.log(E);
    }
  };
  return (
    <View style={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <View style={styles.header}>
            <CustomText style={styles.headerText}>Profile</CustomText>
          </View>
          <View style={styles.profileContainer}>
            <View style={styles.profileBox}>
              <View style={styles.editButton}>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('ProfileEdit', { user })
                  }
                >
                  <FontAwesome5
                    name='user-edit'
                    size={20}
                    color={Colors.leave_green}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ width: 100, height: 50 }}>
                <Image
                  style={styles.profilePic}
                  source={
                    imageUri.length === 0
                      ? user.profilePicture.length === 0
                        ? require('../../assets/Images/defaultprofile.jpg')
                        : { uri: user.profilePicture }
                      : { uri: imageUri }
                  }
                />
                <View
                  style={{
                    width: '100%',
                    alignItems: 'flex-end',
                    transform: [{ translateY: -80 }],
                  }}
                >
                  <View style={styles.cameraContainer}>
                    <TouchableOpacity onPress={_pickImage}>
                      <FontAwesome5 name='camera' size={15} color='white' />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <CustomText style={styles.userName}>{user.name}</CustomText>
              <View style={styles.footer}>
                <View style={styles.infoContainer}>
                  <CustomText style={styles.fieldText}>Email</CustomText>
                  <CustomText style={{ fontSize: 16 }}>{user.email}</CustomText>
                </View>
                <View style={styles.infoContainer}>
                  <CustomText style={styles.fieldText}>Phone</CustomText>
                  <CustomText style={{ fontSize: 16 }}>
                    {user.phone.length === 0 ? 'Not added yet' : user.phone}
                  </CustomText>
                </View>
                <View style={styles.infoContainer}>
                  <CustomText style={styles.fieldText}>Address</CustomText>
                  <CustomText style={{ fontSize: 16 }}>
                    {user.address.length === 0 ? 'Not added yet' : user.address}
                  </CustomText>
                </View>
                <View style={styles.button}>
                  <Button
                    icon='camera'
                    mode='contained'
                    onPress={UploadProfile}
                    disabled={uploadButton}
                    style={{
                      height: 50,
                      justifyContent: 'center',
                      backgroundColor: Colors.leave_green,
                    }}
                  >
                    Update Profile Picture
                  </Button>
                  {!uploadButton ? (
                    <Button
                      mode='contained'
                      onPress={() => {
                        setUploadButton(true), setImageUri('');
                      }}
                      disabled={uploadButton}
                      style={{
                        height: 50,
                        marginTop: 10,
                        justifyContent: 'center',
                        backgroundColor: Colors.leave_green,
                      }}
                    >
                      Cancle
                    </Button>
                  ) : (
                    <></>
                  )}
                </View>
              </View>
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
    backgroundColor: Colors.light_grey,
  },
  header: {
    // width,
    flexDirection: 'row',
    height: 0.3 * height,
    backgroundColor: Colors.leave_green,
    justifyContent: 'center',
  },
  headerText: {
    marginTop: 50,
    fontSize: 30,
    color: '#fff',
  },
  profileContainer: {
    width,
    height: 0.7 * height,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateY: height > 667 ? -100 : -50 }],
  },
  profileBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    height: '100%',
    width: width - 40,
    alignItems: 'center',
  },
  profilePic: {
    resizeMode: 'contain',
    width: 100,
    height: 100,
    borderRadius: 50,
    transform: [{ translateY: -50 }],
  },
  userName: {
    fontSize: 20,
    marginTop: 10,
    color: Colors.leave_green,
  },
  editButton: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  cameraContainer: {
    height: 30,
    width: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.leave_green,
  },
  footer: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
    height: 50,
    alignItems: 'center',
  },
  fieldText: {
    color: Colors.grey,
    fontSize: 16,
  },
  button: {
    marginTop: 30,
  },
});

export default ProfileScreen;
