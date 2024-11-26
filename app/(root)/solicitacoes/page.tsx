import { getAllPropostas } from "@/actions/prposta/proposta.actions";
import RequestCard from "@/components/RequestCard";

const SolicitacoesPage = async () => {
  const data = await getAllPropostas();
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
          <p className="text-lg font-semibold">Novembro</p>
          <span className="text-sm text-black-40">
            56 Solicitações apara esse mês
          </span>
          <div className="grid grid-cols-1 gap-4 py-6">
            {" "}
            {data.map((item: Contrato) => (
              <RequestCard proposal={item} />
            ))}
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
