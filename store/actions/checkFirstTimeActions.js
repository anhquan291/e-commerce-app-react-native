import { AsyncStorage } from 'react-native';

//Create dataStorage
const saveDataToStorage = (name, data) => {
  AsyncStorage.setItem(
    name,
    JSON.stringify({
      data,
    })
    //convert to string, but when you access in startup screen, have to convert to javascript object or array
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
