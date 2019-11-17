import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: "#eefafc",
  },
  photoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    backgroundColor: "#fff",
  },
  nameSection: {
    flex: 1,
    marginLeft: 32,
  },
  descriptionSection: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: "#fff",
  },
  infoSection: {
    marginTop: 24,
    backgroundColor: "#fff",
  },
  profileSetting: {
    borderBottomWidth: 1,
    borderBottomColor:  "#eefafc",
  },
  nameParameter: {
    paddingHorizontal: 0,
    paddingVertical: 8,
  },
  lastNameParameter: {
    marginVertical: 16,
  },
  description: {
    marginTop: 24,
    fontFamily: 'opensans-regular',
    fontWeight: 'normal',
  },
  photo: {
    width: 76,
    height: 76,
  },
  photoButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    top: 48,
  },
  button: {
    marginHorizontal: 24,
    marginVertical: 24,
  },
  containerProfileSetting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
})

export default styles