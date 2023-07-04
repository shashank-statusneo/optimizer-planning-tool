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
    distanceMatrix: [
        {
            start_node: 'DEPOT',
            end_node: 'DEPOT',
            distance: 1,
            time: 1,
        },
        {
            start_node: 'DEPOT',
            end_node: 'DEPOT',
            distance: 2,
            time: 2,
        },
    ],
    sourceCoodinates: [
        {
            hub_id: 'RIL3928',
            hub_latitude: '18.50',
            hub_longitude: '50.56',
        },
    ],
    destinationCoordinates: [
        {
            destination_id: 'RIL1020',
            destination_latitude: '78.50',
            destination_longitude: '90.56',
        },
    ],
    fleetDetails: [
        {
            vehicle_type: 'truck',
            vehicle_count: 10,
            fixed_cost: 1055.5,
            variable_cost_per_km: 5.0,
            capacity_kg: 500.0,
            avg_speed_kmph: 60.0,
            characteristics: 'heavy',
        },
    ],
    vehicleAvailability: [
        {
            vehicle_id: 'VEH1020',
            availability_start_time: '28/05/23 12:00',
            availability_end_time: '28/05/25 12:00',
        },
    ],
    orderDetails: [
        {
            order_id: 'ORD123',
            destination: 'DELHI',
            order_weight: 10.0,
            order_volume: 20.0,
            delivery_slot_start_time: '28/05/23 12:00',
            delivery_slot_end_time: '28/05/24 12:00',
            special_vehicle_requirements: 'heavy',
        },
    ],
}
