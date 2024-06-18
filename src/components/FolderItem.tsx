import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import folder_icon from "./../assets/folder.svg";
import chevron_up from "./../assets/chevron/chevron_up.svg";
import chevron_down from "./../assets/chevron/chevron_down.svg";
import ellipsis from "./../assets/ellipsis_horizontal.svg";
import pencil from "./../assets/pencil.svg";
import trash from "./../assets/trash.svg";
import { INote } from "./../data/dummyData";
import { useFolderContext } from "./../context/FolderContext";

interface FolderItemProps {
  folder: {
    id: number;
    name: string;
  };
  notes: INote[];
}

const FolderItem: React.FC<FolderItemProps> = ({ folder, notes }) => {
  const { addFolder } = useFolderContext();
  const [isFolderOpen, setIsFolderOpen] = useState(true);
  const [isHover, setIsHover] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newFolderName, setNewFolderName] = useState(folder.name);
  const inputRef = useRef<HTMLInputElement>(null);
  const nav = useNavigate();

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleFolderToggle = () => {
    setIsFolderOpen(!isFolderOpen);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleRenameFolder = () => {
    setIsEditing(true);
    setIsMenuOpen(false);
  };

  const handleSaveRename = () => {
    addFolder(folder.id, newFolderName); // 폴더 이름 업데이트
    setIsEditing(false);
  };

  const handleDeleteFolder = () => {
    // Delete the folder (API call or context update)
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSaveRename();
    }
  };

  const folderNotes = notes.filter((note) => note.folderId === folder.id);

  return (
    <div>
      <h3
        className="hover:bg-gray-200 rounded-md text-lg flex items-center cursor-pointer mb-1"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <img className="w-5 mx-1" src={folder_icon} />
        {isEditing ? (
          <input
            className="rounded-md outline-none"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            onBlur={handleSaveRename}
            onKeyDown={handleKeyDown}
            ref={inputRef}
          />
        ) : (
          folder.name
        )}
        <img
          className="w-5"
          onClick={handleFolderToggle}
          src={isFolderOpen ? chevron_up : chevron_down}
        />
        {isHover && (
          <img
            className="w-5 ml-32"
            src={ellipsis}
            onClick={handleMenuToggle}
          />
        )}
      </h3>
      {isMenuOpen && (
        <div className="relative">
          <div className="absolute right-0 w-20 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="flex">
              <img
                className="w-10 px-2 py-2 hover:bg-gray-100"
                src={pencil}
                onClick={handleRenameFolder}
              />
              <img
                className="w-10 px-2 py-2 hover:bg-gray-100"
                src={trash}
                onClick={handleDeleteFolder}
              />
            </div>
          </div>
        </div>
      )}
      {isFolderOpen && (
        <ul className="ml-6 mt-1 mb-3">
          {folderNotes.map((note) => (
            <Li key={note.id} onClick={() => nav(`/note/${note.id}`)}>
              <span>{note.date} </span>
              <span className="pt-light">{note.title}</span>
            </Li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Li = styled.li`
  padding: 1px 0;
  font-size: 1.125rem;
  padding: 0 2px;
  color: #676767;
  cursor: pointer;
  &:hover {
    background-color: rgb(229 231 235);
    border-radius: 0.375rem;
  }
`;

export default FolderItem;
