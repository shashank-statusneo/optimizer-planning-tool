import {
    LOGIN_API,
    REGISTER_API,
    USER_DETAIL_API,
    LOGOUT_API,
} from '../../../services/routes'
import { authApiClient } from '../../../services/apiClient'

import {
    resetAuthReducerData,
    postUserSignup,
    postUserSignupSuccess,
    postUserSignupFailed,
    postUserLogin,
    postUserLoginSuccess,
    postUserLoginFailed,
    postUserLogout,
    postUserLogoutSuccess,
    postUserLogoutFailed,
    getUserDetail,
    getUserDetailSuccess,
    getUserDetailFailed,
} from '../../reducer/user/auth'

// @ts-ignore
export const resetAuthReducerState = (payload) => async (dispatch) => {
    console.log('Calling action : resetAuthReducerState()')
    // @ts-ignore
    await dispatch(resetAuthReducerData(payload))
}

export const userRegister =
    (payload: any) =>
    async (dispatch: any): Promise<any> => {
        console.log('Calling action : userRegister()')
        await dispatch(postUserSignup())
        try {
            const response = await authApiClient.post(REGISTER_API, payload)
            if (response.status === 201) {
                return dispatch(postUserSignupSuccess(response))
            }
            return dispatch(postUserSignupFailed(response))
        } catch (err) {
            return dispatch(postUserSignupFailed(err))
        }
    }

export const userLogin =
    (payload: any) =>
    async (dispatch: any): Promise<any> => {
        console.log('Calling action : userLogin()')
        await dispatch(postUserLogin())
        try {
            const response = await authApiClient.post(LOGIN_API, payload)
            if (response.status === 200) {
                return dispatch(postUserLoginSuccess(response))
            }
            return dispatch(postUserLoginFailed(response))
        } catch (err) {
            console.log(err)
            return dispatch(postUserLoginFailed(err))
        }
    }

export const userLogout =
    () =>
    async (dispatch: any): Promise<any> => {
        console.log('Calling action : userLogout()')
        await dispatch(postUserLogout())
        try {
            const response = await authApiClient.get(LOGOUT_API)
            if (response.status === 200) {
                return dispatch(postUserLogoutSuccess(response))
            }
            return dispatch(postUserLogoutFailed(response))
        } catch (err) {
            console.log(err)
            return dispatch(postUserLogoutFailed(err))
        }
    }

export const userDetail =
    () =>
    async (dispatch: any): Promise<any> => {
        console.log('Calling action : userDetail()')
        await dispatch(getUserDetail())
        try {
            const response = await authApiClient.get(`${USER_DETAIL_API}/8`)
            if (response.status === 200) {
                return dispatch(getUserDetailSuccess(response))
            }
            return dispatch(getUserDetailFailed(response))
        } catch (err) {
            console.log(err)
            return dispatch(getUserDetailFailed(err))
        }
    }
