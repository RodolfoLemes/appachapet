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
        marginTop: 25,
        marginBottom: 20,
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

    infoNameView: {
        height: 62,
        width: '80%',
        justifyContent: 'center',
        paddingLeft: 20,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#2344CE',
        marginVertical: 15,
    },

    infoView: {
        height: 62,
        width: '80%',
        justifyContent: 'center',
        paddingLeft: 20,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#BDBDBD',
        marginVertical: 15,
    },

    infoFont: {
        fontSize: 18,
        color: '#4F4F4F',
    },
})

export default dataStyles;
