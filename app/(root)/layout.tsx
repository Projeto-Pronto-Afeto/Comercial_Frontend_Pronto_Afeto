import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import ".././globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import AdminHeader from "@/components/AdminHeader";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/AppSidebar";
import { getUserFromCookies } from "@/helpers/getUserFromToken";
import { Loader } from "lucide-react";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Pronto Afeto Comercial",
  description: "Aplicativo Comercial Pronto Afeto",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getUserFromCookies();

  if (!session) return <Loader />;

  const user: UserSession = session;
  return (
    <html lang="en">
      <body className={cn("font-sans", fontSans.variable)}>
        <SidebarProvider>
          <AppSidebar user={user} />
          <SidebarInset>
            <div className="flex flex-1 flex-col space-y-10 relative">
              <AdminHeader />
              {children}
            </div>
            <Toaster />
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
