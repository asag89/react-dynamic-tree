
import { combineReducers } from "redux"
import treeReducer from "../reducers/treeReducer"
const rootReducer = combineReducers({
    tree: treeReducer
    // ...
})

export default rootReducer

export type State = ReturnType<typeof rootReducer>