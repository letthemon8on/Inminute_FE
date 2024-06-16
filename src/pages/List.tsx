import React, { useMemo, useState } from "react";
import Folder from "../components/Folder";
import NoteListItem from "../components/NoteListItem";
import Navbar from "../components/Navbar";
import NewNoteModal from "../components/modal/NewNoteModal";
import DropDown from "../components/DropDown";
import search from "../assets/search.svg";
import { useFolderContext } from "../context/FolderContext";

const List: React.FC = () => {
  const { notes } = useFolderContext();
  const [selectedOption, setSelectedOption] = useState<number>(0);

  const options = [
    { value: 0, label: "최신순" },
    { value: 1, label: "오래된 순" },
  ];

  const sortedNotes = useMemo(() => {
    const sorted = [...notes].sort((a, b) => {
      const dateA = new Date(
        `20${a.date.slice(0, 2)}-${a.date.slice(2, 4)}-${a.date.slice(4, 6)}T${
          a.time
        }`
      );
      const dateB = new Date(
        `20${b.date.slice(0, 2)}-${b.date.slice(2, 4)}-${b.date.slice(4, 6)}T${
          b.time
        }`
      );

      if (selectedOption === 0) {
        return dateB.getTime() - dateA.getTime(); // 최신순
      } else {
        return dateA.getTime() - dateB.getTime(); // 오래된 순
      }
    });
    return sorted;
  }, [notes, selectedOption]);

  return (
    <div className="bg-bg-blue">
      <Navbar />
      <div className="flex w-full min-h-screen ">
        <Folder />

        <div className="grow p-4 mr-24 mt-6">
          <div className="flex justify-between mb-4 items-center">
            <DropDown
              options={options}
              selectedOption={selectedOption}
              onSelect={setSelectedOption}
              width="w-28"
              height="h-11"
              top="top-12"
              py="py-2"
            />

            <div className="bg-white w-9/12 rounded-2xl flex px-3 py-1 mx-4 shadow-inner shadow-gray-400">
              <div className="my-0.5 text-2xl">
                <img className="w-6 py-1" src={search} />
              </div>
              <input className="grow px-2 outline-none" />
            </div>
            <NewNoteModal />
          </div>
          <section>
            {sortedNotes.map((note) => (
              <NoteListItem key={note.id} note={note} />
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default List;
