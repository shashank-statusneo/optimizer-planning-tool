import { useState, useRef, MutableRefObject, useEffect } from 'react'
import { Container, Grid, Typography } from '@mui/material'

import { createTheme, ThemeProvider } from '@mui/material/styles'

import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks'

import {
    FormLabel,
    FormSubText,
    FormBackdropElement,
    FormSnackBarElement,
    FormTextField,
    FormRadioButton,
    CustomFormRadioButton,
} from '../../../components/FormElements'
import { FormUploadButton, PrimaryButton } from '../../../components/Buttons'
import { DataTemplates } from './constants'
import { utils, writeFile } from 'xlsx'

import {
    uploadInventory,
    updateAnnualCost,
    updateFillRate,
    updateCycleServiceLevel,
} from '../../../redux/actions/inventory/optimizer'

import { algorithmApi } from '../../../redux/actions/inventory/result'

const theme = createTheme()

const Optimizer = () => {
    const dispatch = useAppDispatch()

    const inventoryOptimizerState = useAppSelector(
        // @ts-ignore
        (state) => state.inventoryOptimizer,
    )

    const inventoryResultState = useAppSelector(
        // @ts-ignore
        (state) => state.inventoryResult,
    )

    const [snackbarState, setSnackbarState] = useState(false)

    const [leadTimeEnabled, setLeadTimeEnabled] = useState(false)
    const [volumneDiscountEnabled, setVolumeDiscountEnabled] = useState(false)
    const [fillRateEnabled, setFillRateEnabled] = useState(true)

    const weeklyForecastFile = useRef() as MutableRefObject<HTMLInputElement>
    const vendorCostFile = useRef() as MutableRefObject<HTMLInputElement>
    const purchaseOrderFile = useRef() as MutableRefObject<HTMLInputElement>
    const volumeDiscountFile = useRef() as MutableRefObject<HTMLInputElement>

    const handleFileUpload = (event: any, fileType: string) => {
        event.preventDefault()
        const fileObj = event.target.files && event.target.files[0]
        if (fileObj) {
            const context = {
                file: fileObj,
                file_type: fileType,
            }
            dispatch(
                // @ts-ignore
                uploadInventory(context, fileType, fileObj.name),
            )
        }
    }

    const handleLeadTimeChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        event.target.value == 'yes'
            ? setLeadTimeEnabled(true)
            : setLeadTimeEnabled(false)
    }

    const handleVolumDiscountChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        event.target.value == 'yes'
            ? setVolumeDiscountEnabled(true)
            : setVolumeDiscountEnabled(false)
    }

    const handleServiceLevelChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        event.target.value == 'fillRate'
            ? setFillRateEnabled(true)
            : setFillRateEnabled(false)
    }

    const handleFillRateChange = (e: any) => {
        dispatch(
            // @ts-ignore
            updateFillRate(e.target.value),
        )
    }

    const handleCycleServiceLevelChange = (e: any) => {
        dispatch(
            // @ts-ignore
            updateCycleServiceLevel(e.target.value),
        )
    }

    const handleSubmit = () => {
        // @ts-ignore
        dispatch(algorithmApi(inventoryOptimizerState))
    }

    const DownloadTemplateData = (templateType: string) => {
        const worksheetData: any = DataTemplates[templateType]

        const worksheet = utils.json_to_sheet(worksheetData)
        worksheet['!cols'] = [{ wch: 10 }, { wch: 9 }, { wch: 21 }]
        const workbook = utils.book_new()
        utils.book_append_sheet(workbook, worksheet, 'Sheet1')

        writeFile(workbook, templateType + '.xlsx')
    }

    useEffect(() => {
        setSnackbarState(true)
    }, [inventoryOptimizerState.message])

    return (
        <ThemeProvider theme={theme}>
            <Container component='main' sx={{ flexGrow: 1 }} fixed>
                <FormBackdropElement
                    loader={
                        inventoryOptimizerState.isLoading ||
                        inventoryResultState.isLoading
                    }
                />
                {snackbarState &&
                    (inventoryOptimizerState.message ||
                        inventoryResultState.message) && (
                        <FormSnackBarElement
                            message={
                                inventoryOptimizerState.message
                                    ? inventoryOptimizerState.message
                                    : inventoryResultState.message
                            }
                            onClose={() => setSnackbarState(false)}
                        />
                    )}

                <Grid container direction='column' rowGap={4}>
                    <Grid
                        container
                        item
                        justifyContent='center'
                        alignContent='center'
                        alignItems='flex-start'
                    >
                        <Grid item lg={6}>
                            <FormLabel label='Upload weekly demand forecast' />
                        </Grid>
                        <Grid
                            container
                            item
                            lg={6}
                            justifyContent='center'
                            alignContent='center'
                            alignItems='center'
                        >
                            <Grid item container>
                                <Grid item lg={6}>
                                    <FormUploadButton
                                        id='weekly-forecast-upload-btn'
                                        label='CHOOSE FILE'
                                        fileRef={weeklyForecastFile}
                                        loader={false}
                                        onChange={(e: any) => {
                                            handleFileUpload(
                                                e,
                                                'demand_forecast',
                                            )
                                        }}
                                        disabled={false}
                                    />
                                </Grid>
                                <Grid item lg={6}>
                                    <PrimaryButton
                                        id='weekly-forecast-template-download-btn'
                                        label='DOWNLOAD TEMPLATE'
                                        onClick={() =>
                                            DownloadTemplateData(
                                                'weeklyDemandForecast',
                                            )
                                        }
                                        disabled={false}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container sx={{ marginTop: '5px' }}>
                                <Typography>
                                    {
                                        inventoryOptimizerState.demand_forecast_file_name
                                    }
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        item
                        justifyContent='center'
                        alignContent='center'
                        alignItems='flex-start'
                    >
                        <Grid item lg={6}>
                            <FormLabel label='Upload vendor, costs & lead time details' />
                        </Grid>
                        <Grid
                            container
                            item
                            lg={6}
                            justifyContent='center'
                            alignContent='center'
                            alignItems='center'
                        >
                            <Grid item container>
                                <Grid item lg={6}>
                                    <FormUploadButton
                                        id='vendor-cost-upload-btn'
                                        label='CHOOSE FILE'
                                        fileRef={vendorCostFile}
                                        loader={false}
                                        onChange={(e: any) => {
                                            handleFileUpload(e, 'vendor')
                                        }}
                                        disabled={false}
                                    />
                                </Grid>
                                <Grid item lg={6}>
                                    <PrimaryButton
                                        id='vendor-cost-time-template-download-btn'
                                        label='DOWNLOAD TEMPLATE'
                                        onClick={() =>
                                            DownloadTemplateData(
                                                'vendorCostTime',
                                            )
                                        }
                                        disabled={false}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Typography>
                                    {inventoryOptimizerState.vendor_file_name}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        item
                        justifyContent='center'
                        alignContent='center'
                        alignItems='flex-start'
                    >
                        <Grid item lg={6}>
                            <FormLabel label='Estimate lead time from purchase order data?' />
                            <FormSubText subText='(If yes, lead time details in previous file will be overridden)' />
                        </Grid>
                        <Grid item container lg={6}>
                            <FormRadioButton
                                id='estimate-lead-time-selector'
                                identifier={leadTimeEnabled}
                                options={{ yes: 'Yes', no: 'No' }}
                                onChange={handleLeadTimeChange}
                            />
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        item
                        justifyContent='center'
                        alignContent='center'
                        alignItems='flex-start'
                    >
                        <Grid item lg={6}>
                            <FormLabel label='Upload purchase order data' />
                        </Grid>
                        <Grid
                            container
                            item
                            lg={6}
                            justifyContent='center'
                            alignContent='center'
                            alignItems='center'
                        >
                            <Grid item container>
                                <Grid item lg={6}>
                                    <FormUploadButton
                                        id='purchase-order-upload-btn'
                                        label='CHOOSE FILE'
                                        fileRef={purchaseOrderFile}
                                        loader={false}
                                        onChange={(e: any) => {
                                            handleFileUpload(
                                                e,
                                                'purchase_order',
                                            )
                                        }}
                                        disabled={!leadTimeEnabled}
                                    />
                                </Grid>
                                <Grid item lg={6}>
                                    <PrimaryButton
                                        id='purchase-order-template-download-btn'
                                        label='DOWNLOAD TEMPLATE'
                                        onClick={() =>
                                            DownloadTemplateData(
                                                'purchaseOrder',
                                            )
                                        }
                                        disabled={false}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container sx={{ marginTop: '5px' }}>
                                <Typography>
                                    {
                                        inventoryOptimizerState.purchase_order_file_name
                                    }
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        item
                        justifyContent='center'
                        alignContent='center'
                        alignItems='flex-start'
                    >
                        <Grid item lg={6}>
                            <FormLabel label='Use volume discount?' />
                        </Grid>
                        <Grid item container lg={6}>
                            <FormRadioButton
                                id='volume-discount-selector'
                                identifier={volumneDiscountEnabled}
                                options={{ yes: 'Yes', no: 'No' }}
                                onChange={handleVolumDiscountChange}
                            />
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        item
                        justifyContent='center'
                        alignContent='center'
                        alignItems='flex-start'
                    >
                        <Grid item lg={6}>
                            <FormLabel label='Upload volume discount details' />
                        </Grid>
                        <Grid
                            container
                            item
                            lg={6}
                            justifyContent='center'
                            alignContent='center'
                            alignItems='center'
                        >
                            <Grid item container>
                                <Grid item lg={6}>
                                    <FormUploadButton
                                        id='volume-discount-upload-btn'
                                        label='CHOOSE FILE'
                                        fileRef={volumeDiscountFile}
                                        loader={false}
                                        onChange={(e: any) => {
                                            handleFileUpload(
                                                e,
                                                'volume_discount',
                                            )
                                        }}
                                        disabled={!volumneDiscountEnabled}
                                    />
                                </Grid>
                                <Grid item lg={6}>
                                    <PrimaryButton
                                        id='volume-discount-template-download-btn'
                                        label='DOWNLOAD TEMPLATE'
                                        onClick={() =>
                                            DownloadTemplateData(
                                                'volumeDiscount',
                                            )
                                        }
                                        disabled={false}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container sx={{ marginTop: '5px' }}>
                                <Typography>
                                    {
                                        inventoryOptimizerState.volume_discount_file_name
                                    }
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        item
                        justifyContent='center'
                        alignContent='center'
                        alignItems='flex-start'
                    >
                        <Grid item lg={6}>
                            <FormLabel label='Specify annual holding cost per unit' />
                        </Grid>
                        <Grid item lg={6}>
                            <FormTextField
                                id='current-employees-textfield'
                                value={inventoryOptimizerState.annual_cost}
                                type='number'
                                onChange={(e: any) => {
                                    dispatch(
                                        // @ts-ignore
                                        updateAnnualCost(e.target.value),
                                    )
                                }}
                                inputProps={{
                                    inputProps: {
                                        min: 0,
                                    },
                                }}
                                size={'small'}
                            />
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        item
                        justifyContent='center'
                        alignContent='center'
                        alignItems='flex-start'
                    >
                        <Grid item lg={6}>
                            <FormLabel label='Specify service level %' />
                        </Grid>
                        <Grid
                            container
                            item
                            lg={6}
                            justifyContent='center'
                            alignContent='center'
                            alignItems='center'
                        >
                            <CustomFormRadioButton
                                id='service-level-selector'
                                identifier={fillRateEnabled}
                                options={{
                                    fillRate: 'Fill Rate',
                                    cycleServiceLevel: 'Cycle Service Level',
                                }}
                                textFieldsProps={[
                                    {
                                        id: 'service-level-selector',
                                        value: inventoryOptimizerState.fill_rate,
                                        type: 'number',
                                        onChange: handleFillRateChange,
                                        inputProps: {
                                            inputProps: {
                                                min: 0,
                                            },
                                        },
                                        error: false,
                                        onErrorMessage: '',
                                        disabled: !fillRateEnabled,
                                    },
                                    {
                                        id: 'cycle-service-level-textfield',
                                        value: inventoryOptimizerState.cycle_service_level,
                                        type: 'number',
                                        onChange: handleCycleServiceLevelChange,
                                        inputProps: {
                                            inputProps: {
                                                min: 0,
                                            },
                                        },
                                        error: false,
                                        onErrorMessage: '',
                                        disabled: fillRateEnabled,
                                    },
                                ]}
                                onChange={handleServiceLevelChange}
                            />
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        item
                        justifyContent='center'
                        alignContent='center'
                        alignItems='flex-start'
                        marginTop={3}
                    >
                        <PrimaryButton
                            id='generate-order-policy-btn'
                            label='GENERATE ORDER POLICY'
                            onClick={() => handleSubmit()}
                            disabled={
                                !(
                                    inventoryOptimizerState?.demand_master_id &&
                                    inventoryOptimizerState?.vendor_master_id &&
                                    inventoryOptimizerState?.annual_cost &&
                                    (inventoryOptimizerState.fill_rate ||
                                        inventoryOptimizerState.cycle_service_level)
                                )
                            }
                        />
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    )
}

export default Optimizer
