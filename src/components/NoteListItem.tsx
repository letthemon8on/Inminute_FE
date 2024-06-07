import { Link } from "react-router-dom";
import "./../styles/fonts/font.css";

export default function NoteListItem() {
  return (
    <div className="w-200 h-24 rounded-xl bg-white mb-4">
      <Link to={"/note/:id"}>
        <div className="flex justify-between items-center">
          <h3 className="mx-10 mt-4 text-2xl pt-medium">프로젝트 이름</h3>
          <div className="text-gray-500 mt-4 mr-4">
            <span className="mr-4">🗓️ 240405 Fri</span>
            <span className="mr-4">⏰ 10:35</span>
            <span className="mr-4">⌛ 00:09:40</span>
          </div>
        </div>

        <p className="text-gray-500 text-base mx-11 my-2">
          프로젝트 이름이 인미닛으로 결정되었다.
        </p>
      </Link>
    </div>
  );
}
