"use client";
import { useEffect, useRef, useState } from "react";
import GameControlButtons from "../GameControlButtons";
import close from "@/assets/icons/close.svg";
import Image from "next/image";
import { sendMessage } from "../../service/api/socketConnection";
import { useSearchParams } from "next/navigation";
import { quizeMsg } from "../../types/quize";

export default function OXFooter({ chat }: { chat: quizeMsg[] }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const lastMessageRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const onkeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (inputRef.current) {
        sendMessage(`/app/game/${id}`, inputRef.current.value);
        inputRef.current.value = "";
      }
    }
  };

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat.length, isOpen]);

  return (
    <>
      <div
        className="
        flex w-full items-center drop-shadow-custom 
        2xl:gap-5 md:gap-3 gap-2 
        mt-3 p-3 bg-[var(--color-point)] rounded-b-xl"
      >
        {isOpen && (
          <div
            className={`
            absolute w-full bottom-18 2xl:bottom-23 left-0 
            bg-[var(--color-point)]/90 h-[200%] z-20 overflow-auto overflow-x-hidden font-white
            rounded-t-2xl p-7 pr-10
          `}
          >
            <Image
              src={close}
              alt="닫기 아이콘"
              className="fixed right-4 -top-40 2xl:w-6 2xl:h-6 w-4 h-4 cursor-pointer hover:opacity-70"
              onClick={() => setIsOpen(false)}
            />
            <div>
              {chat.map((item, index) => (
                <p
                  key={index}
                  ref={
                    index === chat.length - 1 || isOpen ? lastMessageRef : null
                  }
                >
                  <span className="font-bold">{item.sender} : </span>
                  {item.message}
                </p>
              ))}
            </div>
          </div>
        )}

        <div
          className="
            flex-3 min-w-0 bg-[#D9D9D9] 
            py-2 md:py-4 2xl:py-4 2xl:rounded-[20px] rounded-[12px]"
        >
          <div className="text-2xl">
            <input
              ref={inputRef}
              className="w-full focus:outline-none text-black placeholder:text-gray-500 pl-7 placeholder:text-[20px] text-[1rem]"
              placeholder="메시지를 입력하세요..."
              onClick={() => setIsOpen(true)}
              onKeyDown={onkeydown}
            />
          </div>
        </div>

        <div className="flex-1">
          <GameControlButtons />
        </div>
      </div>
    </>
  );
}
