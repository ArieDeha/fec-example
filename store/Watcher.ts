import { all, fork } from 'redux-saga/effects';
import { watchNewMessage } from './auth/watcher';

export const rootSaga = function* root() {
    yield all([
        fork(watchNewMessage)
    ]);
};