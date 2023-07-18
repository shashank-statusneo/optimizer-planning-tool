import { createSlice } from '@reduxjs/toolkit'

// Define a type for the initial state
interface StateType {
    isLoading: boolean
    message: string
    demand_master_id: any
    demand_forecast_file_name: string
    vendor_master_id: any
    vendor_file_name: string
    purchase_order_master_id: any
    purchase_order_file_name: string
    volume_discount_master_id: any
    volume_discount_file_name: string
    distance_matrix_master_id: any
    distance_matrix_file_name: string
    destination_coordinates_master_id: any
    destination_coordinates_file_name: string
    annual_cost: string | number
    fill_rate: string | number
    cycle_service_level: string | number
}

const initialState: StateType = {
    isLoading: false,
    message: '',
    demand_master_id: null,
    demand_forecast_file_name: '',
    vendor_master_id: null,
    vendor_file_name: '',
    purchase_order_master_id: null,
    purchase_order_file_name: '',
    volume_discount_master_id: null,
    volume_discount_file_name: '',
    distance_matrix_master_id: null,
    distance_matrix_file_name: '',
    destination_coordinates_master_id: null,
    destination_coordinates_file_name: '',
    annual_cost: '',
    fill_rate: '',
    cycle_service_level: '',
}

export const inventoryOptimizer = createSlice({
    name: 'inventoryOptimizer',
    initialState,
    reducers: {
        resetInventoryOptimizerData(state, action) {
            return {
                ...initialState,
            }
        },
        postInventory(state, action) {
            return {
                ...state,
                message: '',
                isLoading: true,
            }
        },
        postDemandInventorySuccess(state, action) {
            return {
                ...state,
                demand_master_id: action?.payload?.master_id,
                demand_forecast_file_name: action?.payload?.fileName,
                isLoading: false,
            }
        },
        postVendorInventorySuccess(state, action) {
            return {
                ...state,
                vendor_master_id: action?.payload?.master_id,
                vendor_file_name: action?.payload?.fileName,
                isLoading: false,
            }
        },
        postPurchaseOrderInventorySuccess(state, action) {
            return {
                ...state,
                purchase_order_master_id: action?.payload?.master_id,
                purchase_order_file_name: action?.payload?.fileName,
                isLoading: false,
            }
        },
        postVolumeDiscountInventorySuccess(state, action) {
            return {
                ...state,
                volume_discount_master_id: action?.payload?.master_id,
                volume_discount_file_name: action?.payload?.fileName,
                isLoading: false,
            }
        },

        updateAnnualCostValue(state, action) {
            return {
                ...state,
                annual_cost: action?.payload,
            }
        },

        updateAnnualHoldingCostValue(state, action) {
            return {
                ...state,
                annual_holding_cost: action?.payload,
            }
        },

        updateFillRateValue(state, action) {
            return {
                ...state,
                fill_rate: action?.payload,
            }
        },

        updateCycleServiceLevelValue(state, action) {
            return {
                ...state,
                cycle_service_level: action?.payload,
            }
        },

        postInventoryFailed(state, action) {
            return {
                ...state,
                message: 'File Upload Failed',
                isLoading: false,
            }
        },
    },
})

export const {
    resetInventoryOptimizerData,
    postInventory,
    postDemandInventorySuccess,
    postVendorInventorySuccess,
    postPurchaseOrderInventorySuccess,
    postVolumeDiscountInventorySuccess,
    updateAnnualCostValue,
    updateFillRateValue,
    updateCycleServiceLevelValue,
    postInventoryFailed,
} = inventoryOptimizer.actions

export default inventoryOptimizer.reducer
