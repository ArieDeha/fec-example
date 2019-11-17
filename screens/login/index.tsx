import styles from "./styles";
import React, { useState } from "react";
import { View, Alert } from "react-native";
import { NavigationStackScreenProps } from "react-navigation-stack";
import {GoogleSigninButton } from '@react-native-community/google-signin';
import signIn from '../../service/GoogleSignIn'
import {AuthState} from '../../store/auth/types'
// redux
import {mapStateToProps, mapDispatchToProps, TypeAllProps} from '../../store/Props'
import {connect} from 'react-redux';

import {
    Text, Button
} from 'react-native-ui-kitten';

const LoginScreen = (props: NavigationStackScreenProps & TypeAllProps) => {
    const [isLoginProcess, statIsLogin] = useState(false)

    const googleLogin = () => {
         // login 
         let result = signIn()
         result.then(data => {
            if(data.user) {
                statIsLogin(true)
                let usr = data.user.user
                props.onRequestLogin({
                    name: usr.name,
                    email: usr.email,
                    photo: usr.photo,
                    familyName: usr.familyName,
                    givenName: usr.givenName,
                    googleToken: data.user.idToken,
                    loggedIn: true,
                } as AuthState)
                props.navigation.navigate("ListTicket");
             } else {
                 statIsLogin(false)
                 console.log(data.error)
             }
         })
    }

    return(
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text
                    style={styles.helloLabel}
                    category='h1'>
                    Hello, FEC !
                </Text>
                <Text
                    style={styles.signInLabel}
                    category='s1'>
                    Please sign in to your ruangguru account 
                </Text>
            </View>
            <View style={{position: 'absolute',
                bottom:100, width: '100%', alignItems: "center"}}>
                <GoogleSigninButton
                    style={{ width: "80%", height: 50 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={googleLogin}
                    disabled={isLoginProcess} />
            </View>
        </View>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginScreen);

