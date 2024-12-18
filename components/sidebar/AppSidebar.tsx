"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
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
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Histórico",
          url: "/solicitacoes",
        },
      ],
    },
    {
      title: "Cuidadores",
      url: "#",
      icon: Bot,
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
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={props.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
