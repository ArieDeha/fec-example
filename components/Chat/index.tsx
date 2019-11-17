import React from 'react'
import CustomRow, {dataChat} from './row'
import {View, RefreshControl, ActivityIndicator, FlatList, } from 'react-native'
import axios from 'axios'

interface ListState {
    loading: boolean, // user list loading
    isRefreshing: boolean, //for pull to refresh
    data: dataChat[], //user list
    error: string | null | undefined
}

const Chat = ({ticketNumber: string}) => {
        
        const [listState, setListState ] = React.useState<ListState>({loading: false, isRefreshing: false, data: [], error: null})
        const [page, setPage] = React.useState(1)

        const renderFooter = () => {
            if (!listState.loading) return null;
            
            return (
                <ActivityIndicator/>
            );
        };
        
        React.useEffect(() => {
            fetchUser(page)
        }, [])

        
        const handleLoadMore = () => {
            if (!listState.loading) {
            setPage(page + 1); // increase page by 1
            fetchUser(page); // method for API call 
            }
        };
        
        const fetchUser = (page: number) => {
            // const url = `https://api.stackexchange.com/2.2/users?page=${page}&order=desc&sort=reputation&site=stackoverflow`;
            // setListState({...listState, loading: true })
            // axios.get(url)
            // .then(res => {
            //         let data: dataDetail[] = res.data.items
            //         if (page > 1) {
            //             data = listState.data.concat(res.data.items as dataDetail)
            //         }
            //     setListState({...listState, loading: false, data: data})
            // })
            // .catch( err => {
            //     setListState({ ...listState, loading: false, error: 'Something just went wrong' })
            // });
            const imgURL = "https://comps.canstockphoto.com/physiognomy-of-boy-brunet-haired-man-clip-art-vector_csp50360861.jpg"
            let data: dataChat[] = [
                {profile_image: imgURL, name: "ika", description: "sedang dilakukan investigasi ya", time: "2019-01-01 22:00:00"},
                {profile_image: imgURL, name: "hendri", description: "invoice blm masuk saat ini", time: "2019-01-01 22:00:00"},
                {profile_image: imgURL, name: "jaya", description: "sedikit lg solve", time: "2019-01-01 22:00:00"}
            ]
            setListState({...listState, loading: false, data: data})

        }
    return (
        <View style={{flex: 1}}>
            <FlatList
                data={listState.data}
                extraData={listState}
                refreshControl={
                    <RefreshControl
                    refreshing={listState.isRefreshing}
                    onRefresh={() => fetchUser(1)}
                    />
                }
                renderItem={({ item }) => <CustomRow {...item}/>}
                keyExtractor={(item, index) => item.profile_image}
                // ItemSeparatorComponent={renderSeparator}
                ListFooterComponent={renderFooter}
                // onEndReachedThreshold={0.4}
                onEndReached={handleLoadMore}
                />
        
        </View>
    )
        
}

export default Chat