import React from 'react'
import {CustomNavigationProps, Navigation} from '../types'
import { NavigationStackScreenProps } from "react-navigation-stack";
import { View, ScrollView, Image } from 'react-native';
import styles from './styles'
import  {Text,  ViewPager, Layout} from 'react-native-ui-kitten'

interface NavigationParams {
    id: string;
}

const DetailTicket = (props: NavigationStackScreenProps<CustomNavigationProps<NavigationParams>>) => { 
    const { navigation } = props;
    const { state: { params } } = navigation;

    const [selectedIndex, setSelectedIndex] = React.useState(0)

    const shouldLoadComponent = (index) => {
        return index === selectedIndex;
    };
    const onSelect = (selectedIndex) => {
       setSelectedIndex(selectedIndex)
    };

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