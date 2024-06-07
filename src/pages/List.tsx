import Folder from "../components/Folder";
import NoteListItem from "../components/NoteListItem";
import Navbar from "../components/Navbar";

const List: React.FC = () => {
  return (
    <div className="bg-bg-blue">
      <Navbar />
      <div className="flex w-full min-h-screen ">
        <Folder />

        <div className="basis-4/5 p-4 mr-32 mt-12 ">
          <div className="flex justify-between mb-4 items-center">
            <form>
              <select className="h-11 rounded-2xl border border-gray-200 px-2 outline-none text-gray-500 text-base">
                <option value="latest">최신순</option>
                <option value="oldest">오래된 순</option>
              </select>
            </form>

            <div className="bg-white w-9/12 rounded-2xl flex px-3 py-1 mx-4 shadow-inner shadow-gray-400">
              <div className="mr-1 my-0.5 text-2xl">🔎</div>
              <input className="grow px-2 outline-none" />
            </div>

            <button className="bg-gradient-to-r from-cyan-50 to-pink-50 rounded-2xl w-36 h-11 drop-shadow-lg text-gray-500 text-xl">
              New Note +
            </button>
          </div>
          <section>
            <NoteListItem />
            <NoteListItem />
            <NoteListItem />
            <NoteListItem />
            <NoteListItem />
            <NoteListItem />
            <NoteListItem />
            <NoteListItem />
            <NoteListItem />
          </section>
        </div>
      </div>
    </div>
  );
};

export default List;
