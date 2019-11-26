import React from "react";
import { TouchableOpacity, View } from "react-native";
import { NavigationStackScreenProps } from "react-navigation-stack";
import {CustomNavigationProps, Navigation} from '../types'
import { SearchBar } from 'react-native-elements';
import DataComponent, {callBack} from '../../components/Ticket'
import {Icon} from 'react-native-elements'
import {TabView, Tab} from 'react-native-ui-kitten'
import {mapStateToProps, mapDispatchToProps, TypeAllProps} from '../../store/Props'
import {connect} from 'react-redux';

interface NavigationParams {
    text: string;
}

const ListTicket = (props: NavigationStackScreenProps<CustomNavigationProps<NavigationParams>> & TypeAllProps) => { 
    const { navigation } = props;
    const { state: { params } } = navigation;
    const[pageIndex, setPageIndex] = React.useState(0)

    const[searchOpen, setSearchOpen] = React.useState("")
    const [searchOpenEnter, setSearchOpenEnter] = React.useState("")
    

    const[searchProg, setSearchProg] = React.useState("")
    const[searchProgEnter, setSearchProgEnter] = React.useState("")

    const[searchClosed, setSearchClosed] = React.useState("")
    const[searchClosedEnter, setSearchClosedEnter] = React.useState("")


    const callBack: callBack = (id: string): void => {
        navigation.navigate("DetailTicket", {id: id})
    }

    return(
        <View style={{ flex: 1, justifyContent: "center" }}>
            <TabView
                style={{flex: 1, marginBottom: 15}}
                selectedIndex={pageIndex}
                onSelect={(newIndex: number) => setPageIndex(newIndex)}>

                <Tab title='OPEN' style={{height: 50}}>
                    <View style={{flex: 1}}>
                        <SearchBar key="searchbar-open" placeholder="Type Here..." lightTheme round value={searchOpenEnter} onChangeText={(val) => setSearchOpenEnter(val)} onSubmitEditing={() => setSearchOpen(searchOpenEnter)} onClear={() => { setSearchOpenEnter(""); setSearchOpen("");}}/>
                        <DataComponent key="open-key" callBack={callBack} status="NEW" token={props.auth.token} search={searchOpen} />
                    </View>
                </Tab>
                <Tab title='INPROG'>
                    <View style={{flex: 1}}>
                        <SearchBar key="searchbar-prog" placeholder="Type Here..." lightTheme round value={searchProgEnter} onChangeText={(val) => setSearchProgEnter(val)} onSubmitEditing={() => setSearchProg(searchProgEnter)} onClear={() => { setSearchProgEnter(""); setSearchProg("");}}/>
                        <DataComponent key="inprog-key" callBack={callBack} status="IN PROGRESS" token={props.auth.token} search={searchProg} />
                    </View>
                </Tab> 
                <Tab title='CLOSE'>
                    <View style={{flex: 1}}>
                        <SearchBar key="searchbar-close" placeholder="Type Here..." lightTheme round value={searchClosedEnter} onChangeText={(val) => setSearchClosedEnter(val)} onSubmitEditing={() => setSearchClosed(searchClosedEnter)} onClear={() => { setSearchClosedEnter(""); setSearchClosed("");}}/>
                        <DataComponent key="closed-key" callBack={callBack} status="DONE" token={props.auth.token} search={searchClosed} />
                    </View>
                </Tab>
            </TabView>
            <TouchableOpacity
                style={{
                    borderWidth:1,
                    borderColor:'#a5bfc2',
                    alignItems:'center',
                    justifyContent:'center',
                    width:70,
                    position: 'absolute',                                          
                    bottom: 10,                                                    
                    right: 10,
                    height:70,
                    backgroundColor:'#a5bfc2',
                    borderRadius:100,
                    }} onPress={()=> props.navigation.navigate("FormTicket")} 
                >
                    <Icon name="md-add" type="ionicon" size={35}/>
                </TouchableOpacity>
         {/* <Text>List Ticket</Text>
            {
                params ?
                    <Text>{params.text}</Text> : <Text>not set</Text>
            } */}
      </View>
    )
}


ListTicket.navigationOptions = ({
    navigation,
  }: {
    navigation: Navigation;
  }) => ({
      title: "My Ticket"
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ListTicket);

