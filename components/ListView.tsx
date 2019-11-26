
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        marginLeft:16,
        marginRight:16,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 5,
        backgroundColor: '#FFF',
        elevation: 2,
    },
    title: {
        fontSize: 12,
        color: '#000',
    },
    container_text: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 12,
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    description: {
        fontSize: 11,
        fontStyle: 'italic',
    },
    photo: {
        height: 50,
        width: 50,
    },
    container_view: {
        flex: 1,
    },
});

export interface dataDetail {
    caseName: string,
    categoryName: string,
    createdAt: string,
    description: string,
    handledBy: string,
    id: string,
    invoiceCode: string,
    serial: string
    callback: (this: void, id: string,) => void
}

export const renderSeparator = () => {
    return (
      <View
        style={{
          height: 2,
          width: '100%',
          backgroundColor: '#CED0CE'
        }}
      />
    );
};
// export type callBackOpen = (this: void, id: string,) => void
const _onPress = (id: string, callback: (this: void, id: string) => void) => {
    callback(id)
} 

const CustomRow = ({caseName, categoryName, createdAt, description, serial, invoiceCode, callback}: dataDetail) => (
    <TouchableOpacity onPress={() => _onPress(serial, callback)}>
        <View style={styles.container}>
            <View style={styles.container_text}>
                <View style={{width: "70%"}}>
                    <Text style={styles.title}>
                    {`ticket no: ${serial}`}
                    </Text>
                    <Text style={styles.title}>
                    {`${categoryName}`}
                    </Text>
                    <Text style={styles.description}>
                        {
                            (description.length > 50)?  `invoice: ${invoiceCode} ` + description.slice(0, 40) + "..." : `invoice: ${invoiceCode} ` + description 
                        }
                    </Text>
                </View>
                
                <Text style={styles.description}>
                    {createdAt.slice(0, 16)}
                </Text>
            </View>
        </View>
    </TouchableOpacity>
    
);

export default CustomRow;