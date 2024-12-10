"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

// Definindo as colunas para PerfilComercial
export const columns: ColumnDef<PerfilComercial>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "perfil",
    header: "Perfil",
    cell: ({ row }) => (
      <div className="flex items-center space-x-3">
        <Image
          src={row.original.fotoUrl}
          alt={row.original.nome}
          width={40}
          height={40}
          className="rounded-full mr-2"
        />
        <div>
          <p className="font-medium">{row.original.nome}</p>
          <span className="text-sm text-black/40">{row.original.email}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "telefone",
    header: "Telefone",
  },
];
