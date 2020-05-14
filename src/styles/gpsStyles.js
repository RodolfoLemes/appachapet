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
        flex: 1,
        width: '100%',
        marginBottom: 5,
    },

    buttonsView: {
        flexDirection: 'row',
        height: '70%',
        width: '100%',
        marginHorizontal: 10,
    },

    buttonView: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    middleView: {
        height: '30%',
        width: '100%',
    },

    sliderView: {
        height: '60%',
        width: '80%',
        marginLeft: '10%',
        justifyContent: 'center'
    },
	
	mapView: {
        flex: 3,
        width: '100%',
		marginBottom: 20,
    },
	
	mapStyle: {
        flex:1,
        width: '100%',
	},
})

export default gpsStyles;
