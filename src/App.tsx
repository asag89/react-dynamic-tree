import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import styled from "styled-components"
import Tree from "./components/Tree";
import { actionCreators } from "./redux/actions";
import { State } from "./redux/reducers";
import { AppStyleProps } from "./types";

const Container = styled.div<AppStyleProps>`
    background-color: #b5edda;
    width: auto;
    height: auto;
    min-height: 600px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .tree-count{
      position: absolute;
      top: 20px;
      left: 20px;
      color: #000;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 1.2rem;
      font-weight: 600;
    }

    .top{
      width: 85%;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      margin-bottom: 40px;
      cursor: pointer;
      font-size: 1rem;
      background-color: #537FE7;
      color: #fff;
    }

    .tree-container{
      padding: 25px 15px;
      border-radius: 10px;
      width: 85%;
      display: flex;
      flex-direction:column;
      margin-bottom:120px;
      overflow: auto;
      border: ${({ isSingle }) => isSingle ? "1px solid #40cf9f" : "none"};
      box-shadow: ${({ isSingle }) => isSingle ? "0px 5px 14px 5px #94e7cb" : "none"};
    }
`
function App() {

  const { trees } = useSelector((state: State) => state.tree)
  const dispatch = useDispatch()

  const { createTree } = bindActionCreators(actionCreators, dispatch)

  return (
    <Container isSingle={trees.length > 1}>
      {trees.length > 0 &&
        <div className="tree-count">
          <span>{trees.length}</span>
          <span>Tree</span>
        </div>
      }
      <button className="btn top" onClick={() => createTree()}>Create Tree</button>
      {trees.length > 0 &&
        trees.map((tree) => (
          <div key={tree.id} className="tree-container">
            <Tree  {...tree} />
          </div>
        ))
      }
    </Container>
  );
}

export default App;
