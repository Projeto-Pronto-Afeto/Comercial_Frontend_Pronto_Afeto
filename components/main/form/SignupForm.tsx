"use client";
import z from "zod";
import { Form } from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { signUpFormSchema } from "@/lib/validation";
import CustomFormField, { FormFieldType } from "../inputs/CustomFormField";

const SignUpForm = () => {
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
  });
  const {
    watch,

    handleSubmit,

    formState: { isSubmitting },
  } = form;

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  async function onSubmit(data: z.infer<typeof signUpFormSchema>) {
    console.log(data);
  }

  return (
    <div>
      <div className="space-y-6">
        <p className="text-sm text-slate-400 uppercase font-bold">
          Pronto afeto
        </p>
        <div className="flex gap-2">
          <h1 className="text-black font-bold text-5xl">Crie uma nova conta</h1>
          <div className="bg-purple-600 h-3 w-3 rounded-full mt-8"></div>
        </div>
        <p>
          Já possui uma conta?{" "}
          <Link className="text-purple-400" href={"/sign-up"}>
            Fazer login
          </Link>
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col pt-16 gap-5"
        >
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="nomeCompleto"
            placeholder="Nome Completo"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            placeholder="Email"
            iconSrc="/assets/icons/mail.svg"
            iconAlt="user"
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="password"
            placeholder="Senha"
            iconAlt="user"
            type="password"
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="confirmPassword"
            placeholder="Confirme sua senha"
            iconAlt="user"
            type="password"
          />
          {password !== confirmPassword && confirmPassword && (
            <p className="text-xs text-red-500">As senhas não conferem</p>
          )}

          <Button className="bg-purple-500 text-white hover:bg-gradient-to-r hover:from-purple-400 hover:to-purple-600">
            Criar conta
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignUpForm;
