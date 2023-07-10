import {
    CHANGE_PASSWORD,
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

const globalConfig = {
    retry: 3,
    retryDelay: 1000,
}

// @ts-ignore
export const resetAuthReducerState = (payload) => async (dispatch) => {
    console.log('Calling action : resetAuthReducerState()')
    // @ts-ignore
    await dispatch(resetAuthReducerData(payload))
}

// @ts-ignore
export const userRegister = (payload) => async (dispatch) => {
    console.log('Calling action : userRegister()')
    // @ts-ignore
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

// @ts-ignore
export const userLogin = (payload) => async (dispatch) => {
    console.log('Calling action : userLogin()')
    // @ts-ignore
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

// @ts-ignore
export const userLogout = () => async (dispatch) => {
    console.log('Calling action : userLogout()')
    // @ts-ignore
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

// @ts-ignore
export const userDetail = (payload) => async (dispatch) => {
    console.log('Calling action : userDetail()')
    // @ts-ignore
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

// // @ts-ignore
// export const password_reset = (payload) => async (dispatch) => {
//     console.log('Calling action : password_reset()')
//     try {
//         // @ts-ignore
//         const response = await warehouseApiClient.put(CHANGE_PASSWORD, payload, globalConfig)
//         return dispatch(fetchRegisterSuccess(response))
//     } catch (err) {
//         return dispatch(fetchRegisterFailed(err))
//     }

// }
