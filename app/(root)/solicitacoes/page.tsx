import { getAllPropostas } from "@/actions/prposta/proposta.actions";
import ButtonFilter from "@/components/filters/ButtonFilter";
import CommandRequest from "@/components/main/command/CommandRequest";
import RequestCard from "@/components/RequestCard";

const SolicitacoesPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined | string[] };
}) => {
  const status =
    typeof searchParams.status === "string" ? searchParams.status : undefined;
  const data: ProposalDTOGet = await getAllPropostas({
    status: status,

    page: 0,
    limit: 10,
  });

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
          <div className="flex justify-between">
            <div className="">
              <p className="text-lg font-semibold">Mais Recentes</p>
              <span className="text-sm text-black-40">
                56 Solicitações de propostas
              </span>
            </div>
            <div className="my-auto">
              <ButtonFilter />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 py-6">
            {" "}
            {data?.content.map((item: MinimalProposal) => (
              <RequestCard proposal={item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SolicitacoesPage;
