// action of auth

import { AuthState, REQUEST_LOGIN, SET_FCM, LOGIN, LOGOUT, CheckAuthTypes } from './types'

// TypeScript infers that this function is returning SendMessageAction
export function login(newAuthState: AuthState): CheckAuthTypes {
  return {
    type: LOGIN,
    payload: newAuthState
  }
}

export function request_login(newAuthState: AuthState): CheckAuthTypes {
    return {
      type: REQUEST_LOGIN,
      payload: newAuthState
    }
}

export function set_fcm(fcmToken: string): CheckAuthTypes {
    return {
      type: SET_FCM,
      meta: {
        fcmToken
      }
    }
}

// TypeScript infers that this function is returning DeleteMessageAction
export function logout(): CheckAuthTypes {
  return {
    type: LOGOUT
  }
}