import { StyleSheet } from 'react-native'
import {
	responsiveHeight,
	responsiveWidth,
	responsiveFontSize
      } from "react-native-responsive-dimensions";

const loginStyles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#3f6de0',
    },

    logoView: {
        flex: 3,
        width: responsiveWidth(100),
        justifyContent: 'center',
        alignItems: 'center',
    },

    logoViewImg: {
        height: responsiveWidth(60),
        width: responsiveWidth(60),

    },

    bottomView: {
        flex: 1.8,
        width: responsiveWidth(100),
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: '#fff'
    },

    googleBtn: {
        flexDirection: 'row',
        height: 50,
        width: responsiveWidth(75),
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: responsiveHeight(7),
        borderRadius: 15,
        backgroundColor: '#3f6de0'
    },

    googleTxt: {
        color: '#fff',
        fontSize: 16
    },

    socialMediaView: {
        width: '100%',
        alignItems: 'center',
        marginBottom: '10%',
    },

    socialMediaBtns: {
        width: 140,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },

    socialMediaBtn: {
        height: 56,
        width: 56,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 28,
        borderWidth: 2,
        borderColor: '#777'
    },
})

export default loginStyles;