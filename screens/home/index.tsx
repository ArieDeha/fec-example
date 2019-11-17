import React from "react";
import { View } from "react-native";
import { NavigationStackScreenProps } from "react-navigation-stack";
import Comp, {callBackByClick, dataDashboard} from '../../components/DashboardItem'
import style from '../../components/DashboardItem/styles'

const Home = (props: NavigationStackScreenProps) => { 
    const callbackRoute: callBackByClick = (route: string): void => {
        props.navigation.navigate(route)
    } 

    const dataComp: dataDashboard[] = [
        {title: "Ticket", route: "ListTicket", image: "../../assets/images/dashboard_ticket.png"}
    ]

    return(
        <View style={style.container}>
            <Comp callback={callbackRoute} data={dataComp} />
        </View>
    )
}

Home.navigationOptions = () => ({
    // header: null
    title: 'Home'
});

export default Home

