"use client";
import { DialogHeader } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React, { useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import ServerCustomField, { FormFieldType } from "../inputs/ServerCustomField";
import { useFormState } from "react-dom";
import {
  createComercialUser,
  State,
} from "@/actions/comercial/comercial.actions";
import ImageUpload from "../inputs/ImageUpload";
import { Button } from "@/components/ui/button";

const FormCreateUser = () => {
  const initialState: State = { errors: {}, message: "", error: false };

  const [formState, formAction] = useFormState(
    createComercialUser,
    initialState
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <form className="pb-8" action={formAction}>
      <DialogHeader className="bg-gradient-to-bl from-[#ffe4e6]  to-[#ccfbf1] relative rounded-3xl">
        <div className="h-20"></div>
        <div className="px-6">
          <ImageUpload />
        </div>
      </DialogHeader>
      <div className="px-6 py-10">
        <p className="text-lg font-semibold">{name || "Nome de Usuário"}</p>
        <span className="text-black/60 text-sm">
          {email || "example@gmail.com"}
        </span>
      </div>

      <section id="form-create-user" className="px-6 space-y-10">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-2 ">
          <Label className="col-span-1" htmlFor="name">
            Nome
          </Label>
          <ServerCustomField
            fieldType={FormFieldType.INPUT}
            errors={formState?.errors?.nome}
            name="nome"
            placeholder="Nome"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
            value={name} // Conecta o estado ao campo
            onChange={(e) => setName(e)} // Atualiza o estado
          />
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-2 ">
          <Label className="col-span-1" htmlFor="name">
            Email
          </Label>
          <ServerCustomField
            fieldType={FormFieldType.INPUT}
            errors={formState?.errors?.email}
            name="email"
            placeholder="example@hotmmai.com"
            iconSrc="/assets/icons/mail.svg"
            iconAlt="mail"
            value={email} // Conecta o estado ao campo
            onChange={(e) => setEmail(e)} // Atualiza o estado
          />
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-2 ">
          <Label className="col-span-1" htmlFor="tel">
            Telefone
          </Label>
          <ServerCustomField
            fieldType={FormFieldType.INPUT}
            errors={formState?.errors?.telefone}
            name="telefone"
            placeholder=""
          />
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-2 ">
          <Label className="col-span-1" htmlFor="tel">
            Senha
          </Label>
          <ServerCustomField
            fieldType={FormFieldType.INPUT}
            type="password"
            errors={formState?.errors?.password}
            name="password"
            placeholder=""
          />
        </div>

        <div className="flex gap-4 justify-end">
          <DialogPrimitive.Close asChild>
            <Button type="button" variant={"outline"}>
              Cancelar
            </Button>
          </DialogPrimitive.Close>
          <Button
            className="bg-black hover:bg-black/80 text-white "
            type="submit"
          >
            Adicionar
          </Button>
        </div>
      </section>
    </form>
  );
};

export default FormCreateUser;
