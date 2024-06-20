import { Link } from "react-router-dom";
import "./../styles/fonts/font.css";
import calendar from "./../assets/calendar.svg";
import clock from "./../assets/clock.svg";
import { INote, useAppContext } from "../context/AppContext";
import { formatDate, formatDay, formatTime } from "../util/date";
import { useEffect, useState } from "react";

interface NoteListItemProps {
  note: INote;
}

const NoteListItem: React.FC<NoteListItemProps> = ({ note }) => {
  const { fetchNoteDetail } = useAppContext();
  const [noteDetail, setNoteDetail] = useState<INote | null>(null);

  useEffect(() => {
    const getNoteDetail = async () => {
      const detail = await fetchNoteDetail(note.id);
      if (detail) {
        setNoteDetail(detail);
      }
    };

    getNoteDetail();
  }, [note.id]);

  if (!noteDetail) {
    return <div>Loading...</div>;
  }

  const date = formatDate(note.createdAt);
  const time = formatTime(note.createdAt);
  const day = formatDay(note.createdAt);

  return (
    <div className="hover:bg-gray-200 h-24 rounded-xl bg-white mb-4">
      <Link to={`/note/${note.id}`}>
        <div className="flex justify-between items-center">
          <h3 className="mx-10 mt-4 text-2xl pt-medium">{noteDetail.name}</h3>
          <div className="text-gray-500 w-60 mt-4 mr-4 flex">
            <span className="w-32 flex items-center">
              <img className="w-5 mx-1" src={calendar} />
              <span>
                {date} {day}
              </span>
            </span>
            <span className="w-20 flex items-center">
              <img className="w-5 mx-1" src={clock} />
              <span>{time}</span>
            </span>
          </div>
        </div>
        <p className="text-gray-500 text-base mx-11 my-2">
          {noteDetail.oneLineSummary
            ? noteDetail.oneLineSummary
            : "No summary available"}
        </p>
      </Link>
    </div>
  );
};

export default NoteListItem;
