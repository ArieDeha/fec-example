import styles from "./styles";
import React from "react";
import { View, ScrollView } from "react-native";
import {Select, Input, Button} from 'react-native-ui-kitten'
import {CustomNavigationProps} from '../types'
import { NavigationStackScreenProps } from "react-navigation-stack";
import UploadImage, {dataImage} from '../../components/UploadImage'
import Geolocation from '@react-native-community/geolocation';
import {ShowAlert} from '../../utils/ShowAlrert'

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
    const [callBackData, setcallBackData] = React.useState<dataImage>({data: []});
    const [call, setCall] = React.useState(0);

    const callbackFunction = React.useCallback((data: dataImage) => {
        console.log(data, "called callback")
        setcallBackData(data)
      }, [call]);

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

    const onSubmit = () => {
        setCall(call + 1)
        // get current location
        Geolocation.getCurrentPosition(info => 
            ShowAlert(info.coords.latitude, info.coords.longitude)
        );
    }

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

                <UploadImage action={callbackFunction}/>
                <View style={{marginBottom: 10, marginTop: 10, marginLeft: 10}}>
                    <Button style={styles.input} onPress={onSubmit}>Submit</Button>
                </View>
            </ScrollView>
            
        </View>
        
    )
}

FormTicket.navigationOptions = () => ({
    title: 'Form Ticket',
});

export default FormTicket
