import {TouchableOpacity, View, Image, Text} from 'react-native'
import React from 'react'
import style from './styles'

export type callBackByClick = (this: void, route: string,) => void


export interface dataDashboard {
    route: string
    image: string
    title: string
}

export interface dataProvided {
    callback: callBackByClick
    data: dataDashboard[]
}

const DashboardItem: React.FC<dataProvided> = ({callback, data}: dataProvided) => {
    return (
        <View style={style.viewRow}>

            {data.map((item) => {
                return <TouchableOpacity key={item.title} style={style.column} onPress={() => callback(item.route)}>
                    <View style={style.box}>
                    <Image
                        style={style.image}
                        source={require('./../../assets/images/dashboard_ticket.png')}
                        />
                        <Text>{item.title}</Text>
                    </View>
                
            </TouchableOpacity>
            }) }
        </View>
    )
}

export default DashboardItem
