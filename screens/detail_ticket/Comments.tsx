import React from 'react'
import {View} from 'react-native'
import {Input, Button, Text} from 'react-native-ui-kitten'
import styles from './styles'
import DataComponent from './Chat'
import UploadImage, {dataImage} from '../../components/UploadImage'

const Comments = () => {

    const [callBackData, setcallBackData] = React.useState<dataImage>({data: []});
    const [call, setCall] = React.useState(0);

    const callbackFunction = React.useCallback((data: dataImage) => {
        // Do something with callBackData ...
        console.log(data, "called callback")
        setcallBackData(data)
      }, [call]);

    return(
        <View style={styles.commentsContainer}>
                <Text
                    style={styles.inputLabel}
                    category='s1'>
                    Comments
                </Text>
                <Input
                        style={styles.input}
                        textStyle={styles.inputStyle}
                        placeholder='Write your comment'
                        // value={currentCommentText}
                        // onChangeText={this.onCommentTextChange}
                        // onSubmitEditing={this.handleTextSubmit}
                />
                <UploadImage action={callbackFunction}/>
                <Button style={styles.input} onPress={() => setCall(call + 1)}>Submit</Button>
                <DataComponent ticketNumber="XXXJJJ"/>
            </View>
    )
}

export default Comments