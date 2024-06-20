import "./../../styles/fonts/font.css";
import Modal from "./Modal";
import x from "./../../assets/x.svg";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

interface DeleteNoteModalProps {
  id: number;
  onClose: () => void;
  onClick: () => void;
}

const DeleteNoteModal: React.FC<DeleteNoteModalProps> = ({ id, onClose }) => {
  const { deleteNote } = useAppContext();
  const nav = useNavigate();

  const handleDeleteNote = async () => {
    await deleteNote(id);
    onClose();
    nav("/list");
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
        <div className="mt-4 text-3xl text-gray-500">Delete Note</div>
        <section className="w-72 mt-8">
          <div className="text-gray-500 text-md mb-4 text-center">
            정말 노트를 삭제하시겠습니까?
          </div>
        </section>
        <div className="flex mt-10 mb-16">
          <button
            className="border border-gray-200 text-gray-500 w-32 h-9 bg-main-pink/[.3] rounded-xl py-1 mx-4"
            onClick={handleDeleteNote}
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

export default DeleteNoteModal;
