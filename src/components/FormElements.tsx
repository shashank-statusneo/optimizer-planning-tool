import {
    InputLabel,
    MenuItem,
    Select,
    FormControl,
    Typography,
    TextField,
    Grid,
    Paper,
    Backdrop,
    CircularProgress,
    Snackbar,
    Alert,
    Checkbox,
    ListItemText,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Tooltip,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormGroup,
    Switch,
} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

// General function to export Form Loader
export const FormBackdropElement = (props: { loader: boolean }) => {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={props.loader}
        >
            <CircularProgress color='primary' />
        </Backdrop>
    )
}

// General function to export Form SnackBar
export const FormSnackBarElement = (props: {
    message: boolean
    onClose: any
}) => {
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            open={true}
            autoHideDuration={6000}
            onClose={props.onClose}
        >
            <Alert severity='error'>{props.message}</Alert>
        </Snackbar>
    )
}

type AlertBtn = {
    onClick: any
    label: string
}[]

// General function to export Form Alert Dialog
export const FormAlertElement = (props: {
    open: boolean
    onClose: any
    label: string
    id: string
    title: string
    content: string
    buttons: AlertBtn
}) => {
    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            aria-labelledby={props.label}
        >
            <DialogTitle id={props.id}>{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{props.content}</DialogContentText>
            </DialogContent>
            <DialogActions>
                {props.buttons.map((obj: any, index: any) => (
                    <Button key={index} onClick={obj.onClick}>
                        {obj.label}
                    </Button>
                ))}
            </DialogActions>
        </Dialog>
    )
}

// General function to export Form Textfield
export const FormTextField = (props: {
    id: string
    value: any
    inputProps: any
    onChange: any
    type: any
    error: any
    onErrorMessage: string
    disabled: boolean
    size: any
    sx: any
}) => {
    return (
        <Tooltip title={props.onErrorMessage} disableInteractive>
            <TextField
                id={props.id}
                type={props.type}
                value={props.value}
                onChange={props.onChange}
                size={props.size}
                variant='outlined'
                InputProps={props.inputProps}
                error={props.error}
                disabled={props.disabled}
                sx={{
                    backgroundColor: props.disabled ? '#DCDCDC' : null,
                    borderRadius: props.disabled ? '4px' : null,
                    ...props.sx,
                }}
            />
        </Tooltip>
    )
}

// General function to export Form label
export const FormLabel = (props: { label: string }) => {
    return (
        <Typography variant='h6' fontWeight='bold'>
            {props.label}
        </Typography>
    )
}

// General function to export Form Sub Text
export const FormSubText = (props: { subText: string }) => {
    return (
        <Typography variant='caption' fontStyle='italic'>
            {props.subText}
        </Typography>
    )
}

// General function to export Form Sub label
export const FormSubLabel = (props: { label: string }) => {
    return (
        <Typography
            variant='h6'
            fontWeight='bold'
            color='text.secondary'
            paddingX='10px'
        >
            {props.label}
        </Typography>
    )
}

// General function to export Form Sub label 2
export const FormSubLabel2 = (props: { label: string }) => {
    return (
        <Typography variant='body1' fontWeight='bold' color='text.secondary'>
            {props.label}
        </Typography>
    )
}

type switchPostion = 'start' | 'end' | 'top' | 'bottom'

// General function to export Form Swtich Button
export const FormSwitchBtn = (props: {
    label: string
    value: string
    position: switchPostion
    onChange: any
    defaultChecked: boolean
}) => {
    return (
        <FormGroup row>
            <FormControlLabel
                value={props.value}
                control={
                    <Switch
                        color='primary'
                        defaultChecked={props.defaultChecked}
                        onChange={props.onChange}
                    />
                }
                label={props.label}
                labelPlacement={props.position}
            />
        </FormGroup>
    )
}

// General function to export Form Dropdown
export const FormDropDown = (props: {
    id: string
    label: string
    labelId: string
    value: any
    data: any
    onChange: any
}) => {
    return (
        <FormControl fullWidth>
            <InputLabel id={props.id}>{props.label}</InputLabel>
            <Select
                value={props.value?.id ? props.value?.id : ''}
                label={props.label}
                labelId={props.labelId}
                onChange={props.onChange}
            >
                {props.data.map((obj: any, key: any) => (
                    <MenuItem value={obj.id} key={key}>
                        {obj.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

// General function to export Form Multiple Select Dropdown
export const FormMultiDropDown = (props: {
    id: string
    label: string
    labelId: string
    value: any
    data: any
    onChange: any
}) => {
    return (
        <FormControl fullWidth>
            <InputLabel id={props.id}>{props.label}</InputLabel>
            <Select
                value={props.value}
                label={props.label}
                labelId={props.labelId}
                multiple
                onChange={props.onChange}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={{
                    MenuListProps: {
                        style: {
                            maxHeight: 250,
                        },
                    },
                }}
            >
                {props.data.map((obj: any, key: any) => (
                    <MenuItem value={obj} key={key}>
                        <Checkbox checked={props.value.indexOf(obj) > -1} />
                        <ListItemText primary={obj} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

// General function to export Form Date Selector
export const FormDateSelector = (props: {
    label: string
    value: any
    onChange: any
    minDate: any
}) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label={props.label}
                value={props.value}
                onChange={props.onChange}
                minDate={props.minDate}
            />
        </LocalizationProvider>
    )
}

// General function to export Form Card
const FormCard = (props: { value: string | number; label: string }) => {
    return (
        <Paper elevation={2}>
            <Grid
                container
                direction='column'
                justifyContent='center'
                alignItems='center'
            >
                <Grid item>
                    <Typography variant='h4' fontWeight='bold'>
                        {props.value}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant='body1'>{props.label} </Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}

export const InventoryFormCard = (props: {
    value: string | number
    label: string
}) => {
    return (
        <Grid item lg={3}>
            <Paper elevation={2}>
                <Grid
                    container
                    direction='column'
                    justifyContent='center'
                    alignItems='center'
                >
                    <Typography variant='h4' fontWeight='bold'>
                        {props.value}
                    </Typography>{' '}
                    <Typography variant='body1'>{props.label}</Typography>
                </Grid>
            </Paper>
        </Grid>
    )
}

type CardItems = {
    value: number | string | undefined
    label: string
}[]

// General function to export Form Card Field
export const FormCardField = (props: { items: CardItems }) => {
    return (
        <Grid
            container
            direction='row'
            justifyContent='space-around'
            alignItems='center'
        >
            {props.items.map((obj: any, key: any) => (
                <Grid item lg={3} md={3} sm={6} key={key}>
                    <FormCard value={obj.value} label={obj.label} />
                </Grid>
            ))}
        </Grid>
    )
}

// General function to export Form Radio Btn
export const FormRadioButton = (props: {
    id: string
    identifier: boolean
    options: { [x: string]: string }
    onChange: (
        event: React.ChangeEvent<HTMLInputElement>,
        value: string,
    ) => void
}) => {
    return (
        <FormControl>
            <RadioGroup
                row
                id={props.id}
                value={
                    props.identifier
                        ? Object.keys(props.options)[0]
                        : Object.keys(props.options)[1]
                }
                onChange={props.onChange}
            >
                {Object.keys(props.options).map((value, index) => (
                    <FormControlLabel
                        key={index}
                        value={value}
                        control={<Radio />}
                        label={props.options[value]}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    )
}

// General function to export Form Custom Radio Btn
export const CustomFormRadioButton = (props: {
    id: string
    identifier: boolean
    options: { [x: string]: string }
    textFieldsProps: any
    onChange: (
        event: React.ChangeEvent<HTMLInputElement>,
        value: string,
    ) => void
}) => {
    return (
        <FormControl>
            <RadioGroup
                row
                id={props.id}
                value={
                    props.identifier
                        ? Object.keys(props.options)[0]
                        : Object.keys(props.options)[1]
                }
                onChange={props.onChange}
            >
                {Object.keys(props.options).map((value, index) => (
                    <Grid
                        key={index}
                        item
                        container
                        lg={6}
                        justifyContent='flex-start'
                        alignContent='center'
                        alignItems='center'
                    >
                        <FormControlLabel
                            key={index}
                            value={value}
                            control={<Radio />}
                            label={props.options[value]}
                        />
                        <FormTextField
                            id={props.textFieldsProps[index].id}
                            value={props.textFieldsProps[index].value}
                            type={props.textFieldsProps[index].type}
                            onChange={props.textFieldsProps[index].onChange}
                            inputProps={props.textFieldsProps[index].inputProps}
                            error={props.textFieldsProps[index].error}
                            onErrorMessage={
                                props.textFieldsProps[index].onErrorMessage
                            }
                            disabled={props.textFieldsProps[index].disabled}
                            size={'small'}
                            sx={props.textFieldsProps[index].sx}
                        />
                    </Grid>
                ))}
            </RadioGroup>
        </FormControl>
    )
}
