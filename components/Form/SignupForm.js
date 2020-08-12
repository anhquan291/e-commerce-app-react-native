import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
//Animation
import * as Animatable from 'react-native-animatable';
//Colors
import Colors from '../../constants/Colors';
//Icon
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TextGeo from '../UI/TextGeo';
//Redux
import { useDispatch, useSelector } from 'react-redux';
//Action
import * as ProductActions from '../../store/shop-actions';

//Validation
const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Email không được bỏ trống';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Email không hơp lệ';
  }
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
  if (!values.username) {
    errors.username = 'Tên không được bỏ trống';
  } else if (values.username.length > 20) {
    errors.username = 'Tên không vượt quá 20 ký tự';
  }

  return errors;
};

const renderField = ({
  label,
  keyboardType,
  secureTextEntry,
  icon,
  showPass,
  passIcon,
  placeholder,
  setShowPass,
  showConfirmPass,
  setshowConfirmPass,
  meta: { touched, error, warning },
  input: { onChange, ...restInput },
}) => {
  return (
    <View
      style={{
        flexDirection: 'column',
        height: 80,
        alignItems: 'flex-start',
        width: '100%',
        marginBottom: 5,
      }}
    >
      <View
        style={{
          height: 60,
          width: '100%',
          borderBottomWidth: 1,
          borderBottomColor: Colors.grey,
        }}
      >
        <TextGeo
          style={{
            fontSize: 15,
            fontWeight: '500',
            width: '100%',
            color: Colors.lighter_green,
          }}
        >
          {label}
        </TextGeo>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcons
            name={icon}
            size={22}
            color={Colors.lighter_green}
          />
          <TextInput
            style={{
              height: 37,
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

const SignupComponent = (props) => {
  const { handleSubmit, reset } = props;
  const [isSignup, setIsSignup] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmPass, setshowConfirmPass] = useState(false);
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();
  const submit = (values) => {
    setLoading(true);
    if (!isSignup) {
      dispatch(ProductActions.Login(values.email, values.password));
      setLoading(false);
      if (error) {
        return;
      }
      reset();
      props.navigation.navigate('Home');
    } else {
      dispatch(
        ProductActions.SignUp(values.username, values.email, values.password)
      );
      setLoading(false);
      reset();
      setIsSignup(false);
      alert('Sign Up Successfully');
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Animatable.View
        style={{
          flex: 1,
          flexDirection: 'column',
          marginHorizontal: 20,
          justifyContent: 'flex-end',
          flex: 1,
        }}
        animation='slideInUp'
      >
        {!isSignup ? (
          <View>
            <Field
              name='email'
              keyboardType='email-address'
              label='Email'
              icon='email-outline'
              placeholder='Email của bạn'
              component={renderField}
            />
            <Field
              name='password'
              keyboardType='default'
              label='Mật Khẩu'
              component={renderField}
              secureTextEntry={!showPass ? true : false}
              placeholder='Mật khẩu của bạn'
              passIcon='pass'
              icon='lock-outline'
              showPass={showPass}
              setShowPass={setShowPass}
            />
          </View>
        ) : (
          <Animatable.View animation='slideInUp'>
            <Field
              name='username'
              keyboardType='default'
              label='Tên của bạn'
              component={renderField}
              placeholder='Tên của bạn'
              icon='account-outline'
            />
            <Field
              name='email'
              keyboardType='email-address'
              label='Email'
              icon='email-outline'
              placeholder='Email của bạn'
              component={renderField}
            />
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
          </Animatable.View>
        )}

        <View style={styles.group}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('ForgetPwScreen');
            }}
          >
            <TextGeo style={{ ...styles.textSignSmall, fontWeight: '600' }}>
              Quên mật khẩu ?
            </TextGeo>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={handleSubmit(submit)}
          style={{ marginVertical: 10, alignItems: 'center' }}
        >
          <View style={styles.signIn}>
            <TextGeo style={styles.textSign}>
              {loading ? (
                <ActivityIndicator
                  style={{ paddingTop: 10 }}
                  size='small'
                  color='#fff'
                />
              ) : !isSignup ? (
                'Đăng nhập'
              ) : (
                'Đăng ký'
              )}
            </TextGeo>
          </View>
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            onPress={() => {
              setIsSignup((prevState) => !prevState);
            }}
          >
            <TextGeo style={styles.textSignSmall}>
              {isSignup ? (
                <TextGeo>Đăng nhập</TextGeo>
              ) : (
                <TextGeo>
                  Chưa phải thành viên,
                  <TextGeo style={{ fontFamily: 'geoMetricBold' }}>
                    {' '}
                    Đăng ký
                  </TextGeo>
                </TextGeo>
              )}
            </TextGeo>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }} />
      </Animatable.View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  group: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  signIn: {
    width: '100%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    backgroundColor: Colors.lighter_green,
  },
  textSign: {
    fontSize: 15,
    color: '#fff',
  },
  textSignSmall: {
    color: Colors.lighter_green,
    textAlign: 'center',
  },
});
const SignupForm = reduxForm({
  form: 'contact', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
})(SignupComponent);

export default SignupForm;
