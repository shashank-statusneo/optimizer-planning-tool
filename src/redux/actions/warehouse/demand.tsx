import {
    UPLOAD_DEMAND_FILE_API,
    DEMAND_FORECAST_API,
} from '../../../services/routes'
import { apiClient, apiClientForForm } from '../../../services/apiClient'

import {
    resetWarehouseDemandData,
    postDemand,
    postDemandSuccess,
    postDemandFailed,
    getDemandForecast,
    getDemandForecastSuccess,
    getDemandForecastFailed,
    putDemandForecast,
    putDemandForecastSuccess,
    putDemandForecastFailed,
    updateDemandTableDataColValue,
    updateModifiedDemandTableDataValue,
    updateDemandTableDataValue,
    updateFlagDemandTableUpdatedValue,
} from '../../reducer/warehouse/demand'

import { GridColDef } from '@mui/x-data-grid'
import object from 'lodash'

// @ts-ignore
export const resetWarehouseDemandState = (payload) => async (dispatch) => {
    console.log('Calling action : resetWarehouseDemandState()')
    // @ts-ignore
    await dispatch(resetWarehouseDemandData(payload))
}

// @ts-ignore
export const uploadDemandFile = (payload, id, fileName) => async (dispatch) => {
    console.log('Calling action : uploadDemandFile()')
    // @ts-ignore
    await dispatch(postDemand())
    try {
        const response = await apiClientForForm.post(
            `${UPLOAD_DEMAND_FILE_API}/${id}`,
            payload,
        )
        if (response.status === 201) {
            response.data.fileName = fileName
            await dispatch(postDemandSuccess(response.data))
            return dispatch(getDemandForecastData(payload, id))
        }
        return dispatch(postDemandFailed(response))
    } catch (err: any) {
        const error = err?.response?.data ? err?.response?.data : err
        return dispatch(postDemandFailed(error))
    }
}

// @ts-ignore
export const getDemandForecastData = (payload, id) => async (dispatch) => {
    console.log('Calling action : getDemandForecastData()')
    // @ts-ignore
    await dispatch(getDemandForecast())
    try {
        const response = await apiClient.get(
            `${DEMAND_FORECAST_API}/${id}?start_date=${payload.start_date}&end_date=${payload.end_date}`,
        )
        if (response.status === 200) {
            dispatch(modifyDemandTableData(response.data))

            return dispatch(getDemandForecastSuccess(response.data))
        }
        return dispatch(getDemandForecastFailed(response))
    } catch (err) {
        return dispatch(getDemandForecastFailed(err))
    }
}

// @ts-ignore
const modifyDemandTableData = (data) => async (dispatch) => {
    const records: any = []

    const demandForecastTableColumns: GridColDef[] = [
        {
            field: 'date',
            headerName: 'Date',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            headerClassName: 'header',
            minWidth: 200,
        },
    ]

    if (data && !object.isEmpty(data)) {
        const columnList = Object.keys(data[Object.keys(data)[0]])

        for (const col in columnList) {
            if (columnList[col] !== 'total') {
                demandForecastTableColumns.push({
                    field: columnList[col],
                    headerName: columnList[col],
                    editable: true,
                    flex: 1,
                    type: 'number',
                    headerAlign: 'center',
                    align: 'center',
                    headerClassName: 'header',
                    minWidth: 200,
                })
            } else {
                demandForecastTableColumns.push({
                    field: columnList[col],
                    headerName: 'Total',
                    editable: false,
                    flex: 1,
                    type: 'number',
                    headerAlign: 'center',
                    align: 'center',
                    headerClassName: 'header',
                    minWidth: 200,
                })
            }
        }

        Object.keys(data).forEach((key, index) => {
            if (key !== 'total') {
                const record: any = {
                    id: index + 1,
                    date: key,
                }

                Object.keys(data[key]).forEach((key_x: any) => {
                    if (key_x !== 'total') {
                        record[key_x] = data[key][key_x]['demand']
                    } else {
                        record['total'] = data[key]['total']
                    }
                })

                records.push(record)
            }
        })

        await dispatch(updateDemandTableDataCol(demandForecastTableColumns))
    }

    await dispatch(updateModifiedDemandTableDataValue(records))
}

// @ts-ignore
export const putDemandForecastData = (payload, data) => async (dispatch) => {
    console.log('Calling action : putDemandForecastData()')
    // @ts-ignore
    await dispatch(putDemandForecast())
    try {
        const response = await apiClient.put(DEMAND_FORECAST_API, payload)
        if (response.status === 200) {
            return dispatch(putDemandForecastSuccess(data))
        }
        return dispatch(putDemandForecastFailed(response))
    } catch (err) {
        return dispatch(putDemandForecastFailed(err))
    }
}

// @ts-ignore
export const updateDemandTableDataCol = (payload) => async (dispatch) => {
    await dispatch(updateDemandTableDataColValue(payload))
}
// @ts-ignore
export const updateModifiedDemandTableData = (payload) => async (dispatch) => {
    await dispatch(updateModifiedDemandTableDataValue(payload))
}
// @ts-ignore
export const updateDemandTableData = (payload) => async (dispatch) => {
    await dispatch(updateDemandTableDataValue(payload))
}

// @ts-ignore
export const updateFlagDemandTableUpdated = (payload) => async (dispatch) => {
    await dispatch(updateFlagDemandTableUpdatedValue(payload))
}
