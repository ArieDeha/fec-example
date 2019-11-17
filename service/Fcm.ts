import firebase from 'react-native-firebase'
// import {NotificationOpen} from 'react-native-firebase'

const channelID: string = "fec_notif"
const channelName: string = "fec_notif_name"

export function createChannel() {
    const channel = new firebase.notifications.Android.Channel(channelID, channelName, firebase.notifications.Android.Importance.Max)
    firebase.notifications().android.createChannel(channel);
}

export async function getToken(fcmToken: string, callbackToken: callBackToken) {
    if (!fcmToken || fcmToken === '') {
        fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
            callbackToken(fcmToken)
        }
    }
    console.log("we got token", fcmToken)
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
        firebase.messaging().requestPermission().then(enable => {
            getToken(fcmToken, callbackToken);
            console.log("ok")
        }).catch(error => {
            console.log(error)
        })
        // firebase.messaging().requestPermission()
        // .then(() => {
        //     // firebase.messaging().regi
        // })
        // .catch(error => {
        //     // User has rejected permissions  
        // });
        
    } catch (error) {
        console.log('permission rejected');
    }
}
export type callBackToken = (this: void, newFcmToken: string,) => void

export type callBackOpen = (this: void, data: NotificationOpen,) => void
export type callBackForeground = (this: void, data: any,) => void
export type NotificationOpen = any

export async function createNotificationListeners(callbackOpen: callBackOpen, callBackForeground: callBackForeground) {

    console.log("create notification listener")
    firebase.notifications().onNotification(notification => {
        notification.android.setChannelId(channelID).setSound('default')
        firebase.notifications().displayNotification(notification)

        console.log(notification, "hello world")
    });

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

    // App closed
    // firebase.notifications().getInitialNotification()
    // .then((notificationOpen) => {
    //   if (notificationOpen) {
    //     // App was opened by a notification
    //   }
    // });
}