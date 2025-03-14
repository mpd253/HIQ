import Image from "next/image";

import info from "@/assets/icons/info.svg";
import { useRouter } from "next/navigation";
import Modal from "../Modal";

export default function LeaveGameModal({
  setIsClose,
}: {
  setIsClose: (val: boolean) => void;
}) {
  const router = useRouter();

  return (
    <Modal
      title={"나가기"}
      width={"xl:w-[788px] md:w-[60%] w-[80%]"}
      height={"h-[268px]"}
      setIsClose={setIsClose}
      setIsComplete={() => router.push("/lobby")}
    >
      <div className="flex items-center justify-center text-2xl bg-[var(--color-point)] w-[707px] h-[96px] rounded-xl z-80">
        <Image src={info} alt="경고 아이콘" className="2xl:h-32" />
        <div className="text-white">게임에서 나가시겠습니까 ?</div>
      </div>
    </Modal>
  );
}
