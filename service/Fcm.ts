import firebase from 'react-native-firebase'
// import {NotificationOpen} from 'react-native-firebase'
import {Platform} from 'react-native'

const channelID: string = "fec_notif"
const channelName: string = "fec_notif_name"

export function createChannel() {
    const channel = new firebase.notifications.Android.Channel(channelID, channelName, firebase.notifications.Android.Importance.Max)
    .setDescription('A natural description of the channel')
    firebase.notifications().android.createChannel(channel);
}

export async function getToken(fcmToken: string, callbackToken: callBackToken) {
    if (!fcmToken || fcmToken === '') {
        fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
            callbackToken(fcmToken)
        }
    }
}

export async function checkPermission(fcmToken: string, callbackToken: callBackToken) {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
        getToken(fcmToken, callbackToken);
    } else {
        requestPermission(fcmToken, callbackToken);
    }
}

export async function requestPermission(fcmToken: string, callbackToken: callBackToken) {
    try {
        await firebase.messaging().requestPermission()
        getToken(fcmToken, callbackToken);
        
    } catch (error) {
        console.log('permission rejected');
    }
}
export type callBackToken = (this: void, newFcmToken: string,) => void

export type callBackOpen = (this: void, data: NotificationOpen,) => void
export type callBackForeground = (this: void, data: any,) => void
export type NotificationOpen = any

export async function createNotificationListeners(callbackOpen: callBackOpen, callBackForeground: callBackForeground) {
    
    firebase.notifications().onNotification((notification) => {
        if (Platform.OS === "ios") {
            const localNotification = new firebase.notifications.Notification()
            .setNotificationId(notification.notificationId)
            .setTitle(notification.title)
            .setBody(notification.body)
            .setData(notification.data);
            // .ios.setBadge(notification.ios.badge);
  
          firebase.notifications()
            .displayNotification(localNotification)
            .catch(err => console.error(err));
        } else {
            const localNotification = new firebase.notifications.Notification().android.setChannelId(channelID)
                .setSound("default")
                .setNotificationId(notification.notificationId)
                .setTitle(notification.title)
                .setBody(notification.body)
                .setData(notification.data)
                .android.setChannelId('channelId') // e.g. the id you chose above
                .android.setColor('#000000') // you can set a color here
                .android.setPriority(firebase.notifications.Android.Priority.High);

            firebase.notifications()
                .displayNotification(localNotification)
                .catch(err => console.error(err));
        }
        
    })
    
    // firebase.notifications().onNotification(notification => {
    //     notification.android.setChannelId(channelID).setSound('default')
    //     firebase.notifications().displayNotification(notification)
    // });

    firebase.notifications().onNotificationOpened((notificationOpen) => {
        callbackOpen(notificationOpen)
    });

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
       callbackOpen(notificationOpen)
    }

     /*
    * Triggered for data only payload in foreground
    * */
    firebase.messaging().onMessage((message) => {
      //process data message
      callBackForeground(message)
    });

}