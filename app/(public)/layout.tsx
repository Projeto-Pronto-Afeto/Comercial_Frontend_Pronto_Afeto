import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import ".././globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import AdminHeader from "@/components/AdminHeader";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/AppSidebar";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("font-sans", fontSans.variable)}>
        <div className="flex flex-1 flex-col space-y-10 relative">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}