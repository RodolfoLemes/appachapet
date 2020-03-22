import { StyleSheet } from 'react-native'
import {
	responsiveHeight,
	responsiveWidth,
	responsiveFontSize
  	} from "react-native-responsive-dimensions";

const activityStyles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },

    topInfo: {
        height: 100,
        width: '90%',
        flexDirection: 'row',
        marginTop: 50,
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
        fontSize: 22,
        fontWeight: 'bold',
    },

    topInfoTextsSubtitleFont: {
        fontSize: 18,
	},
	
	MiddleInfo: {
        height: responsiveHeight(60),
        width: responsiveWidth(90),
        flexDirection: 'row',
		marginTop: responsiveHeight(5),
		backgroundColor: '#2147D6',
		justifyContent: 'center',
		borderRadius: 10,
	},
	
	mapStyle: {
		flex:1,
	},
})

export default activityStyles;
