import { CheckAuthTypes } from '../store/auth/types'
import { login, logout, request_login, set_fcm, remove_err } from '../store/auth/action';

import {AppState} from './index'
import {bindActionCreators, Dispatch} from 'redux';

export const mapStateToProps = (state: AppState) => ({
    auth: state.authReducer,
});


export const mapDispatchToProps = (dispatch: Dispatch<CheckAuthTypes>) =>
  bindActionCreators(
    {
        onRequestLogin: request_login,
        onRemoveErr: remove_err,
        onSetFcm: set_fcm,
        onLogin: login,
        onLogout: logout,
    },
    dispatch
);

export type TypeAllProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> 