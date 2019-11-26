
import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles'
import {thread} from '../type'

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

const CustomRow = ({profilePictureUrl, name, description, createdAt}: thread) => (
    <View style={styles.container}>
        <Image source={{ uri: profilePictureUrl }} style={styles.photo} />
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
                {createdAt}
            </Text>
        </View>
    </View>
    
);

export default CustomRow;