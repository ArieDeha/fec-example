import {Alert} from 'react-native'

export const ShowAlert = (title, body): void => {
    Alert.alert(
      title, body,
      [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
}