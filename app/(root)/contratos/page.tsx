import React from "react";
import { getAllPropostas } from "@/actions/prposta/proposta.actions";
import ButtonFilter from "@/components/main/filters/ButtonFilter";
import CommandRequest from "@/components/main/command/CommandRequest";
import RequestCard from "@/components/RequestCard";
import { PaginationComponent } from "@/components/main/pagination/PaginationComponent";
import LoadingPage from "@/components/LoadingPage";
import { getAllContracts } from "@/actions/contrato/contrato.actions";
import ContractCard from "@/components/main/cards/contract/ContractCard";

const page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined | string[] };
}) => {
  const page = searchParams.page ? parseInt(searchParams.page as string) : 0;

  const status =
    typeof searchParams.status === "string" ? searchParams.status : undefined;

  const data: ContratoDTOGet = await getAllContracts({
    status: status,
    page: page,
    limit: 4,
  });
  if (!data) return <LoadingPage />;

  return (
    <div className="admin-main">
      <section className="space-y-6 w-full ">
        <div>
          <div className="flex justify-between">
            <div className="">
              <h1 className="md:text-3xl sm:text-2xl font-bold">Contratos</h1>
              <p className="text-dark-600 text-sm">
                Gerencie os contratos dos seus clientes com facilidade
              </p>
            </div>
          </div>

          <div className="grid xl:grid-cols-2 grid-cols-1 gap-4 py-6">
            {" "}
            {data?.content.map((item: Contrato) => (
              <ContractCard contrato={item} />
            ))}
          </div>
          {data.totalPages > 1 ? (
            <PaginationComponent
              totalPages={data?.totalPages}
              currentPage={data?.pageable.pageNumber}
              domain="contratos"
            />
          ) : null}
        </div>
      </section>
    </div>
  );
};

export default page;