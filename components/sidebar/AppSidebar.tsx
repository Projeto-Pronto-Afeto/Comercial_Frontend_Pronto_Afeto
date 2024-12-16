"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  LucideIcon,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  User2,
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TbAnalyze, TbBrandSuperhuman, TbClipboardText } from "react-icons/tb";

// This is sample data.
const data = {
  user: {
    name: "rebeca",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Pronto Afeto",
      logo: GalleryVerticalEnd,
      plan: "Comercial",
    },
  ],
  navMain: [
    {
      title: "Solicitações",
      url: "#",
      icon: TbBrandSuperhuman as LucideIcon,
      isActive: true,
      items: [
        {
          title: "Histórico",
          url: "/solicitacoes",
        },
      ],
    },
    {
      title: "Contratos",
      url: "#",
      icon: TbAnalyze as LucideIcon,
      isActive: true,
      items: [
        {
          title: "Histórico",
          url: "/contratos",
        },
      ],
    },
    {
      title: "Cuidadores",
      url: "#",
      icon: TbClipboardText as LucideIcon,
      items: [
        {
          title: "Cadastros",
          url: "/registro-cuidador",
        },
        {
          title: "Buscar Cuidadores",
          url: "/cuidadores",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Home",
      url: "/",
      icon: Frame,
    },
    {
      name: "Usuários",
      url: "/usuarios",
      icon: User2,
    },
    {
      name: "Configurações",
      url: "#",
      icon: Settings2,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  console.log("AppSidebar", props.user);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={props.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
