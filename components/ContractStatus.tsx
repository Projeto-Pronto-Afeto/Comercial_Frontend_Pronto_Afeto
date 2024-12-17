import { StatusIcon } from "@/constants";
import clsx from "clsx";
import Image from "next/image";

export const ContractStatus = ({ status }: { status: string }) => {
  return (
    <div className={clsx("status-badge")}>
      {status === "ASSINADO" ? (
        <div className="border-2 rounded-full p-1 border-green-500" />
      ) : (
        <div className="border-2 rounded-full p-1 border-blue-500" />
      )}
      <p
        className={clsx("text-12-semibold capitalize", {
          "text-green-500": status === "ASSINADO",
          "text-blue-500": status === "SOLICITADO",
        })}
      >
        {status}
      </p>
    </div>
  );
};
