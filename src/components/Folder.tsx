import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FolderItem from "./FolderItem";
import folderIcon from "./../assets/folder.svg";
import plus from "./../assets/plus.svg";
import minus from "./../assets/minus.svg";
import { useFolderContext } from "./../context/FolderContext";

const Folder: React.FC = () => {
  const { folders, notes, addFolder } = useFolderContext(); // Context 사용
  const [newFolder, setNewFolder] = useState(false);
  const [folderName, setFolderName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const nav = useNavigate();

  useEffect(() => {
    if (newFolder && inputRef.current) {
      inputRef.current.focus();
    }
  }, [newFolder]);

  const handleNewFolderClick = () => {
    setNewFolder(true);
  };

  const handleCancelNewFolderClick = () => {
    setNewFolder(false);
    setFolderName("");
  };

  const handleAddFolder = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && folderName.trim()) {
      addFolder(null, folderName.trim());
      setFolderName("");
      setNewFolder(false);
    }
  };

  return (
    <div className="w-80 p-4 mt-6">
      <div className="pl-10">
        {!newFolder && (
          <button
            className="hover:scale-105 transition-transform duration-200 bg-gradient-to-r from-yellow-50 to-cyan-50 rounded-2xl w-32 h-11 mb-4 drop-shadow-lg text-gray-500 text-xl"
            onClick={handleNewFolderClick}
          >
            <div className="flex justify-between mx-4">
              <span>New</span> <img className="w-6 ml-1" src={folderIcon} />
              <img className="w-5" src={plus} />
            </div>
          </button>
        )}
        <div className={newFolder ? "block" : "hidden"}>
          <button
            className="hover:scale-105 transition-transform duration-200 bg-gradient-to-r from-yellow-50 to-cyan-50 rounded-2xl w-32 h-11 mb-4 drop-shadow-lg text-gray-500 text-xl"
            onClick={handleCancelNewFolderClick}
          >
            <div className="flex justify-between mx-4">
              <span>New</span> <img className="w-6 ml-1" src={folderIcon} />
              <img className="w-5" src={minus} />
            </div>
          </button>
          <div className="relative flex w-56 h-8 mb-3 items-center">
            <div className="absolute ml-2 mr-1 text-2xl">
              <img className="w-6" src={folderIcon} />
            </div>
            <input
              className="grow pl-9 pr-2 py-1 rounded-lg border border-gray-300 outline-none"
              ref={inputRef}
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              onKeyDown={handleAddFolder}
            />
          </div>
        </div>
        <h3
          onClick={() => nav("/list")}
          className="hover:bg-gray-200 rounded-md mt-1 text-lg flex items-center cursor-pointer"
        >
          <img className="w-5 ml-2 mr-1" src={folderIcon} />
          전체 폴더
        </h3>
        <div className="pl-4 pt-2">
          {folders.map((folder) => (
            <FolderItem key={folder.id} folder={folder} notes={notes} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Folder;
