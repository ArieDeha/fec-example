// action of auth

import { AuthState, REQUEST_LOGIN, SET_FCM, LOGIN, LOGOUT, CheckAuthTypes, SET_ERROR, REMOVE_ERROR } from './types'

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

export function set_err(err: string): CheckAuthTypes {
  return {
    type: SET_ERROR,
    meta: {
      err
    }
  }
}

export function remove_err(): CheckAuthTypes {
  return {
    type: REMOVE_ERROR
  }
}

// TypeScript infers that this function is returning DeleteMessageAction
export function logout(): CheckAuthTypes {
  return {
    type: LOGOUT
  }
}