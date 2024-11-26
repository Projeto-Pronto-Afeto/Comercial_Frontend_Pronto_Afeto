"use client";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import {
  TbLayoutDashboard,
  TbUserSquareRounded,
  TbBrandSuperhuman,
} from "react-icons/tb";
import { HiOutlineDocumentChartBar } from "react-icons/hi2";
import MenuItem from "./ManuItem";
import { ButtonToggler } from "./ButtonToggler";

const items = [
  {
    index: 0,
    title: "Home",
    color: "purple",
    icon: <TbLayoutDashboard className="w-6 h-6 text-purple-500" />,
    url: "/",
  },
  {
    index: 1,
    title: "Solicitações",
    color: "blue",
    icon: <TbBrandSuperhuman className="w-6 h-6 text-blue-500" />,

    url: "/solicitacoes",
  },

  {
    index: 2,
    title: "Usuários",
    color: "green",
    icon: <TbUserSquareRounded className="w-6 h-6 text-amber-800" />,
    url: "/usuarios",
  },

  {
    index: 3,
    title: "Documentos",
    color: "yellow",
    icon: <HiOutlineDocumentChartBar className="w-6 h-6 text-amber-500" />,
    url: "/documentos",
  },
];

const Sidebar = () => {
  const [activeSidebar, setActiveSidebar] = useState(false);

  const pathname = usePathname();
  const pathnames = pathname.split("/").filter((x) => x);
  return (
    <nav
      className={clsx("relative transition-all", {
        "w-[16rem]": activeSidebar,
        "w-[6rem]": !activeSidebar,
      })}
    >
      <div
        className={clsx(
          "fixed top-0 left-0 transition-all px-6 flex flex-col shadow-sm rounded-r-xl h-screen bg-dark-300 z-50",
          {
            "w-[18rem]": activeSidebar,
            "w-[6rem] items-center": !activeSidebar,
          }
        )}
      >
        <div className="py-5">
          <p className="text-lg font-bold text-white">PF</p>
        </div>
        <ButtonToggler context={activeSidebar} setContext={setActiveSidebar} />
        <div className="flex flex-col  gap-2">
          {items.map((item) => (
            <MenuItem
              atualRoute={pathnames[0] ? `/${pathnames[0]}` : "/"}
              key={item.index}
              {...item}
              activeSidebar={activeSidebar}
            />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
