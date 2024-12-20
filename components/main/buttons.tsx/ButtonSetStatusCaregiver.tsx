"use client";

import React from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { setCuidadorStatus } from "@/actions/cuidador/cuidador.actions";

const ButtonSetStatusCaregiver = ({
  id,
  children,
  status,
}: {
  id: number;
  children: React.ReactNode;
  status: string;
}) => {
  const initialState = { error: false, message: "", submitting: false };

  const [formState, formAction] = useFormState(
    async () => {
      const response = await setCuidadorStatus(id, status);

      if (!response.error) {
        toast.success(response.message || "Status atualizado com sucesso!");
      } else {
        toast.error(response.message || "Erro ao atualizar status.");
      }

      return response;
    },
    initialState
  );

  return (
    <form action={formAction}>
      <button type="submit" disabled={formState.submitting}>
        {formState.submitting ? "Carregando..." : children}
      </button>
    </form>
  );
};

export default ButtonSetStatusCaregiver;
