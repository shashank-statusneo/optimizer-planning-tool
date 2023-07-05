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
    FormSubLabel2,
    FormSwitchBtn,
} from '../../components/FormElements'
import { FormUploadButton, PrimaryButton } from '../../components/Buttons'
import { DataTemplates } from './constants'
import { utils, writeFile } from 'xlsx'

import {
    uploadRoute,
    updateObjective,
    updateRoundTripDistance,
    updateMaxTripDistance,
    updateMaxTripDuration,
    updateFixedComponent,
    updateVariableComponentPerOrder,
    updateVariableComponentPerHandlingUnit,
    updateInfiniteFleetSize,
    updateFlagVehicleWeightCapacity,
    updateFlagVehicleVolumetricCapacity,
    updateFlagVehicleMaxOrderCapacity,
} from '../../redux/actions/transport/route'

const theme = createTheme()

const RouteOptimizer = () => {
    const dispatch = useAppDispatch()

    const routeOptimizerState = useAppSelector(
        // @ts-ignore
        (state) => state.routeOptimizer,
    )

    const [snackbarState, setSnackbarState] = useState(false)

    const [isObjectiveCost, setIsObjectiveCost] = useState(true)
    const [roundTripEnabled, setRoundTripEnabled] = useState(false)
    const [infiniteFleetSizeEnabled, setInfiniteFleetSizeEnabled] =
        useState(true)
    const [perOrderEnabled, setPerOrderEnabled] = useState(true)

    const distanceMatrixFile = useRef() as MutableRefObject<HTMLInputElement>
    const sourceCoordinatesFile = useRef() as MutableRefObject<HTMLInputElement>
    const destinationCoordinatesFile =
        useRef() as MutableRefObject<HTMLInputElement>
    const fleetDetailsFile = useRef() as MutableRefObject<HTMLInputElement>
    const vehicleAvailabilityFile =
        useRef() as MutableRefObject<HTMLInputElement>
    const orderDetailsFile = useRef() as MutableRefObject<HTMLInputElement>

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
                uploadRoute(context, fileType, fileObj.name),
            )
        }
    }

    const handleIsObjectiveCostChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        event.target.value == 'minimizeCost'
            ? setIsObjectiveCost(true)
            : setIsObjectiveCost(false)
        dispatch(
            // @ts-ignore
            updateObjective(
                event.target.value == 'minimizeCost'
                    ? 'minimize_cost'
                    : 'minimize_time',
            ),
        )
    }

    const handleRoundTripChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        event.target.value == 'yes'
            ? setRoundTripEnabled(true)
            : setRoundTripEnabled(false)

        dispatch(
            // @ts-ignore
            updateRoundTripDistance(event.target.value == 'yes' ? true : false),
        )
    }

    const handleInfiniteFleetSizeChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        event.target.value == 'yes'
            ? setInfiniteFleetSizeEnabled(true)
            : setInfiniteFleetSizeEnabled(false)

        dispatch(
            // @ts-ignore
            updateInfiniteFleetSize(event.target.value == 'yes' ? true : false),
        )
    }

    const handleDistanceServiceTimeChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        event.target.value == 'perOrder'
            ? setPerOrderEnabled(true)
            : setPerOrderEnabled(false)
    }

    const handleVariablePerOrderChange = (e: any) => {
        dispatch(
            // @ts-ignore
            updateVariableComponentPerOrder(e.target.value),
        )
    }
    const handleVariablePerHandlingUnitChange = (e: any) => {
        dispatch(
            // @ts-ignore
            updateVariableComponentPerHandlingUnit(e.target.value),
        )
    }

    const handleSubmit = () => {
        // @ts-ignore
        // dispatch(algorithmApi(routeOptimizerState))
        console.log(routeOptimizerState)
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
    }, [routeOptimizerState.message])

    return (
        <ThemeProvider theme={theme}>
            <Container component='main' sx={{ flexGrow: 1 }} fixed>
                <FormBackdropElement loader={routeOptimizerState.isLoading} />
                {snackbarState && routeOptimizerState.message && (
                    <FormSnackBarElement
                        message={routeOptimizerState.message}
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
                                        id='source-coordinates-upload-btn'
                                        label='CHOOSE FILE'
                                        fileRef={sourceCoordinatesFile}
                                        loader={false}
                                        onChange={(e: any) => {
                                            handleFileUpload(
                                                e,
                                                'source_coordinates',
                                            )
                                        }}
                                        disabled={false}
                                    />
                                </Grid>
                                <Grid item lg={6}>
                                    <PrimaryButton
                                        id='source-coordinates-template-download-btn'
                                        label='DOWNLOAD TEMPLATE'
                                        onClick={() =>
                                            DownloadTemplateData(
                                                'sourceCoodinates',
                                            )
                                        }
                                        disabled={false}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Typography>
                                    {
                                        routeOptimizerState.source_coordinates_file_name
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
                                        id='destination-coordinates-upload-btn'
                                        label='CHOOSE FILE'
                                        fileRef={destinationCoordinatesFile}
                                        loader={false}
                                        onChange={(e: any) => {
                                            handleFileUpload(
                                                e,
                                                'destination_coordinates',
                                            )
                                        }}
                                        disabled={false}
                                    />
                                </Grid>
                                <Grid item lg={6}>
                                    <PrimaryButton
                                        id='destination-coordinates-template-download-btn'
                                        label='DOWNLOAD TEMPLATE'
                                        onClick={() =>
                                            DownloadTemplateData(
                                                'destinationCoordinates',
                                            )
                                        }
                                        disabled={false}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Typography>
                                    {
                                        routeOptimizerState.destination_coordinates_file_name
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
                                                routeOptimizerState.max_trip_distance
                                            }
                                            type='number'
                                            onChange={(e: any) => {
                                                dispatch(
                                                    // @ts-ignore
                                                    updateMaxTripDistance(
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
                                                inputProps: {
                                                    min: 0,
                                                },
                                            }}
                                            error={false}
                                            onErrorMessage={''}
                                            disabled={false}
                                            size={'small'}
                                            sx={{}}
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
                                                routeOptimizerState.max_trip_duration
                                            }
                                            type='number'
                                            onChange={(e: any) => {
                                                dispatch(
                                                    // @ts-ignore
                                                    updateMaxTripDuration(
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
                                                inputProps: {
                                                    min: 0,
                                                },
                                            }}
                                            error={false}
                                            onErrorMessage={''}
                                            disabled={!roundTripEnabled}
                                            size={'small'}
                                            sx={{}}
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
                                    value={routeOptimizerState.fixed_cost}
                                    type='number'
                                    onChange={(e: any) => {
                                        dispatch(
                                            // @ts-ignore
                                            updateFixedComponent(
                                                e.target.value,
                                            ),
                                        )
                                    }}
                                    inputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                mins
                                            </InputAdornment>
                                        ),
                                        inputProps: {
                                            min: 0,
                                        },
                                    }}
                                    error={false}
                                    onErrorMessage={''}
                                    disabled={false}
                                    size={'small'}
                                    sx={{ width: '192px' }}
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
                                            value: routeOptimizerState.variable_component_per_order,
                                            type: 'number',
                                            onChange:
                                                handleVariablePerOrderChange,
                                            inputProps: {
                                                endAdornment: (
                                                    <InputAdornment position='end'>
                                                        mins
                                                    </InputAdornment>
                                                ),
                                                inputProps: {
                                                    min: 0,
                                                },
                                            },
                                            error: false,
                                            onErrorMessage: '',
                                            disabled: !perOrderEnabled,
                                            sx: { width: '192px' },
                                        },
                                        {
                                            id: 'per-handling-unit-level-textfield',
                                            value: routeOptimizerState.variable_component_per_handling_unit,
                                            type: 'number',
                                            onChange:
                                                handleVariablePerHandlingUnitChange,
                                            inputProps: {
                                                endAdornment: (
                                                    <InputAdornment position='end'>
                                                        mins
                                                    </InputAdornment>
                                                ),
                                                inputProps: {
                                                    min: 0,
                                                },
                                            },
                                            error: false,
                                            onErrorMessage: '',
                                            disabled: perOrderEnabled,
                                            sx: {
                                                width: '192px',
                                            },
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
                                        id='fleet-details-upload-btn'
                                        label='CHOOSE FILE'
                                        fileRef={fleetDetailsFile}
                                        loader={false}
                                        onChange={(e: any) => {
                                            handleFileUpload(e, 'fleet_details')
                                        }}
                                        disabled={false}
                                    />
                                </Grid>
                                <Grid item lg={6}>
                                    <PrimaryButton
                                        id='fleet-details-template-download-btn'
                                        label='DOWNLOAD TEMPLATE'
                                        onClick={() =>
                                            DownloadTemplateData('fleetDetails')
                                        }
                                        disabled={false}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Typography>
                                    {
                                        routeOptimizerState.fleet_details_file_name
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
                                identifier={infiniteFleetSizeEnabled}
                                options={{
                                    yes: 'Yes',
                                    no: 'No',
                                }}
                                onChange={handleInfiniteFleetSizeChange}
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
                                    value={
                                        routeOptimizerState.flag_vehicle_weight_capacity
                                    }
                                    label={'Vehicle weight capacity'}
                                    position='start'
                                    onChange={(e: any) =>
                                        dispatch(
                                            // @ts-ignore
                                            updateFlagVehicleWeightCapacity(
                                                e.target.checked,
                                            ),
                                        )
                                    }
                                    defaultChecked={true}
                                />
                            </Grid>
                            <Grid item lg={4}>
                                <FormSwitchBtn
                                    value={
                                        routeOptimizerState.flag_vehicle_volumetric_capacity
                                    }
                                    label={'Vehicle volumetric capacity'}
                                    position='start'
                                    onChange={(e: any) =>
                                        dispatch(
                                            // @ts-ignore
                                            updateFlagVehicleVolumetricCapacity(
                                                e.target.checked,
                                            ),
                                        )
                                    }
                                    defaultChecked={false}
                                />
                            </Grid>
                            <Grid item lg={4}>
                                <FormSwitchBtn
                                    value={
                                        routeOptimizerState.flag_vehicle_max_order_capacity
                                    }
                                    label={'Vehicle max order capacity'}
                                    position='start'
                                    onChange={(e: any) =>
                                        dispatch(
                                            // @ts-ignore
                                            updateFlagVehicleMaxOrderCapacity(
                                                e.target.checked,
                                            ),
                                        )
                                    }
                                    defaultChecked={false}
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
                                        id='vehicle-availability-upload-btn'
                                        label='CHOOSE FILE'
                                        fileRef={vehicleAvailabilityFile}
                                        loader={false}
                                        onChange={(e: any) => {
                                            handleFileUpload(
                                                e,
                                                'vehicle_availability',
                                            )
                                        }}
                                        disabled={false}
                                    />
                                </Grid>
                                <Grid item lg={6}>
                                    <PrimaryButton
                                        id='vehicle-availability-template-download-btn'
                                        label='DOWNLOAD TEMPLATE'
                                        onClick={() =>
                                            DownloadTemplateData(
                                                'vehicleAvailability',
                                            )
                                        }
                                        disabled={false}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Typography>
                                    {
                                        routeOptimizerState.vehicle_availability_file_name
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
                                        id='order-details-upload-btn'
                                        label='CHOOSE FILE'
                                        fileRef={orderDetailsFile}
                                        loader={false}
                                        onChange={(e: any) => {
                                            handleFileUpload(e, 'order_details')
                                        }}
                                        disabled={false}
                                    />
                                </Grid>
                                <Grid item lg={6}>
                                    <PrimaryButton
                                        id='order-details-template-download-btn'
                                        label='DOWNLOAD TEMPLATE'
                                        onClick={() =>
                                            DownloadTemplateData('orderDetails')
                                        }
                                        disabled={false}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Typography>
                                    {
                                        routeOptimizerState.order_details_file_name
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
                            // disabled={
                            //     !(
                            //         routeOptimizerState?.demand_master_id &&
                            //         routeOptimizerState?.vendor_master_id &&
                            //         routeOptimizerState?.annual_cost &&
                            //         (routeOptimizerState.fill_rate ||
                            //             routeOptimizerState.cycle_service_level)
                            //     )
                            // }
                            disabled={false}
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
