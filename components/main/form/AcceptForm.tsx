"use client";
import React, { useEffect } from "react";
import ServerCustomField, { FormFieldType } from "../inputs/ServerCustomField";
import { useFormState } from "react-dom";
import { Button } from "../../ui/button";
import { acceptProposal } from "@/actions/prposta/proposta.actions";
import { toast } from "sonner";

const AcceptForm = ({ proposalId }: { proposalId: number }) => {
  const initialState: any = { errors: {}, message: "", error: false };

  const [formState, formAction] = useFormState(acceptProposal, initialState);

  useEffect(() => {
    console.log("🚀 ~ formState.error", formState.error);
    if (formState) {
      if (
        !formState.error &&
        formState.message === "Proposta aceita com sucesso"
      ) {
        toast.success(formState.message);
      } else if (formState.message) {
        toast.error(formState.message);
      }
    }
  }, [formState.error, formState.message, formState]);
  return (
    <form action={formAction} className="flex flex-col gap-5">
      <input type="hidden" name="id" value={proposalId} />
      <ServerCustomField
        fieldType={FormFieldType.INPUT}
        errors={formState?.errors?.valor}
        name="valor"
        step="0.01"
        type="number"
        placeholder="Valor da Proposta"
        iconSrc="/assets/icons/dollar.svg"
        iconAlt="user"
      />

      <ServerCustomField
        errors={formState?.errors?.observacoes}
        fieldType={FormFieldType.TEXTAREA}
        name="observacoes"
        placeholder="Observações relevantes sobre a proposta"
        iconAlt="user"
        type="password"
      />
      <Button className="  bg-purple-500 text-white hover:bg-gradient-to-r hover:from-purple-400 hover:to-purple-600">
        Aprovar
      </Button>
    </form>
  );
};

export default AcceptForm;
