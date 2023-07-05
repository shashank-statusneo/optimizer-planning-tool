import { useState, useRef, MutableRefObject, useEffect } from 'react'
import { Container, Grid, Typography, InputAdornment } from '@mui/material'

import { createTheme, ThemeProvider } from '@mui/material/styles'

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'

import {
    FormBackdropElement,
    FormSnackBarElement,
} from '../../components/FormElements'

const theme = createTheme()

const RouteResult = () => {
    const dispatch = useAppDispatch()

    const routeOptimizerState = useAppSelector(
        // @ts-ignore
        (state) => state.routeOptimizer,
    )

    const [snackbarState, setSnackbarState] = useState(false)

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
                )}{' '}
            </Container>
        </ThemeProvider>
    )
}

export default RouteResult
