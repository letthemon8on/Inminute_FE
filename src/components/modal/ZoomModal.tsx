import "./../../styles/fonts/font.css";
import Modal from "./Modal";
import x from "./../../assets/x.svg";
import { useAppContext } from "../../context/AppContext";

interface ZoomModalProps {
  noteId: number;
  onClose: () => void;
}

const ZoomModal: React.FC<ZoomModalProps> = ({ noteId, onClose }) => {
  const { addZoom } = useAppContext();

  const handleAddZoom = async () => {
    await addZoom({ noteId });
    onClose();
  };

  return (
    <section>
      <Modal onClickToggleModal={onClose}>
        <div
          onClick={onClose}
          className="cursor-pointer absolute right-6 top-6 text-gray-500"
        >
          <img className="w-5" src={x} />
        </div>
        <img className="w-14 mt-16" src="/favicon.svg" />
        <div className="mt-4 text-3xl text-gray-500">Create Zoom Meeting</div>
        <section className="w-72 mt-8">
          <div className="text-gray-500 text-md mb-4 text-center">
            Zoom에서 <span className="text-pink-300">로그인</span>을 완료하신 후
            <br />
            Zoom <span className="text-pink-300">회의 생성</span>이 가능합니다.
            <br />
            <br />
            Zoom 회의를 생성하시겠습니까?
          </div>
        </section>
        <div className="flex mt-10 mb-16">
          <button
            className="border border-gray-200 text-gray-500 w-32 h-9 bg-main-pink/[.3] rounded-xl py-1 mx-4"
            onClick={handleAddZoom}
          >
            Yes
          </button>
          <button
            className="border border-gray-200 text-gray-500 w-32 h-9 bg-main-pink/[.3] rounded-xl py-1 mx-4"
            onClick={onClose}
          >
            No
          </button>
        </div>
      </Modal>
    </section>
  );
};

export default ZoomModal;
