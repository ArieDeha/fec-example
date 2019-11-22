import React from 'react'
import {CustomNavigationProps, Navigation} from '../types'
import { NavigationStackScreenProps } from "react-navigation-stack";
import { View, ScrollView, Image } from 'react-native';
import styles from './styles'
import  {ViewPager, Layout} from 'react-native-ui-kitten'
import Comments from './Comments'
import DataTicket from './DataTicket'

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
            <DataTicket/>
            {/* Comments */}
            <Comments />
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
