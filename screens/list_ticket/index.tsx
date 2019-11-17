import React from "react";
import { TouchableOpacity, View } from "react-native";
import { NavigationStackScreenProps } from "react-navigation-stack";
import {CustomNavigationProps, Navigation} from '../types'
import { SearchBar } from 'react-native-elements';
import DataComponent, {callBack} from '../../components/Ticket'
import {Icon} from 'react-native-elements'
import {TabView, Tab} from 'react-native-ui-kitten'

interface NavigationParams {
    text: string;
}

const ListTicket = (props: NavigationStackScreenProps<CustomNavigationProps<NavigationParams>>) => { 
    const { navigation } = props;
    const { state: { params } } = navigation;
    const[pageIndex, setPageIndex] = React.useState(0)
    const[search, setSearch] = React.useState("")
    const[searchProg, setSearchProg] = React.useState("")
    const[searchClosed, setSearchClosed] = React.useState("")


    const updateSearch = (val: string) => {
        setSearch(val)
    }

    const updateSearchProg = (val: string) => {
        setSearchProg(val)
    }

    const updateSearchClosed = (val: string) => {
        setSearchClosed(val)
    }

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
                        <SearchBar placeholder="Type Here..." lightTheme round value={search} onChangeText={updateSearch} />
                        <DataComponent callBack={callBack} />
                    </View>
                </Tab>
                <Tab title='INPROG'>
                    <View style={{flex: 1}}>
                        <SearchBar placeholder="Type Here..." lightTheme round value={searchProg} onChangeText={updateSearchProg} />
                        <DataComponent callBack={callBack} />
                    </View>
                </Tab>
                <Tab title='CLOSE'>
                    <View style={{flex: 1}}>
                        <SearchBar placeholder="Type Here..." lightTheme round value={searchClosed} onChangeText={updateSearchClosed} />
                        <DataComponent callBack={callBack} />
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


export default ListTicket;
