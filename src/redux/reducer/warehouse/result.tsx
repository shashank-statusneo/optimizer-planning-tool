import { createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

const initialState = {
    isLoading: false,
    message: '',
    result_start_date: dayjs(null),
    result_end_date: dayjs(null),
    result_output: null,
    result_additional_data: null,
    result_warehouse_name: null,
    result_demand_vs_fulfillment_data: null,
    result_categories: null,
    result_category: [],
    result_table: null,
}

// @ts-ignore
export const warehouseResult = createSlice({
    name: 'warehouseResult',
    initialState,
    reducers: {
        resetWarehouseResultData(state, action) {
            return {
                ...initialState,
            }
        },

        // START WAREHOUSE
        getWarehouses(state, action) {
            return {
                ...state,
                message: '',
                isLoading: true,
            }
        },

        updateResultStartDateValue(state, action) {
            return {
                ...state,
                result_start_date: action?.payload,
            }
        },

        updateResultEndDateValue(state, action) {
            return {
                ...state,
                result_end_date: action?.payload,
            }
        },

        postResult(state, action) {
            return {
                ...state,
                message: '',
                isLoading: true,
            }
        },

        // @ts-ignore
        postResultSuccess(state, action) {

            const getResultCategories = (output: any) => {
                const resultCategoriesCols = Object.keys(output[Object.keys(output)[0]])
                return resultCategoriesCols
            }
            return {
                ...state,
                result_output: action?.payload?.output,
                result_additional_data: action?.payload?.additional_data,
                result_warehouse_name: action?.payload?.warehouse_name,
                result_demand_vs_fulfillment_data:
                    action?.payload?.demand_vs_fulfillment_data,
                // @ts-ignore
                result_categories: getResultCategories(action?.payload?.output),
                isLoading: false,
            }
        },

        postResultFailed(state, action) {
            return {
                ...state,
                message: 'Result Calculate failed',
                isLoading: false,
            }
        },

        updateResultCategoriesValue(state, action) {
            return {
                ...state,
                result_categories: action?.payload,
            }
        },

        updateResultCategoryValue(state, action) {
            return {
                ...state,
                result_category: action?.payload,
            }
        },

        updateResultTableValue(state, action) {
            return {
                ...state,
                result_table: action?.payload,
            }
        },
    },
})


export const {
    resetWarehouseResultData,
    updateResultStartDateValue,
    updateResultEndDateValue,
    postResult,
    postResultSuccess,
    postResultFailed,
    updateResultCategoriesValue,
    updateResultCategoryValue,
    updateResultTableValue,
} = warehouseResult.actions

export default warehouseResult.reducer
