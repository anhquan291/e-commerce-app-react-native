import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
//Color
import Colors from '../../../utils/Colors';
//Icon
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

const Header = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.toggleDrawer();
          }}
        >
          <MaterialCommunityIcons name='menu' size={25} color='#fff' />
        </TouchableOpacity>
      </View>
      <Image
        style={styles.image}
        source={require('../../../assets/Images/logoTextWhite.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: height < 668 ? 30 : 50,
    left: 15,
    zIndex: 10,
  },
  header: {
    alignItems: 'center',
    height: 200,
    backgroundColor: Colors.lighter_green,
    justifyContent: 'center',
  },
  image: {
    marginTop: 15,
    height: 70,
    resizeMode: 'contain',
  },
});

export default Header;
