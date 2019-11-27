import React from 'react'
import CustomRow from './row'
import {View, ActivityIndicator, FlatList, } from 'react-native'
import {detail, thread} from '../type' 

interface ListState {
    loading: boolean, // user list loading
    isRefreshing: boolean, //for pull to refresh
    data: thread[], //user list
    error: string | null | undefined
}

const Chat = (props: detail) => {
    return (
        <View style={{flex: 1}} >
            <FlatList
                data={props.thread}
                renderItem={({ index, item }) => <CustomRow key={index} {...item}/>}
                keyExtractor={(item, index) => index.toString() + item.name}
                onEndReachedThreshold={0.4}
                />
        
        </View>
    )
        
}

export default Chat