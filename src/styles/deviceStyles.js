import { StyleSheet } from 'react-native'

const deviceStyles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },

    itemTcb: {
        flexDirection: 'row',
        height: 75,
        width: '80%',
        borderRadius: 25,
    },

    itemImgView: {
        height: '100%',
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
    },

    itemImg: {
        height: 50,
        width: 50,
        borderRadius: 25,
    },

    /* itemInfoView: {
        height: '100%',
        flex: 6,
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
    }, */
    itemInfoView: {
        height: '100%',
        flex: 6,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        borderBottomRightRadius: 25,
        backgroundColor: '#2147D6',
        elevation: 4,
    },

    itemInfoName: {
        flex: 3,
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        borderTopRightRadius: 25,
        paddingLeft: '10%',
    },

    itemInfoNameTxt: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
    },

    itemInfoIMEI: {
        flex: 3,
        width: '100%',
        justifyContent: 'center',
        borderBottomRightRadius: 25,
        paddingLeft: '10%',
    },

    itemInfoIMEITxt: {
        color: '#fff',
    },

})

export default deviceStyles;
