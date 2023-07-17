import { Button, SxProps, Theme } from '@mui/material'
import { MouseEventHandler, ChangeEventHandler, SyntheticEvent } from 'react'

// General function to export Form Primary Button
export const PrimaryButton = (props: {
    id: string
    label: string
    onClick: MouseEventHandler
    disabled?: boolean
    sx?: SxProps<Theme>
}): JSX.Element => {
    return (
        <Button
            variant='contained'
            color='primary'
            size='medium'
            id={props.id}
            onClick={props.onClick}
            disabled={props?.disabled ? props?.disabled : false}
            sx={{ ...props?.sx }}
        >
            {props.label}
        </Button>
    )
}
// General function to export Form Navigation Button
export const NavigationBtn = (props: {
    id: string
    label: string
    onClick: MouseEventHandler
    disabled: boolean
    render: boolean
}): JSX.Element => {
    if (props.render) {
        return (
            <Button
                variant='contained'
                color='primary'
                size='medium'
                id={props.id}
                onClick={props.onClick}
                disabled={props.disabled}
            >
                {props.label}
            </Button>
        )
    }
    return <></>
}

// General function to export Form upload Btn
export const FormUploadButton = (props: {
    id: string
    label: string
    fileRef: any
    loader: boolean
    onChange: ChangeEventHandler
    disabled: boolean
}): JSX.Element => {
    return (
        <Button
            variant='outlined'
            color='primary'
            size='medium'
            id={props.id}
            onClick={() => {
                props.fileRef.current.value = ''
                !props.loader && props.fileRef.current.click()
            }}
            disabled={props.disabled}
            sx={{ fontWeight: 'bold' }}
        >
            {props.label}
            <input
                hidden
                ref={props.fileRef}
                accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet application/vnd.ms-excel'
                type='file'
                onChange={props.onChange}
            ></input>
        </Button>
    )
}
