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
import {ShowAlert} from '../../utils/ShowAlrert'

const SplashScreen = (props: NavigationStackScreenProps & TypeAllProps) => { 

    const openCallback: callBackOpen = (data: NotificationOpen) => {
        ShowAlert(data.notification.title, data.notification.body)
        console.log(data)
    }
  
    const openForeground: callBackForeground = (data) => {
        console.log(data)
    }
  
    const callbackWhenGetToken: callBackToken = (newFcmToken: string) => {
        props.onSetFcm(newFcmToken)
    }

    useEffect(() => {
        createChannel()
        checkPermission(props.auth.fcmToken, callbackWhenGetToken)
        createNotificationListeners(openCallback, openForeground)

        checkLogin()
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
