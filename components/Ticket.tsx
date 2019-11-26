import React from 'react'
import CustomRow, {dataDetail} from './ListView'
import {View, RefreshControl, ActivityIndicator, FlatList, } from 'react-native'
// import axios from 'axios'
import Api from '../store/api/Ticket'
import {defaultProps} from "../store/api/ApiConfig"

interface ListState {
    loading: boolean, // user list loading
    isRefreshing: boolean, //for pull to refresh
    data: dataDetail[], //user list
    error: string | null | undefined
    loadmore: boolean
}

export type callBack = (this: void, id: string) => void 

export interface propsTicket {
    callBack: callBack,
    status: string,
    search: string,
    token: string,
}

const Ticket = ({callBack, status, search, token}: propsTicket) => {
        
        const [listState, setListState ] = React.useState<ListState>({loading: false, isRefreshing: false, loadmore: false, data: [], error: null})
        const [page, setPage] = React.useState(1)
        const [initial, setInitial] = React.useState(true)

        const renderFooter = () => {
            if (!listState.loading) return null;
            
            return (
                <ActivityIndicator/>
            );
        };
        
        React.useEffect(() => {
            setInitial(true)
            fetchUser(page)
        }, [search])

        async function handleLoadMore(_) {
            if (!listState.isRefreshing && listState.loadmore && !listState.loading) {
                setPage(page + 1); // increase page by 1
                fetchUser(page);
            }
            
        };

        const callbackUnauthorize = () => {}

        async function onRefresh () {
            setListState({...listState, isRefreshing: true, data: []})
            setInitial(true)
            setPage(1)
            fetchUser(1)
        }
        
        async function fetchUser(page: number) { 
            const propsParams: defaultProps = {
                token: token,
                callBackUnauthorize: callbackUnauthorize
            }
            const ticket = new Api(propsParams)

            setListState({...listState, loading: true })
            ticket.getAll(search, status, page).then(res => {
                let data: dataDetail[] = res.data.data.ticket
                if (page > 1 && !initial) {
                    data = listState.data.concat(res.data.data.ticket as dataDetail)
                }

                let loadmore = (res.data.data.ticket.length > 19) ? true : false
                setListState({...listState, loading: false, data: data, isRefreshing: false, loadmore: loadmore})
                setInitial(false)
            }).catch(error => {
                setListState({ ...listState, loading: false, error: 'Something just went wrong', isRefreshing: false })
            })
        }
    return (
        <View style={{flex: 1}}>
            <FlatList
                data={listState.data}
                // extraData={listState}
                refreshControl={
                    <RefreshControl
                    refreshing={listState.isRefreshing}
                    onRefresh={onRefresh}
                    />
                }
                renderItem={({ item }) => <CustomRow {...item} callback={callBack} />}
                keyExtractor={(item, index) => index.toString()}
                // ItemSeparatorComponent={renderSeparator}
                ListFooterComponent={renderFooter}
                onEndReachedThreshold={0.4}
                onEndReached={handleLoadMore}
                
                />
        
        </View>
    )
        
}

export default Ticket
