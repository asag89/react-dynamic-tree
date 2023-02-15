import { useSelector } from "react-redux"
import { State } from "../redux/reducers"
import { ChildProperty } from "../types"
const useChild = () => {
    const { children } = useSelector((state: State) => state.tree)
    const getChildren = (parentId: string) => {
        return children.filter((item) => {
            return item.parentId === parentId
        })
    }

    const getSum = (parentId: string, selfBV: number) => {

        const items = children.filter((child: ChildProperty) => {
            return child.parents?.includes(parentId)
        })

        return items.reduce((acc: number, curr: ChildProperty) => {
            return acc + curr.selfBV
        }, selfBV)

    }
    return {
        getChildren,
        getSum
    }
}

export default useChild