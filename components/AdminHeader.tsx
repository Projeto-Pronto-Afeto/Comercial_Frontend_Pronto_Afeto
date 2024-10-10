import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
  import Image from "next/image";
  import Link from "next/link";
  import React from "react";
  import { LuBell, LuSearch, LuSettings, LuSettings2 } from "react-icons/lu";
  
  const AdminHeader = () => {
    return (
      <header className="admin-header">
        <div className="bg-red-50 rounded-lg p-2 w-96">
          <LuSearch />
        </div>
  
        <div className="flex gap-3">
          <div className="hover:bg-purple-50 my-auto w-8 h-8 py-2 rounded-full hover:text-purple-900">
            <LuBell className=" mx-auto  text-dark-600 " />
          </div>
  
          <div className="w-14 h-14 rounded-full py-1 hover:bg-slate-100 hover:border-slate-200">
            <Image
              src={"/assets/images/profile.png"}
              alt="Imagem do usuario"
              width={45}
              height={45}
              className="w-fit h-fit rounded-full mx-auto  "
            />
          </div>
        </div>
      </header>
    );
  };
  
  export default AdminHeader;
  