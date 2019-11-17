import styles from "./styles";
import React, {useRef} from "react";
import { Text, View, Platform, TouchableOpacity, Image} from "react-native";
import { NavigationStackScreenProps } from "react-navigation-stack";
import {Icon} from 'react-native-elements'
import {signOutResult, signOut} from '../../service/GoogleSignIn'
import {Navigation} from '../types'
import {Button} from 'react-native-ui-kitten'
// redux
import {mapStateToProps, mapDispatchToProps, TypeAllProps} from '../../store/Props'
import {connect} from 'react-redux';
import Toast from 'react-native-easy-toast'

const Profile = (props: NavigationStackScreenProps & TypeAllProps) => { 
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

    return(
        <View style={{flex: 1}}>
          <View style={styles.header}></View>
            <Image style={styles.avatar} source={{uri: props.auth.photo ? props.auth.photo: 'http://core-ruangguru.s3.amazonaws.com/assets/avatar/avatar%7C7934.png'}}/>
            <View style={styles.body}>
              <View style={styles.bodyContent}>
                <Text style={styles.namingStyle}>{props.auth.name !== null? props.auth.name: 'uknow'}</Text>
                {props.auth.familyName != "null" ? <Text style={styles.info}> {props.auth.familyName} </Text> : <Text/>}
                {/* <Text style={styles.info}>{(props.auth.familyName === null)? 'not set': props.auth.familyName}</Text> */}
                <Text style={styles.description}>Iam a FEC TEAM</Text>
                <Button style={styles.buttonContainer} onPress={() => {
                  showToast()
                  signOut(logoutCallback).catch(er => console.log(er))}}>Logout</Button>  
                <Button onPress={() => {props.navigation.navigate("DetailTicket", {id: "12345"})}}>Navigate to detail</Button>        
              </View>
          </View>
          <Toast ref={toastRef}/>
      </View>
    )
}

Profile.navigationOptions = ({
  navigation,
}: {
  navigation: Navigation;
}) => ({
    title: navigation.state.params ? navigation.state.params.text : 'Profile',
    tabBarLabel: "Profile",
    tabBarIcon: ({ tintColor }) => {
        let iconName = Platform.select({ ios: "ios-person-add", android: "md-person-add" });
        return <Icon name={iconName} type="ionicon" color={tintColor} />;
    }
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

