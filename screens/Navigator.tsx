
import React from 'react'
import SplashScreen from './splash'
import LoginScreen from './login'
import ListTicket from './list_ticket'
import FormTicket from './form_ticket'
import {createSwitchNavigator, createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Profile from './profile'
// import Profile from './new_profile'
import Home from './home'
import {Platform} from 'react-native'
import {Icon} from 'react-native-elements'
import DetailTicket from './detail_ticket'

const HomeStack = createStackNavigator({
    Home: Home,
    ListTicket: ListTicket,
    FormTicket: FormTicket,
    DetailTicket: DetailTicket
}, {headerLayoutPreset: 'center'});

const AuthTabs = createBottomTabNavigator({ 
    Home: {
        screen: HomeStack,
        navigationOptions: {
            tabBarLabel: "Home",
            tabBarIcon: ({ tintColor }) => {
                let iconName = Platform.select({ ios: "ios-home", android: "md-home" });
                return <Icon name={iconName} type="ionicon" color={tintColor} />;
            }
        }
    },
    Profile
});
const RootSwitch = createSwitchNavigator({ SplashScreen,  LoginScreen, AuthTabs, HomeStack});

export default createAppContainer(RootSwitch);

// https://www.reactnativeschool.com/complex-navigation-example-with-react-navigation