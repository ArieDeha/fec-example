import styles from "./styles";
import React, { useState } from "react";
import { View, Alert } from "react-native";
import { NavigationStackScreenProps } from "react-navigation-stack";
import {GoogleSigninButton } from '@react-native-community/google-signin';
import signIn from '../../service/GoogleSignIn'
import {AuthState} from '../../store/auth/types'
import {Layout, Modal} from 'react-native-ui-kitten'

// redux
import {mapStateToProps, mapDispatchToProps, TypeAllProps} from '../../store/Props'
import {connect} from 'react-redux';

import {
    Text, Button
} from 'react-native-ui-kitten';

const LoginScreen = (props: NavigationStackScreenProps & TypeAllProps) => {
    const [isLoginProcess, statIsLogin] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)

    const renderModalElement = () => {
        return (
          <Layout
            level='3'
            style={styles.modalContainer}>
            <Text>{(props.auth.err) ? props.auth.err : "cannot get error text"}</Text>
            <Button onPress={() => props.onRemoveErr()}>Close</Button>
          </Layout>
        );
      };
    
      React.useEffect(() => {

        setModalVisible(props.auth.errState)

        if (props.auth.errState) {
            statIsLogin(false)
        }

        if (props.auth.token !== "") {
            props.onRemoveErr()
            props.navigation.navigate("ListTicket");
        }

    }, [props.auth.errState, props.auth.token])



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
                    fcmToken: props.auth.fcmToken,
                    loggedIn: true,
                } as AuthState)
                
             } else {
                 statIsLogin(false)
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
            <Modal visible={modalVisible}>
                {renderModalElement()}
            </Modal>
        </View>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginScreen);
