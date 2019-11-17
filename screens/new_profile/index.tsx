import styles from "./styles";
import React, {useRef} from "react";
import { View, Platform, TouchableOpacity, Image, ScrollView} from "react-native";
import { NavigationStackScreenProps } from "react-navigation-stack";
import {Icon} from 'react-native-elements'
import {signOutResult, signOut} from '../../service/GoogleSignIn'
import {Navigation} from '../types'
import {Button, Avatar, Text} from 'react-native-ui-kitten'
// redux
import {mapStateToProps, mapDispatchToProps, TypeAllProps} from '../../store/Props'
import {connect} from 'react-redux';
import Toast from 'react-native-easy-toast'

const NewProfile = (props: NavigationStackScreenProps & TypeAllProps) => { 
    const logoutCallback = (result: signOutResult, err?: any): void => {
        if (result === signOutResult.Succed ) {
            props.onLogout()
            props.navigation.navigate("LoginScreen")
        }
    }

    const toastRef = useRef<Toast>(null);

    const showToast = (): void => {
      if (toastRef.current !== null) {
          toastRef.current.show("You have been logout", 3)
      }
    }

    return (
        <ScrollView
            bounces={false}
            bouncesZoom={false}
            alwaysBounceVertical={false}
            alwaysBounceHorizontal={false}>

            <View style={styles.photoSection}>
                <Avatar
                    style={styles.photo}
                    source={{uri: props.auth.photo ? props.auth.photo: 'http://core-ruangguru.s3.amazonaws.com/assets/avatar/avatar%7C7934.png'}}
                />
                <View style={styles.nameSection}>
                    <View style={styles.containerProfileSetting}>
                        <Text
                            style={styles.profileSetting}
                            appearance='hint'>
                            Maulana Okto
                        </Text>
                    </View>
                   
                    <View style={styles.containerProfileSetting}>
                        <Text
                            style={styles.profileSetting}
                            appearance='hint'>
                            Pesch
                        </Text>
                    </View>
                
                </View>
            </View>
            <View style={styles.descriptionSection}>
                <Text
                    style={styles.description}
                    appearance='hint'
                    category='s1'>
                    this is about me
                </Text>
            </View>
            {/* <View style={styles.infoSection}> */}
                <View style={styles.containerProfileSetting}>
                    <Text
                        style={styles.profileSetting}
                        appearance='hint'>
                            Pesch
                        </Text>
                    </View>
                    <View style={styles.containerProfileSetting}>
                        <Text
                            style={styles.profileSetting}
                            appearance='hint'>
                            Pesch
                        </Text>
                        <Text
                            style={styles.profileSetting}
                            appearance='hint'>
                            Pesch
                        </Text>
                </View>
          {/* </View> */}
        </ScrollView>
    )
}

NewProfile.navigationOptions = () => ({
    // header: null
    title: 'My Profile'
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewProfile);