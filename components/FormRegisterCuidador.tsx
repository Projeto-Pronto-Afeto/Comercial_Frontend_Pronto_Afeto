"use client";

import { useRouter } from "next/navigation";

export function SignupForm() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    //formatar os campos que precisam de colchetes -> enquanto não resolver bug do servidor
    const formatWithBrackets = (fieldName: string) => {
      const value = formData.get(fieldName);
      return value ? `[${value}]` : `[string]`;
    };

    // Ajustar os campos específicos
    formData.set(
      "experiencias",
      JSON.stringify([{ nome: formData.get("experiencias") }])
    );
    formData.set(
      "habilidades",
      JSON.stringify([{ nome: formData.get("habilidades") }])
    );
    formData.set("nome", formatWithBrackets("nome"));
    formData.set("nomeApresentacao", formatWithBrackets("nomeApresentacao"));
    formData.set("cidade", formatWithBrackets("cidade"));
    formData.set("bairro", formatWithBrackets("bairro"));
    formData.set("titulacao", formatWithBrackets("titulacao"));
    formData.set("estado", formatWithBrackets("estado"));
    formData.set("complemento", formatWithBrackets("complemento"));
    formData.set("apresentacao", formatWithBrackets("apresentacao"));
    formData.set("cep", formatWithBrackets("cep"));
    formData.set("rg", formatWithBrackets("rg"));
    formData.set("nomeMae", formatWithBrackets("nomeMae"));
    formData.set("numero", formatWithBrackets("numero"));
    formData.set("rua", formatWithBrackets("rua"));
    formData.set("nomePai", formatWithBrackets("nomePai"));

    console.log("Dados formatados:");
    Array.from(formData.entries()).forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
    });

    try {
      const response = await fetch("http://localhost:8080/api/cuidadores/v1", {
        method: "POST",
        headers: {
          Accept: "*/*",
        },
        body: formData,
      });

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        router.push("/sucesso");
      } else {
        const errorData = await response.json();
        console.error(`Erro: ${errorData.message}`);
        alert(`Erro: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Erro ao conectar com a API:", error);
      alert("Erro ao conectar com a API.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg flex flex-col">
      <div className="">

        <div className=" flex flex-col">
          <input
            type="file"
            name="image"
            accept="image/*"
            className="border border-gray-300 p-2 m-2"
          />
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            className="border border-gray-300 p-2 m-2"
          />
          <input
            type="text"
            name="nomeApresentacao"
            placeholder="Nome de Apresentação"
            className="border border-gray-300 p-2 m-2"
          />
          <input
            type="text"
            name="telefone"
            placeholder="Telefone"
            className="border border-gray-300 p-2 m-2"
          />
          <input
            type="text"
            name="rg"
            placeholder="RG"
            className="border border-gray-300 p-2 m-2"
          />

          <fieldset className="border border-gray-300 p-2 m-2">
            <legend className="text-sm font-bold">Endereço</legend>
            <input
              type="text"
              name="rua"
              placeholder="Rua"
              className="border border-gray-300 p-2 my-1"
            />
            <input
              type="number"
              name="numero"
              placeholder="Número"
              className="border border-gray-300 p-2 my-1"
            />
            <input
              type="text"
              name="bairro"
              placeholder="Bairro"
              className="border border-gray-300 p-2 my-1"
            />
            <input
              type="text"
              name="complemento"
              placeholder="Complemento"
              className="border border-gray-300 p-2 my-1"
            />
            <input
              type="text"
              name="cep"
              placeholder="CEP"
              className="border border-gray-300 p-2 my-1"
            />
            <input
              type="text"
              name="cidade"
              placeholder="Cidade"
              className="border border-gray-300 p-2 my-1"
            />
            <input
              type="text"
              name="estado"
              placeholder="Estado"
              className="border border-gray-300 p-2 my-1"
            />
          </fieldset>

        </div>

        <div className=" flex flex-col">
          <input
            type="text"
            name="nomePai"
            placeholder="Nome do Pai"
            className="border border-gray-300 p-2 m-2"
          />
          <input
            type="text"
            name="nomeMae"
            placeholder="Nome da Mãe"
            className="border border-gray-300 p-2 m-2"
          />
          <input
            type="date"
            name="dataNascimento"
            className="border border-gray-300 p-2 m-2"
          />
          <input
            type="number"
            name="peso"
            placeholder="Peso (kg)"
            className="border border-gray-300 p-2 m-2"
          />
          <input
            type="number"
            name="altura"
            placeholder="Altura (cm)"
            className="border border-gray-300 p-2 m-2"
          />
          <select
            name="escolaridade"
            className="border border-gray-300 p-2 m-2"
            defaultValue="NÍVEL_MÉDIO"
          >
            <option value="NÍVEL_FUNDAMENTAL">Nível Fundamental</option>
            <option value="NÍVEL_MÉDIO">Nível Médio</option>
            <option value="NÍVEL_SUPERIOR">Nível Superior</option>
          </select>
          <input
            type="text"
            name="titulacao"
            placeholder="Titulação"
            className="border border-gray-300 p-2 m-2"
          />
          <input
            type="number"
            name="tempoExperiencia"
            placeholder="Tempo de Experiência"
            className="border border-gray-300 p-2 m-2"
          />
          <input
            type="text"
            name="habilidades"
            placeholder="Habilidade"
            className="border border-gray-300 p-2 m-2"
          />
          <input
            type="text"
            name="experiencias"
            placeholder="Experiência"
            className="border border-gray-300 p-2 m-2"
          />
          <textarea
            name="apresentacao"
            placeholder="Apresentação"
            className="border border-gray-300 p-2 m-2"
          ></textarea>

        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 m-2 rounded hover:bg-blue-600"
      >
        Cadastrar Cuidador
      </button>
    </form>
  );
}
