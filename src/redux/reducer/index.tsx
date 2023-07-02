import authReducer from './auth'
import inventoryOptimizer from './inventory/optimizer'
import inventoryResult from './inventory/result'
import inventorySimulator from './inventory/simulator'
import warehouseSelect from './warehouse/select'
import warehouseProductivity from './warehouse/productivity'
import warehouseDemand from './warehouse/demand'
import warehouseRequirement from './warehouse/requirement'
import warehouseResult from './warehouse/result'
import routeOptimizer from './transport/route'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
    authReducer: authReducer,
    inventoryOptimizer: inventoryOptimizer,
    inventoryResult: inventoryResult,
    inventorySimulator: inventorySimulator,
    warehouseSelect: warehouseSelect,
    warehouseProductivity: warehouseProductivity,
    warehouseDemand: warehouseDemand,
    warehouseRequirement: warehouseRequirement,
    warehouseResult: warehouseResult,
    routeOptimizer: routeOptimizer,
})
