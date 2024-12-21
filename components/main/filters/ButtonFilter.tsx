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
    //router.push(`${baseRoute}/?status=` + value);
    window.location.href = `${baseRoute}/?status=` + value;
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
                  <DropdownMenuRadioItem value={pendingValue}>
                    Em Observação
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value={approvalValue}>
                    Aprovada
                  </DropdownMenuRadioItem>
                  {rejectedValue && (
                    <DropdownMenuRadioItem value={rejectedValue}>
                      Negada
                    </DropdownMenuRadioItem>
                  )}
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ButtonFilter;
