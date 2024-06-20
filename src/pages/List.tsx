import React, { useEffect, useMemo, useState } from "react";
import Folder from "../components/Folder";
import NoteListItem from "../components/NoteListItem";
import Navbar from "../components/Navbar";
import NewNoteModal from "../components/modal/NewNoteModal";
import DropDown from "../components/DropDown";
import search from "../assets/search.svg";
import { useAppContext } from "../context/AppContext";

const List: React.FC = () => {
  const { notes, fetchNote, fetchFolderNote } = useAppContext();
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const options = [
    { value: 0, label: "최신순" },
    { value: 1, label: "오래된 순" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (selectedFolderId === null) {
        await fetchNote();
      } else {
        await fetchFolderNote(selectedFolderId);
      }
    };

    fetchData();
  }, [selectedFolderId, fetchNote, fetchFolderNote]);

  // 검색
  const filteredNotes = useMemo(() => {
    if (!notes || notes.length === 0) return [];

    return notes.filter((note) =>
      note.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [notes, searchQuery]);

  // 정렬
  const sortedNotes = useMemo(() => {
    if (!filteredNotes || filteredNotes.length === 0) return [];

    const sorted = [...filteredNotes].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);

      if (selectedOption === 0) {
        return dateB.getTime() - dateA.getTime(); // 최신순
      } else {
        return dateA.getTime() - dateB.getTime(); // 오래된 순
      }
    });
    return sorted;
  }, [filteredNotes, selectedOption]);

  return (
    <div className="bg-bg-blue">
      <Navbar />
      <div className="flex w-full min-h-screen">
        <Folder onSelectFolder={setSelectedFolderId} />

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
              <input
                className="grow px-2 outline-none"
                placeholder="제목을 입력하세요"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
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
