import React, {useEffect} from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import UserSession from '../../services/auth';
import { login } from '../../redux/actions/auth';
import { Container, CssBaseline, Box, Avatar, Typography, TextField,CircularProgress, Button, Grid } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'


const theme = createTheme();

const SignIn = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    // @ts-ignore
    const state = useAppSelector(state => state.authReducer)

    React.useEffect(() => {
        if (UserSession.isAuthenticated()) {
            navigate('/')
        } else {
            navigate('/signin')
        }
    }, [UserSession.isAuthenticated()])

    // @ts-ignore
    const handleSubmit = event => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const context = {
            username: data.get('username'),
            password: data.get('password'),
        }
        // @ts-ignore
        dispatch(login(context))
    }


    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
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
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />

                        {state.isLoading && (
                            <div>
                                <CircularProgress />
                            </div>
                        )}
                        <Button
                            data-type="SignIn"
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>

                        <Grid container>
                            <Grid item xs>
                                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
                            </Grid>
                            <Grid item>
                                <Link to="/signup">
                                    {'Don\'t have an account? Sign Up'}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
            </Container>
        </ThemeProvider>
    )


}

export default SignIn