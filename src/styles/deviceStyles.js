import { StyleSheet } from 'react-native'

const deviceStyles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },

    titleView: {
        flexDirection: 'row',
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },

    titleTextView: {
        height: 50,
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },

    titleIconView: {
        height: 50,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    titleText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#2147D6',
    },

    itemTcb: {
        flexDirection: 'row',
        height: 75,
        width: '80%',
        borderRadius: 25,
        marginVertical: 10,
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

    floatingTcb: {
        height: 70,
        width: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        left: 20,
        backgroundColor: '#2147D6',
    },

    modalView: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },

    infoTxt: {
        height: 62,
        width: '80%',
        justifyContent: 'center',
        paddingLeft: 20,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#BDBDBD',
        marginVertical: 15,
    },

    registerTcb: {
        height: 50,
        width: '80%',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        backgroundColor: '#2147D6',
    },

    registerTxt: {
        fontSize: 18,
        color: '#fff'
    }
    
})

export default deviceStyles;
