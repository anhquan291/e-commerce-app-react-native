import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
//Color
import Colors from '../../constants/Colors';
//icon
import { AntDesign } from '@expo/vector-icons';
//Text
import TextGeo from '../UI/TextGeo';
//NumberFormat
import NumberFormat from '../UI/NumberFormat';
//PropTypes check
import PropTypes from 'prop-types';

const HorizontalItem = ({ item, navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Detail', { item: item })}
        style={{ marginLeft: 5, width: '40%', marginRight: 10 }}
      >
        <Image
          style={{
            height: 90,
            width: '100%',
            resizeMode: 'stretch',
            borderRadius: 15,
          }}
          source={{ uri: item.thumb }}
          onLoadStart={() => {
            setIsLoading(true);
          }}
          onLoadEnd={() => setIsLoading(false)}
        />
        {isLoading && (
          <ActivityIndicator
            size='small'
            color={Colors.grey}
            style={{ position: 'absolute', left: 0, right: 0, top: 40 }}
          />
        )}
      </TouchableOpacity>
      <View style={styles.info}>
        <TextGeo style={styles.title}>{item.filename}</TextGeo>
        <TextGeo style={styles.subText}>{item.type}</TextGeo>
        <View style={styles.rateContainer}>
          <View style={styles.rate}>
            <AntDesign name='star' color='#fed922' size={15} />
            <TextGeo style={styles.score}>4.0</TextGeo>
          </View>
          <NumberFormat price={item.price} />
        </View>
      </View>
    </View>
  );
};

HorizontalItem.propTypes = {
  item: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  itemContainer: {
    height: 100,
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
  },
  info: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    width: '60%',
  },
  title: {
    fontSize: 15,
  },
  subText: {
    fontSize: 13,
    color: Colors.grey,
  },
  rateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
  },
  rate: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 5,
  },
  score: {
    fontSize: 12,
    marginLeft: 5,
    color: Colors.grey,
  },
});

export default HorizontalItem;
