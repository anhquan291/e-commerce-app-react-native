import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Field, reduxForm } from 'redux-form';
import TextGeo from '../components/UI/TextGeo';
//Colors
import Colors from '../constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
//Icon
import { Feather } from '@expo/vector-icons';
//Redux
import { useDispatch } from 'react-redux';
//Action
import * as AuthActions from '../store/actions/authActions';

//Validation
const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Email không được bỏ trống';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Email không hơp lệ';
  }
  return errors;
};

const renderField = ({
  keyboardType,
  icon,
  placeholder,
  meta: { touched, error, warning },
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
              height: 50,
              padding: 5,
              width: '80%',
              marginLeft: 10,
            }}
            placeholder={placeholder}
            keyboardType={keyboardType}
            onChangeText={onChange}
            {...restInput}
          />
        </View>
      </View>
      {touched &&
        ((error && (
          <Text style={{ color: 'red', marginVertical: 5 }}>{error}</Text>
        )) ||
          (warning && (
            <Text style={{ color: 'orange', marginVertical: 5 }}>
              {warning}
            </Text>
          )))}
    </View>
  );
};

const ForgetPwScreen = (props) => {
  const { handleSubmit, reset } = props;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const unmounted = useRef(false);
  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);
  const submit = async (values) => {
    try {
      setLoading(true);
      await dispatch(AuthActions.ForgetPassword(values.email));
      setLoading(false);
      reset();
      if (!unmounted.current) {
        props.navigation.navigate('FinishResetScreen', {
          value: values,
        });
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
        <TextGeo style={styles.title}> Quên mật khẩu </TextGeo>
        <Field
          name='email'
          keyboardType='email-address'
          icon='email-outline'
          placeholder='Email người của bạn'
          component={renderField}
        />
        <TouchableOpacity
          onPress={handleSubmit(submit)}
          style={{ marginVertical: 10, alignItems: 'center' }}
        >
          <View style={styles.signIn}>
            {loading ? (
              <ActivityIndicator size='small' color='#fff' />
            ) : (
              <TextGeo style={styles.textSign}>Tiếp Tục</TextGeo>
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
  form: 'contact', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
})(ForgetPwScreen);

export default SignupForm;
