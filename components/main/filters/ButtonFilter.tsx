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

const ButtonFilter = () => {
  const [position, setPosition] = useState();
  const router = useRouter();

  const handleFilter = (value: string) => {
    router.push("/solicitacoes/?status=" + value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"sm"} variant="outline">
          <TbFilter />
          Filtrar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="left"
        className="w-56 bg-white border-none p-5 rounded-2xl"
      >
        <div className="flex justify-between">
          {" "}
          <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
          <div
            onClick={() => handleFilter("")}
            className="text-purple-600 font-semibold cursor-pointer text-sm my-auto"
          >
            Limpar
          </div>
        </div>

        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <TbApps />
              <span>Status</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="bg-white border-none">
                <DropdownMenuRadioGroup
                  value={position}
                  onValueChange={handleFilter}
                >
                  <DropdownMenuRadioItem value="Observacao">
                    Em Observação
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Aprovada">
                    Aprovada
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Negada">
                    Negada
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            <TbPlus />
            <span>New Team</span>
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ButtonFilter;
