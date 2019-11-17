import { put, takeLatest } from 'redux-saga/effects';
import {REQUEST_LOGIN, RequestLoginAction} from './types'
import {login} from './action'

export function* watchNewMessage() {
  yield takeLatest(
    REQUEST_LOGIN,
    sendingAllMessage
  );
}

function* sendingAllMessage(data: RequestLoginAction) {
    // nnt disini nembak ke api buat nyocokin credential
    yield put(login(data.payload));
  
}
