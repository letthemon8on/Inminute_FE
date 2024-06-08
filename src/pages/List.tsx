import Folder from "../components/Folder";
import NoteListItem from "../components/NoteListItem";
import Navbar from "../components/Navbar";
import NewNoteModal from "../components/modal/NewNoteModal";
import DropDown from "../components/DropDown";
import search from "../assets/search.svg";

const List: React.FC = () => {
  return (
    <div className="bg-bg-blue">
      <Navbar />
      <div className="flex w-full min-h-screen ">
        <Folder />

        <div className="grow p-4 mr-24 mt-6">
          <div className="flex justify-between mb-4 items-center">
            <DropDown />

            <div className="bg-white w-9/12 rounded-2xl flex px-3 py-1 mx-4 shadow-inner shadow-gray-400">
              <div className="my-0.5 text-2xl">
                <img className="w-6 py-1" src={search} />
              </div>
              <input className="grow px-2 outline-none" />
            </div>
            <NewNoteModal />
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
