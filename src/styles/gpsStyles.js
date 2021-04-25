import { StyleSheet } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const gpsStyles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },

  topInfo: {
    marginTop: '22%',
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
    paddingHorizontal: 20,
    paddingTop: 10,
    marginRight: 10,
    backgroundColor: 'rgba(1, 14, 133, .8)',
    borderRadius: 30,
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
    color: 'rgba(255,255,255,.9)',
  },

  topInfoTextsSubtitleFont: {
    fontSize: 16,
    color: 'rgba(255,255,255,.9)',
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
    alignItems: 'center',
  },

  middleView: {
    height: '30%',
    width: '100%',
  },

  sliderView: {
    height: '60%',
    width: '80%',
    marginLeft: '10%',
    justifyContent: 'center',
  },

  mapView: {
    position: 'absolute',
    marginBottom: 20,
    zIndex: 0,
  },

  mapStyle: {
    flex: 1,
    width: '100%',
  },

  brtyView: {
    position: 'absolute',
    bottom: -20,
    left: -15,
    height: 38,
    width: 38,
    backgroundColor: 'rgba(1,14,133,.7)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btryImg: {
    height: 30,
    width: 30,
  },
});

export default gpsStyles;
