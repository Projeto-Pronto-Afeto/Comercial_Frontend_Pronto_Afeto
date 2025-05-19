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
          "text-green-500": status === "Aprovada",
          'text-green-400': status === "Assinada",
          "text-blue-500":
            status === "Observacao" || status === "Em_Observacao",
          "text-red-500": status === "Negada",
        })}
      >
        {status === "Observacao" || status === "Em_Observacao"
          ? "Observação"
          : status}
      </p>
    </div>
  );
};
