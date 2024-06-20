import React from "react";
// import ToDoBySpkItem from "./ToDoBySpkItem";
import { useAppContext } from "../../context/AppContext";
import { useParams } from "react-router-dom";

const ToDoBySpk: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { notes } = useAppContext();
  const noteId = parseInt(id || "", 10);
  const note = notes.find((note) => note.id === noteId);

  if (!note) {
    return <div>Note not found</div>;
  }

  return (
    <div>
      {/* {note.todo.map((item, index) => (
        <ToDoBySpkItem key={index} noteId={noteId} item={item} />
      ))} 추후 반영 */}
    </div>
  );
};

export default ToDoBySpk;
