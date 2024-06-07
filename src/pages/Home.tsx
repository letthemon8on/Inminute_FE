import { useNavigate } from "react-router-dom";
import Intro from "../components/Intro";
import Btn from "../components/Btn";

const Home: React.FC = () => {
  const nav = useNavigate();

  return (
    <div className="bg-gradient-to-b from-white to-main-dark-blue flex flex-col w-full h-[5000px] min-h-screen">
      <div className="fixed h-16 flex justify-end w-full items-center my-1">
        <Btn label="Login" />
      </div>
      <Intro />

      {/* 추후 삭제 */}
      <div className="flex justify-center mt-8" onClick={() => nav(-1)}>
        <Btn label="list" />
      </div>
    </div>
  );
};

export default Home;
