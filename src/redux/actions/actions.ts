import { Dispatch } from "redux"
import { State } from "../reducers"
import { v4 as uuid } from 'uuid';

import { Action } from "../../types";

export const createTree = () => {
    return (dispatch: Dispatch, getState: () => State) => {

        const length = getState().tree.trees.length
        const tree = {
            id: uuid(),
            text: `tree-${length + 1}`,
            parents: [],
            parentId: "",
            selfBV: 300,
            total: 300,
            itemType: "tree"
        }
        dispatch({
            type: "CREATE_TREE",
            payload: tree
        })
    }
}

export const addChild = (parentId: string, parents: any) => {
    return (dispatch: Dispatch<Action>, getState: () => State) => {
        const all = [...getState().tree.trees, ...getState().tree.children]

        const parent = all.find((item) => {
            return item.id === parentId
        })
        const children = getState().tree.children.filter((item) => {
            return item.parentId === parentId
        })

        const child = {
            text: `${parent?.text ? parent?.text : "tree"}-${children.length + 1}`,
            selfBV: 300,
            total: 300,
            parentId,
            parents: [...parents, parentId],
            id: uuid(),
            itemType: "child"
        }
        dispatch({
            type: "ADD_CHILD",
            payload: child
        })
    }
}

export const removeChild = (id: string) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: "REMOVE_CHILD",
            payload: id
        })
    }
}

export const updateSelfValue = (id: string, selfBV: number) => {
    return (dispatch: Dispatch<Action>, getState: () => State) => {
        dispatch({
            type: "UPDATE_SELF_VALUE",
            payload: { id, selfBV }
        })
    }
}

