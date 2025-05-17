"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TbTrash } from "react-icons/tb";
import { removeUser, StateRemove } from "@/actions/comercial/comercial.actions";
import { useFormState } from "react-dom";
import ProfileImage from "@/components/ProfileImage"; // Import do novo componente

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
      <div className="flex items-center gap-4">
        <ProfileImage
          nome={row.original.nome}
          fotoUrl={row.original.fotoUrl}
          size={40}
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
  {
    id: "actions",
    cell: ({ row }) => {
      const initialState: StateRemove = {
        errors: {},
        message: "",
        error: false,
      };

      const [formState, formAction] = useFormState(removeUser, initialState);
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            <DropdownMenuItem className="hover:bg-red-100">
              <form action={formAction} className="">
                <input type="hidden" name="id" value={row.original.id} />
                <button type="submit" className="flex gap-2 text-red-700">
                  <TbTrash className="my-auto" />
                  Deletar
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];