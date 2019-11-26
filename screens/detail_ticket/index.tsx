import React from 'react'
import {CustomNavigationProps, Navigation} from '../types'
import { NavigationStackScreenProps } from "react-navigation-stack";
import { View, ScrollView, Image, Text } from 'react-native';
import styles from './styles'
import  {ViewPager, Layout, Modal, Button} from 'react-native-ui-kitten'
import Comments, {submitComment, submitCallBack} from './Comments'
import DataTicket from './DataTicket'
import {mapStateToProps, mapDispatchToProps, TypeAllProps} from '../../store/Props'
import {connect} from 'react-redux';
import dataDetail, {detail} from './type'
import Api from '../../store/api/Ticket'
import ApiImage, { responseImage } from '../../store/api/Image'
import {defaultProps} from "../../store/api/ApiConfig"
import { AxiosResponse } from 'axios';

interface NavigationParams {
    id: string;
}

const DetailTicket = (props: NavigationStackScreenProps<CustomNavigationProps<NavigationParams>> & TypeAllProps) => { 
    const { navigation } = props;
    const { state: { params } } = navigation;
    const [selectedIndex, setSelectedIndex] = React.useState(0)
    const [err, setError] = React.useState("")
    const inisiateDetail: detail = {
        attachment: [],
        thread: [],
        history: [],
        caseName: "",
        categoryName: "",
        createdAt: "",
        description: "",
        handledBy: "",
        invoiceCode: "",
        serial: "",
        userCellphoneNumber: "",
        email: "",
        userId: 0,
        createBy: "",
        id: 0
    } 
    const inisiateDataDetail: dataDetail = {data: inisiateDetail, loading: true, errorMsg: "", errorState: false}
    const [dataRes, setData] = React.useState<dataDetail>(inisiateDataDetail)
    const [modalVisible, setModalVisible] = React.useState(false)
    
    const shouldLoadComponent = (index) => {
        return index === selectedIndex;
    };
    const onSelect = (selectedIndex) => {
       setSelectedIndex(selectedIndex)
    };

    const callbackUnauthorize = () => {
        props.onLogout()
        props.navigation.navigate("Login")
    }

    React.useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        const propsParams: defaultProps = {
            token: props.auth.token,
            callBackUnauthorize: callbackUnauthorize
        }
        const ticket = new Api(propsParams)
        const serial = (navigation.state.params) ? navigation.state.params.id : ''

        let res: Promise<AxiosResponse<dataDetail>> = ticket.getBySerial(serial)
        res.then(dt => {
            setData({...dt.data, loading: false, errorMsg: "", errorState: false})
        }).catch(_ => {
            setData({ ...dataRes, loading: false, errorMsg: 'Something just went wrong'})
        })
    }

    const callbackSubmit: submitCallBack = (data: submitComment) => {
        console.log(data, "call from detail_ticket")

        if (data.comment.length === 0) {
            setModalVisible(true)
            setError("comment cannot empty")
            return
        }

        uploadImages(data).then(res => console.log(res))
    }

    async function uploadImages(data): Promise<string[]> {
        let image: string[] = []
        let promises: Promise<AxiosResponse<responseImage>>[] = []

        if (data.images.data.length > 0) {
            const uploadAPI = new ApiImage()
            data.images.data.forEach(element => {
                promises.push(uploadAPI.upload(element))
            });
            
            await Promise.all(promises).then(response => {
                response.forEach(val => {
                    const dataRes = val.data
                    if (dataRes.data.length > 0) {
                        image.push(dataRes.data[0].fullpath)
                    }
                })
            }).catch(err => console.log(err))

            return image
        } else {
            return image
        }
    }

    return (
        <ScrollView
            bounces={false}
            bouncesZoom={false}
            alwaysBounceVertical={false}
            alwaysBounceHorizontal={false}>
            
            <Modal visible={modalVisible}>
                <Layout
                    // level='3'
                    style={{justifyContent: 'center', alignItems: 'center', width: 200, height: 200, flex: 1}}>
                    <Text>{err}</Text>
                    <Button style={{marginTop: 50}} onPress={() => setModalVisible(false)}>Close</Button>
                </Layout>
            </Modal>

            <View style={styles.header}>
                <ViewPager
                    selectedIndex={selectedIndex}
                    shouldLoadComponent={shouldLoadComponent}
                    onSelect={onSelect}>
                    {/* gambarrr */}
                    <Layout
                        level='1'
                        style={styles.tab}>
                        <Image source={{uri: "https://cdn.pixabay.com/photo/2018/10/30/16/06/water-lily-3784022__340.jpg"}} resizeMode="cover" style={{width: "90%", height: "90%"}}/>
                    </Layout>
                    {dataRes.data.attachment.forEach((value, index) => {
                        return(<Layout
                            level={index.toString()}
                            style={styles.tab}>
                            <Image source={{uri: value.fileUrl}} resizeMode="cover" style={{width: "90%", height: "90%"}}/>
                        </Layout>)
                    })}
                </ViewPager>
            </View>
            {/* <DataTicket dataRes={data.data}/> */}
            {DataTicket(dataRes.data)}
            {/* Comments */}
            {Comments(dataRes.data, callbackSubmit)}
        </ScrollView>
            
    )
}

DetailTicket.navigationOptions = ({
    navigation,
  }: {
    navigation: Navigation;
  }) => ({
      title: "Detail " + (navigation.state.params ? navigation.state.params.id : ''),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(DetailTicket);


