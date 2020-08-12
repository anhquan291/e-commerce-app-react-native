import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  Platform,
  ScrollView,
} from 'react-native';
//Select box
import RNPickerSelect from 'react-native-picker-select';
import { MaterialIcons } from '@expo/vector-icons';
//Provinces
import ProvincesData from '../../constants/ProvincesData';
import Provinces from '../../constants/Proinces';
//Colors
import Colors from '../../constants/Colors';
//PropTypes check
import PropTypes from 'prop-types';
import TextGeo from './TextGeo';

const { width } = Dimensions.get('window');
TextInput.defaultProps.allowFontScaling = false;

const Address = ({ getInfor, children }) => {
  const [selectedProvince, setselectedProvince] = useState('');
  const [selectedTown, setselectedTown] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const initialTown = [{ label: 'Chọn Quận/Huyện', value: '1' }];
  const [getTowns, setGetTowns] = useState(initialTown);
  //Filter Towns
  const townsFilter = useCallback(
    (name) => {
      if (name === '1') {
        setselectedTown('');
      } else {
        const towns = ProvincesData.filter(
          (province) => province.name === name
        );
        const town = towns.map((town) => {
          const result = Object.keys(town.cities).map((key) => {
            return town.cities[key];
          });
          const townsFilter = result.map((town) => {
            return { label: town, value: town };
          });
          return townsFilter;
        });
        setselectedProvince(name);
        setGetTowns(town[0]);
      }
    },
    [selectedProvince]
  );
  //change color when focus
  const [colorName, setColorName] = useState(Colors.grey);
  const [colorAddress, setColorAddress] = useState(Colors.grey);
  const [colorPhone, setColorPhone] = useState(Colors.grey);
  const onFocus = (name) => {
    name === 'name'
      ? setColorName(Colors.lighter_green)
      : name === 'address'
      ? setColorAddress(Colors.lighter_green)
      : setColorPhone(Colors.lighter_green);
  };
  const onBlur = () => {
    setColorName(Colors.grey);
    setColorAddress(Colors.grey);
    setColorPhone(Colors.grey);
  };
  //get Address
  getInfor(name, phone, address, selectedProvince, selectedTown);
  //Show Icon
  const showIconPlatform =
    Platform.OS === 'android' ? (
      <></>
    ) : (
      <MaterialIcons
        style={styles.icon}
        name='keyboard-arrow-down'
        size={25}
        color='black'
      />
    );
  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <TextGeo style={styles.title}>Thông tin giao hàng</TextGeo>
          <View style={styles.info}>
            <View style={[styles.inputBox, { borderColor: colorName }]}>
              <TextInput
                placeholder='Họ và tên'
                clearButtonMode='always'
                onFocus={() => onFocus('name')}
                onBlur={onBlur}
                onChangeText={(value) => setName(value)}
              />
            </View>
            <View style={[styles.inputBox, { borderColor: colorPhone }]}>
              <TextInput
                placeholder='Số điện thoại'
                clearButtonMode='always'
                onFocus={() => onFocus('phone')}
                onBlur={onBlur}
                onChangeText={(value) => setPhone(value)}
                keyboardType='numeric'
              />
            </View>
            <View style={[styles.inputBox, { borderColor: colorAddress }]}>
              <TextInput
                placeholder='Địa chỉ'
                clearButtonMode='always'
                onFocus={() => onFocus('address')}
                onBlur={onBlur}
                onChangeText={(value) => setAddress(value)}
              />
            </View>
          </View>
          <View style={styles.boxSelect}>
            <View>
              <RNPickerSelect
                onValueChange={(value) => townsFilter(value)}
                placeholder={{ label: 'Tỉnh/Thành phố', value: '1' }}
                items={Provinces}
                style={pickerSelectStyles}
                allowFontScaling={false}
              />
            </View>
            {showIconPlatform}
          </View>
          <View style={styles.boxSelect}>
            <View>
              <RNPickerSelect
                onValueChange={(value) => setselectedTown(value)}
                placeholder={{ label: 'Quận/Huyện', value: '' }}
                items={getTowns}
                value={selectedTown}
                style={pickerSelectStyles}
                allowFontScaling={false}
              />
            </View>
            {showIconPlatform}
          </View>
        </View>
        <View>
          <TextGeo style={{ ...styles.title, marginVertical: 0 }}>
            Tóm tắt đơn hàng
          </TextGeo>
          {children}
        </View>
      </ScrollView>
    </View>
  );
};

Address.propTypes = {
  getInfor: PropTypes.func.isRequired,
  chidren: PropTypes.any,
};

const styles = StyleSheet.create({
  container: { flex: 1, marginHorizontal: 10 },
  title: {
    fontSize: 15,
    color: Colors.text,
    fontWeight: '500',
    marginVertical: 20,
  },
  inputBox: {
    height: 50,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: Colors.grey,
    borderRadius: 5,
    justifyContent: 'center',
    marginBottom: 15,
  },
  boxSelect: {
    borderWidth: 1,
    height: 50,
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingHorizontal: 10,
    borderColor: Colors.grey,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    right: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    color: 'black',
    paddingVertical: 10,
    width: width,
  },
  inputAndroid: {
    fontSize: 14,
    color: 'black',
    paddingVertical: 10,
    paddingRight: width - 30,
  },
});

export default Address;
