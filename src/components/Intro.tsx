import bigLogo from "../assets/big_logo_transparent.svg";
import favicon from "/favicon.svg";

const Intro: React.FC = () => {
  return (
    <>
      <div className="flex justify-center mt-20 mb-4">
        <img src={bigLogo} alt="Big Logo" className="w-[450px]" />
      </div>
      <div className="flex justify-center my-12">
        <img src={favicon} alt="favicon" className="w-32" />
      </div>
      <p className="flex justify-center mt-52 text-3xl">
        온라인 미팅에서 회의록을 따로 적기 불편했나요?
      </p>
    </>
  );
};

export default Intro;
