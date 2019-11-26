import {
    LOGIN,
    AuthState,
    CheckAuthTypes,
    LOGOUT,
    REQUEST_LOGIN,
    SET_FCM,
    SET_ERROR,
    REMOVE_ERROR,
    REHYDRATE
} from './types'

export interface rehydratePayload {
    authReducer: typeof initialState
    type: string
}

export const initialState: AuthState = {
    loggedIn: false,
    googleToken: '',
    fcmToken: '',
    email: '',
    name: null,
    photo: null,
    familyName: null,
    givenName: null,
    token: "",
    err: null,
    errState: false
}

export function authReducer(
    state = initialState,
    action: CheckAuthTypes
): AuthState {
    switch(action.type) {
        case REHYDRATE:
            let payData = () => {
                if (action.payload !== undefined) {
                    let payData: rehydratePayload = action.payload
                    return payData.authReducer
                }
                return initialState
            }
            return {
                ...payData()
              }
        case REQUEST_LOGIN:
            return {
                ...state
            }
        case LOGIN:
            return {
                ...state, ...action.payload
            }
        case SET_FCM:
            return {
                ...state, fcmToken: action.meta.fcmToken
            }
        case LOGOUT:
            return {
                ...initialState, fcmToken: state.fcmToken
            }
        case SET_ERROR:
            return{
                ...state, err: action.meta.err, errState: true
            }
        case REMOVE_ERROR:
            return {
                ...state, err: '', errState: false
            }
        default:
            return state
    }
}