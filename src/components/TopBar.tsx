import { useState, useEffect } from 'react'
import {
    AppBar,
    Container,
    Toolbar,
    Box,
    Button,
    IconButton,
    Tooltip,
    Menu,
    Avatar,
    MenuItem,
    Typography,
} from '@mui/material'

import { FormBackdropElement, FormSnackBarElement } from './FormElements'

import MenuIcon from '@mui/icons-material/Menu'
import { useLocation, useNavigate } from 'react-router-dom'
import UserSession from '../services/auth'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'

import { userLogout } from '../redux/actions/user/auth'

const TopBar = () => {
    const dispatch = useAppDispatch()

    // @ts-ignore
    const userAuthState = useAppSelector(
        // @ts-ignore
        (state) => state.userAuth,
    )

    const location = useLocation()
    const navigate = useNavigate()

    const [anchorElNav, setAnchorElNav] = useState(null)
    const [anchorElUser, setAnchorElUser] = useState(null)

    const [snackbarState, setSnackbarState] = useState(false)

    // @ts-ignore
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    }

    // @ts-ignore
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    const logOutUser = () => {
        // @ts-ignore
        dispatch(userLogout()).then((res) => {
            if (res && res?.payload && res?.payload?.status == 200) {
                handleCloseUserMenu()
                navigate('/signin')
            }
        })
    }

    useEffect(() => {
        setSnackbarState(true)
    }, [userAuthState.message])

    return (
        <AppBar position='static'>
            <Container maxWidth='xl'>
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
                <Toolbar disableGutters>
                    <Typography
                        variant='h6'
                        noWrap
                        component='a'
                        href={`/${process.env.REACT_APP_BASE_PATH}`}
                        sx={{
                            mr: 2,
                            ml: 2,
                            display: { xs: 'none', md: 'flex' },
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        OPTIMIZATION
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                        }}
                    >
                        <IconButton
                            size='large'
                            aria-label='account of current user'
                            aria-controls='menu-appbar'
                            aria-haspopup='true'
                            onClick={handleOpenNavMenu}
                            color='inherit'
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id='menu-appbar'
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        ></Menu>
                    </Box>
                    <Typography
                        variant='h5'
                        noWrap
                        component='a'
                        href=''
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        OPTIMIZATION
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                        }}
                    ></Box>

                    {UserSession.isAuthenticated() ? (
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title='Open settings'>
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    sx={{ p: 0 }}
                                >
                                    <Avatar alt='Remy Sharp' />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id='menu-appbar'
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {/* <MenuItem
                                onClick={() => {
                                    navigate('/profile')
                                    handleCloseUserMenu()
                                }}
                                >
                                    <Typography textAlign='center'>
                                        Profile
                                    </Typography>
                                </MenuItem> */}
                                <MenuItem
                                    onClick={() => {
                                        logOutUser()
                                    }}
                                >
                                    <Typography textAlign='center'>
                                        Logout
                                    </Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    ) : location.pathname === '/signup' ? (
                        <Button
                            key='Login'
                            onClick={() => navigate('/signin')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Sign In
                        </Button>
                    ) : (
                        <Button
                            key='Signup'
                            onClick={() => navigate('/signup')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Sign Up
                        </Button>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default TopBar
