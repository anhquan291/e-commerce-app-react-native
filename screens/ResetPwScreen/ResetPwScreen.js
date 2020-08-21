import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Field, reduxForm } from 'redux-form';
import CustomText from '../../components/UI/CustomText';
//Colors
import Colors from '../../utils/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
//Icon
import { Feather } from '@expo/vector-icons';
//Redux
import { useDispatch } from 'react-redux';
//Import Action
import * as AuthActions from '../../store/auth/authActions';

//Validation
const validate = (values) => {
  const errors = {};

  if (!values.password) {
    errors.password = 'Mật khẩu không được bỏ trống';
  } else if (values.password.length < 6) {
    errors.password = 'Mật khẩu phải nhiều hơn hoặc bằng 6 ký tự';
  }
  if (!values.confirmpassword) {
    errors.confirmpassword = 'Mật khẩu không được bỏ trống';
  } else if (values.confirmpassword !== values.password) {
    errors.confirmpassword = 'Mật khẩu xác nhận không trùng khớp';
  }

  return errors;
};

const renderField = ({
  keyboardType,
  secureTextEntry,
  icon,
  showPass,
  passIcon,
  placeholder,
  setShowPass,
  showConfirmPass,
  setshowConfirmPass,
  meta: { touched, error },
  input: { onChange, ...restInput },
}) => {
  return (
    <View>
      <View
        style={{
          height: 50,
          width: '100%',
          borderBottomWidth: 1,
          borderBottomColor: Colors.grey,
          marginBottom: 10,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcons
            name={icon}
            size={22}
            color={Colors.lighter_green}
          />
          <TextInput
            style={{
              height: 40,
              padding: 5,
              width: '80%',
              marginLeft: 10,
            }}
            placeholder={placeholder}
            keyboardType={keyboardType}
            onChangeText={onChange}
            secureTextEntry={secureTextEntry}
            {...restInput}
          />
          {passIcon === 'pass' ? (
            <TouchableWithoutFeedback
              onPress={() => setShowPass((prev) => !prev)}
            >
              <MaterialCommunityIcons
                name={!showPass ? 'eye-off-outline' : 'eye-outline'}
                size={22}
                color={Colors.lighter_green}
              />
            </TouchableWithoutFeedback>
          ) : passIcon === 'confirm' ? (
            <TouchableWithoutFeedback
              onPress={() => setshowConfirmPass((prev) => !prev)}
            >
              <MaterialCommunityIcons
                name={!showConfirmPass ? 'eye-off-outline' : 'eye-outline'}
                size={22}
                color={Colors.lighter_green}
              />
            </TouchableWithoutFeedback>
          ) : (
            <View />
          )}
        </View>
      </View>
      {touched && error && (
        <Text style={{ color: 'red', marginVertical: 5 }}>{error}</Text>
      )}
    </View>
  );
};

const ResetPwScreen = (props) => {
  const { handleSubmit, reset } = props;
  const unmounted = useRef(false);
  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmPass, setshowConfirmPass] = useState(false);
  const url = props.route.params;
  const dispatch = useDispatch();
  const submit = async (values) => {
    setLoading(true);
    try {
      await dispatch(AuthActions(values.password, url));
      await setLoading(false);
      reset();
      if (!unmounted.current) {
        Alert.alert(
          'Đổi Thành công',
          'Bạn đã đổi mật khẩu thành công !',
          [
            {
              text: 'Trang chủ',
              onPress: () => props.navigation.navigate('Home'),
            },
          ],
          { cancelable: false }
        );
      }
    } catch (err) {
      throw err;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.goBack();
        }}
        style={{ position: 'absolute', top: 50, left: 20 }}
      >
        <Feather
          name='arrow-left-circle'
          size={30}
          color={Colors.lighter_green}
        />
      </TouchableOpacity>
      <View style={styles.content}>
        <CustomText style={styles.title}> Đặt lại mật khẩu </CustomText>
        <Field
          name='password'
          keyboardType='default'
          label='Mật Khẩu'
          component={renderField}
          secureTextEntry={!showPass ? true : false}
          placeholder='Mật khẩu của bạn'
          icon='lock-outline'
          passIcon='pass'
          showPass={showPass}
          setShowPass={setShowPass}
        />
        <Field
          name='confirmpassword'
          keyboardType='default'
          label='Xác Nhận Mật Khẩu'
          component={renderField}
          secureTextEntry={!showConfirmPass ? true : false}
          placeholder='Xác nhận mật khẩu'
          passIcon='confirm'
          icon='lock-outline'
          showConfirmPass={showConfirmPass}
          setshowConfirmPass={setshowConfirmPass}
        />
        <TouchableOpacity
          onPress={handleSubmit(submit)}
          style={{ marginVertical: 10, alignItems: 'center' }}
        >
          <View style={styles.signIn}>
            {loading ? (
              <ActivityIndicator size='small' color='#fff' />
            ) : (
              <CustomText style={styles.textSign}>Đặt Lại Mật Khẩu</CustomText>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    marginTop: '20%',
    height: 300,
    paddingHorizontal: 20,
  },
  title: {
    color: Colors.lighter_green,
    fontSize: 30,
  },
  signIn: {
    width: '100%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: Colors.lighter_green,
  },
  textSign: {
    fontSize: 15,
    color: '#fff',
  },
});
const SignupForm = reduxForm({
  form: 'resetPw', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
})(ResetPwScreen);

export default SignupForm;
