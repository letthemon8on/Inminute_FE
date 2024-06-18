import "./../../styles/fonts/font.css";
import Modal from "./Modal";
import x from "./../../assets/x.svg";
import { useAppContext } from "../../context/AppContext";

interface DeleteFolderModalProps {
  folderId: number;
  onClose: () => void;
}

const DeleteFolderModal: React.FC<DeleteFolderModalProps> = ({
  folderId,
  onClose,
}) => {
  const { deleteFolder } = useAppContext();

  const handleDeleteFolder = () => {
    deleteFolder(folderId);
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
        <div className="mt-4 text-3xl text-gray-500">Delete Folder</div>
        <section className="w-72 mt-8">
          <div className="text-gray-500 text-md mb-4 text-center">
            정말 폴더를 삭제하시겠습니까?
            <br /> 폴더 내부에 있는{" "}
            <span className="text-pink-300">노트들도 삭제</span>됩니다.
          </div>
        </section>
        <div className="flex mt-10 mb-16">
          <button
            className="border border-gray-200 text-gray-500 w-32 h-9 bg-main-pink/[.3] rounded-xl py-1 mx-4"
            onClick={handleDeleteFolder}
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

export default DeleteFolderModal;
