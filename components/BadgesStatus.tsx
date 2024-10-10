import { StatusIcon } from "@/constants";
import clsx from "clsx";
import Image from "next/image";



export const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <div className={clsx("status-badge")}>
      <Image
        src={StatusIcon[status]}
        alt="status icon"
        width={24}
        height={24}
        className="h-fit w-3"
      />
      <p
        className={clsx("text-12-semibold capitalize", {
          "text-green-500": status === "Assinado",
          "text-blue-500": status === "Pendente",
          "text-red-500": status === "Rejeitado",
        })}
      >
        {status}
      </p>
    </div>
  );
};
