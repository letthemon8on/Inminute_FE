import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import folder_icon from "./../assets/folder.svg";
import chevron_up from "./../assets/chevron/chevron_up.svg";
import chevron_down from "./../assets/chevron/chevron_down.svg";
import ellipsis from "./../assets/ellipsis_horizontal.svg";
import pencil from "./../assets/pencil.svg";
import trash from "./../assets/trash.svg";
import { INote } from "./../context/AppContext";
import { useAppContext } from "./../context/AppContext";
import DeleteFolderModal from "./modal/DeleteFolderModal";
import { formatDate } from "../util/date";

interface FolderItemProps {
  folder: {
    id: number;
    name: string;
  };
  notes: INote[];
  onSelectFolder: (folderId: number) => void;
}

const FolderItem: React.FC<FolderItemProps> = ({
  folder,
  notes,
  onSelectFolder,
}) => {
  const { updateFolder, fetchNote } = useAppContext();
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const [folderNotes, setFolderNotes] = useState<INote[]>([]);
  const [isHover, setIsHover] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState(folder.name);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const nav = useNavigate();

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleFolderToggle = async () => {
    setIsFolderOpen(!isFolderOpen);
    if (!isFolderOpen) {
      const fetchedNotes = await fetchNote(folder.id); // 폴더가 열릴 때 노트 데이터를 가져옴
      setFolderNotes(fetchedNotes); // 가져온 노트 데이터를 상태에 저장
    }
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleRenameFolder = () => {
    setIsEditing(true);
    setIsMenuOpen(false);
  };

  const handleSaveRename = async () => {
    await updateFolder(folder.id, newFolderName); // 폴더 이름 업데이트
    setIsEditing(false);
  };

  const handleDeleteFolder = () => {
    setIsDeleteModalOpen(true);
    setIsMenuOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSaveRename();
    }
  };

  // const folderNotes = notes.filter((note) => note.folderId === folder.id);

  return (
    <div>
      <h3
        className="justify-between w-60 hover:bg-gray-200 rounded-md text-lg flex items-center cursor-pointer mb-1"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={() => {
          onSelectFolder(folder.id);
        }} // 폴더 클릭 시 해당 폴더의 list 나옴
      >
        <div className="flex ">
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
        </div>
        {isHover && (
          <img className="w-7 p-1" src={ellipsis} onClick={handleMenuToggle} />
        )}
      </h3>
      {isMenuOpen && (
        <div className="relative">
          <div className="absolute left-40 w-20 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
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
      {isDeleteModalOpen && (
        <DeleteFolderModal
          folderId={folder.id}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}
      {isFolderOpen && (
        <ul className="ml-6 mt-1 mb-3">
          {folderNotes.map((note) => (
            <Li key={note.id} onClick={() => nav(`/note/${note.id}`)}>
              <span>{formatDate(note.createdAt)} </span>
              <span className="pt-light">{note.name}</span>
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
