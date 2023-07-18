import { useState, useEffect, useRef, MutableRefObject } from 'react'

import { Container, Grid, Typography } from '@mui/material'

import { PrimaryButton, FormUploadButton } from '../../../components/Buttons'
import {
    FormLabel,
    FormBackdropElement,
    FormSnackBarElement,
} from '../../../components/FormElements'
import { FormDataGrid } from '../../../components/Table'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks'
import { useNavigate } from 'react-router-dom'

import {
    uploadProductivityFile,
    getBenchmarkProductivityData,
    putBenchmarkProductivityData,
    updateFlagProductivityTableUpdated,
} from '../../../redux/actions/warehouse/productivity'

import { GridRowModel } from '@mui/x-data-grid'

import { createTheme, ThemeProvider } from '@mui/material/styles'
const theme = createTheme()

import { benchmarkProductivityTableColumns } from './constants'

const BenchmarkProductivity = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const warehouseSelectState = useAppSelector(
        (state) => state.warehouseSelect,
    )

    const warehouseProductivityState = useAppSelector(
        (state) => state.warehouseProductivity,
    )

    const [snackbarState, setSnackbarState] = useState(false)

    const fetchData = () => {
        dispatch(
            getBenchmarkProductivityData(
                warehouseSelectState.planning_warehouse?.id,
            ),
        )
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        setSnackbarState(true)
    }, [warehouseProductivityState.message])

    const benchmarkProductivityFile =
        useRef() as MutableRefObject<HTMLInputElement>

    const [updatedTableData]: any = useState([])

    const [updateRequestPayload]: any = useState([])

    const editableCols = [
        'productivity_experienced_employee',
        'productivity_new_employee',
    ]

    const processDataChange = (newRow: GridRowModel) => {
        const updatedRow = { ...newRow }
        const selectedRow =
            warehouseProductivityState.productivity_table_data.find(
                (row: any) => row.id === updatedRow.id,
            )

        if (JSON.stringify(selectedRow) !== JSON.stringify(updatedRow)) {
            const requestPayload: any = {
                id: selectedRow.id,
            }

            for (const col in editableCols) {
                if (
                    selectedRow[editableCols[col]] !=
                    updatedRow[editableCols[col]]
                ) {
                    requestPayload[editableCols[col]] =
                        updatedRow[editableCols[col]]
                }
            }

            updateRequestPayload.some(
                (payload: any) => payload.id === requestPayload.id,
            )
                ? updateRequestPayload.map((obj: any) => {
                      if (obj.id === requestPayload.id) {
                          obj = Object.assign(obj, requestPayload)
                      }
                  })
                : updateRequestPayload.push(requestPayload)

            updatedTableData.some((payload: any) => payload.id === newRow.id)
                ? updatedTableData.map((obj: any) => {
                      if (obj.id === newRow.id) {
                          obj = Object.assign(obj, newRow)
                      }
                  })
                : updatedTableData.push(newRow)

            // @ts-ignore
            dispatch(updateFlagProductivityTableUpdated(true))
        }
        return updatedRow
    }

    const handleClickSave = () => {
        const tableData = JSON.parse(
            JSON.stringify(warehouseProductivityState.productivity_table_data),
        )
        updatedTableData.map((newObj: any, index: any) => {
            const oldObjIndex = tableData.findIndex(
                (oldObj: any) => oldObj.id === newObj.id,
            )
            tableData[oldObjIndex] = { ...newObj }
        })
        dispatch(
            // @ts-ignore
            putBenchmarkProductivityData(
                { productivity: updateRequestPayload },
                tableData,
            ),
        )
        // @ts-ignore
        dispatch(updateFlagProductivityTableUpdated(false))
    }

    const handleChange = (event: any) => {
        event.preventDefault()
        const fileObj = event.target.files && event.target.files[0]
        if (fileObj) {
            const context = {
                file: fileObj,
            }
            dispatch(
                // @ts-ignore
                uploadProductivityFile(
                    context,
                    warehouseSelectState.planning_warehouse?.id,
                    fileObj.name,
                ),
            )
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component='main' sx={{ flexGrow: 1 }} fixed>
                <FormBackdropElement
                    loader={warehouseProductivityState.isLoading}
                />
                {snackbarState && warehouseProductivityState.message && (
                    <FormSnackBarElement
                        message={warehouseProductivityState.message}
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
                            <FormLabel label='Upload benchmark productivity file (only .xls and .xlsx files supported)' />
                        </Grid>
                        <Grid item lg={2}>
                            <FormUploadButton
                                id='benchmark-productivity-upload-btn'
                                label='CHOOSE FILE'
                                fileRef={benchmarkProductivityFile}
                                loader={false}
                                onChange={handleChange}
                                disabled={false}
                            />
                        </Grid>
                        <Grid item lg={2}>
                            <Typography>
                                {
                                    warehouseProductivityState.productivity_file_name
                                }
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
                        {warehouseProductivityState.productivity_table_data && (
                            <FormDataGrid
                                columns={
                                    warehouseProductivityState
                                        .productivity_table_data.length > 0
                                        ? benchmarkProductivityTableColumns
                                        : []
                                }
                                rows={
                                    warehouseProductivityState.productivity_table_data
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
                        sx={{ marginTop: '10px' }}
                    >
                        <PrimaryButton
                            id='save-benchmark-productivity-table-btn'
                            label='Save Data'
                            onClick={() => {
                                handleClickSave()
                            }}
                            disabled={
                                !warehouseProductivityState.flag_productivity_table_updated
                            }
                        />
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    )
}

export default BenchmarkProductivity
