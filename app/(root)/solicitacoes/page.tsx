import RequestCard from "@/components/RequestCard";

const SolicitacoesPage = () => {
  const data = [
    {
      id: 1,
      cliente: { nome: "João Silva" },
      data: "2023-10-01 14:30",
      status: "Pendente",
      endereco: "Rua das Flores, 123",
    },
    {
      id: 2,
      cliente: { nome: "Maria Oliveira" },
      data: "2023-10-02 09:00",
      endereco: "Avenida Paulista, 456",
      status: "Assinado",
    },
    {
      id: 3,
      cliente: { nome: "Carlos Souza" },
      data: "2023-10-03 16:45",
      endereco: "Praça da Sé, 779",
      status: "Pendente",
    },
    {
      id: 4,
      cliente: { nome: "Ana Pereira" },
      data: "2023-10-04 11:15",
      endereco: "Rua Augusta, 101",
      status: "Rejeitado",
    },
    {
      id: 5,
      cliente: { nome: "Pedro Santos" },
      data: "2023-10-05 13:00",
      endereco: "Avenida Brasil, 202",
      status: "Pendente",
    },
  ];
  return (
    <div className="admin-main">
      <section className="w-full py-6">
        <h1 className="md:text-3xl sm:text-2xl font-bold">Solicitações</h1>
        <p className="text-dark-600 text-sm">
          Gerencie as solicitações dos seus clientes com facilidade
        </p>
      </section>
      <section className="flex flex-col gap-6 w-full ">
        <div>
          <p className="text-lg font-semibold">Setembro</p>
          <span className="text-sm text-black-40">
            56 Solicitações apara esse mês
          </span>
          <div className="grid grid-cols-1 gap-4 py-6">
            {" "}
            <RequestCard
              proposal={{
                id: 1,
                cliente: { nome: "João Silva" },
                data: "2023-10-01 14:30",
                status: "Pendente",
                endereco: "Rua das Flores, 123",
              }}
            />
          </div>
        </div>
        <div>
          <p className="font-semibold">Agosto</p>
          <span className="text-xs text-black-40">
            26 Solicitações apara esse mês
          </span>
        </div>
      </section>
    </div>
  );
};

export default SolicitacoesPage;
