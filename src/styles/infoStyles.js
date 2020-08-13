import { StyleSheet } from 'react-native'
const infoStyles = StyleSheet.create({
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

  textView: {
    height: '75%',
    width: '80%',
    marginTop: '5%',
  },
})

export default infoStyles