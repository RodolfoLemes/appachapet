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
        backgroundColor: '#2147D6',
    },

    logoView: {
        flex: 3,
        width: responsiveWidth(100),
        justifyContent: 'center',
        alignItems: 'center',
    },

    bottomView: {
        flex: 2,
        width: responsiveWidth(100),
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: '#fff'
    },

    googleBtn: {
        height: 50,
        width: responsiveWidth(60),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: responsiveHeight(5),
        borderRadius: 15,
        backgroundColor: '#2147D6'
    },

    googleTxt: {
        color: '#fff',
    }
})

export default loginStyles;