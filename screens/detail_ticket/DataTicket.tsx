import { View } from "react-native"
import React from 'react'
import styles from './styles'
import {Text} from 'react-native-ui-kitten'
import {detail} from './type'

const DataTicket: React.FC<detail> = (dataRes: detail) => {
    return (
        <View style={{flex: 1}}>

            <View style={styles.containerProfileSetting}>
                <Text
                    style={styles.profileSetting}
                    appearance='hint'>
                    Serial
                </Text>
                <Text
                    style={styles.profileSetting}>
                    {dataRes.serial}
                </Text>
            </View>

            <View style={styles.containerProfileSetting}>
                <Text
                    style={styles.profileSetting}
                    appearance='hint'>
                    Status
                </Text>
                <Text
                    style={styles.profileSetting}>
                    {(dataRes.history.length > 0 ) ? dataRes.history[0].status: "Undefined"}
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
                    {dataRes.caseName}
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
                    {dataRes.categoryName}
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
                    {dataRes.email}
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
                     {dataRes.invoiceCode}
                </Text>
            </View>

            <View style={styles.containerProfileSetting}>
                <Text
                    style={styles.profileSetting}>
                     {dataRes.description}
                </Text>
            </View>
        </View>
    )    
}

export default DataTicket