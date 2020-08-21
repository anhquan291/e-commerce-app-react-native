import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../utils/Colors';
//Animation
import * as Animatable from 'react-native-animatable';
//Components
import SignUpForm from './components/SignupForm';
//Icon
import { Feather } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

const SignUpScreen = (props) => {
  return (
    <View style={styles.container}>
      <Animatable.View animation='zoomIn' style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Home');
          }}
          style={{ position: 'absolute', top: 50, left: 20 }}
        >
          <Feather name='arrow-left-circle' size={30} color='#fff' />
        </TouchableOpacity>
        <Text style={styles.title}>Welcome</Text>
      </Animatable.View>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : null}
        style={styles.footer}
      >
        <ScrollView>
          <SignUpForm navigation={props.navigation} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.bg,
  },
  title: {
    color: '#fff',
    fontSize: 45,
    fontWeight: 'bold',
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
    // overflow: 'hidden',
    zIndex: -2,
  },
  text: {
    color: '#fff',
  },
});

export default SignUpScreen;
