import React, { useCallback } from 'react';
import * as RootNavigation from '../navigation/RootNavigation';
import { TouchableOpacity, StyleSheet } from 'react-native';
import * as Linking from 'expo-linking';

export const OpenURL = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);
  return <TouchableOpacity onPress={handlePress}>{children}</TouchableOpacity>;
};

//Handle Deep Link
export const urlRedirect = (url) => {
  if (!url) return;
  // parse and redirect to new url
  let { path, queryParams } = Linking.parse(url);
  // console.log(
  //   `Linked to app with path: ${path} and data: ${JSON.stringify(
  //     queryParams
  //   )}`
  // );
  if (path) {
    RootNavigation.navigate(path, queryParams);
  }
  return;
};

//Handle Fetching timeout
export const timeoutPromise = (url) => {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new alert('Timeout'));
    }, 10000);
    url.then(
      (res) => {
        clearTimeout(timeoutId);
        resolve(res);
      },
      (err) => {
        clearTimeout(timeoutId);
        reject(err);
      }
    );
  });
};

export const uploadProfilePic = async (id, token, imageUri, filename, type) => {
  try {
    let formData = new FormData();
    // Infer the type of the image
    await formData.append('profilePic', {
      uri: imageUri,
      name: filename,
      type,
    });
    await fetch(`http://192.168.0.27:8080/api/v1/user/photo/${id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });
  } catch (err) {
    throw err;
  }
};
