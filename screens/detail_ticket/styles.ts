import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    header:{
      height:200,
    },
    profileSetting: {
        
    },
    inputContainer: {
      // width:250,
      // height:45,
      marginBottom:20,
      marginLeft: 5,
      marginRight: 5,
      flexDirection: 'row',
      alignItems:'center'
    },
    containerProfileSetting: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor:  "#eefafc",
    },
    tab: {
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    commentsContainer: {
        paddingHorizontal: 8,
        paddingVertical: 24,
        backgroundColor: "#ecf0f7",
      },
      input: {
        marginHorizontal: 16,
        marginBottom: 24,
      },
      inputStyle: {
        fontWeight: 'normal',
      },
      inputLabel: {
        marginBottom: 8,
        marginHorizontal: 16,
      },
      containerForm: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 5,
        elevation: 2,
    },
});

export default styles