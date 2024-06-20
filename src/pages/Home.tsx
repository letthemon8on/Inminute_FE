import Intro from "../components/Intro";
import LoginModal from "../components/modal/LoginModal";

const Home: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-white to-main-dark-blue flex flex-col w-full h-[5000px] min-h-screen">
      <LoginModal />
      <Intro />
    </div>
  );
};

export default Home;
