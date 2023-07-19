import { useEffect, useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import UserSession from '../../services/auth'
import { userLogin } from '../../redux/actions/user/auth'

import {
    Container,
    Box,
    Avatar,
    Typography,
    Grid,
    InputAdornment,
    IconButton,
    Tooltip,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

import {
    FormBackdropElement,
    FormLabel,
    FormSnackBarElement,
    FormTextField,
} from '../../components/FormElements'
import { Link, useNavigate } from 'react-router-dom'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { PrimaryButton } from '../../components/Buttons'

const theme = createTheme()

const SignIn = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const userAuthState = useAppSelector((state) => state.userAuth)
    const [snackbarState, setSnackbarState] = useState(false)

    const [userEmail, setUserEmail] = useState('shashank@gmail.com')
    const [userPassword, setUserPassword] = useState('123456789')

    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault()
    }

    useEffect(() => {
        if (UserSession.isAuthenticated()) {
            navigate('/welcome')
        } else {
            navigate('/signin')
        }
    }, [UserSession.isAuthenticated()])

    const handleSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault()
        const context = {
            email: userEmail,
            password: userPassword,
        }
        dispatch(userLogin(context)).then((res) => {
            if (
                res &&
                res?.payload &&
                res?.payload?.status == 200 &&
                localStorage.getItem('user_id')
            ) {
                navigate('/welcome')
            }
        })
    }

    useEffect(() => {
        setSnackbarState(true)
    }, [userAuthState.message])

    return (
        <ThemeProvider theme={theme}>
            <Container component='main' maxWidth='sm' fixed>
                <FormBackdropElement
                    loader={userAuthState.isLoading || userAuthState.isLoading}
                />
                {snackbarState &&
                    (userAuthState.message || userAuthState.message) && (
                        <FormSnackBarElement
                            message={userAuthState.message}
                            onClose={() => setSnackbarState(false)}
                        />
                    )}
                <Grid
                    marginTop={10}
                    container
                    justifyContent='flex-start'
                    alignContent='center'
                    alignItems='center'
                    flex='column'
                    rowGap={2}
                    columnGap={1}
                >
                    <Grid
                        item
                        lg={10}
                        xs={10}
                        container
                        justifyContent='center'
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                    </Grid>
                    <Grid
                        item
                        lg={10}
                        xs={10}
                        container
                        justifyContent='center'
                    >
                        <FormLabel label='Sign In' />
                    </Grid>

                    <Grid item lg={10} container>
                        <Typography variant='subtitle2' fontWeight='bold'>
                            Email
                        </Typography>
                        <FormTextField
                            id='user-email-textfield'
                            value={userEmail}
                            type='text'
                            onChange={(e: any) => setUserEmail(e.target.value)}
                            size={'small'}
                            sx={{ width: '100%' }}
                        />
                    </Grid>
                    <Grid item lg={10} container>
                        <Typography variant='subtitle2' fontWeight='bold'>
                            Password
                        </Typography>

                        <FormTextField
                            id='user-password-textfield'
                            value={userPassword}
                            type={showPassword ? 'text' : 'password'}
                            onChange={(e: any) =>
                                setUserPassword(e.target.value)
                            }
                            size={'small'}
                            sx={{ width: '100%' }}
                            inputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton
                                            aria-label='toggle password visibility'
                                            onClick={handleClickShowPassword}
                                            onMouseDown={
                                                handleMouseDownPassword
                                            }
                                            edge='end'
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                inputProps: {
                                    min: 0,
                                },
                            }}
                        />
                    </Grid>
                    <Grid item lg={10} container justifyContent='center'>
                        <PrimaryButton
                            id='sign-in-submit-btn'
                            label='Sign In'
                            onClick={(e: any) => handleSubmit(e)}
                        />
                    </Grid>
                    {/* <Grid item container lg={10} justifyContent='center'>
                        <Link to='/forget_password'>{'Forget Password'}</Link>
                    </Grid> */}
                    <Grid item container lg={10} justifyContent='center'>
                        <Link to='/signup'>
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    )
}

export default SignIn
