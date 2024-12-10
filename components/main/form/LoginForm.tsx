"use client";

import Link from "next/link";
import React, { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { useFormState } from "react-dom";
import { login, State } from "@/actions/auth/auth.actions";
import ServerCustomField, { FormFieldType } from "../inputs/ServerCustomField";
import { TbBrandBackbone, TbCarambola } from "react-icons/tb";

const LoginForm = () => {
  const initialState: State = { errors: {}, message: "", error: false };

  const [formState, formAction] = useFormState(login, initialState);

  useEffect(() => {
    console.log("🚀 ~ formState.error", formState.error);
    if (formState) {
      if (
        !formState.error &&
        formState.message === "Login efetuado com sucesso"
      ) {
        console.log("🚀 ~ formState.error logando");
        window.location.href = "/home";
      } else {
        toast.error(formState.message);
      }
    }
  }, [formState.error, formState.message, formState]); // Dependências específicas

  return (
    <div>
      <section className="space-y-6">
        <TbBrandBackbone className="text-3xl mx-auto" />
        <div className="justify-center  flex gap-2">
          <h1 className="text-black font-bold text-3xl">Entre com sua conta</h1>
        </div>
        <p className="text-sm text-center">
          Por favor, informe suas credenciais para acessar o sistema comercial
        </p>
      </section>

      <form action={formAction} className="flex flex-col pt-16 gap-5">
        <ServerCustomField
          fieldType={FormFieldType.INPUT}
          errors={formState?.errors?.email}
          name="email"
          placeholder="Email"
          iconSrc="/assets/icons/mail.svg"
          iconAlt="user"
        />
        <ServerCustomField
          errors={formState?.errors?.password}
          fieldType={FormFieldType.INPUT}
          name="password"
          placeholder="Senha"
          iconAlt="user"
          type="password"
        />
        <Button className="bg-purple hover:bg-[#4e22c7] text-white">
          Entrar
        </Button>
      </form>
    </div>
  );
};
export default LoginForm;
