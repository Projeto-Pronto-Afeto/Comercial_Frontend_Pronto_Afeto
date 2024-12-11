import { getAllPropostas } from "@/actions/prposta/proposta.actions";
import ButtonFilter from "@/components/main/filters/ButtonFilter";
import CommandRequest from "@/components/main/command/CommandRequest";
import RequestCard from "@/components/RequestCard";
import { PaginationComponent } from "@/components/main/pagination/PaginationComponent";

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
      <section className="flex flex-col gap-6 w-full ">
        <div>
          <div className="flex justify-between">
            <div className="">
              <p className="text-2xl font-semibold">Solicitações</p>
              <span className="text-sm text-black/80">
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
          {data.totalPages > 1 ? (
            <PaginationComponent
              totalPages={data?.totalPages}
              currentPage={data?.pageable.pageNumber}
              domain="solicitacoes"
            />
          ) : null}
        </div>
      </section>
    </div>
  );
};

export default SolicitacoesPage;
