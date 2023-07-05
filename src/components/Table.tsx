import {
    Paper,
    TableContainer,
    Table,
    TableRow,
    TableCell,
    TableHead,
    TableBody,
    tableCellClasses,
    styled,
} from '@mui/material'

import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useState } from 'react'

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'

import object from 'lodash'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        fontWeight: 'bold',
        fontSize: '0.8rem',
        borderWidth: 1,
        borderColor: 'white',
        borderStyle: 'solid',
    },
    [`&.${tableCellClasses.body}`]: {
        backgroundColor: '#F2F1F2',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        borderWidth: 1,
        borderColor: 'white',
        borderStyle: 'solid',
    },
}))

export const FormTable = (props: {
    id: string
    tableType: any
    tableHeaders: any
    tableData: any
    total: any
}) => {
    return (
        <TableContainer component={Paper} sx={{ maxHeight: '100%' }}>
            <Table aria-label={props.id} stickyHeader>
                <TableHead>
                    <TableRow>
                        {props.tableHeaders.map((row: string, key: any) => (
                            <StyledTableCell align='center' key={key}>
                                {row}
                            </StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.keys(props.tableData).map(
                        (date: any, index: any) => (
                            <GetTableRows
                                date={date}
                                rowData={props.tableData[date]}
                                index={index}
                                total={
                                    props.total && props.total[date]
                                        ? props.total[date]
                                        : null
                                }
                                tableType={props.tableType}
                                key={index}
                            />
                        ),
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

const GetTableRows = (props: {
    date: any
    rowData: any
    total: any
    tableType: any
    index: any
}) => {
    const childRows: any = object.omit(
        props.rowData,
        Object.keys(props.rowData)[0],
    )

    return (
        <>
            <TableRow key={props.index}>
                <StyledTableCell
                    rowSpan={Object.keys(props.rowData).length}
                    align='center'
                >
                    {props.date}
                </StyledTableCell>

                {props.tableType === 'category' ? (
                    <CategoryWiseOutputDataCells
                        rowData={props.rowData[Object.keys(props.rowData)[0]]}
                        rowKey={Object.keys(props.rowData)[0]}
                    />
                ) : (
                    <DemandWiseOutputDataCells
                        rowData={props.rowData[Object.keys(props.rowData)[0]]}
                        rowKey={Object.keys(props.rowData)[0]}
                    />
                )}
            </TableRow>

            {Object.keys(childRows).map((category: any, index: any) => (
                <TableRow key={index}>
                    {props.tableType === 'category' ? (
                        <CategoryWiseOutputDataCells
                            rowData={childRows[category]}
                            rowKey={category}
                        />
                    ) : (
                        <DemandWiseOutputDataCells
                            rowData={childRows[category]}
                            rowKey={category}
                        />
                    )}
                </TableRow>
            ))}
            {props.total && (
                <TableRow>
                    <StyledTableCell colSpan={2} align='right'>
                        Total
                    </StyledTableCell>
                    <StyledTableCell rowSpan={1} align='center'>
                        {props.total.total_num_existing_to_deploy}
                    </StyledTableCell>
                    <StyledTableCell rowSpan={1} align='center'>
                        {props.total.total_num_new_to_deploy}
                    </StyledTableCell>
                    <StyledTableCell rowSpan={1} align='center'>
                        {props.total.total_category_wise_total}
                    </StyledTableCell>
                </TableRow>
            )}
        </>
    )
}

const CategoryWiseOutputDataCells = (props: { rowData: any; rowKey: any }) => {
    return (
        <>
            <StyledTableCell rowSpan={1} align='center'>
                {props.rowKey}
            </StyledTableCell>

            <StyledTableCell rowSpan={1} align='center'>
                {props.rowData.num_of_existing_to_deploy}
            </StyledTableCell>

            <StyledTableCell rowSpan={1} align='center'>
                {props.rowData.num_of_new_to_deploy}
            </StyledTableCell>

            <StyledTableCell rowSpan={1} align='center'>
                {props.rowData.total}
            </StyledTableCell>
        </>
    )
}

const DemandWiseOutputDataCells = (props: { rowData: any; rowKey: any }) => {
    return (
        <>
            <StyledTableCell rowSpan={1} align='center'>
                {props.rowKey}
            </StyledTableCell>

            <StyledTableCell rowSpan={1} align='center'>
                {props.rowData.expected_demand}
            </StyledTableCell>

            <StyledTableCell rowSpan={1} align='center'>
                {props.rowData.fulfillment_with_current}
            </StyledTableCell>

            <StyledTableCell rowSpan={1} align='center'>
                {props.rowData.fulfillment_with_total}
            </StyledTableCell>
        </>
    )
}

type InventoryTableHeaders = string[]

type InventoryTableData = {
    vendor: string | undefined
    cost: number | undefined
    order_level: number | undefined
    reorder_qty: number | undefined
}[]

export const FormInventoryTable = (props: {
    id: string
    tableHeaders: InventoryTableHeaders
    tableData: InventoryTableData
    totalOrderQty: number
    totalCost: number
}) => {
    return (
        <TableContainer component={Paper} sx={{ maxHeight: '100%' }}>
            <Table aria-label={props.id} stickyHeader>
                <TableHead>
                    <TableRow>
                        {props.tableHeaders.map((row: string, key: any) => (
                            <StyledTableCell key={key}>{row}</StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {props.tableData.map((obj: any, key: any) => (
                        <TableRow
                            key={key}
                            sx={{
                                '&:last-child td, &:last-child th': {
                                    border: 0,
                                },
                            }}
                        >
                            <StyledTableCell>{obj.order_date}</StyledTableCell>
                            <StyledTableCell>{obj.vendor}</StyledTableCell>
                            <StyledTableCell>{obj.order_level}</StyledTableCell>
                            <StyledTableCell>{obj.reorder_qty}</StyledTableCell>
                            <StyledTableCell>{obj.cost}</StyledTableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <StyledTableCell colSpan={3} align='left'>
                            Total
                        </StyledTableCell>
                        <StyledTableCell>{props.totalOrderQty}</StyledTableCell>
                        <StyledTableCell>{props.totalCost}</StyledTableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

type RouteTableData = {
    trip_id: number | string | undefined
    vehicle_id: number | string | undefined
    order_id: number | string | undefined
    order_hu_content: number | string | undefined
    source: number | string | undefined
    destination: number | string | undefined
}[]

export const FormRouteTable = (props: {
    id: string
    tableHeaders: string[]
    tableData: RouteTableData
}) => {
    return (
        <TableContainer component={Paper} sx={{ maxHeight: '100%' }}>
            <Table aria-label={props.id} stickyHeader>
                <TableHead>
                    <TableRow>
                        {props.tableHeaders.map((row: string, key: any) => (
                            <StyledTableCell key={key}>{row}</StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {props.tableData.map((obj: any, key: any) => (
                        <TableRow
                            key={key}
                            sx={{
                                '&:last-child td, &:last-child th': {
                                    border: 0,
                                },
                            }}
                        >
                            <StyledTableCell>{obj.trip_id}</StyledTableCell>
                            <StyledTableCell>{obj.vehicle_id}</StyledTableCell>
                            <StyledTableCell>{obj.order_id}</StyledTableCell>
                            <StyledTableCell>
                                {obj.order_hu_content}
                            </StyledTableCell>
                            <StyledTableCell>{obj.source}</StyledTableCell>
                            <StyledTableCell>{obj.destination}</StyledTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    '& .header': {
        backgroundColor: '#4471C2',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1rem',
        borderWidth: 1,
        borderColor: 'white',
        borderStyle: 'solid',
    },
}))

export const FormDataGrid = (props: {
    columns: GridColDef[]
    rows: any
    processDataChange: any
}) => {
    return (
        <StyledDataGrid
            processRowUpdate={props.processDataChange}
            rows={props.rows}
            columns={props.columns}
            hideFooter={true}
            disableRowSelectionOnClick
            // scrollbarSize={0}
            showCellVerticalBorder={true}
            showColumnVerticalBorder={true}
        />
    )
}

export const FormGraph = (props: {
    data: any
    xLabel: any
    yLabel: any
    lineData: any
}) => {
    const [graphProps, setGraphProps] = useState(
        props.lineData.reduce(
            (line: any, { key }: any) => {
                line[key] = false
                return line
            },
            { hover: null },
        ),
    )

    const handleLegendMouseEnter = (e: any) => {
        if (!graphProps[e.dataKey]) {
            setGraphProps({ ...graphProps, hover: e.dataKey })
        }
    }

    const handleLegendMouseLeave = (e: any) => {
        setGraphProps({ ...graphProps, hover: null })
    }

    const selectLine = (e: any) => {
        setGraphProps({
            ...graphProps,
            [e.dataKey]: !graphProps[e.dataKey],
            hover: null,
        })
    }

    return (
        <ResponsiveContainer width='100%' height='100%'>
            <LineChart
                width={450}
                height={400}
                data={props.data}
                margin={{
                    top: 10,
                    right: 50,
                    left: 10,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray='4 4' />
                <XAxis dataKey={props.xLabel} />
                <YAxis dataKey={props.yLabel} />
                <Tooltip />
                <Legend
                    align='center'
                    iconType='square'
                    onClick={selectLine}
                    onMouseOver={handleLegendMouseEnter}
                    onMouseOut={handleLegendMouseLeave}
                />
                {props.lineData.map((obj: any, key: any) => (
                    <Line
                        key={key}
                        type='monotone'
                        dataKey={obj.key}
                        stroke={obj.stroke}
                        activeDot={{ r: 8 }}
                        id={props.xLabel}
                        hide={graphProps[obj.key] === true}
                        strokeWidth={Number(
                            graphProps.hover === obj.key || !graphProps.hover
                                ? 1.5
                                : 0.8,
                        )}
                    />
                ))}
            </LineChart>
        </ResponsiveContainer>
    )
}
