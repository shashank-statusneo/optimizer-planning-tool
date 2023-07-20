import userAuth from './user/auth'
import inventoryOptimizer from './inventory/optimizer'
import inventoryResult from './inventory/result'
import inventorySimulator from './inventory/simulator'
import warehouseSelect from './warehouse/select'
import warehouseProductivity from './warehouse/productivity'
import warehouseDemand from './warehouse/demand'
import warehouseRequirement from './warehouse/requirement'
import warehouseResults from './warehouse/result'
import routeOptimizer from './transport/route'
import routeOptimizerResult from './transport/result'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
    userAuth: userAuth,
    inventoryOptimizer: inventoryOptimizer,
    inventoryResult: inventoryResult,
    inventorySimulator: inventorySimulator,
    warehouseSelect: warehouseSelect,
    warehouseProductivity: warehouseProductivity,
    warehouseDemand: warehouseDemand,
    warehouseRequirement: warehouseRequirement,
    warehouseResults: warehouseResults,
    routeOptimizer: routeOptimizer,
    routeOptimizerResult: routeOptimizerResult,
})
