import { View } from "react-native"
import React from 'react'
import styles from './styles'
import {Text} from 'react-native-ui-kitten'

const DataTicket = () => {
    return (
        <View style={{flex: 1}}>
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
        </View>
    )    
}

export default DataTicket