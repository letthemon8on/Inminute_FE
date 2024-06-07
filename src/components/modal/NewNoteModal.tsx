import "./../../styles/fonts/font.css";
import { useCallback, useState } from "react";
import Modal from "./Modal";

export default function NewNoteModal() {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);

  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  return (
    <section>
      {isOpenModal && (
        <Modal onClickToggleModal={onClickToggleModal}>
          <div
            onClick={onClickToggleModal}
            className="cursor-pointer absolute right-6 top-4 text-gray-500"
          >
            x
          </div>
          <img className="w-14 mt-16" src="/favicon.svg" />
          <div className="mt-4 text-3xl text-gray-500">New Note</div>
          <section className="w-72 mt-8">
            <h4 className="ml-2 text-sm text-gray-400">회의 제목</h4>
            <form className="mb-3">
              <input className="h-9 w-72 rounded-xl border border-gray-200 px-2 outline-none text-gray-500 text-base" />
            </form>

            <h4 className="ml-2 text-sm text-gray-400">Zoom 링크</h4>
            <form className="mb-3">
              <input className="h-9 w-72 rounded-xl border border-gray-200 px-2 outline-none text-gray-500 text-base" />
            </form>

            <h4 className="ml-2 text-sm text-gray-400">폴더</h4>
            <form>
              <select className="h-9 w-72 rounded-xl border border-gray-200 px-2 outline-none text-gray-500">
                <option value="학교">학교</option>
                <option value="동아리">동아리</option>
              </select>
            </form>
          </section>
          <div className="flex mt-10 mb-14">
            <button className="border border-gray-200 text-gray-500 w-72 h-9 bg-main-pink/[.3] rounded-xl py-1 mx-4">
              회의록 생성
            </button>
          </div>
        </Modal>
      )}
      <button
        onClick={onClickToggleModal}
        className="bg-gradient-to-r from-cyan-50 to-pink-50 rounded-2xl w-36 h-11 drop-shadow-lg text-gray-500 text-xl"
      >
        New Note +
      </button>
    </section>
  );
}
