
import { Action } from "../../types"

import { TreeState } from "../../types"

const initialState: TreeState = {
    trees: [],
    children: [],
}

const reducer = (state: TreeState = initialState, action: Action) => {
    switch (action.type) {
        case "CREATE_TREE":
            return { ...state, trees: [...state.trees, action.payload] }
        case "ADD_CHILD":
            return { ...state, children: [...state.children, action.payload] }
        case "REMOVE_CHILD":
            const trees = state.trees.filter((item) => {
                return item.id !== action.payload
            })
            const children = state.children.filter((item) => {
                return (item.id !== action.payload && !item.parents?.includes(action.payload))
            })
            return {
                ...state,
                children,
                trees
            }
        case "UPDATE_SELF_VALUE":
            const { id, selfBV } = action.payload

            const all = [...state.trees, ...state.children]
            const item = all.find((item) => {
                return item.id === id
            })

            if (item) {
                item.selfBV = selfBV
            }

            return {
                ...state,
                children: state.children,
                trees: state.trees
            };
        default:
            return state
    }
}
export default reducer