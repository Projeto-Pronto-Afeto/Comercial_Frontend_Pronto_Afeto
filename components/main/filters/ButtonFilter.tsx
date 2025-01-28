"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TbApps, TbFilter, TbPlus } from "react-icons/tb";

interface ButtonFilterProps {
  baseRoute: string;
  approvalValue: string;
  pendingValue: string;
  rejectedValue?: string;
}

const ButtonFilter: React.FC<ButtonFilterProps> = ({
  baseRoute,
  approvalValue,
  pendingValue,
  rejectedValue,
}) => {
  const [position, setPosition] = useState();
  const router = useRouter();
  

  const handleFilter = (value: string) => {
    //Isso aq não tá funcionando nem a pau em uma página já criada
    router.push(`${baseRoute}/?status=` + value);
    //window.location.href = `${baseRoute}/?status=` + value;
  };

  return (
  <DropdownMenu>
      <DropdownMenuTrigger asChild className="bg-violet-500 text-white font-semibold text-lg border border-gray-600 ">
        <Button size={"lg"} variant="outline">
          <TbFilter />
          Filtrar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        className="w-auto bg-white border p-5 rounded-2xl mr-2"
      >
        <div className="flex justify-between items-center">
          <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
          <div
            onClick={() => handleFilter("")}
            className="text-purple-600 font-semibold cursor-pointer text-md"
          >
            Limpar
          </div>
        </div>

        <DropdownMenuSeparator className="mb-4" />
        <DropdownMenuGroup>
          <span className="text-black text-md font-semibold ml-2">Status</span>
          <div className="flex gap-2 mt-2 flex-col md:flex-row">

            <button
              onClick={() => handleFilter("")}
              className="px-4 py-2 rounded-xl border text-black hover:bg-gray-200"
            >
              Todos
            </button>
            <button
              onClick={() => handleFilter(pendingValue)}
              className="px-4 py-2 rounded-xl border text-violet-900 hover:bg-gray-200"
            >
              Em Observação
            </button>
            <button
              onClick={() => handleFilter(approvalValue)}
              className="px-4 py-2 rounded-xl border text-green-900 hover:bg-gray-200"
            >
              Aprovada
            </button>
            {rejectedValue && (
              <button
                onClick={() => handleFilter(rejectedValue)}
                className="px-4 py-2 rounded-xl border text-red-900 hover:bg-gray-200"
              >
                Negada
              </button>
            )}
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ButtonFilter;
