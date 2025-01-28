"use client";
import { Form, FormControl } from "@/components/ui/form";
import { cuidadorSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomFormField, { FormFieldType } from "../inputs/CustomFormField";
import { SelectItem } from "@/components/ui/select";
import {
  CivilStates,
  Escolaridade,
  escolaridadeLabels,
  Experiencias,
  Habilidades,
} from "@/constants";
import GridCustomField from "../inputs/GridCustomField";

import {
  convertHabilitiesToOptions,
  convertPatologiasToOptions,
  convertToOptions,
} from "@/lib/utils";
import MultiSelect from "@/components/ui/multiselect";
import ImageUpload from "../inputs/ImageUpload";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { TbLoader } from "react-icons/tb";

const RegisterCaregiverForm = ({
  patologias,
  habilidades,
}: {
  patologias: Patology[];
  habilidades: Hability[];
}) => {
  const [isPending, setIsPending] = React.useState(false);
  const form = useForm<z.infer<typeof cuidadorSchema>>({
    resolver: zodResolver(cuidadorSchema),
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof cuidadorSchema>) {
    setIsPending(true);
    const image = form.getValues("image") as File;
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const cuidador = {
      nome: values.nome,
      nomeApresentacao: values.nomeApresentacao,
      telefone: values.telefone,
      dataNascimento: values.dataNascimento,
      rg: values.rg,
      cpf: values.cpf,
      rua: values.rua,
      numero: values.numero,
      bairro: values.bairro,
      complemento: values.complemento,
      cep: values.cep,
      cidade: values.cidade,
      estado: values.estado,
      nomePai: values.nomePai,
      nomeMae: values.nomeMae,
      peso: values.peso,
      altura: values.altura,
      escolaridade: values.escolaridade,
      apresentacao: values.apresentacao,
      titulacao: values.titulacao,
      tempoExperiencia: values.tempoExperiencia,

      habilidades: values.habilidades,

      experiencias: values.experiencias,
    };

    console.log(cuidador);

    const formData = new FormData();
    formData.append(
      "cuidador",
      new Blob([JSON.stringify(cuidador)], { type: "application/json" })
    );
    formData.append("image", image);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/cuidadores/v1`,
      {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (response.ok) {
      toast.success("Cuidador cadastrado com sucesso!");
    } else {
      const error = await response.json();

      toast.error(error.message);
    }

    setIsPending(false);
  }
  return (
    <Form {...form}>
      <div className=" text-start ">
        <section className="space-y-4">
          <h1 className="header">Olá Cuidador 👋</h1>
          <p className="text-balck/60 text-sm">
            Faça seu cadastro para começar a cuidar de pessoas que precisam de
            você.
          </p>
        </section>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-12 py-10"
        >
          <section className="relative space-y-6">
            <div>
              <h2 className="sub-header ">Informações Pessoais</h2>
            </div>
            <GridCustomField
              field={"Foto"}
              description={
                "Insira sua melhor foto. As pessoas gostam de ver quem está cuidando delas."
              }
              children={
                <CustomFormField
                  fieldType={FormFieldType.SKELETON}
                  control={form.control}
                  name="image"
                  renderSkeleton={(field) => (
                    <FormControl>
                      <ImageUpload setValue={form.setValue} />
                    </FormControl>
                  )}
                />
              }
            />
            <GridCustomField
              field={"Nome Completo"}
              description={"Insira seu nome completo"}
              children={
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="nome"
                  placeholder="Luana Costa Vieira"
                  iconSrc="/assets/icons/user.svg"
                  iconAlt="user"
                />
              }
            />
            <GridCustomField
              field="Apelido"
              description="Insira seu apelido"
              children={
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="nomeApresentacao"
                  placeholder="Luna"
                  iconSrc="/assets/icons/user.svg"
                  iconAlt="user"
                />
              }
            />
            <GridCustomField
              field="Telefone"
              description="Insira seu número de telefone"
              children={
                <CustomFormField
                  fieldType={FormFieldType.PHONE_INPUT}
                  control={form.control}
                  name="telefone"
                  placeholder="(555) 123-4567"
                />
              }
            />
            <GridCustomField
              field={"Data de Nascimento"}
              description={"Insira sua data de nascimento"}
              children={
                <CustomFormField
                  fieldType={FormFieldType.DATE_PICKER}
                  control={form.control}
                  name="dataNascimento"
                />
              }
            />

            <GridCustomField
              field={"RG"}
              description={"Insira seu RG"}
              children={
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="rg"
                  placeholder="123456789"
                />
              }
            />
            <GridCustomField
              field={"CPF"}
              description={"Insira seu CPF"}
              children={
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="cpf"
                  placeholder="123.456.789-10"
                />
              }
            />

            <GridCustomField
              field={"Nome do pai"}
              description={"Insira o nome completo do seu pai"}
              children={
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="nomePai"
                  placeholder="João Lucas Vieira"
                  iconSrc="/assets/icons/user.svg"
                  iconAlt="user"
                />
              }
            />
            <GridCustomField
              field={"Nome da mãe"}
              description={"Insira o nome completo da sua mãe"}
              children={
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="nomeMae"
                  placeholder="Julia Costa Vieira"
                  iconSrc="/assets/icons/user.svg"
                  iconAlt="user"
                />
              }
            />
            <GridCustomField
              field="Peso"
              description="Insira seu peso"
              children={
                <CustomFormField
                  type="number"
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="peso"
                  placeholder=""
                />
              }
            />
            <GridCustomField
              field="Altura"
              description="Insira sua altura"
              children={
                <CustomFormField
                  type="number"
                  step="0.00"
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="altura"
                  placeholder=""
                />
              }
            />
          </section>
          <section className="space-y-6">
            <div>
              <h2 className="sub-header">Experiência </h2>
            </div>
            <GridCustomField
              field="Escolaridade"
              description="Qual sua escolaridade atual?"
              children={
                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  control={form.control}
                  name="escolaridade"
                >
                  {Escolaridade.map((type, i) => (
                    <SelectItem key={type + i} value={type}>
                      {escolaridadeLabels[
                        type as keyof typeof escolaridadeLabels
                      ] || type}
                    </SelectItem>
                  ))}
                </CustomFormField>
              }
            />
            <GridCustomField
              field={"Titulação"}
              description={"Exemplo: Médico, Enfermeiro, Fisioterapeuta"}
              children={
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="titulacao"
                  placeholder=""
                />
              }
            />
            <GridCustomField
              field="Tempo de Experiência"
              description="Insira seu Tempo de Experiência"
              children={
                <CustomFormField
                  type="number"
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="tempoExperiencia"
                  placeholder=""
                />
              }
            />
            <GridCustomField
              field="Habilidades"
              description="Selecione suas habilidades"
              children={
                <CustomFormField
                  fieldType={FormFieldType.SKELETON}
                  control={form.control}
                  name="habilidades"
                  renderSkeleton={(field) => (
                    <FormControl>
                      <MultiSelect
                        name={field.name}
                        getValues={form.getValues}
                        setValue={form.setValue}
                        options={convertHabilitiesToOptions(habilidades)}
                        placeholder={""}
                      />
                    </FormControl>
                  )}
                />
              }
            />
            <GridCustomField
              field="Experiências"
              description="Selecione suas experiências"
              children={
                <CustomFormField
                  fieldType={FormFieldType.SKELETON}
                  control={form.control}
                  name="experiencias"
                  renderSkeleton={(field) => (
                    <FormControl>
                      <MultiSelect
                        name={field.name}
                        getValues={form.getValues}
                        setValue={form.setValue}
                        options={convertPatologiasToOptions(patologias)}
                        placeholder={""}
                      />
                    </FormControl>
                  )}
                />
              }
            />

            <GridCustomField
              field={"Apresentação"}
              description={"Capriche na sua apresentação! 😊"}
              children={
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  control={form.control}
                  name="apresentacao"
                  placeholder=""
                />
              }
            />
          </section>

          <section className="space-y-6">
            <div className="mb-9 space-y-1">
              <h2 className="sub-header">Endereço</h2>
            </div>

            <GridCustomField
              field="CEP"
              description="Insira o CEP"
              children={
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="cep"
                />
              }
            />

            <GridCustomField
              field="Estado"
              description="Insira o estado"
              children={
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="estado"
                />
              }
            />

            <div className="flex flex-col gap-6 xl:flex-row">
              <GridCustomField
                field="Cidade"
                description="Insira a cidade"
                children={
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="cidade"
                  />
                }
              />

              <GridCustomField
                field="Bairro"
                description="Insira o bairro"
                children={
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="bairro"
                  />
                }
              />
            </div>

            <GridCustomField
              field="Rua"
              description="Insira a rua"
              children={
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="rua"
                />
              }
            />

            <GridCustomField
              field="Número"
              description="Insira o número"
              children={
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="numero"
                />
              }
            />

            <GridCustomField
              field="Complemento"
              description="Insira o complemento"
              children={
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="complemento"
                />
              }
            />
          </section>
          <Button
            disabled={isPending}
            className="bg-black hover:gb-black/60 text-white w-full"
            type="submit"
          >
            {isPending ? <TbLoader /> : "Finalizar Cadastro"}
          </Button>
        </form>
      </div>
    </Form>
  );
};

export default RegisterCaregiverForm;
