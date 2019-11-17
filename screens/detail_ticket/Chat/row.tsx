
import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles'

export interface dataChat {
    profile_image: string,
    name: string,
    description: string
    time: string
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

const CustomRow = ({profile_image, name, description, time}: dataChat) => (
    <View style={styles.container}>
        <Image source={{ uri: profile_image }} style={styles.photo} />
        <View style={styles.container_text}>
            <View style={{width: "70%"}}>
                <Text style={styles.title}>
                    {name}
                </Text>
                <Text style={styles.description}>
                    {description}
                </Text>
            </View>
            
            <Text style={styles.time}>
                {time}
            </Text>
        </View>
    </View>
    
);

export default CustomRow;