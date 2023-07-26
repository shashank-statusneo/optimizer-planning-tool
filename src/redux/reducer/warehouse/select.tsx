import { createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

type selectedWarehouseType = {
    id: number
    name: string
}

// Define a type for the initial state
interface StateType {
    isLoading: boolean
    message: string
    warehouses: any[]
    planning_warehouse: null | selectedWarehouseType
    planning_start_date: dayjs.Dayjs
    planning_end_date: dayjs.Dayjs
}

const initialState: StateType = {
    isLoading: false,
    message: '',
    warehouses: [],
    planning_warehouse: null,
    planning_start_date: dayjs(null),
    planning_end_date: dayjs(null),
}

export const warehouseSelect = createSlice({
    name: 'warehouseSelect',
    initialState,
    reducers: {
        resetWarehouseSelectData(state, action) {
            return {
                ...initialState,
            }
        },

        getWarehouses(state) {
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
