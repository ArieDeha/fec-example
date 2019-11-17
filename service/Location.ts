
import {PermissionsAndroid} from 'react-native';

async function LocationPermission() {
    try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'ACCESS LOCATION PERMISSION',
            message: 'this is required for this app',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the camera');
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
}

export async function CheckLocationPermission() {
    try {
        const hasPermission = await PermissionsAndroid.checkPermission(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        if (!hasPermission) {
            LocationPermission()
        }
    } catch (err) {
        console.warn(err)
    }
}

export async function GetLocationPermission(): Promise<boolean> {
    try {
        const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
       return hasPermission
    } catch (err) {
        return false
    }
}

export default LocationPermission