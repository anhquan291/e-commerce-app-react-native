import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Colors from '../../../utils/Colors';
import CustomText from '../../../components/UI/CustomText';

const Detail = ({ icon, content }) => {
  const Icon =
    icon === 'location-on' || icon === 'person'
      ? MaterialIcons
      : MaterialCommunityIcons;
  return (
    <View style={styles.infoContainer}>
      <Icon name={icon} size={28} color={Colors.grey} />
      <CustomText style={styles.detailText}>{content}</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
    height: 60,
    alignItems: 'center',
  },
  detailText: {
    fontWeight: '500',
    color: Colors.text,
  },
});

export default Detail;
