import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";
import DragableCard from "./Components/DragableCard";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;
const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source } = info;
    if (!destination) return;
    //same board movement 보드주소가 같다면
    if (destination?.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const unpack = [...allBoards[source.droppableId]];
        const taskObj = unpack[source.index];
        unpack.splice(source.index, 1);
        unpack.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: unpack,
        };
      });
    }
    // cross board movement
    if (destination?.droppableId !== source.droppableId) {
      setToDos((allBoards) => {
        const unpack = [...allBoards[source.droppableId]];
        const taskObj = unpack[source.index];
        const targetUnpack = [...allBoards[destination.droppableId]];
        unpack.splice(source.index, 1);
        targetUnpack.splice(destination.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: unpack,
          [destination.droppableId]: targetUnpack,
        };
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
