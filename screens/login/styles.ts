import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ecf0f7",
    },
    modalContainer: {
      width: 200,
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 216,
      backgroundColor: "#325ac9",
    },
    formContainer: {
      flex: 1,
      marginTop: 32,
      paddingHorizontal: 16,
    },
    helloLabel: {
      color: 'white',
      // fontFamily: 'opensans-bold',
      fontWeight: 'normal',
    },
    signInLabel: {
      marginTop: 16,
      color: 'white'
    },
    signInButton: {
      marginHorizontal: 16,
    },
    signUpButton: {
      marginVertical: 12,
    },
    signUpText: {
      color: "#FFFFFF"
    },
});

export default styles;
