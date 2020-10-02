import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';
import Colors from '../../utils/Colors';

const MyComponent = ({ checkVisible, message }) => {
  const [visible, setVisible] = React.useState(checkVisible);

  const onDismissSnackBar = () => setVisible(false);

  return (
    <View style={[styles.container, { height: visible ? 50 : 0 }]}>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        style={styles.snackbar}
        theme={{ colors: { accent: '#fff' } }}
        action={{
          label: 'Dismiss',
          onPress: () => {
            onDismissSnackBar;
          },
        }}
      >
        {message}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    top: 80,
    zIndex: 1000,
  },
  snackbar: {
    backgroundColor: Colors.blue,
    fontSize: 16,
    height: 50,
  },
});

export default MyComponent;
