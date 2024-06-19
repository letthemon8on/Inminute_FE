import React from "react";
// import SummaryBySpkItem from "./SummaryBySpkItem";
import { useAppContext } from "../../context/AppContext";
import { useParams } from "react-router-dom";

const SummaryBySpk: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { notes } = useAppContext();
  const noteId = parseInt(id || "", 10);
  const note = notes.find((note) => note.id === noteId);

  if (!note) {
    return <div>Note not found</div>;
  }

  return (
    <div>
      {/* {note.summary.map((item, index) => (
        <SummaryBySpkItem key={index} noteId={noteId} item={item} />
      ))} */}
    </div>
  );
};

export default SummaryBySpk;
