import { useNavigate } from "react-router-dom";

const Notfound: React.FC = () => {
  const nav = useNavigate();
  return (
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-b from-white to-main-dark-blue justify-center items-center">
      <div className="flex text-center pt-light text-4xl">
        잘못된 페이지입니다
      </div>
      <button
        className="m-20 bg-white p-2 rounded-lg hover:bg-gray-100 text-md pt-regular"
        onClick={() => {
          nav("/list");
        }}
      >
        list 페이지로 돌아가기
      </button>
    </div>
  );
};

export default Notfound;
