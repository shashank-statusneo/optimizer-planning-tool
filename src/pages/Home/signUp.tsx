import { useEffect, useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { userRegister } from '../../redux/actions/user/auth'
import {
    Container,
    Box,
    Avatar,
    Typography,
    TextField,
    Button,
    Grid,
    InputAdornment,
    IconButton,
    Tooltip,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

import {
    FormLabel,
    FormSubLabel,
    FormSubText,
    FormBackdropElement,
    FormSnackBarElement,
    FormTextField,
    FormRadioButton,
    CustomFormRadioButton,
} from '../../components/FormElements'
import { Link } from 'react-router-dom'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { PrimaryButton } from '../../components/Buttons'

const theme = createTheme()

const SignUp = () => {
    const dispatch = useAppDispatch()

    const userAuthState = useAppSelector(
        // @ts-ignore
        (state) => state.userAuth,
    )

    const [snackbarState, setSnackbarState] = useState(false)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')

    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault()
    }

    // @ts-ignore
    const handleSubmit = (event) => {
        event.preventDefault()
        const context = {
            first_name: firstName,
            last_name: lastName,
            user_name: userName,
            email: userEmail,
            password: userPassword,
        }
        //@ts-ignore
        dispatch(userRegister(context))
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
                        marginBottom={2}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                    </Grid>
                    <Grid item lg={5} md={5} xs={12} container>
                        <Typography variant='subtitle2' fontWeight='bold'>
                            First name
                        </Typography>
                        <FormTextField
                            id='user-first-name-textfield'
                            value={firstName}
                            type='text'
                            onChange={(e: any) => setFirstName(e.target.value)}
                            size={'small'}
                            sx={{ width: '100%' }}
                        />
                    </Grid>
                    <Grid item lg={5} md={5} xs={12} container>
                        <Typography variant='subtitle2' fontWeight='bold'>
                            Last name
                        </Typography>
                        <FormTextField
                            id='user-last-name-textfield'
                            value={lastName}
                            type='text'
                            onChange={(e: any) => setLastName(e.target.value)}
                            size={'small'}
                            sx={{ width: '100%' }}
                        />
                    </Grid>
                    <Grid item lg={10} container>
                        <Typography variant='subtitle2' fontWeight='bold'>
                            Username
                        </Typography>
                        <FormTextField
                            id='user-name-textfield'
                            value={userName}
                            type='text'
                            onChange={(e: any) => setUserName(e.target.value)}
                            size={'small'}
                            sx={{ width: '100%' }}
                        />
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
                        <Tooltip title='Password must have atleast 8 characters'>
                            <InfoOutlinedIcon
                                fontSize='small'
                                color='info'
                                sx={{ marginLeft: '2px' }}
                            />
                        </Tooltip>
                        <FormTextField
                            id='user-email-textfield'
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
                            id='sign-up-submit-btn'
                            label='Sign Up'
                            onClick={(e: any) => handleSubmit(e)}
                        />
                    </Grid>
                    <Grid item lg={10} container justifyContent='center'> 
                        <Link to='/signin'>
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
                {/* </Box> */}

                {/* <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component='h1' variant='h5'>
                        Sign up
                    </Typography>
                    <Box
                        component='form'
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete='given-name'
                                    name='firstName'
                                    fullWidth
                                    id='firstName'
                                    label='First Name'
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id='lastName'
                                    label='Last Name'
                                    name='lastName'
                                    autoComplete='family-name'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id='username'
                                    label='Username'
                                    name='username'
                                    autoComplete='username'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id='email'
                                    label='Email Address'
                                    name='email'
                                    autoComplete='email'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name='password'
                                    label='Password'
                                    type='password'
                                    id='password'
                                    autoComplete='new-password'
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            sx={{ mt: 3, mb: 2 }}
                            disabled={false}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent='flex-end'>
                            <Grid item>
                                <Link to='/signin'>
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box> */}
            </Container>
        </ThemeProvider>
    )
}

export default SignUp
