import React from 'react'
import {CustomNavigationProps, Navigation} from '../types'
import { NavigationStackScreenProps } from "react-navigation-stack";
import { View, ScrollView, Image, Text, ActivityIndicator } from 'react-native';
import styles from './styles'
import  {ViewPager, Layout, Modal, Button} from 'react-native-ui-kitten'
import {Overlay} from 'react-native-elements'
import Comments, {submitComment, submitCallBack} from './Comments'
import DataTicket from './DataTicket'
import {mapStateToProps, mapDispatchToProps, TypeAllProps} from '../../store/Props'
import {connect} from 'react-redux';
import dataDetail, {detail} from './type'
import Api, {threadImage, submitThread, responseSubmitThread} from '../../store/api/Ticket'
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
    const [overlayVisible, setOverlayVisible] = React.useState(false)
    const [submitMessage, setSubmitMessage] = React.useState("")
    const [clearImage, setClearImage] = React.useState(false)

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

    async function fetchData(callback?: (this: void) => void) {
        const propsParams: defaultProps = {
            token: props.auth.token,
            callBackUnauthorize: callbackUnauthorize
        }
        const ticket = new Api(propsParams)
        const serial = (navigation.state.params) ? navigation.state.params.id : ''

        let res: Promise<AxiosResponse<dataDetail>> = ticket.getBySerial(serial)
        res.then(dt => {
            setData({...dt.data, loading: false, errorMsg: "", errorState: false})
            console.log(dt.data.data.attachment)
            if (callback) {
                callback()
            }
        }).catch(_ => {
            setData({ ...dataRes, loading: false, errorMsg: 'Something just went wrong'})
        })
    }

    const callbackSubmit: submitCallBack = (dataSubmit: submitComment) => {
        if (dataSubmit.comment.length === 0) {
            setModalVisible(true)
            setError("comment cannot empty")
            return
        }
        
        setData({...dataRes, loading: true})

        uploadImages(dataSubmit).then(res => {
            let newSubmitForm: submitThread = {
                serial: dataRes.data.serial,
                description: dataSubmit.comment,
                attachment: res
            }
            const propsParams: defaultProps = {
                token: props.auth.token,
                callBackUnauthorize: callbackUnauthorize
            }
            const thread = new Api(propsParams)
            let post: Promise<AxiosResponse<responseSubmitThread>> = thread.postThread(newSubmitForm)
            post.then(response => {
                if (response.status !== 200) {
                    setModalVisible(true)
                    setError(`Create thread ${response.data.message} please contact administrator`)
                    return
                }
                let callBackParams = (): void =>{
                    setOverlayVisible(true)
                    setSubmitMessage("successfully create thread")
                    setClearImage(true)
                }
                fetchData(callBackParams)
                
            }).catch(_ => {
                setModalVisible(true)
                setError(`Create thread failed please contact administrator`)
                setData({...dataRes, loading: false})

            })

        })
    }

    async function uploadImages(data: submitComment): Promise<threadImage[]> {
        let image: threadImage[] = []
        let promises: Promise<AxiosResponse<responseImage>>[] = []

        if (data.images.data.length > 0) {
            const uploadAPI = new ApiImage()
            data.images.data.forEach(element => {
                promises.push(uploadAPI.upload(element))
            });
            await Promise.all(promises).then(response => {
                response.forEach((val, index) => {
                    const dataRes = val.data
                    if (dataRes.data.length > 0) {
                        const dataImg = dataRes.data[0]
                        image.push({
                            file_type: data.images.data[index].mime,
                            file_url: dataImg.fullpath
                        })
                    }
                })
            }).catch(err => {
                setModalVisible(true)
                setError(`upload file failed`)
                console.log(err)
            })

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
                    level='3'
                    style={{justifyContent: 'center', alignItems: 'center', width: 200, height: 200, flex: 1}}>
                    <Text>{err}</Text>
                    <Button style={{marginTop: 50}} onPress={() => setModalVisible(false)}>Close</Button>
                </Layout>
            </Modal>
            <View style={styles.header}>
                {(dataRes.data.attachment.length >0) && <ViewPager
                    selectedIndex={selectedIndex}
                    shouldLoadComponent={shouldLoadComponent}
                    onSelect={onSelect}>

                        {dataRes.data.attachment.map((value, index) => {
                        return (<Layout
                            // level={index.toString()}
                            key={index.toString()}
                            style={styles.tab}>
                                <Image key={`image-${index.toString()}`} source={{uri: value.fileUrl}} resizeMode="cover" style={{width: "90%", height: "90%"}}/>
                            </Layout>)
                        })}
                </ViewPager>}
                
            </View>
            {/* <DataTicket dataRes={data.data}/> */}
            {DataTicket(dataRes.data)}
            {(dataRes.loading) &&
                <View style={styles.loading}>
                    <ActivityIndicator size='large' />
                </View> 
            }
            {/* Comments */}
            {Comments(dataRes.data, callbackSubmit, clearImage, dataRes.loading)}
            <View>
                <Overlay isVisible={overlayVisible} onBackdropPress={()=>setOverlayVisible(false)}>
                    <View>
                        <Text>{submitMessage}</Text>
                        <Button onPress={()=>setOverlayVisible(false)}>Close</Button>
                    </View>
                </Overlay>
            </View>
           
            
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


