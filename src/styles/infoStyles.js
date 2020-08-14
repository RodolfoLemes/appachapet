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
    resizeMode: 'contain',
  },

  middleInfoView: {
    marginTop: '10%'
  }
})

export default infoStyles