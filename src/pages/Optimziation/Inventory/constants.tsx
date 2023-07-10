export const lineData = [
    {
        key: 'inventory_level',
        stroke: '#8B7AFF',
    },
    {
        key: 'daily_demand',
        stroke: '#45AC54',
    },
    {
        key: 'orders_fulfilled',
        stroke: '#008E19',
    },
    {
        key: 'stockout_on',
        stroke: '#8B7AFF',
    },
    {
        key: 'po_raised_on',
        stroke: '#FF7073',
    },
    {
        key: 'po_received_on',
        stroke: '#FF7078',
    },
]

// export const lineData = [
//     {
//         key: 'Inventory Level',
//         stroke: '#8B7AFF',
//     },
//     {
//         key: 'Daily Demand',
//         stroke: '#45AC54',
//     },
//     {
//         key: 'Orders Fulfilled',
//         stroke: '#008E19',
//     },
//     {
//         key: 'Stockout On',
//         stroke: '#8B7AFF',
//     },
//     {
//         key: 'PO Raised On',
//         stroke: '#FF7073',
//     },
//     {
//         key: 'PO Received On',
//         stroke: '#FF7078',
//     },
// ]

export const policyTableHeaders = [
    'Order Date',
    'Vendor',
    'Reorder Level',
    'Order Qty',
    'Cost',
]

export const DataTemplates: any = {
    weeklyDemandForecast: [
        {
            weekend: '7/05/23',
            month_no: 4,
            month_week: 1,
            article: '499190192',
            site: 'R007',
            predict: 7,
        },
        {
            weekend: ' 14/05/23',
            month_no: 4,
            month_week: 2,
            article: '499190192',
            site: 'R007',
            predict: 10,
        },
        {
            weekend: '21/05/23',
            month_no: 4,
            month_week: 3,
            article: '499190192',
            site: 'R007',
            predict: 15,
        },
        {
            weekend: '28/05/23',
            month_no: 4,
            month_week: 4,
            article: '499190192',
            site: 'R007',
            predict: 9,
        },
    ],
    vendorCostTime: [
        {
            vendor_id: 'RIL3928',
            lead_time_avg: 5,
            lead_time_std_dev: 2,
            price: 1000,
            order_cost: 100,
            stockout_cost: 400,
        },
        {
            vendor_id: 'RIL3927',
            lead_time_avg: 4,
            lead_time_std_dev: 3,
            price: 2000,
            order_cost: 200,
            stockout_cost: 300,
        },
    ],
    purchaseOrder: [
        {
            id: 1,
            data: 1,
        },
        {
            id: 2,
            data: 2,
        },
        {
            id: 3,
            data: 3,
        },
    ],
    volumeDiscount: [
        {
            id: 1,
            data: 1,
        },
        {
            id: 2,
            data: 2,
        },
        {
            id: 3,
            data: 3,
        },
    ],
}
