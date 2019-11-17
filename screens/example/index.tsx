import { View, Text, Button } from "react-native"
import styles from "../splash/styles";
import React from 'react'
import { NavigationStackScreenProps } from "react-navigation-stack";

const Example = (props: NavigationStackScreenProps) => {
    return (
        <View style={styles.container}>
            <Text>Hello world</Text>
            <Button title="Details" onPress={() => props.navigation.navigate("Details")}/>
        </View>
    )
}

export default Example