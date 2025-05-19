import { getAllPropostas } from "@/actions/prposta/proposta.actions";
import ButtonFilter from "@/components/main/filters/ButtonFilter";
import CommandRequest from "@/components/main/command/CommandRequest";
import RequestCard from "@/components/RequestCard";
import { PaginationComponent } from "@/components/main/pagination/PaginationComponent";
import LoadingPage from "@/components/LoadingPage";
import SearchFilter from "@/components/main/filters/searchFilter";
import DateFilter from "@/components/main/filters/DateFilter";

const SolicitacoesPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined | string[] };
}) => {
  const page = searchParams.page ? parseInt(searchParams.page as string) : 0;
  const search = 
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  const status =
  typeof searchParams.status === "string" ? searchParams.status : undefined;
  const direction =
  typeof searchParams.direction === "string" ? searchParams.direction : "asc";
  const data: ProposalDTOGet = await getAllPropostas({
    status: status,
    direction,
    search,
    page: page,
    limit: 10,
  });
  

  return (
    <div className="admin-main">
      <section className="space-y-6 w-full ">
        <div>
          
            <div className="">
              <h1 className="md:text-3xl sm:text-2xl font-bold">
                Solicitações
              </h1>
              <p className="text-dark-600 text-sm mb-5">
                Gerencie as solicitações dos seus clientes com facilidade
              </p>
            <div className="flex justify-between w-full">
               <SearchFilter
                placeholder="Buscar Cliente..."
                baseRoute="solicitacoes"
                queryParam="search"
              />
              <div className="flex-1"></div>
              <div className="flex gap-4 mt-2 lg:mt-0">
                <DateFilter
                  baseRoute="solicitacoes"
                  queryParam="direction"
                />
                <ButtonFilter
                  baseRoute="solicitacoes"
                  approvalValue="Aprovada"
                  pendingValue="Observacao"
                  rejectedValue="Negada"
                />
            

            </div>
            </div>
            </div>
         
             
              
         

          <div className="grid xl:grid-cols-2  grid-cols-1 gap-4 py-6">
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
