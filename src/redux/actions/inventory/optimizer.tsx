import { UPLOAD_INVENTORY_API } from '../../../services/routes'
import { apiClientForForm } from '../../../services/apiClient'

import {
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
    
} from '../../reducer/inventory/optimizer'

// @ts-ignore
export const resetInventoryOptimizerState = (payload) => async (dispatch) => {
    console.log('Calling action : resetInventoryOptimizerState()')
    // @ts-ignore
    await dispatch(resetInventoryOptimizerData(payload))
}

export const uploadInventory =
    // @ts-ignore
    (payload, fileType, fileName) => async (dispatch) => {
        console.log('Calling action : uploadInventory()')
        // @ts-ignore
        await dispatch(postInventory())
        try {
            const response = await apiClientForForm.post(
                UPLOAD_INVENTORY_API,
                payload,
            )
            if (response.data && response.status === 201) {
                response.data.fileName = fileName

                switch (fileType) {
                    case 'demand_forecast':
                        return dispatch(
                            postDemandInventorySuccess(response.data),
                        )
                    case 'vendor':
                        return dispatch(
                            postVendorInventorySuccess(response.data),
                        )
                    case 'purchase_order':
                        return dispatch(
                            postPurchaseOrderInventorySuccess(response.data),
                        )
                    case 'volume_discount':
                        return dispatch(
                            postVolumeDiscountInventorySuccess(response.data),
                        )
                }
            }
            return dispatch(postInventoryFailed(response))
        } catch (err) {
            return dispatch(postInventoryFailed(err))
        }
    }

// @ts-ignore
export const updateAnnualCost = (payload) => async (dispatch) => {
    await dispatch(updateAnnualCostValue(payload))
}

// @ts-ignore
export const updateFillRate = (payload) => async (dispatch) => {
    await dispatch(updateFillRateValue(payload))
}
// @ts-ignore
export const updateCycleServiceLevel = (payload) => async (dispatch) => {
    await dispatch(updateCycleServiceLevelValue(payload))
}
