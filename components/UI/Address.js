import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import { TextInput } from 'react-native-paper';
//Select box
import RNPickerSelect from 'react-native-picker-select';
import { MaterialIcons } from '@expo/vector-icons';
//Provinces
import ProvincesData from '../../utils/ProvincesData';
import Provinces from '../../utils/Proinces';
//Colors
import Colors from '../../utils/Colors';
//PropTypes check
import PropTypes from 'prop-types';
import CustomText from './CustomText';

const { width } = Dimensions.get('window');
// TextInput.defaultProps.allowFontScaling = false;

const Address = ({ getInfor }) => {
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
      <View>
        <CustomText style={styles.title}>Thông tin giao hàng</CustomText>
        <View style={styles.info}>
          <View style={[styles.inputBox]}>
            <TextInput
              label='Họ và tên'
              mode='outlined'
              theme={{ colors: { primary: Colors.leave_green } }}
              selectionColor={Colors.leave_green}
              onChangeText={(value) => setName(value)}
              style={styles.input}
              clearButtonMode='always'
              autoCapitalize='words'
            />
          </View>
          <View style={[styles.inputBox]}>
            <TextInput
              label='Số điện thoại'
              mode='outlined'
              theme={{ colors: { primary: Colors.leave_green } }}
              selectionColor={Colors.leave_green}
              onChangeText={(value) => setPhone(value)}
              style={styles.input}
              clearButtonMode='always'
              keyboardType='numeric'
              returnKeyType='done'
            />
          </View>
          <View style={[styles.inputBox]}>
            <TextInput
              label='Địa chỉ'
              mode='outlined'
              theme={{
                colors: {
                  primary: Colors.leave_green,
                  borderColor: Colors.light_grey,
                },
              }}
              selectionColor={Colors.leave_green}
              onChangeText={(value) => setAddress(value)}
              style={styles.input}
              clearButtonMode='always'
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
    justifyContent: 'center',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#fff',
  },
  boxSelect: {
    borderWidth: 1,
    height: 50,
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingHorizontal: 10,
    borderColor: Colors.text,
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
