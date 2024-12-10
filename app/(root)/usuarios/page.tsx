import { DataTable } from "@/components/main/table/table";
import { columns } from "@/lib/columns";
import React from "react";
import { perfisComerciais } from "@/constants/index";

import { TbPlus } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import CreateUserDialog from "@/components/main/dialog/CreateUserDialog";

const UserPage = () => {
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
          <DataTable columns={columns} data={perfisComerciais} />
        </div>
      </section>
    </div>
  );
};

export default UserPage;
