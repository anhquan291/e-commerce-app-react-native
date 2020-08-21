import * as Notifications from 'expo-notifications';
import React, { useEffect } from 'react';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

const LocalNotification = () => {
  useEffect(() => {
    const triggerNotificationHandler = () => {
      Notifications.scheduleNotificationAsync({
        content: {
          title: 'Ngày mới tốt lành bạn nhé ^^',
          body: 'Hãy lựa chọn sự may mắn, mua sự thành công cùng với CatTuong',
          data: { mySpecialData: 'Some text' },
        },
        trigger: {
          type: 'daily',
          hour: 7,
          minute: 30,
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
