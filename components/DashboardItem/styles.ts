import {StyleSheet} from 'react-native'

const style = StyleSheet.create({
    container: {
       flex: 1,
       backgroundColor: "#ecf0f7"
    },
   
    viewRow: {
        display: 'flex',
       flexDirection: 'row',
       width: '100%',       
       justifyContent: "space-between",
       flexWrap: 'wrap',
       alignContent: 'flex-start',
       padding: 8,
       
       
    },
    column: {
        padding:8,
        width: '50%',

    },
    box: {
        backgroundColor: "#ffffff",
        height: 150,
        padding: 32,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,

    },
    image: {
       width: 50,
       height: 50,
       marginBottom: 8,
    },
    
    text: {
        fontWeight: "bold",
        fontSize: 16,
    }
 });

 export default style