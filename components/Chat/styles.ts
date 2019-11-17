import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        marginLeft:16,
        marginRight:16,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 5,
        backgroundColor: '#FFF',
        elevation: 2,
    },
    title: {
        fontSize: 16,
        color: '#000',
    },
    container_text: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 12,
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    description: {
        fontSize: 11,
        fontStyle: 'italic',
    },
    time: {
        flex: 1,
        alignItems: 'flex-start',
        fontSize: 10,
    },
    photo: {
        height: 50,
        width: 50,
    },
    container_view: {
        flex: 1,
    },
});

export default styles