import React from 'react';
import { Text, StyleSheet, Platform } from 'react-native';
// Text.defaultProps.allowFontScaling = false;
const TextGeo = (props) => {
  return (
    <Text
      allowFontScaling={false}
      selectable={props.selectable}
      style={{ ...styles.text, ...props.style }}
    >
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'geoMetricMedium',
    paddingTop: Platform.OS === 'android' ? 0 : 6,
    paddingBottom: Platform.OS === 'android' ? 6 : 0,
    fontSize: 14,
  },
});

export default TextGeo;
