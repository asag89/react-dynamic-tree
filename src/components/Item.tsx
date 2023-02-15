import { useState } from "react"
import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import styled from "styled-components"
import useCalculate from "../hooks/useCalculate"
import { actionCreators } from "../redux/actions"
import { State } from "../redux/reducers"
import { ChildProperty, ItemStyleProps } from "../types"
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai"
import { BsStarFill } from "react-icons/bs"
import { useSelector } from "react-redux"

const Container = styled.div<ItemStyleProps>`
    width: 140px;
    height: auto;
    position: relative;
    display: inline-block;
    margin-bottom: 2em;
 
        &:before,
        &:after{
            content: "";
            width: 2px;
            position: absolute;
            top: -1em;
            left: 50%;
            background: #000;
            height: 1em
        }
        &::before{
            width: ${({ isParent }) => isParent ? "2px" : 0};

        }
    
        &:after{
            top: auto;
            bottom: -1em;
            width: ${({ hasChild }) => hasChild ? "2px" : 0};
        }

    .wrapper{
        padding:10px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        height: auto;
        border: 1px solid #444;

        .desc-item{
            width: 100%;
            margin-bottom: 8px;
            font-size: .7rem;
        }

        .desc-name{
            width: 100%;
            display: flex;
            align-items: center;

            icon{
                font-size: 1rem;
            }

            input{
                border-bottom: 1px solid #000;
                width: 100%;
                font-size: 14px;
                margin-left: 5px;
                padding: 2px;
                border-radius: 3px;
            }
        }

        .desc-total{
            font-weight: 500;
            font-size: .8rem;
        }
        .desc-self-value{
            display: flex;
            align-items: center;

            input{
                border-bottom: 1px solid #000;
                width: 40%;
                margin-left: 5px;
                border-radius: 3px;
                padding: 2px;
                font-size: 12px;
            }
        }

        .bv-container{
            width: 50%;
            display: flex;
        }

        .btn-container{
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin-top: 5px;

            .btn{
                background-color: transparent;
                border-radius: 2px;
                padding: 3px;
                line-height: 0;
                cursor: pointer;

                .icon{
                    font-size: .9em;
                    fill: #fff;
                }
            }

            .btn-add{
                background-color: #129c12;
            }

            .btn-remove{
                background-color: #dc4040;
            }
        }
    }
`

const Item: React.FC<ChildProperty> = ({ text, id, selfBV, parents }) => {
    const dispatch = useDispatch()
    const { getSum } = useCalculate();
    const [boxTotal, setBoxTotal] = useState(selfBV)
    const [boxName, setBoxName] = useState(text)
    const { children } = useSelector((state: State) => state.tree)

    const handleBVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value)
        setBoxTotal(value)
        updateSelfValue(id, value)
    }

    const hasChild = children.find((item) => {
        return item.parents?.includes(id)
    })

    const { addChild, removeChild, updateSelfValue } = bindActionCreators(actionCreators, dispatch)
    return (
        <Container hasChild={hasChild ? true : false} isParent={(parents?.length && parents?.length > 0) ? true : false}>
            <div className="wrapper">
                <div className="desc-item desc-name">
                    <BsStarFill />
                    <input type="text" value={boxName} onChange={e => setBoxName(e.target.value)} />
                </div>
                <div className="desc-item desc-total">
                    Total: <span>{getSum(id, selfBV)}</span>
                </div>
                <div className="desc-item desc-self-value">
                    <label htmlFor="total">Self BV </label>
                    <input type="number" id="total" step={100} min={0} max={1000} value={boxTotal} onChange={(e) => handleBVChange(e)} />
                </div>
                <div className="btn-container">
                    <button className="btn btn-add" onClick={() => addChild(id, parents)}><AiOutlinePlus className="icon" /></button>
                    <button className="btn btn-remove" onClick={() => removeChild(id)}><AiOutlineClose className="icon" /></button>
                </div>
            </div>
        </Container>
    )
}

export default Item