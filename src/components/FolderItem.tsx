import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import folder_icon from "./../assets/folder.svg";
import chevron_up from "./../assets/chevron/chevron_up.svg";
import chevron_down from "./../assets/chevron/chevron_down.svg";
import { INote } from "./../data/dummyData"; // 인터페이스를 가져옴

interface Folder {
  id: number;
  name: string;
}

interface FolderItemProps {
  folder: Folder;
  notes: INote[];
}

const FolderItem: React.FC<FolderItemProps> = ({ folder, notes }) => {
  const nav = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const toggleVisibility = () => {
    setIsOpen(!isOpen);
  };

  const folderNotes = notes.filter((note) => note.folderId === folder.id);

  return (
    <div>
      <h3 className="text-lg flex items-center cursor-pointer mb-1">
        <img className="w-5 mx-1" src={folder_icon} />
        {folder.name}
        <img
          className="w-5"
          onClick={toggleVisibility}
          src={isOpen ? chevron_up : chevron_down}
        />
      </h3>
      {isOpen && (
        <ul className="ml-6 mt-1 mb-3" onClick={() => nav("/note/:id")}>
          {folderNotes.map((note) => (
            <Li key={note.id} onClick={() => nav(`/note/${note.id}`)}>
              <span>{note.date} </span>
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
  color: #676767;
  cursor: pointer;
`;

export default FolderItem;
