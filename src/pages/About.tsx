import Intro from "../components/Intro";
import Navbar from "../components/Navbar";

const About: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-white to-main-dark-blue flex flex-col w-full h-[5000px] min-h-screen">
        <Intro />
      </div>
    </>
  );
};

export default About;
