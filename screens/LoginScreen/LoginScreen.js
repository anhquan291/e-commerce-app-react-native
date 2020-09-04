import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  ScrollView,
} from 'react-native';
import Colors from '../../utils/Colors';
//Components
import LoginForm from './components/LoginForm';
//Icon
import { Ionicons } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');

const SignUpScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={{ flex: 1, position: 'absolute', height, width }}
        source={require('../../assets/Images/flower3.jpg')}
        blurRadius={10}
      ></ImageBackground>

      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{ position: 'absolute', top: 50, left: 20 }}
      >
        <Ionicons name='ios-arrow-back' size={35} color={Colors.light_green} />
      </TouchableOpacity>

      <View style={styles.header}>
        <View>
          <Text style={styles.title}>LOGIN</Text>
        </View>
      </View>
      <LoginForm navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: height * 0.2,
    marginBottom: 40,
    marginHorizontal: 20,
  },

  title: {
    color: Colors.light_green,
    fontSize: 40,
    fontWeight: 'bold',
    letterSpacing: 5,
  },
  text: {
    color: '#fff',
  },
});

export default SignUpScreen;
