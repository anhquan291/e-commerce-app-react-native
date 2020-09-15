import React, { useEffect } from "react";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

const LocalNotification = () => {
  const trigger =
    Platform.OS === "ios"
      ? {
          hour: 8,
          minute: 15,
          type: "daily",
        }
      : {
          hour: 8,
          minute: 15,
          repeats: true,
        };
  useEffect(() => {
    Notifications.cancelAllScheduledNotificationsAsync();
    const triggerNotificationHandler = async () => {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Ngày mới tốt lành bạn nhé ^^",
          body: "Hãy lựa chọn sự may mắn, mua sự thành công cùng với CatTuong",
          data: { mySpecialData: "Some text" },
        },
        trigger: trigger,
      });
    };
    triggerNotificationHandler();
    //cancle
    // Notifications.cancelAllScheduledNotificationsAsync();
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
