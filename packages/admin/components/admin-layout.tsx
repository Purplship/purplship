import { AdminSidebar } from "@karrio/admin/components/admin-sidebar";
import { AdminHeader } from "@karrio/admin/components/admin-header";
import React from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: AdminLayoutProps) {
  return (
    <>
      <AdminHeader />

      <div className="min-h-screen bg-[#f6f6f7] pt-14">
        <div className="p-4">
          <div className="relative mx-auto max-w-[1200px]">
            <div className="grid grid-cols-[280px,1fr] gap-5">
              <AdminSidebar />

              <div className="space-y-6">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
