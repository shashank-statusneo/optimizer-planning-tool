import React, { useEffect, useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import UserSession from '../../services/auth'
import { userLogin } from '../../redux/actions/user/auth'

import {
    Container,
    CssBaseline,
    Box,
    Avatar,
    Typography,
    TextField,
    Button,
    Grid,
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import {
    FormBackdropElement,
    FormSnackBarElement,
} from '../../components/FormElements'

const theme = createTheme()

const SignIn = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    // @ts-ignore
    const authState = useAppSelector((state) => state.authReducer)

    const [snackbarState, setSnackbarState] = useState(false)

    React.useEffect(() => {
        if (UserSession.isAuthenticated()) {
            navigate('/')
        } else {
            navigate('/signin')
        }
    }, [UserSession.isAuthenticated()])

    // @ts-ignore
    const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const context = {
            username: data.get('username'),
            password: data.get('password'),
        }
        // @ts-ignore
        dispatch(userLogin(context))
    }

    useEffect(() => {
        setSnackbarState(true)
    }, [authState.message])

    return (
        <ThemeProvider theme={theme}>
            <Container component='main' maxWidth='xs'>
                <FormBackdropElement loader={authState.isLoading} />
                {snackbarState && authState.message && (
                    <FormSnackBarElement
                        message={authState.message}
                        onClose={() => setSnackbarState(false)}
                    />
                )}
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: '#6DEDAE' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component='h1' variant='h5'>
                        Sign in
                    </Typography>
                    <Box
                        component='form'
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            id='username'
                            label='Username'
                            name='username'
                            autoComplete='username'
                            autoFocus
                        />
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            name='password'
                            label='Password'
                            type='password'
                            id='password'
                            autoComplete='current-password'
                        />

                        <Button
                            data-type='SignIn'
                            type='submit'
                            fullWidth
                            variant='contained'
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>

                        <Grid container>
                            <Grid item xs>
                                <Link to='#'>Forgot password?</Link>
                            </Grid>
                            <Grid item>
                                <Link to='/signup'>
                                    {'Don\'t have an account? Sign Up'}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default SignIn
