import "./../../styles/fonts/font.css";
import { useCallback, useState } from "react";
import Modal from "./Modal";
import note from "./../../assets/note.svg";
import plus from "./../../assets/plus.svg";
import x from "./../../assets/x.svg";
import DropDown from "../DropDown";

export default function NewNoteModal() {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState("학교");

  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  const options = [
    { value: "학교", label: "학교" },
    { value: "동아리", label: "동아리" },
  ];

  return (
    <section>
      {isOpenModal && (
        <Modal onClickToggleModal={onClickToggleModal}>
          <div
            onClick={onClickToggleModal}
            className="cursor-pointer absolute right-6 top-6 text-gray-500"
          >
            <img className="w-5" src={x} />
          </div>
          <img className="w-14 mt-16" src="/favicon.svg" />
          <div className="mt-4 text-3xl text-gray-500">New Note</div>
          <section className="w-72 mt-8">
            <h4 className="ml-2 mb-1 text-sm text-gray-400">회의 제목</h4>
            <form className="mb-3">
              <input className="h-9 w-72 rounded-2xl border border-gray-200 px-3 outline-none text-gray-500 text-base" />
            </form>
            <h4 className="ml-2 mb-1 text-sm text-gray-400">폴더</h4>

            <DropDown
              options={options}
              selectedOption={selectedOption}
              onSelect={setSelectedOption}
              width="w-72"
              height="h-9"
              top="top-10"
              py="py-1.5"
            />
          </section>
          <div className="flex mt-10 mb-16">
            <button className="border border-gray-200 text-gray-500 w-72 h-9 bg-main-pink/[.3] rounded-xl py-1 mx-4">
              회의록 생성
            </button>
          </div>
        </Modal>
      )}
      <button
        onClick={onClickToggleModal}
        className="bg-gradient-to-r from-cyan-50 to-pink-50 rounded-2xl w-32 h-11 drop-shadow-lg text-gray-500 text-xl"
      >
        <div className="flex justify-between mx-4">
          <span>New</span> <img className="w-6 ml-1" src={note} />
          <img className="w-5" src={plus} />
        </div>
      </button>
    </section>
  );
}
