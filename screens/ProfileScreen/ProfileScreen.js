import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Alert,
  ActionSheetIOS,
} from 'react-native';
import Colors from '../../utils/Colors';
import CustomText from '../../components/UI/CustomText';
import { FontAwesome5 } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
//Redux
import { useDispatch, useSelector } from 'react-redux';
//Action
import * as AuthActions from '../../store/auth/authActions';
//Icon
import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const ProfileScreen = (props) => {
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);
  const [imageUri, setImageUri] = useState('');
  const [filename, setFilename] = useState('');
  const [type, setType] = useState('');
  const [uploadButton, setUploadButton] = useState(true);

  const UploadProfileHandler = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Take Photo', 'Choose From Library'],
        // destructiveButtonIndex: 2,
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          _pickImage('camera');
        } else if (buttonIndex === 2) {
          _pickImage('library');
        }
      }
    );
  const dispatch = useDispatch();
  const unmounted = useRef(false);
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
  const _pickImage = async (action) => {
    const type =
      action === 'library'
        ? ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
          })
        : ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
          });
    try {
      if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(
          Permissions.CAMERA_ROLL,
          Permissions.CAMERA
        );
        if (status !== 'granted') {
          return alert(
            'Sorry, we need camera roll permissions to make this work!'
          );
        }
      }

      let result = await type;
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
      <View style={styles.header}>
        {/* <CustomText style={styles.headerText}>Profile</CustomText> */}
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.profileBox}>
          <View style={styles.editButton}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('ProfileEdit', { user })}
            >
              <FontAwesome5
                name='user-edit'
                size={20}
                color={Colors.leave_green}
              />
            </TouchableOpacity>
          </View>
          <View style={{ width: 120, height: 50 }}>
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
                transform: [{ translateY: -110 }],
              }}
            >
              <View style={styles.cameraContainer}>
                <TouchableOpacity onPress={UploadProfileHandler}>
                  <FontAwesome5 name='camera' size={15} color='white' />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <CustomText style={styles.userName}>{user.name}</CustomText>
          <View style={styles.footer}>
            <View style={styles.titleContainer}>
              <CustomText style={styles.title}>Thông tin cá nhân</CustomText>
            </View>
            <View style={styles.infoContainer}>
              <FontAwesome name='id-card-o' size={22} color={Colors.grey} />
              <CustomText style={styles.detailText}>{user.name}</CustomText>
            </View>
            <View style={styles.infoContainer}>
              <MaterialCommunityIcons
                name='email-outline'
                size={28}
                color={Colors.grey}
              />
              <CustomText style={styles.detailText}>{user.email}</CustomText>
            </View>
            <View style={styles.infoContainer}>
              <MaterialCommunityIcons
                name='phone'
                size={28}
                color={Colors.grey}
              />
              <CustomText style={styles.detailText}>
                {user.phone.length === 0 ? 'Not added yet' : user.phone}
              </CustomText>
            </View>
            <View style={styles.infoContainer}>
              <MaterialIcons name='location-on' size={28} color={Colors.grey} />
              <CustomText style={styles.detailText}>
                {user.address.length === 0 ? 'Not added yet' : user.address}
              </CustomText>
            </View>
            <View style={styles.button}>
              <Button
                icon='camera'
                mode='contained'
                loading={loading}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width,
    flexDirection: 'row',
    height: 0.15 * height,
    justifyContent: 'center',
  },
  headerText: {
    marginTop: 50,
    fontSize: 30,
    color: Colors.lighter_green,
  },
  profileContainer: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width,
    alignItems: 'center',
  },
  profilePic: {
    resizeMode: 'contain',
    width: 120,
    height: 120,
    borderRadius: 60,
    transform: [{ translateY: -70 }],
    borderWidth: 3,
    borderColor: '#fff',
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
    paddingHorizontal: 20,
  },
  titleContainer: {
    height: 30,
  },

  title: {
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
    height: 60,
    alignItems: 'center',
  },
  detailText: {
    fontWeight: '500',
    color: Colors.text,
  },
  button: {
    marginTop: 30,
  },
});

export default ProfileScreen;
