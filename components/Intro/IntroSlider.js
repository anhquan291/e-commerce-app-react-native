import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import TextGeo from '../UI/TextGeo';
import Colors from '../../constants/Colors';
//PropTypes check
import PropTypes from 'prop-types';

const { height } = Dimensions.get('window');

const IntroSlider = ({ imageUrl, text }) => {
  return (
    <View style={styles.slide}>
      <Image
        style={{
          resizeMode: 'contain',
          width: '100%',
          height: height / 2,
        }}
        source={imageUrl}
      />
      <TextGeo style={styles.text}>{text}</TextGeo>
    </View>
  );
};
IntroSlider.propTypes = {
  imageUrl: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    color: Colors.lighter_green,
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default IntroSlider;
