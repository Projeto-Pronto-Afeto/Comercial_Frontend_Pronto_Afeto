import { setCuidadorStatus } from "@/actions/cuidador/cuidador.actions";
import React from "react";
import { TbBookmarkPlus, TbBookmarksFilled } from "react-icons/tb";

const ButtonSetStatusCaregiver = ({
  id,
  children,
  status,
}: {
  id: number;
  children: React.ReactNode;
  status: string;
}) => {
  return (
    <form
      className=""
      action={async () => {
        "use server";
        setCuidadorStatus(id, "Aprovado");
      }}
    >
      <button type="submit">{children}</button>
    </form>
  );
};

export default ButtonSetStatusCaregiver;
