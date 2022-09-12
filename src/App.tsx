import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
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
const Form = styled.form`
  position: absolute;
  top: 10%;
  width: 30%;
  input {
    width: 100%;
  }
`;
function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    console.log(info);
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
  interface IForm {
    newBoard: string;
  }
  const onValid = ({ newBoard }: IForm) => {
    console.log(newBoard);
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [newBoard]: [],
      };
    });
    setValue("newBoard", "");
  };
  console.log(toDos);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Form onSubmit={handleSubmit(onValid)}>
          <input
            {...register("newBoard", { required: true })}
            type="text"
            placeholder={`새로운 보드를 추가하세요`}
          />
        </Form>
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
