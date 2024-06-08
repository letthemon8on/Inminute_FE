import { useState } from "react";
import FolderItem from "./FolderItem";

const Folder: React.FC = () => {
  const [newFolder, setNewFolder] = useState(false);

  const handleNewFolderClick = () => {
    setNewFolder(true);
  };

  const handleCancelNewFolderClick = () => {
    setNewFolder(false);
  };

  return (
    <div className="basis-1/5 p-4 mt-12">
      <div className="pl-10">
        {!newFolder && (
          <button
            className="bg-gradient-to-r from-yellow-50 to-cyan-50 rounded-2xl w-28 h-11 mb-4 drop-shadow-lg text-gray-500 text-xl"
            onClick={handleNewFolderClick}
          >
            New 📁 +
          </button>
        )}
        <div className={newFolder ? "block" : "hidden"}>
          <button
            className="bg-gradient-to-r from-yellow-50 to-cyan-50 rounded-2xl w-28 h-11 mb-4 drop-shadow-lg text-gray-500 text-xl"
            onClick={handleCancelNewFolderClick}
          >
            New 📁 -
          </button>
          <div className="relative flex w-56 h-8 mb-3 items-center">
            <div className="absolute ml-2 mr-1 text-2xl">📁</div>
            <input className="grow pl-9 pr-2 py-1 rounded-lg border border-gray-300 outline-none" />
          </div>
        </div>
        <h3 className="pt-1 text-xl flex items-center cursor-pointer">
          📁 전체
        </h3>
        <div className="pl-4 pt-2">
          <FolderItem />
          <FolderItem />
        </div>
      </div>
    </div>
  );
};

export default Folder;
