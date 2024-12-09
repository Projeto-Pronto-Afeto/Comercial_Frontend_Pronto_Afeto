import {SignupForm} from "@/components/FormRegisterCuidador";

export default function CuidadoresSignupPage() {
  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      <div className="flex flex-col items-center justify-center mb-12">
        <h1 className="text-3xl font-bold">Cadastro de Cuidadores</h1>
        <p className="mt-2 text-gray-600">
          Preencha os dados abaixo para cadastrar um cuidador.
        </p>
      </div>

      <div className="flex justify-center">
        < SignupForm/>
      </div>

    </div>
  );
}
