import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
//Icon
import { AntDesign } from '@expo/vector-icons';
//Colors
import Colors from '../../../utils/Colors';
//NumberFormat
import NumberFormat from '../../../components/UI/NumberFormat';
//Text
import CustomText from '../../../components/UI/CustomText';
//PropTypes check
import PropTypes from 'prop-types';

const productItem = ({ item, navigation, user }) => {
  const [isLoading, setIsLoading] = useState(true);
  const unmounted = useRef(false);
  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);
  const toDetail = () => {
    navigation.navigate('Detail', { item });
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',
          height: 90,

          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity onPress={toDetail}>
          <Image
            source={{ uri: item.thumb }}
            style={styles.image}
            onLoadStart={() => {
              setIsLoading(true);
            }}
            onLoadEnd={() => setIsLoading(false)}
          />
        </TouchableOpacity>
        {isLoading && (
          <ActivityIndicator
            size='small'
            color={Colors.grey}
            style={{ position: 'absolute', left: 0, right: 0, top: 40 }}
          />
        )}
      </View>
      <View style={styles.center}>
        <CustomText style={styles.name}>{item.filename}</CustomText>
      </View>
      <View style={styles.info}>
        <View style={styles.rate}>
          <AntDesign name='star' color='#fed922' size={15} />
          <Text style={styles.score}>5.0</Text>
        </View>
        <NumberFormat price={item.price} />
      </View>
      <View style={{ marginHorizontal: 5 }}>
        <TouchableOpacity style={styles.btn} onPress={toDetail}>
          <CustomText style={styles.detailBtn}>Xem chi tiết</CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

productItem.propTypes = {
  item: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    height: 190,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: '100%',
    borderRadius: 8,
    aspectRatio: 16 / 9,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    marginTop: 3,
    color: Colors.lighter_green,
    textAlign: 'center',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    marginHorizontal: 5,
    justifyContent: 'space-between',
  },
  rate: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 2,
  },
  score: {
    fontSize: 12,
    marginLeft: 5,
    color: Colors.text,
  },
  btn: {
    width: '100%',
    height: 35,
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 2,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.lighter_green,
  },
  detailBtn: {
    color: Colors.lighter_green,
    marginRight: 5,
  },
});
export default productItem;
