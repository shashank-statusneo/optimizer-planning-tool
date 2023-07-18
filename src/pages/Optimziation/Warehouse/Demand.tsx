import { useState, useRef, MutableRefObject, useEffect } from 'react'

import { Container, Grid, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks'
import dayjs from 'dayjs'

import {
    uploadDemandFile,
    getDemandForecastData,
    putDemandForecastData,
    updateFlagDemandTableUpdated,
} from '../../../redux/actions/warehouse/demand'

import { PrimaryButton, FormUploadButton } from '../../../components/Buttons'
import {
    FormLabel,
    FormBackdropElement,
    FormSnackBarElement,
} from '../../../components/FormElements'
import { FormDataGrid } from '../../../components/Table'
import { GridRowModel } from '@mui/x-data-grid'

import { createTheme, ThemeProvider } from '@mui/material/styles'
const theme = createTheme()

const DemandForecast = () => {
    const dispatch = useAppDispatch()

    const warehouseSelectState = useAppSelector(
        (state: any) => state.warehouseSelect,
    )

    const warehouseDemandState = useAppSelector(
        (state: any) => state.warehouseDemand,
    )

    const [snackbarState, setSnackbarState] = useState(false)

    const fetchData = () => {
        const context = {
            start_date: dayjs(warehouseSelectState.planning_start_date).format(
                'YYYY-MM-DD',
            ),
            end_date: dayjs(warehouseSelectState.planning_end_date).format(
                'YYYY-MM-DD',
            ),
        }

        dispatch(
            // @ts-ignore
            getDemandForecastData(
                context,
                warehouseSelectState.planning_warehouse?.id,
            ),
        )
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        setSnackbarState(true)
    }, [warehouseDemandState.message])

    const demandForecastFile = useRef() as MutableRefObject<HTMLInputElement>

    const [updatedTableData]: any[] = useState([])

    const [updateRequestPayload]: any[] = useState([])

    const processDataChange = (newRow: GridRowModel, oldRow: GridRowModel) => {
        const updatedRow = { ...newRow }

        let updatedCol: string | number | null = null

        Object.keys(oldRow).forEach((key) => {
            if (oldRow[key] !== newRow[key]) {
                updatedCol = key
            }
        })

        if (updatedCol) {
            updateRequestPayload.push({
                id: warehouseDemandState.demand_table_data[newRow.date][
                    updatedCol
                ]['id'],
                demand: updatedRow[updatedCol],
            })

            updatedTableData.some((payload: any) => payload.id === newRow.id)
                ? updatedTableData.map((obj: any) => {
                      if (obj.id === newRow.id) {
                          obj = Object.assign(obj, newRow)
                      }
                  })
                : updatedTableData.push(newRow)

            // @ts-ignore
            dispatch(updateFlagDemandTableUpdated(true))
        }
        return updatedRow
    }

    const handleClickSave = () => {
        const tableData = JSON.parse(
            JSON.stringify(warehouseDemandState.modified_demand_table_data),
        )
        updatedTableData.map((newObj: any) => {
            const oldObjIndex = tableData.findIndex(
                (oldObj: any) => oldObj.id === newObj.id,
            )
            tableData[oldObjIndex] = { ...newObj }
        })
        dispatch(
            // @ts-ignore
            putDemandForecastData({ demands: updateRequestPayload }, tableData),
        )
        // @ts-ignore
        dispatch(updateFlagDemandTableUpdated(false))
    }

    const handleChange = (event: any) => {
        event.preventDefault()
        const fileObj = event.target.files && event.target.files[0]
        if (fileObj) {
            const context = {
                start_date: dayjs(
                    warehouseSelectState.planning_start_date,
                ).format('YYYY-MM-DD'),
                end_date: dayjs(warehouseSelectState.planning_end_date).format(
                    'YYYY-MM-DD',
                ),
            }
            dispatch(
                // @ts-ignore
                uploadDemandFile(
                    { ...context, file: fileObj },
                    warehouseSelectState.planning_warehouse?.id,
                    fileObj.name,
                ),
            )
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component='main' sx={{ flexGrow: 1 }} fixed>
                <FormBackdropElement loader={warehouseDemandState.isLoading} />
                {snackbarState && warehouseDemandState.message && (
                    <FormSnackBarElement
                        message={warehouseDemandState.message}
                        onClose={() => setSnackbarState(false)}
                    />
                )}
                <Grid
                    container
                    direction='column'
                    spacing={2}
                    sx={{ marginTop: '10px' }}
                >
                    <Grid
                        container
                        item
                        justifyContent='flex-start'
                        alignContent='center'
                        alignItems='center'
                    >
                        <Grid item lg={8}>
                            <FormLabel label='Upload demand forecast file (only .xls and .xlsx files supported)' />
                        </Grid>
                        <Grid item lg={2}>
                            <FormUploadButton
                                id='demand-forecast-upload-btn'
                                label='CHOOSE FILE'
                                fileRef={demandForecastFile}
                                loader={false}
                                onChange={handleChange}
                                disabled={false}
                            />
                        </Grid>
                        <Grid item lg={2}>
                            <Typography>
                                {warehouseDemandState.demand_file_name}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        item
                        justifyContent='flex-start'
                        alignContent='center'
                        alignItems='center'
                        sx={{ marginTop: '10px', height: '350px' }}
                    >
                        {warehouseDemandState.modified_demand_table_data && (
                            <FormDataGrid
                                columns={
                                    warehouseDemandState.demand_table_cols
                                        ? warehouseDemandState.demand_table_cols
                                        : []
                                }
                                rows={
                                    warehouseDemandState.modified_demand_table_data
                                }
                                processDataChange={processDataChange}
                            />
                        )}
                    </Grid>

                    <Grid
                        container
                        item
                        justifyContent='center'
                        alignContent='center'
                        alignItems='center'
                        sx={{ marginTop: '10px', height: '50px' }}
                    >
                        <PrimaryButton
                            id='save-demand-forecast-table-btn'
                            label='Save Data'
                            onClick={() => {
                                handleClickSave()
                            }}
                            disabled={
                                !warehouseDemandState.flag_demand_table_updated
                            }
                        />
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    )
}

export default DemandForecast
