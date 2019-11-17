
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
        fontSize: 16,
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
    profile_image: string,
    display_name: string,
    website_url: string,
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

const CustomRow = ({profile_image, display_name, website_url, callback}: dataDetail) => (
    <TouchableOpacity onPress={() => _onPress(profile_image, callback)}>
        <View style={styles.container}>
            <Image source={{ uri: profile_image }} style={styles.photo} />
            <View style={styles.container_text}>
                <View style={{width: "70%"}}>
                    <Text style={styles.title}>
                        {display_name}
                    </Text>
                    <Text style={styles.description}>
                        {website_url}
                    </Text>
                </View>
                
                <Text style={styles.description}>
                    "tanggalan"
                </Text>
            </View>
        </View>
    </TouchableOpacity>
    
);

export default CustomRow;