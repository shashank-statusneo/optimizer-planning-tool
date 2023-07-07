import {
    CHANGE_PASSWORD,
    LOGIN_API,
    REGISTER_API,
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
        return dispatch(postUserSignupSuccess(response))
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
        return dispatch(postUserLoginSuccess(response))
    } catch (err) {
        return dispatch(postUserLoginFailed(err))
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
