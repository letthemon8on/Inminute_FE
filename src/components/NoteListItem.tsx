import { Link } from "react-router-dom";
import "./../styles/fonts/font.css";
import calendar from "./../assets/calendar.svg";
import clock from "./../assets/clock.svg";

export default function NoteListItem() {
  return (
    <div className="h-24 rounded-xl bg-white mb-4">
      <Link to={"/note/:id"}>
        <div className="flex justify-between items-center">
          <h3 className="mx-10 mt-4 text-2xl pt-medium">프로젝트 이름</h3>
          <div className="text-gray-500 mt-4 mr-4 flex">
            <span className="mr-4 flex items-center">
              <img className="w-5 mx-1" src={calendar} />
              <span>240405 Fri</span>
            </span>
            <span className="mr-4 flex items-center">
              <img className="w-5 mx-1" src={clock} />
              <span>10:35</span>
            </span>
          </div>
        </div>

        <p className="text-gray-500 text-base mx-11 my-2">
          프로젝트 이름이 인미닛으로 결정되었다.
        </p>
      </Link>
    </div>
  );
}
