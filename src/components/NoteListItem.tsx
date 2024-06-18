import { Link } from "react-router-dom";
import "./../styles/fonts/font.css";
import calendar from "./../assets/calendar.svg";
import clock from "./../assets/clock.svg";
import { INote } from "../data/dummyData";

interface NoteListItemProps {
  note: INote;
}

const NoteListItem: React.FC<NoteListItemProps> = ({ note }) => {
  return (
    <div className="hover:bg-gray-200 h-24 rounded-xl bg-white mb-4">
      <Link to={`/note/${note.id}`}>
        <div className="flex justify-between items-center">
          <h3 className="mx-10 mt-4 text-2xl pt-medium">{note.title}</h3>
          <div className="text-gray-500 mt-4 mr-4 flex">
            <span className="mr-4 flex items-center">
              <img className="w-5 mx-1" src={calendar} />
              <span>
                {note.date} {note.day}
              </span>
            </span>
            <span className="mr-4 flex items-center">
              <img className="w-5 mx-1" src={clock} />
              <span>{note.time}</span>
            </span>
          </div>
        </div>

        <p className="text-gray-500 text-base mx-11 my-2">
          프로젝트 이름이 인미닛으로 결정되었다. (한 줄 요약된 내용)
        </p>
      </Link>
    </div>
  );
};

export default NoteListItem;
