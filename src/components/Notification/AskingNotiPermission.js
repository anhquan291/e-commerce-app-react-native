import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

const AskingNotificationPermissonToken = async () => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    console.log('Failed to get push token for push notification!');
    token = '';
    return token;
  }
  token = (await Notifications.getExpoPushTokenAsync()).data;
  return token;
};

export default AskingNotificationPermissonToken;
