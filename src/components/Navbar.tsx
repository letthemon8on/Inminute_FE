import styled from "styled-components";
import logo from "./../assets/logo_transparent.svg";
import { useNavigate } from "react-router-dom";
import Btn from "./Btn";

const Navbar: React.FC = () => {
  const nav = useNavigate();
  const currentPath = window.location.pathname;

  return (
    <NavContainer>
      <NavLeft>
        <div>
          <Logo onClick={() => nav("/")} src={logo} alt="Logo" />
        </div>
        <Lists>
          <List
            onClick={() => nav("/about")}
            className={currentPath === "/about" ? "active" : ""}
          >
            about
          </List>
          <List
            onClick={() => nav("/list")}
            className={currentPath === "/list" ? "active" : ""}
          >
            list
          </List>
        </Lists>
      </NavLeft>
      <Btn label="Log out" />
    </NavContainer>
  );
};

export default Navbar;

const NavContainer = styled.div`
  display: flex;
  background-color: white;
  height: 4.5rem;
  border-bottom: 1px solid #dedede;
  align-items: center;
  justify-content: space-between;
`;

const NavLeft = styled.div`
  display: flex;
`;

const Logo = styled.img`
  margin: 0 2.5rem;
  cursor: pointer;
`;

const Lists = styled.ul`
  display: flex;
`;

const List = styled.li`
  list-style: none;
  font-family: "Pretendard Light";
  margin: auto 2rem;
  text-align: center;
  font-size: 1.25rem;
  padding: 0.3rem 0.3rem; // UX 개선
  cursor: pointer;

  &.active {
    color: #eaa1e3; // 활성화된 리스트 항목의 색상을 핑크로 변경
  }
`;
