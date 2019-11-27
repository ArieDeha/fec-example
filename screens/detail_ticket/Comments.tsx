import React from 'react'
import {View} from 'react-native'
import {Input, Button, Text} from 'react-native-ui-kitten'
import styles from './styles'
import DataComponent from './Chat'
import UploadImage, {dataImage} from '../../components/UploadImage'
import {detail} from './type'

export interface submitComment {
    images: dataImage
    comment: string
}

export type submitCallBack = (this: void, data: submitComment) => void

const Comments = (props: detail, callBack: submitCallBack, clearImage: boolean, loading: boolean) => {

    const [callBackData, setcallBackData] = React.useState<dataImage>({data: []});
    const [call, setCall] = React.useState(0);
    const [text, setText] = React.useState("");
    const [initiate, setInitiate] = React.useState(true);

    const callbackFunction = React.useCallback((data: dataImage) => {
        setcallBackData(data)
        if (!initiate) {
            let submited: submitComment = {
                images: data,
                comment: text
            }
            callBack(submited)
        }
        setInitiate(false)
    }, [call]);

    const submit = () => {
        setCall(call + 1)
    }

    React.useEffect(() => {
        if (clearImage) {
            setcallBackData({data: []})
        }
    }, [clearImage])

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
                        value={text}
                        onChangeText={(val: string) => setText(val)}/>

                {/* <UploadImage action={callbackFunction}/> */}
                {UploadImage(callbackFunction, clearImage, loading)}
                <Button disabled={loading} style={styles.input} onPress={() => submit()}>Submit</Button>
                {DataComponent(props)}
            </View>
    )
}

export default Comments