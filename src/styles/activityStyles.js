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
        width: '85%',
        flexDirection: 'row',
        marginTop: 50,
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
        height: responsiveHeight(30),
        width: responsiveWidth(75),
		marginTop: responsiveHeight(5),
    },
    
    middleInfoLabel: {
        height: '20%',
        width: '100%',
        justifyContent: 'center',
    },

    middleInfoInformation: {
        height: '45%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    middleInfoPack: {
        height: '35%',
        width: '100%',
        flexDirection: 'row',
    },

    middleInfoPackView: {
        height: '100%',
        flex: 1,
        paddingLeft: '5%',
    },

    middleInfoLabelText: {
        fontSize: 18,
    },

    middleInfoInformationText: {
        fontSize: 52,
    },

    middleInfoPackTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    middleInfoPackSubtitle: {
        fontSize: 18,
    },
	
	mapStyle: {
		flex:1,
	},
})

export default activityStyles;
