import React from "react";
import ScriptItem from "./ScriptItem";
import { useAppContext } from "../../context/AppContext";
import { useParams } from "react-router-dom";

const Script: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { notes } = useAppContext();
  const noteId = parseInt(id || "", 10);
  const note = notes.find((note) => note.id === noteId);

  if (!note) {
    return <div>Note not found</div>;
  }

  return (
    <section>
      {note.script.map((item, index) => (
        <ScriptItem key={index} item={item} />
      ))}
    </section>
  );
};

export default Script;
