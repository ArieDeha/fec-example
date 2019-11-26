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
        
        const [listState, setListState ] = React.useState<ListState>({loading: false, isRefreshing: false, data: [], error: null})

        const renderFooter = () => {
            if (!listState.loading) return null;
            
            return (
                <ActivityIndicator/>
            );
        };
        
        React.useEffect(() => {
            setListState({...listState, data: props.thread})
        }, [])


    return (
        <View style={{flex: 1}} >
            <FlatList
                data={listState.data}
                extraData={listState}
                renderItem={({ index, item }) => <CustomRow key={index} {...item}/>}
                keyExtractor={(item, index) => index.toString() + item.name}
                // ItemSeparatorComponent={renderSeparator}
                ListFooterComponent={renderFooter}
                onEndReachedThreshold={0.4}
                />
        
        </View>
    )
        
}

export default Chat