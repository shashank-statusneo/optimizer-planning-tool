import { createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

// Define a type for the initial state
interface StateType {
    isLoading: boolean
    message: string
    result: any
    policy_detail: any
    simulation_output: any
    inventory_start_date: dayjs.Dayjs
    inventory_end_date: dayjs.Dayjs
}

const initialState: StateType = {
    isLoading: false,
    message: '',
    result: {},
    policy_detail: [],
    simulation_output: [],
    inventory_start_date: dayjs(null),
    inventory_end_date: dayjs(null),
}

export const inventoryResult = createSlice({
    name: 'inventoryResult',
    initialState,
    reducers: {
        postAlgorithmApi(state, action) {
            return {
                ...state,
                message: '',
                isLoading: true,
            }
        },
        postAlgorithmApiSuccess(state, action) {
            return {
                ...state,
                result: action?.payload?.data?.result,
                policy_detail: action?.payload?.data?.policy_detail,
                simulation_output: action?.payload?.data?.simulation_output,
                isLoading: false,
            }
        },
        postAlgorithmApiFailed(state, action) {
            return {
                ...state,
                message: 'Algorithm API Failed',
                isLoading: false,
            }
        },

        updateInventoryStartDateValue(state, action) {
            return {
                ...state,
                inventory_start_date: action?.payload,
            }
        },

        updateInventoryEndDateValue(state, action) {
            return {
                ...state,
                inventory_end_date: action?.payload,
            }
        },
    },
})

export const {
    postAlgorithmApi,
    postAlgorithmApiSuccess,
    postAlgorithmApiFailed,
    updateInventoryStartDateValue,
    updateInventoryEndDateValue,
} = inventoryResult.actions

export default inventoryResult.reducer
