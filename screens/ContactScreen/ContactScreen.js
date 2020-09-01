import React from 'react';
import { View, StyleSheet } from 'react-native';
//Components
import Header from './components/Header';
import ContactBody from './components/ContactBody';

const ContactScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <ContactBody />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});

export default ContactScreen;
