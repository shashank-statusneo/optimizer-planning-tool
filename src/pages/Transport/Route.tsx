import { useState, useRef, MutableRefObject, useEffect } from 'react'
import { Container, Grid, Typography, InputAdornment } from '@mui/material'

import { createTheme, ThemeProvider } from '@mui/material/styles'

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'

import {
    FormLabel,
    FormSubText,
    FormBackdropElement,
    FormSnackBarElement,
    FormTextField,
    FormRadioButton,
    CustomFormRadioButton,
    FormSubLabel,
    FormSubLabel2,
    FormSwitchBtn,
} from '../../components/FormElements'
import { FormUploadButton, PrimaryButton } from '../../components/Buttons'
// import { DataTemplates } from './constants'
import { utils, writeFile } from 'xlsx'

import {
    uploadInventory,
    updateAnnualCost,
    updateFillRate,
    updateCycleServiceLevel,
} from '../../redux/actions/inventory/optimizer'

import { algorithmApi } from '../../redux/actions/inventory/result'

const theme = createTheme()

const RouteOptimizer = () => {
    const dispatch = useAppDispatch()

    const routeOptimizerState = useAppSelector(
        // @ts-ignore
        (state) => state.routeOptimizer,
    )

    const inventoryResultState = useAppSelector(
        // @ts-ignore
        (state) => state.inventoryResult,
    )

    const [snackbarState, setSnackbarState] = useState(false)

    const [isObjectiveCost, setIsObjectiveCost] = useState(true)
    const [roundTripEnabled, setRoundTripEnabled] = useState(false)
    const [volumneDiscountEnabled, setVolumeDiscountEnabled] = useState(false)
    const [perOrderEnabled, setPerOrderEnabled] = useState(true)
    const [fillRateEnabled, setFillRateEnabled] = useState(true)

    const distanceMatrixFile = useRef() as MutableRefObject<HTMLInputElement>
    const sourceCoordinateFile = useRef() as MutableRefObject<HTMLInputElement>
    const destinationCoordinateFile =
        useRef() as MutableRefObject<HTMLInputElement>
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

    const handleIsObjectiveCostChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        event.target.value == 'minimizeCost'
            ? setIsObjectiveCost(true)
            : setIsObjectiveCost(false)
    }

    const handleRoundTripChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        event.target.value == 'yes'
            ? setRoundTripEnabled(true)
            : setRoundTripEnabled(false)
    }
    const handleVolumDiscountChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        event.target.value == 'yes'
            ? setVolumeDiscountEnabled(true)
            : setVolumeDiscountEnabled(false)
    }

    const handleDistanceServiceTimeChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        event.target.value == 'perOrder'
            ? setPerOrderEnabled(true)
            : setPerOrderEnabled(false)
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
        dispatch(algorithmApi(routeOptimizerState))
    }

    const DownloadTemplateData = (templateType: string) => {
        // const worksheetData: any = DataTemplates[templateType]

        // const worksheet = utils.json_to_sheet(worksheetData)
        // worksheet['!cols'] = [{ wch: 10 }, { wch: 9 }, { wch: 21 }]
        // const workbook = utils.book_new()
        // utils.book_append_sheet(workbook, worksheet, 'Sheet1')

        // writeFile(workbook, templateType + '.xlsx')
        console.log('Download data')
    }

    useEffect(() => {
        setSnackbarState(true)
    }, [routeOptimizerState.message])

    return (
        <ThemeProvider theme={theme}>
            <Container component='main' sx={{ flexGrow: 1 }} fixed>
                <FormBackdropElement
                    loader={
                        routeOptimizerState.isLoading ||
                        inventoryResultState.isLoading
                    }
                />
                {snackbarState &&
                    (routeOptimizerState.message ||
                        inventoryResultState.message) && (
                        <FormSnackBarElement
                            message={
                                routeOptimizerState.message
                                    ? routeOptimizerState.message
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
                            <FormLabel label='Upload distance matrix' />
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
                                        id='distance-matrix-upload-btn'
                                        label='CHOOSE FILE'
                                        fileRef={distanceMatrixFile}
                                        loader={false}
                                        onChange={(e: any) => {
                                            handleFileUpload(
                                                e,
                                                'distance_matrix',
                                            )
                                        }}
                                        disabled={false}
                                    />
                                </Grid>
                                <Grid item lg={6}>
                                    <PrimaryButton
                                        id='distance-matrix-template-download-btn'
                                        label='DOWNLOAD TEMPLATE'
                                        onClick={() =>
                                            DownloadTemplateData(
                                                'distanceMatrix',
                                            )
                                        }
                                        disabled={false}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container sx={{ marginTop: '5px' }}>
                                <Typography>
                                    {
                                        routeOptimizerState.distance_matrix_file_name
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
                            <FormLabel label='Upload source coordinates' />
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
                                        id='source-coordinate-upload-btn'
                                        label='CHOOSE FILE'
                                        fileRef={sourceCoordinateFile}
                                        loader={false}
                                        onChange={(e: any) => {
                                            handleFileUpload(
                                                e,
                                                'source_coordinate',
                                            )
                                        }}
                                        disabled={false}
                                    />
                                </Grid>
                                <Grid item lg={6}>
                                    <PrimaryButton
                                        id='source-coordinate-template-download-btn'
                                        label='DOWNLOAD TEMPLATE'
                                        onClick={() =>
                                            DownloadTemplateData(
                                                'sourceCoordinate',
                                            )
                                        }
                                        disabled={false}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Typography>
                                    {
                                        routeOptimizerState.source_coordinate_file_name
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
                            <FormLabel label='Upload destination coordinates' />
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
                                        id='destination-coordinate-upload-btn'
                                        label='CHOOSE FILE'
                                        fileRef={destinationCoordinateFile}
                                        loader={false}
                                        onChange={(e: any) => {
                                            handleFileUpload(
                                                e,
                                                'destination_coordinate',
                                            )
                                        }}
                                        disabled={false}
                                    />
                                </Grid>
                                <Grid item lg={6}>
                                    <PrimaryButton
                                        id='destination-coordinate-template-download-btn'
                                        label='DOWNLOAD TEMPLATE'
                                        onClick={() =>
                                            DownloadTemplateData(
                                                'destinationCoordinate',
                                            )
                                        }
                                        disabled={false}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Typography>
                                    {
                                        routeOptimizerState.destination_coordinate_file_name
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
                            <FormLabel label='Choose objective' />
                        </Grid>
                        <Grid item container lg={6}>
                            <FormRadioButton
                                id='objective-selector'
                                identifier={isObjectiveCost}
                                options={{
                                    minimizeCost: 'Minimize Cost',
                                    minimizeTime: 'Minimize Time',
                                }}
                                onChange={handleIsObjectiveCostChange}
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
                            <FormLabel label='List round-trip distance/time' />
                        </Grid>
                        <Grid item container lg={6}>
                            <FormRadioButton
                                id='round-trip-selector'
                                identifier={roundTripEnabled}
                                options={{
                                    yes: 'Yes',
                                    no: 'No',
                                }}
                                onChange={handleRoundTripChange}
                            />
                        </Grid>
                        <Grid
                            item
                            container
                            justifyContent='flex-start'
                            alignContent='center'
                            alignItems='center'
                        >
                            <Grid item lg={6}>
                                <FormSubLabel2 label='Specify atleast one of the following' />
                            </Grid>
                            <Grid item container lg={4} rowGap={0.5}>
                                <Grid
                                    container
                                    justifyContent='flex-start'
                                    alignContent='center'
                                    alignItems='center'
                                >
                                    <Grid item lg={6}>
                                        <FormSubLabel2 label='Max trip distance' />
                                    </Grid>
                                    <Grid item lg={6}>
                                        <FormTextField
                                            id='max-trip-distance-textfield'
                                            value={
                                                routeOptimizerState.annual_cost
                                            }
                                            type='number'
                                            onChange={(e: any) => {
                                                dispatch(
                                                    // @ts-ignore
                                                    updateAnnualCost(
                                                        e.target.value,
                                                    ),
                                                )
                                            }}
                                            inputProps={{
                                                endAdornment: (
                                                    <InputAdornment position='end'>
                                                        km
                                                    </InputAdornment>
                                                ),
                                            }}
                                            error={false}
                                            onErrorMessage={''}
                                            disabled={false}
                                            size={'small'}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    justifyContent='flex-start'
                                    alignContent='center'
                                    alignItems='center'
                                >
                                    <Grid item lg={6}>
                                        <FormSubLabel2 label='Max trip duration' />
                                    </Grid>
                                    <Grid item lg={6}>
                                        <FormTextField
                                            id='max-trip-duration-textfield'
                                            value={
                                                routeOptimizerState.annual_cost
                                            }
                                            type='number'
                                            onChange={(e: any) => {
                                                dispatch(
                                                    // @ts-ignore
                                                    updateAnnualCost(
                                                        e.target.value,
                                                    ),
                                                )
                                            }}
                                            inputProps={{
                                                endAdornment: (
                                                    <InputAdornment position='end'>
                                                        hrs
                                                    </InputAdornment>
                                                ),
                                            }}
                                            error={false}
                                            onErrorMessage={''}
                                            disabled={!roundTripEnabled}
                                            size={'small'}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        item
                        justifyContent='center'
                        alignContent='center'
                        alignItems='flex-start'
                        rowGap={0.5}
                    >
                        <Grid item lg={12}>
                            <FormLabel label='Specify destination service time parameters' />
                        </Grid>
                        <Grid
                            item
                            container
                            justifyContent='flex-start'
                            alignContent='center'
                            alignItems='center'
                        >
                            <Grid item lg={6}>
                                <FormSubLabel2 label='Fixed component' />
                            </Grid>
                            <Grid item lg={6}>
                                <FormTextField
                                    id='max-trip-distance-textfield'
                                    value={routeOptimizerState.annual_cost}
                                    type='number'
                                    onChange={(e: any) => {
                                        dispatch(
                                            // @ts-ignore
                                            updateAnnualCost(e.target.value),
                                        )
                                    }}
                                    inputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                mins
                                            </InputAdornment>
                                        ),
                                    }}
                                    error={false}
                                    onErrorMessage={''}
                                    disabled={false}
                                    size={'small'}
                                />
                            </Grid>
                            <Grid item lg={6}>
                                <FormSubLabel2 label='Variable component' />
                            </Grid>
                            <Grid container item lg={6}>
                                <CustomFormRadioButton
                                    id='destination-service-time-variable-component-selector'
                                    identifier={perOrderEnabled}
                                    options={{
                                        perOrder: 'Per order',
                                        perHandlingUnit: 'Per handling unit',
                                    }}
                                    textFieldsProps={[
                                        {
                                            id: 'per-order-level-selector',
                                            value: routeOptimizerState.fill_rate,
                                            type: 'number',
                                            onChange: handleFillRateChange,
                                            inputProps: {
                                                endAdornment: (
                                                    <InputAdornment position='end'>
                                                        mins
                                                    </InputAdornment>
                                                ),
                                            },
                                            error: false,
                                            onErrorMessage: '',
                                            disabled: !perOrderEnabled,
                                        },
                                        {
                                            id: 'per-handling-unit-level-textfield',
                                            value: routeOptimizerState.cycle_service_level,
                                            type: 'number',
                                            onChange:
                                                handleCycleServiceLevelChange,
                                            inputProps: {
                                                endAdornment: (
                                                    <InputAdornment position='end'>
                                                        mins
                                                    </InputAdornment>
                                                ),
                                            },
                                            error: false,
                                            onErrorMessage: '',
                                            disabled: perOrderEnabled,
                                        },
                                    ]}
                                    onChange={handleDistanceServiceTimeChange}
                                />
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
                            <FormLabel label='Upload fleet details' />
                            <FormSubText subText='(vehicle type, no. of vehicles, fixed & variable costs, capacities, avg. speed & additional characteristics)' />
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
                                        id='source-coordinate-upload-btn'
                                        label='CHOOSE FILE'
                                        fileRef={sourceCoordinateFile}
                                        loader={false}
                                        onChange={(e: any) => {
                                            handleFileUpload(
                                                e,
                                                'source_coordinate',
                                            )
                                        }}
                                        disabled={false}
                                    />
                                </Grid>
                                <Grid item lg={6}>
                                    <PrimaryButton
                                        id='source-coordinate-template-download-btn'
                                        label='DOWNLOAD TEMPLATE'
                                        onClick={() =>
                                            DownloadTemplateData(
                                                'sourceCoordinate',
                                            )
                                        }
                                        disabled={false}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Typography>
                                    {
                                        routeOptimizerState.source_coordinate_file_name
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
                            <FormLabel label='Assume infinite fleet size?' />
                            <FormSubText subText="(if 'Yes': no. of vehicles of each type, if specified, will be ignored)" />
                        </Grid>
                        <Grid item container lg={6}>
                            <FormRadioButton
                                id='objective-selector'
                                identifier={isObjectiveCost}
                                options={{
                                    yes: 'Yes',
                                    no: 'No',
                                }}
                                onChange={handleIsObjectiveCostChange}
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
                        <Grid item lg={12}>
                            <FormLabel label='Specify vehicle loading constraints' />
                            <FormSubText subText='(atleast one of the following should be active)' />
                        </Grid>
                        <Grid item container lg={12}>
                            <Grid item lg={4}>
                                <FormSwitchBtn
                                    value={'Yes'}
                                    label={'Vehicle weight capacity'}
                                    position='start'
                                    // checked={true}
                                />
                            </Grid>
                            <Grid item lg={4}>
                                <FormSwitchBtn
                                    value={'Yes'}
                                    label={'Vehicle volumetric capacity'}
                                    position='start'
                                    // checked={false}
                                />
                            </Grid>
                            <Grid item lg={4}>
                                <FormSwitchBtn
                                    value={'Yes'}
                                    label={'Vehicle max order capacity'}
                                    position='start'
                                    // checked={false}
                                />
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
                            <FormLabel label='Upload vehicle availability times' />
                            <FormSubText subText='(optional; if not specified, it will be assumed that all vehicles are available for the whole day)' />
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
                                        id='source-coordinate-upload-btn'
                                        label='CHOOSE FILE'
                                        fileRef={sourceCoordinateFile}
                                        loader={false}
                                        onChange={(e: any) => {
                                            handleFileUpload(
                                                e,
                                                'source_coordinate',
                                            )
                                        }}
                                        disabled={false}
                                    />
                                </Grid>
                                <Grid item lg={6}>
                                    <PrimaryButton
                                        id='source-coordinate-template-download-btn'
                                        label='DOWNLOAD TEMPLATE'
                                        onClick={() =>
                                            DownloadTemplateData(
                                                'sourceCoordinate',
                                            )
                                        }
                                        disabled={false}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Typography>
                                    {
                                        routeOptimizerState.source_coordinate_file_name
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
                            <FormLabel label='Upload order details' />
                            <FormSubText subText='(destination, weight, volume, preferred time window, special vehicle requirements etc.)' />
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
                                        id='source-coordinate-upload-btn'
                                        label='CHOOSE FILE'
                                        fileRef={sourceCoordinateFile}
                                        loader={false}
                                        onChange={(e: any) => {
                                            handleFileUpload(
                                                e,
                                                'source_coordinate',
                                            )
                                        }}
                                        disabled={false}
                                    />
                                </Grid>
                                <Grid item lg={6}>
                                    <PrimaryButton
                                        id='source-coordinate-template-download-btn'
                                        label='DOWNLOAD TEMPLATE'
                                        onClick={() =>
                                            DownloadTemplateData(
                                                'sourceCoordinate',
                                            )
                                        }
                                        disabled={false}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Typography>
                                    {
                                        routeOptimizerState.source_coordinate_file_name
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
                        marginTop={3}
                        columnGap={2}
                    >
                        <PrimaryButton
                            id='generate-order-policy-btn'
                            label='GENERATE ROUTE PLAN'
                            onClick={() => handleSubmit()}
                            disabled={
                                !(
                                    routeOptimizerState?.demand_master_id &&
                                    routeOptimizerState?.vendor_master_id &&
                                    routeOptimizerState?.annual_cost &&
                                    (routeOptimizerState.fill_rate ||
                                        routeOptimizerState.cycle_service_level)
                                )
                            }
                        />
                        <PrimaryButton
                            id='generate-order-policy-btn'
                            label='VIEW/DOWNLOAD PLAN >'
                            onClick={() => handleSubmit()}
                            disabled={
                                !(
                                    routeOptimizerState?.demand_master_id &&
                                    routeOptimizerState?.vendor_master_id &&
                                    routeOptimizerState?.annual_cost &&
                                    (routeOptimizerState.fill_rate ||
                                        routeOptimizerState.cycle_service_level)
                                )
                            }
                        />
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    )
}

export default RouteOptimizer
