import styles from "./styles";
import React, { useEffect } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { NavigationStackScreenProps } from "react-navigation-stack";
// redux
import {mapStateToProps, mapDispatchToProps, TypeAllProps} from '../../store/Props'
import {connect} from 'react-redux';
// FCM
import {
    createChannel, checkPermission, 
    createNotificationListeners, callBackOpen, callBackForeground, NotificationOpen, callBackToken
  } from '../../service/Fcm'
  import {Alert} from 'react-native'

const SplashScreen = (props: NavigationStackScreenProps & TypeAllProps) => { 

    const openCallback: callBackOpen = (data: NotificationOpen) => {
        showAlert(data.notification.title, data.notification.body)
        console.log(data)
    }
  
    const openForeground: callBackForeground = (data) => {
        console.log(data)
    }
  
    const showAlert = (title, body): void => {
        Alert.alert(
          title, body,
          [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false },
        );
    }

    const callbackWhenGetToken: callBackToken = (newFcmToken: string) => {
        props.onSetFcm(newFcmToken)
    }

    useEffect(() => {
        createChannel()
        checkPermission(props.auth.fcmToken, callbackWhenGetToken)
        createNotificationListeners(openCallback, openForeground)

        checkLogin()
        return () => {
            createNotificationListeners(openCallback, openForeground)
        }
    }, [])

    async function checkLogin() {
        if (!props.auth.loggedIn) {
            props.navigation.navigate("LoginScreen");
        } else {
            props.navigation.navigate("Home");
        }
    }

    return(
        <View style={styles.container}>
            <Text style={{ paddingBottom: 20 }}>This is the LoadingScreen.</Text>
            <ActivityIndicator size="large" />
        </View>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(SplashScreen);
