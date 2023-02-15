
// state types  && props types 
export interface TreeState {
    trees: TreeProperty[],
    children: ChildProperty[],
}

export interface TreeProperty {
    text: string,
    id: string,
    parents?: string[],
    parentId?: string
    selfBV: number,
    total: number,
}

export interface ChildProperty {
    text: string,
    selfBV: number,
    total: number,
    parentId?: string,
    parents?: string[],
    id: string,
}

// action types
interface CreateTreeAction {
    type: "CREATE_TREE",
    payload: TreeProperty
}

interface AddChildAction {
    type: "ADD_CHILD",
    payload: ChildProperty
}

interface RemoveChildAction {
    type: "REMOVE_CHILD",
    payload: string
}

interface UpdateTotalAction {
    type: "UPDATE_SELF_VALUE",
    payload: {
        id: string,
        selfBV: number,
    }
}

// styled-components types
export interface AppStyleProps {
    isSingle: boolean,
}

export interface ItemStyleProps {
    hasChild: boolean,
    isParent: boolean
}

export type Action = CreateTreeAction | AddChildAction | RemoveChildAction | UpdateTotalAction