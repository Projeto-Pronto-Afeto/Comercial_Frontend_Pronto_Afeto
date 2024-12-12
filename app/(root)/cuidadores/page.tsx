import { useState, useEffect } from "react";
import { getAllCuidadores } from "@/actions/cuidador/cuidador.actions";
import CuidadorList from "@/components/CuidadorList";
import ButtonFilter from "@/components/main/filters/ButtonFilter";
import { PaginationComponent } from "@/components/main/pagination/PaginationComponent";

const CuidadorApprovalPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined | string[] };
}) => {
  const status =
    typeof searchParams.status === "string" ? searchParams.status : "";
  const page = typeof searchParams.page === "string" ? searchParams.page : "0";

  const data = await getAllCuidadores(Number(page), 6, status);

  return (
    <div className="admin-main">
      <section className="w-full ">
        <h1 className="md:text-3xl sm:text-2xl font-bold">Cuidadores</h1>
        <p className="text-dark-600 text-sm">
          Aqui você pode visualizar os cuidadores cadastrados e aprovar ou
          recusar
        </p>

       
      </section>
      <section className="flex flex-col gap-6 w-full">
        <div>
          <div className="grid grid-cols-1 gap-4 py-6">
            <CuidadorList caregivers={data.content}></CuidadorList>
          </div>

          {data.totalPages > 1 ? (
            <PaginationComponent
              totalPages={data?.totalPages}
              currentPage={data?.pageable.pageNumber}
              domain="cuidadores"
            />
          ) : null}
        </div>
      </section>
    </div>
  );
};

export default CuidadorApprovalPage;
