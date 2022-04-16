import AsyncStorage from '@react-native-async-storage/async-storage';
export const FIRST_OPEN = 'FIRST_OPEN';

//Create dataStorage
const saveDataToStorage = (name, data) => {
  AsyncStorage.setItem(
    name,
    JSON.stringify({
      data,
    }),
  );
};

//Check first Open
export const firstOpen = () => {
  saveDataToStorage('isFirstTime', 'First Time Open the App');
  // AsyncStorage.removeItem("isFirstTime");
  return {
    type: 'FIRST_OPEN',
  };
};
