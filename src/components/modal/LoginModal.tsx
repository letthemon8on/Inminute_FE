import "./../../styles/fonts/font.css";
import { useCallback, useState } from "react";
import kakao from "../../assets/kakao.svg";
import naver from "../../assets/naver.svg";
import google from "../../assets/google.svg";
import Btn from "../Btn";
import Modal from "./Modal";

export default function LoginModal() {
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
          <div className="mt-4 text-3xl text-gray-500">Log in</div>
          <div className="flex mt-12">
            <button className="mx-2">
              <img className="object-fill h-14 w-14" src={kakao} />
            </button>
            <button className="mx-2">
              <img className="object-fill h-14 w-14" src={naver} />
            </button>
            <button className="mx-2">
              <img className="object-fill h-14 w-14" src={google} />
            </button>
          </div>
          <div className="flex mt-8 mb-12 text-sm text-main-pink/[.7] cursor-pointer underline decoration-solid">
            <div className="mx-2 hover:text-main-pink">서비스 이용약관</div>
            <div className="mx-2 hover:text-main-pink">개인정보 처리방침</div>
          </div>
        </Modal>
      )}
      <div
        onClick={onClickToggleModal}
        className="z-10 fixed h-16 flex justify-end w-full items-center my-1 right-10"
      >
        <Btn label="Log in" />
      </div>
    </section>
  );
}
