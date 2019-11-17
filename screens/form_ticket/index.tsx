import styles from "./styles";
import React from "react";
import { View, ScrollView, Image } from "react-native";
import {Select, Input, Button} from 'react-native-ui-kitten'
import ImagePicker, {Image as img} from 'react-native-image-crop-picker';
import {CustomNavigationProps} from '../types'
import { NavigationStackScreenProps } from "react-navigation-stack";

interface dataImage {
    data: img[]
}

const FormTicket = (props: NavigationStackScreenProps<CustomNavigationProps<null>>) => { 
    const data = [
        { text: 'Option 1' },
        { text: 'Option 2' },
        { text: 'Option 3', disabled: true },
        { text: 'Option 4' },
      ];
    
    const [caseSelection, setCaseSelection] = React.useState()
    const [categoryelection, setCategorySelection] = React.useState()
    const [emailInput, setEmailInput] = React.useState("")
    const [invoiceInput, setInvoiceInput] = React.useState("")
    const [descInput, setDescInput] = React.useState("")
    const [dataImage, setDataImage] = React.useState<dataImage>({data: []} as dataImage)
    

    const onSelectCase = (selectedOption: any) => {
        setCaseSelection(selectedOption);
    };

    const onSelectCategory = (selectedOption: any) => {
        setCategorySelection(selectedOption);
    };

    const onEmailInput = (val: string) => {
        setEmailInput(val)
    }

    const onInvoiceInput = (val: string) => {
        setInvoiceInput(val)
    }

    const onDescInput = (val: string) => {
        setDescInput(val)
    }

    const uploadImage =() => {
        ImagePicker.openPicker({
            multiple: true
        }).then(images => {
            if(Array.isArray(images)) {
                setDataImage({data: images})
                console.log(images)
            }
        });

    }

    const removeImage = (idx: number) => {
        let newImg = dataImage.data
        var remove = newImg.filter(function(value, index, arr){
            return index != idx;
        });
        setDataImage({data: remove})
    }
    React.useEffect(() => {
    }, [])

    return(
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.inputContainer}>
                    <Select
                        style={styles.select}
                        data={data}
                        placeholder='Case Type'
                        selectedOption={caseSelection}
                        onSelect={onSelectCase}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Select
                        style={styles.select}
                        data={data}
                        placeholder='Category'
                        selectedOption={categoryelection}
                        onSelect={onSelectCategory}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Input
                    style={styles.input}
                    size='small'
                    placeholder='Email'
                    value={emailInput}
                    onChangeText={onEmailInput}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Input
                    style={styles.input}
                    size='small'
                    placeholder='Invoice Number'
                    value={invoiceInput}
                    onChangeText={onInvoiceInput}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Input
                    multiline={true}
                    numberOfLines={10}
                    style={styles.input}
                    size='small'
                    placeholder='Description'
                    value={descInput}
                    onChangeText={onDescInput}
                    />
                </View>

                <View>
                    <View style={styles.inputContainer}>
                        {dataImage.data.map((item, index) => {
                            return (
                                <View style={{marginRight: 5}}>
                                    <Image key={item.path} source={{uri: item.path}} style={{width: 100, height: 100, marginBottom: 5}} width={100} height={100} resizeMode="cover" />
                                    <Button key={index} status="danger" style={{bottom: 0, alignSelf: "center"}} onPress={() => removeImage(index)}>X</Button>
                                </View>
                            )
                        })}
                    </View>
                    <Button onPress={() => uploadImage()} style={styles.input}>Upload Image</Button>
                </View>
                <View style={{marginBottom: 10, marginTop: 10}}>
                    <Button style={styles.input}>Submit</Button>
                </View>
            </ScrollView>
            
        </View>
        
    )
}

FormTicket.navigationOptions = () => ({
    title: 'Form Ticket',
});

export default FormTicket
