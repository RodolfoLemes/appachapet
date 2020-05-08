import { StyleSheet } from 'react-native'
import {
	responsiveHeight,
	responsiveWidth,
	responsiveFontSize
  	} from "react-native-responsive-dimensions";

const gpsStyles = StyleSheet.create({
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
	
	middleInfo: {
        height: responsiveHeight(50),
        width: '100%',
		marginTop: responsiveHeight(5),
    },
	
	mapStyle: {
        flex:1,
        width: '100%',
	},
})

export default gpsStyles;
