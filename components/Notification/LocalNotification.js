import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

const LocalNotification = () => {
  useEffect(() => {
    const getPermissionsAsync = async () => {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
      return token;
    };
    getPermissionsAsync();
  }, []);

  useEffect(() => {
    const triggerNotificationHandler = () => {
      Notifications.scheduleNotificationAsync({
        content: {
          title: 'Ngày mới tốt lành bạn nhé ^^',
          body: 'Hãy lựa chọn sự may mắn, mua sự thành công cùng với CatTuong',
          data: { mySpecialData: 'Some text' },
        },
        trigger: {
          hour: 14,
          minute: 54,
        },
      });
    };
    triggerNotificationHandler();
    const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        // console.log(response);
      }
    );

    const foregroundSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        // console.log(notification);
      }
    );

    return () => {
      backgroundSubscription.remove();
      foregroundSubscription.remove();
    };
  }, []);

  //local notifications

  return <></>;
};

export default LocalNotification;
