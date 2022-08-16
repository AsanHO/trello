import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) =>
    props.isDragging ? "salmon" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 10px rgba(0, 0, 0, 0.5)" : "none"};
`;

interface IDragableCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}
function DragableCard({ toDoId, toDoText, index }: IDragableCardProps) {
  console.log(toDoId, "has been rendered");
  return (
    <Draggable
      draggableId={toDoId + ""}
      index={index}
      //key 와 draggableId가 같아야함!!!!!
    >
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}
export default React.memo(DragableCard);
