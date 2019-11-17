import { authReducer } from './auth/reducer'

import { createStore } from 'redux';
import {combineReducers, applyMiddleware} from 'redux';
import { rootSaga } from './Watcher';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistCombineReducers } from 'redux-persist';
import persistConfig from './PersistConfig'

const rootReducer = combineReducers({
    authReducer: authReducer
})
export type AppState = ReturnType<typeof rootReducer>

const reducers = persistCombineReducers(persistConfig, {
    authReducer: authReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducers,
    applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

export default store
export const persistor = persistStore(store);