import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import folder from "./../assets/folder.svg";
import chevron_up from "./../assets/chevron/chevron_up.svg";
import chevron_down from "./../assets/chevron/chevron_down.svg";

const FolderItem: React.FC = () => {
  const nav = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const toggleVisibility = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <h3 className="text-lg flex items-center cursor-pointer mb-1">
        <img className="w-5 mx-1" src={folder} />
        학교
        <img
          className="w-5"
          onClick={toggleVisibility}
          src={isOpen ? chevron_up : chevron_down}
        />
      </h3>
      {isOpen && (
        <ul className="ml-6 mt-1 mb-3" onClick={() => nav("/note/:id")}>
          <Li>
            <span>240405 </span>
            <span className="pt-light">프로젝트 이름</span>
          </Li>
          <Li>
            <span>240405 </span>
            <span className="pt-light">프로젝트 이름</span>
          </Li>
          <Li>
            <span>240405 </span>
            <span className="pt-light">프로젝트 이름</span>
          </Li>
          <Li>
            <span>240405 </span>
            <span className="pt-light">프로젝트 이름</span>
          </Li>
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
