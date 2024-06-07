import "./../../styles/fonts/font.css";
import { useCallback, useState } from "react";
import Btn from "../Btn";
import Modal from "./Modal";

export default function LogoutModal() {
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
          <div className="mt-4 text-3xl text-gray-500">Log out</div>
          <div className="mt-8 text-gray-500 pt-light">
            로그아웃하시겠습니까?
          </div>
          <div className="flex mt-10 mb-14">
            <button className="border boredr-gray-500 text-gray-500 w-28 bg-main-pink/[.3] rounded-xl py-1 mx-4">
              Yes
            </button>
            <button
              onClick={onClickToggleModal}
              className="border boredr-gray-500 text-gray-500 w-28 bg-main-blue rounded-xl py-1 mx-4"
            >
              No
            </button>
          </div>
        </Modal>
      )}
      <div onClick={onClickToggleModal} className="mr-10">
        <Btn label="Log out" />
      </div>
    </section>
  );
}
