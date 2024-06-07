import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const FolderItem: React.FC = () => {
  const nav = useNavigate();
  return (
    <div>
      <h3 className="text-xl flex items-center cursor-pointer">
        📁 학교<span className="ml-2">^</span>
      </h3>
      <ul className="ml-6 mt-1 mb-4" onClick={() => nav("/note/:id")}>
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
