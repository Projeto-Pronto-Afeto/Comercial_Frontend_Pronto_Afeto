"use client";

import { cuidadorSchema } from "@/lib/validation";
import CustomFormField, { FormFieldType } from "./main/inputs/CustomFormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { SelectItem } from "@radix-ui/react-select";
import { useState } from "react";

export function SignupForm() {
  const form = useForm<z.infer<typeof cuidadorSchema>>({
    resolver: zodResolver(cuidadorSchema),
  });

  const { handleSubmit, control } = form;
  const [imageFile, setImageFile] = useState<File | null>(null);

  const Escolaridades = ["NÍVEL_MÉDIO", "NÍVEL_SUPERIOR", "Viúvo(a)"];


  const onSubmit = async (data: z.infer<typeof cuidadorSchema>) => {
    const cuidador = {
      nome: data.nome,
      nomeApresentacao: data.nomeApresentacao,
      telefone: data.telefone,
      rg: data.rg,
      rua: data.rua,
      numero: data.numero,
      bairro: data.bairro,
      complemento: data.complemento,
      cep: data.cep,
      cidade: data.cidade,
      estado: data.estado,
      nomePai: data.nomePai,
      nomeMae: data.nomeMae,
      dataNascimento: data.dataNascimento,
      peso: parseFloat(data.peso.toString()) || 0,
      altura: parseFloat(data.altura.toString()) || 0,
      escolaridade: data.escolaridade || "NÍVEL_MÉDIO",
      titulacao: data.titulacao,
      tempoExperiencia: parseInt(data.tempoExperiencia.toString(), 10) || 0,
      habilidades: [{ nome: data.habilidades }],
      experiencias: [{ nome: data.experiencias }],
      apresentacao: data.apresentacao,
    };

    const formData = new FormData();

    // o objeto cuidador vai como JSON
    formData.append(
      "cuidador",
      new Blob([JSON.stringify(cuidador)], { type: "application/json" })
    );

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await fetch("http://localhost:8080/api/cuidadores/v1", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
      } else {
        const errorData = await response.json();
        console.error("Erro ao enviar dados:", errorData);
        alert(`Erro: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Erro ao conectar com a API:", error);
      alert("Erro ao conectar com a API.");
    }
  };

  return (
    <FormProvider {...form}>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg flex flex-col gap-4">
        <input
          type="file"
          name="image"
          accept="image/*"
          className="border border-gray-300 p-2 m-2"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setImageFile(e.target.files[0]);
            }
          }}
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={control}
          name="nome"
          placeholder="Nome"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={control}
          name="nomeApresentacao"
          placeholder="Nome de Apresentação"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={control}
          name="telefone"
          placeholder="Telefone"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={control}
          name="rg"
          placeholder="RG"
        />
        <fieldset className="border border-gray-300 p-2 m-2 flex flex-col gap-2">
          <legend className="text-sm font-bold">Endereço</legend>
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={control}
            name="rua"
            placeholder="Rua"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={control}
            name="numero"
            placeholder="Número"
            type="number"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={control}
            name="bairro"
            placeholder="Bairro"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={control}
            name="complemento"
            placeholder="Complemento"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={control}
            name="cep"
            placeholder="CEP"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={control}
            name="cidade"
            placeholder="Cidade"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={control}
            name="estado"
            placeholder="Estado"
          />
        </fieldset>
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={control}
          name="nomePai"
          placeholder="Nome do Pai"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={control}
          name="nomeMae"
          placeholder="Nome da Mãe"
        />
        <CustomFormField
          fieldType={FormFieldType.DATE_PICKER}
          control={control}
          name="dataNascimento"
          placeholder="Data de Nascimento"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={control}
          name="peso"
          placeholder="Peso (kg)"
          type="number"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={control}
          name="altura"
          placeholder="Altura (cm)"
          type="number"
        />

        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={control}
          name="escolaridade"
          placeholder="Escolaridade"
        >
          {Escolaridades.map((type, i) => (
            <SelectItem key={type + i} value={type}>
              {type}
            </SelectItem>
          ))}
        </CustomFormField>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={control}
          name="titulacao"
          placeholder="Titulação"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={control}
          name="tempoExperiencia"
          placeholder="Tempo de Experiência"
          type="number"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={control}
          name="habilidades"
          placeholder="Habilidades"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={control}
          name="experiencias"
          placeholder="Experiências"
        />
        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={control}
          name="apresentacao"
          placeholder="Apresentação"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 m-2 rounded hover:bg-blue-600"
        >
          Cadastrar Cuidador
        </button>
      </form>
    </FormProvider>

  );
}
