import React, { useEffect, useState } from 'react'
import UserSession from '../../services/auth'
// import { password_reset } from '../../redux/actions/auth'
import { useAppDispatch } from '../../hooks/redux-hooks'
import {
    Box,
    Typography,
    TextField,
    Button,
    Card,
    CardContent,
    CardMedia,
} from '@mui/material'

const Profile = () => {
    const dispatch = useAppDispatch()
    const [user, setUser] = useState({
        first_name: 'Unknown',
        last_name: 'User',
        email: 'N/A',
    })

    useEffect(() => {
        // @ts-ignore
        setUser(UserSession.getUser())
    }, [])

    const handleSubmit = (event: {
        preventDefault: () => void
        currentTarget: HTMLFormElement | undefined
    }) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const context = {
            old_password: data.get('old_password'),
            new_password: data.get('new_password'),
        }
        // @ts-ignore
        dispatch(password_reset(context))
    }

    return (
        <>
            <Card
                sx={{ maxWidth: 300 }}
                style={{
                    alignContent: 'center',
                    alignItems: 'center',
                }}
            >
                <CardContent>
                    <CardMedia
                        sx={{ height: 140 }}
                        image='./profilepic.svg'
                        title='profile pic'
                    />
                    <Typography variant='h5' component='div'>
                        {user.first_name} {user.last_name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                        {user.email}
                    </Typography>
                </CardContent>
            </Card>

            <Card
                sx={{ maxWidth: 500 }}
                style={{
                    alignContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography component='h1' variant='h5'>
                    Change Password
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
                        id='old_password'
                        label='Old Password'
                        name='old_password'
                        autoFocus
                    />
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        name='new_password'
                        label='New Password'
                        type='password'
                        id='new_password'
                        autoComplete='current-password'
                    />
                    <Button
                        data-type='Update'
                        type='submit'
                        fullWidth
                        variant='contained'
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Update
                    </Button>
                </Box>
            </Card>
        </>
    )
}

export default Profile
