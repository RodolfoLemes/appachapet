import { StyleSheet } from 'react-native'
import {
	responsiveHeight,
	responsiveWidth,
	responsiveFontSize
  	} from "react-native-responsive-dimensions";

const dataStyles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },

    topInfo: {
        height: 100,
        width: '85%',
        flexDirection: 'row',
        marginBottom: 5,
        marginLeft: '5%',
    },

    topInfoImg: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },

    topInfoTexts: {
        height: 100,
        flex: 1,
        paddingLeft: 10,
    },

    topInfoTextsTitle: {
        height: 40,
        width: '100%',
        justifyContent: 'center',
    },

    topInfoTextsSubtitle: {
        height: 60,
        width: '100%',
    },

    topInfoTextsTitleFont: {
        fontSize: 24,
        fontWeight: 'bold',
    },

    topInfoTextsSubtitleFont: {
        fontSize: 16,
	},

    infoViewFocused: {
        height: 62,
        width: '80%',
        justifyContent: 'center',
        paddingLeft: 20,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#2344CE',
        marginVertical: 12,
    },

    infoView: {
        height: 62,
        width: '80%',
        justifyContent: 'center',
        paddingLeft: 20,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#BDBDBD',
        marginVertical: 12,
    },

    infoFont: {
        fontSize: 18,
        color: '#4F4F4F',
    },

    bottomButton: {
        height: 62,
        width: responsiveWidth(80),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#2344CE',
        marginTop: 12,
    },

    bottomButtonFont: {
        fontSize: 18,
        color: '#fff',
    },
})

export default dataStyles;
