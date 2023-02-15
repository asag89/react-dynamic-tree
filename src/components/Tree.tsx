import styled from "styled-components"
import useCalculate from "../hooks/useCalculate"
import Item from "./Item"
import { TreeProperty } from "../types"

const Container = styled.div`
    height: auto;
    display: flex;
    padding: 0 10px;
	position: relative;
	transition: .5s;
    margin: 0 auto;

    &:before{
        content: "";
        top: -1em;
        left: 0;
        position: absolute;
        right: 0;
        height: 2px;
        background:#000;
    }

    & :first-child::before {
        left: 50%;
    }
    &:last-child::before {
        right: 50%;
    }
    &:only-child:before{
        display: none;
    }
  
    .wrapper{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: auto;
        position: relative;

        .children{
            width: 100%;
            display: flex;
            justify-content: space-around;
            align-items: flex-start;  
        }
    }
`

const Tree: React.FC<TreeProperty> = ({ text, id, total, selfBV, parents }) => {
    const { getChildren } = useCalculate();

    return (
        <Container>
            <div className="wrapper">
                <Item text={text} id={id} total={total} selfBV={selfBV} parents={parents} />
                <div className="children">
                    {getChildren(id).map((item) => (
                        <Tree key={item.id} text={item.text} id={item.id} total={item.total} selfBV={item.selfBV} parents={item.parents} />
                    ))}
                </div>
            </div>
        </Container>
    )
}

export default Tree

