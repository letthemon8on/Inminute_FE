import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import folder_icon from "./../assets/folder.svg";
import chevron_up from "./../assets/chevron/chevron_up.svg";
import chevron_down from "./../assets/chevron/chevron_down.svg";
import { INote } from "./../data/dummyData"; // 인터페이스를 가져옴

interface FolderItemProps {
  folder: {
    id: number;
    name: string;
  };
  notes: INote[];
}

const FolderItem: React.FC<FolderItemProps> = ({ folder, notes }) => {
  const [isOpen, setIsOpen] = useState(true);
  const nav = useNavigate();

  const toggleVisibility = () => {
    setIsOpen(!isOpen);
  };

  const folderNotes = notes.filter((note) => note.folderId === folder.id);

  return (
    <div>
      <h3 className="hover:bg-gray-200 rounded-md text-lg flex items-center cursor-pointer mb-1">
        <img className="w-5 mx-1" src={folder_icon} />
        {folder.name}
        <img
          className="w-5"
          onClick={toggleVisibility}
          src={isOpen ? chevron_up : chevron_down}
        />
      </h3>
      {isOpen && (
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
