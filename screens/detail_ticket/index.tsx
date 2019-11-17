import React from 'react'
import {CustomNavigationProps, Navigation} from '../types'
import { NavigationStackScreenProps } from "react-navigation-stack";
import { View, ScrollView, Image, TouchableOpacity } from 'react-native';
import styles from './styles'
import  {Text,  ViewPager, Layout, Input, Button} from 'react-native-ui-kitten'
import DataComponent from '../../components/Chat'
import ImagePicker, {Image as img} from 'react-native-image-crop-picker';
interface NavigationParams {
    id: string;
}

interface dataImage {
    data: img[]
}

const DetailTicket = (props: NavigationStackScreenProps<CustomNavigationProps<NavigationParams>>) => { 
    const { navigation } = props;
    const { state: { params } } = navigation;
    const [dataImage, setDataImage] = React.useState<dataImage>({data: []} as dataImage)
    const [selectedIndex, setSelectedIndex] = React.useState(0)

    const shouldLoadComponent = (index) => {
        return index === selectedIndex;
    };
    const onSelect = (selectedIndex) => {
       setSelectedIndex(selectedIndex)
    };

    const uploadImage = () => {

        ImagePicker.openPicker({
            multiple: true
        }).then(images =>{
            if(Array.isArray(images)) {
                setDataImage({data: images})
                console.log(images)
            }
        })

        
    };

    const removeImage = (idx: number) => {
        let newImg = dataImage.data
        var remove = newImg.filter(function(value, index, arr){
            return index != idx;
        });
        setDataImage({data: remove})
    }

    const imgUri = 'https://cdn.pixabay.com/photo/2018/10/30/16/06/water-lily-3784022__340.jpg'
    const imgUri2 = 'https://images.unsplash.com/photo-1499018658500-b21c72d7172b?ixlib=rb-1.2.1&w=1000&q=80'
    return (
        <ScrollView
            bounces={false}
            bouncesZoom={false}
            alwaysBounceVertical={false}
            alwaysBounceHorizontal={false}>

            <View style={styles.header}>
                {/* gambarrr */}
                <ViewPager
                    selectedIndex={selectedIndex}
                    shouldLoadComponent={shouldLoadComponent}
                    onSelect={onSelect}>
                    <Layout
                        level='1'
                        style={styles.tab}>
                        <Image source={{uri: imgUri}} resizeMode="cover" style={{width: "90%", height: "90%"}}/>
                    </Layout>
                    <Layout
                        level='2'
                        style={styles.tab}>
                        <Image source={{uri: imgUri2}} resizeMode="cover" style={{width: "90%", height: "90%"}} />
                    </Layout>
                </ViewPager>
            </View>

            <View style={styles.containerProfileSetting}>
                <Text
                    style={styles.profileSetting}
                    appearance='hint'>
                    Status
                </Text>
                <Text
                    style={styles.profileSetting}>
                    IN PROGRESS
                </Text>
            </View>

            <View style={styles.containerProfileSetting}>
                <Text
                    style={styles.profileSetting}
                    appearance='hint'>
                    Case Type
                </Text>
                <Text
                    style={styles.profileSetting}>
                    Complaint
                </Text>
            </View>

            <View style={styles.containerProfileSetting}>
                <Text
                    style={styles.profileSetting}
                    appearance='hint'>
                    Category
                </Text>
                <Text
                    style={styles.profileSetting}>
                    Package not active
                </Text>
            </View>

            <View style={styles.containerProfileSetting}>
                <Text
                    style={styles.profileSetting}
                    appearance='hint'>
                    Email
                </Text>
                <Text
                    style={styles.profileSetting}>
                    maulanaoktofitriadi@gmail.com
                </Text>
            </View>

            <View style={styles.containerProfileSetting}>
                <Text
                    style={styles.profileSetting}
                    appearance='hint'>
                    Invoice ID
                </Text>
                <Text
                    style={styles.profileSetting}>
                    INV-KLY893443
                </Text>
            </View>

            <View style={styles.containerProfileSetting}>
                <Text
                    style={styles.profileSetting}>
                    Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                    Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem IpsumLorem Ipsum
                </Text>
            </View>

            {/* Comments */}
            <View style={styles.commentsContainer}>
                <Text
                    style={styles.inputLabel}
                    category='s1'>
                    Comments
                </Text>
                <Input
                        style={styles.input}
                        textStyle={styles.inputStyle}
                        placeholder='Write your comment'
                        // value={currentCommentText}
                        // onChangeText={this.onCommentTextChange}
                        // onSubmitEditing={this.handleTextSubmit}
                />
                <View style={styles.inputContainer}>
                        {dataImage.data.map((item, index) => {
                            return (
                                <View style={{marginRight: 5}}>
                                    <Image key={item.path} source={{uri: item.path}} style={{width: 100, height: 100, marginBottom: 5}} width={100} height={100} resizeMode="cover" />
                                    <Button key={index} status="danger" style={{bottom: 0, alignSelf: "center"}} onPress={() => removeImage(index)}>X</Button>
                                </View>
                            )
                        })}
                </View>
                <Button onPress={() => uploadImage()} style={styles.input}>Upload Image</Button>
                <Button style={styles.input}>Submit</Button>
                <DataComponent ticketNumber="XXXJJJ"/>
            </View>
        </ScrollView>
            
    )
}

DetailTicket.navigationOptions = ({
    navigation,
  }: {
    navigation: Navigation;
  }) => ({
      title: "Detail" + (navigation.state.params ? navigation.state.params.id : ''),
});

export default DetailTicket;