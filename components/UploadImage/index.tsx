
import {View, Image} from 'react-native'
import {Button} from 'react-native-ui-kitten'
import React from 'react'
import styles from './style'
import ImagePicker, {Image as img} from 'react-native-image-crop-picker';

export interface dataImage {
    data: img[]
}

type getDataImage = (this: void, data: dataImage) => void

const UploadImage = (action: getDataImage, clearAllImage: boolean, loading: boolean) => {
    const [dataImage, setDataImage] = React.useState<dataImage>({data: []} as dataImage)

    const uploadImage = () => {
        ImagePicker.openPicker({
            multiple: true
        }).then(images =>{
            if(Array.isArray(images)) {
                setDataImage({data: images})
            }
        })
    };

    const removeImage = (idx: number) => {
        let newImg = dataImage.data
        var remove = newImg.filter(function(value, index, arr){
            return index != idx;
        });
        setDataImage({data: remove})
    }

    React.useEffect(() => {
        action(dataImage)
    }, [action]) 

    React.useEffect(() => {
        if (clearAllImage) {
            setDataImage({data: []})
        }
    }, [clearAllImage])

    return(
        <View style={{flex: 1}} >
            <View style={styles.inputContainer}>
                    {dataImage.data.map((item, index) => {
                        return (
                            <View style={{marginRight: 5}} key={"dataImg-" + index.toString()}>
                                <Image key={"imgUploader-"+index.toString() + item.path} source={{uri: item.path}} style={{width: 100, height: 100, marginBottom: 5}} width={100} height={100} resizeMode="cover" />
                                <Button key={"button-" + index.toString() + + item.path} status="danger" style={{bottom: 0, alignSelf: "center"}} onPress={() => removeImage(index)}>X</Button>
                            </View>
                        )
                    })}
            </View>
                <Button disabled={loading} onPress={() => uploadImage()} style={styles.input}>Upload Image</Button>
        </View>
    )
}

export default UploadImage;