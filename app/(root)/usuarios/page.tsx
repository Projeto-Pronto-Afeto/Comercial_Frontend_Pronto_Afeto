import { DataTable } from "@/components/main/table/table";
import { columns } from "@/lib/columns";
import React from "react";
import CreateUserDialog from "@/components/main/dialog/CreateUserDialog";
import { getAllComerciais } from "@/actions/comercial/comercial.actions";
import { PaginationComponent } from "@/components/main/pagination/PaginationComponent";

const UserPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined | string[] };
}) => {
  const page =
    typeof searchParams.page === "string" ? parseInt(searchParams.page) : 0;
  const users: ComercialDTOGet = await getAllComerciais({
    page: page,
    limit: 10,
  });



  return (
    <div className="admin-main">
      <section className="w-full">
        <div className="">
          <h1 className="text-2xl font-semibold">Gerenciamento de Usuários</h1>
          <span className="text-sm text-black/80">
            Gerencie os usuários do sistema comercial
          </span>
        </div>
        <div className=" pt-8">
          <div className="flex justify-between pb-4">
            <h3 className="text-lg font-semibold">Todos</h3>

            <div className="flex gap-4">
              <CreateUserDialog />
            </div>
          </div>
          <DataTable columns={columns} data={users.content} />
          {users.totalPages > 1 ? (
            <PaginationComponent
              totalPages={users?.totalPages}
              currentPage={users?.pageable.pageNumber}
              domain="usuarios"
            />
          ) : null}
        </div>
      </section>
    </div>
  );
};

export default UserPage;
