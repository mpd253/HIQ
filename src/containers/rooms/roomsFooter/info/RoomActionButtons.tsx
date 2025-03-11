"use client";

import Image from "next/image";
import info from "@/assets/icons/info.svg";
import { useState } from "react";

import { sendMessage } from "../../../../service/api/socketConnection";
import { useParams } from "next/navigation";
import { useIsRoomStore } from "../../../../store/roomStore";
import Modal from "../../../../components/Modal";

export default function RoomActionButtons() {
  const params = useParams();

  const { isHost, isAllReady } = useIsRoomStore();
  const [ready, setReady] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const sendReadyState = () => {
    setReady((prev) => !prev);
    sendMessage(`/app/room/${params.id}/event`, "PLAYER_CHANGE_READY");
  };

  const sendStartGame = () => {
    if (isAllReady) {
      setIsOpenModal(false);
      sendMessage(`/app/room/${params.id}/event`, "SWITCHING_ROOM_TO_GAME");
    } else {
      setIsOpenModal(true);
    }
  };

  return (
    <div className="flex md:text-xl xl:text-3xl text-[10px] cursor-pointer break-keep text-white">
      {isHost ? (
        <button
          onClick={sendStartGame}
          className="
          flex-1 
          bg-[#4C3BCF] hover:bg-[var(--color-point-hover)]
          xl:py-8 py-5
          xl:rounded-[20px] md:rounded-[12px] rounded-[8px]
          cursor-pointer p-2 mr-3"
        >
          시 작
        </button>
      ) : (
        <>
          <button
            onClick={sendReadyState}
            className={`flex-1 
    ${
      ready
        ? "bg-[var(--color-second)] hover:bg-[var(--color-second-hover)]"
        : "bg-[var(--color-amberOrange)] hover:bg-[var(--color-amberOrange-hover)]"
    }
    xl:rounded-[20px] md:rounded-[12px] rounded-[8px]
    xl:py-8 py-2
    cursor-pointer p-2 mr-3 2xl:relative group`}
          >
            <span className="relative z-10">
              {ready ? "준비 완료" : "준비"}
            </span>
          </button>
        </>
      )}

      {isOpenModal && (
        <Modal
          title={"알림창"}
          width={"xl:w-[788px] md:w-[60%] w-[80%]"}
          height={"h-[268px]"}
          showCancelButton={"hidden"}
          setIsComplete={() => setIsOpenModal(false)}
        >
          <div
            className="
          flex items-center justify-center bg-[var(--color-point)] rounded-xl text-white 
          xl:text-xl text-md 
          xl:w-[707px] w-[80%] h-[96px] "
          >
            <Image src={info} alt="경고 아이콘" className="xl:h-32 h-16" />
            <div> 모든 사용자가 준비를 완료해야 합니다.</div>
          </div>
        </Modal>
      )}
    </div>
  );
}
