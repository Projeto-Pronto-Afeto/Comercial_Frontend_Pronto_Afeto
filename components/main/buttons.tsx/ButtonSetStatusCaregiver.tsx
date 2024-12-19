"use client";

import React, { useEffect } from "react";
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

  // Gerenciar estado com `useFormState`
  const [formState, formAction] = useFormState(
    async () => {
      const response = await setCuidadorStatus(id, status);
      return response;
    },
    initialState
  );

  // Exibir notificações de sucesso ou erro
  useEffect(() => {
    if (!formState.submitting) {
      if (!formState.error) {
        toast.success(formState.message || "Status atualizado com sucesso!");
      } else {
        toast.error(formState.message || "Erro ao atualizar status.");
      }
    }
  }, [formState]);

  return (
    <form action={formAction}>
      <button type="submit" disabled={formState.submitting}>
        {formState.submitting ? "Carregando..." : children}
      </button>
    </form>
  );
};

export default ButtonSetStatusCaregiver;
