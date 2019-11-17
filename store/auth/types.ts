// authtentacation
export interface AuthState {
    loggedIn: boolean
    googleToken: string
    fcmToken: string
    name: string | null;
    email: string;
    photo: string | null;
    familyName: string | null;
    givenName: string | null;
  }

export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const SET_FCM = 'SET_FCM'
export const REHYDRATE = 'persist/REHYDRATE'

export interface RequestLoginAction {
    type: typeof REQUEST_LOGIN
    payload: AuthState
  }

interface LoginAction {
  type: typeof LOGIN
  payload: AuthState
}

interface LogoutAction {
  type: typeof LOGOUT
}

interface SetFCMAction {
    type: typeof SET_FCM
    meta: {
        fcmToken: string
    }
}

interface RehydrateAction {
  type: typeof REHYDRATE
  payload?: any
}

export type CheckAuthTypes = RequestLoginAction | LoginAction | LogoutAction | SetFCMAction | RehydrateAction