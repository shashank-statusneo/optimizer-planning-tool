import { createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

const initialState = {
    isLoading: false,
    message: '',
    warehouses: null,
    planning_warehouse: null,
    planning_start_date: dayjs(null),
    planning_end_date: dayjs(null),
}

// @ts-ignore
export const warehouseSelect = createSlice({
    name: 'warehouseSelect',
    initialState,
    reducers: {
        resetWarehouseSelectData(state, action) {
            return {
                ...initialState,
            }
        },

        getWarehouses(state, action) {
            return {
                ...state,
                message: '',
                isLoading: true,
            }
        },

        getWarehousesSuccess(state, action) {
            return {
                ...state,
                warehouses: action?.payload,
                isLoading: false,
            }
        },

        getWarehousesFailed(state, action) {
            return {
                ...state,
                message: 'Warehouse fetch failed',
                isLoading: false,
            }
        },

        updatePlanningWarehouseValue(state, action) {
            return {
                ...state,
                planning_warehouse: action?.payload,
            }
        },

        updatePlanningStartDateValue(state, action) {
            return {
                ...state,
                planning_start_date: action?.payload,
            }
        },

        updatePlanningEndDateValue(state, action) {
            return {
                ...state,
                planning_end_date: action?.payload,
            }
        },
    },
})

export const {
    resetWarehouseSelectData,
    getWarehouses,
    getWarehousesSuccess,
    getWarehousesFailed,
    updatePlanningWarehouseValue,
    updatePlanningStartDateValue,
    updatePlanningEndDateValue,
} = warehouseSelect.actions

export default warehouseSelect.reducer
