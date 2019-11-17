
import { GoogleSignin, User } from '@react-native-community/google-signin';

export interface ResultSign {
    error: any 
    user: User
}

const signIn = async(): Promise<ResultSign> => {
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo: User = await GoogleSignin.signIn();
        // await AsyncStorage.setItem('googleKey', userInfo.idToken? userInfo.idToken : "");
        return {
            user: userInfo

        } as ResultSign
      } catch (error) {
        return {
            error: error

        } as ResultSign
      }
}

export enum signOutResult {
    Succed,
    Failed
}

export const signOut = async (callBack: (this: void, result: signOutResult, err?: any) => void): Promise<void> => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    
      return callBack(signOutResult.Succed)
    } catch (error) {
        return callBack(signOutResult.Failed, error)
    }
  };

export default signIn
