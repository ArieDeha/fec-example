import { put, takeLatest, call } from 'redux-saga/effects';
import {REQUEST_LOGIN, RequestLoginAction, SET_ERROR} from './types'
import {login, set_err} from './action'
import Auth, {Request, ServerData} from '../api/Auth'

export function* watchNewMessage() {
  yield takeLatest(
    REQUEST_LOGIN,
    sendingAllMessage
  );
}

function* sendingAllMessage(data: RequestLoginAction) {
  try {
     // nnt disini nembak ke api buat nyocokin credential
     let newRequest: Request = {
      google_token: data.payload.googleToken,
      email: data.payload.email,
      profile_picture_url: data.payload.photo,
      name: data.payload.name,
      fcm_token: data.payload.fcmToken
    }
    
    const res = yield call(Auth, newRequest);
    const response: ServerData = res.data
    let message = "could not request at this time"

    if (response.message) {
      message = response.message
    }
    if (res.status === 200) {
      yield put(login({...data.payload, token: (response.data) ? response.data.token : ""}));
    } else {
        yield put(set_err(message));
    }

  } catch (error) {
    let errorText = 'Terjadi kesalahan pada sistem';
    console.log(error)
    yield put(set_err(errorText));
  }
   
  
}
