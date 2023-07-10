import { GridColDef } from '@mui/x-data-grid'

export const benchmarkProductivityTableColumns: GridColDef[] = [
    {
        field: 'category_name',
        headerName: 'Category',
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        headerClassName: 'header',
    },
    {
        field: 'productivity_experienced_employee',
        headerName: 'Productivity - Experienced Employee',
        type: 'number',
        flex: 1,
        editable: true,
        headerAlign: 'center',
        align: 'center',
        headerClassName: 'header',
    },
    {
        field: 'productivity_new_employee',
        headerName: 'Productivity - New Employee',
        type: 'number',
        flex: 1,
        editable: true,
        headerAlign: 'center',
        align: 'center',
        headerClassName: 'header',
    },
]

export const demandForecastTableColumns: GridColDef[] = [
    {
        field: 'date',
        headerName: 'Date',
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        headerClassName: 'header',
        minWidth: 200,
    },
]

export const lineData = [
    {
        key: 'Demand',
        stroke: '#8B7AFF',
    },
    {
        key: 'Expected Fulfillment',
        stroke: '#45AC54',
    },
    {
        key: 'Fulfillment With Existing',
        stroke: '#FF7078',
    },
]

export const ResultTableTypes: any = [
    {
        id: 1,
        name: 'Category-wise schedule',
    },
    {
        id: 2,
        name: 'Demand-wise schedule',
    },
]
export const resultCategoryTableHeaders = [
    'DATE',
    'CATEGORY',
    'NUM EXISTING TO DEPLOY',
    'NUM NEW TO DEPLOY',
    'TOTAL',
]

export const resultDemandTableHeaders = [
    'DATE',
    'CATEGORY',
    'EXPECTED DEMAND',
    'FULLFILLMENT WITH EXISTING EMPLOYEE',
    'FULLFILLMENT WITH TOTAL EMPLOYEE',
]
