import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 4,
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        // width:250,
        // height:45,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center'
    },
    select: {
      flex: 1,
      marginHorizontal: 4,
    },
    input: {
        width: "96%",
        marginVertical: 4,
      },
    rect: {
        top: 156,
        left: 187,
        width: 1,
        height: 1,
        backgroundColor: "rgba(230, 230, 230,1)",
        position: "absolute"
    },
    image: {
        top: 36,
        left: 0,
        width: 200,
        height: 200,
        position: "absolute"
    },
    icon: {
        top: 0,
        left: 100,
    },
    rectStack: {
        width: 200,
        height: 200
    }
  });

  export default styles