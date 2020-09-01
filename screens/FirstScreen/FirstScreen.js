import React from 'react';
import { View, StyleSheet } from 'react-native';

import FirstBody from './components/FirstBody';

const FirstScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FirstBody navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FirstScreen;
