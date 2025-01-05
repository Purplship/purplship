import {
  Box,
  Building2,
  Clock,
  FileText,
  LayoutDashboard,
  Truck,
  Users,
} from "lucide-react";
import { cn } from "@karrio/insiders/lib/utils";
import Link from "next/link";

const menuItems = [
  {
    label: "Platform details",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    label: "Carrier connections",
    icon: Truck,
    href: "/admin/carrier-connections",
  },
  {
    label: "Users and permissions",
    icon: Users,
    href: "/admin/users-permissions",
  },
  {
    label: "Organization accounts",
    icon: Building2,
    href: "/admin/organization-accounts",
  },
  {
    label: "Surcharge and discounts",
    icon: FileText,
    href: "/admin/surcharges",
  },
  {
    label: "Platform activity log",
    icon: Clock,
    href: "/admin/activity",
    isDisabled: true,
  },
];

export function AdminSidebar() {
  return (
    <div className="w-[280px] border-r border-gray-200 bg-white">
      <div className="flex h-14 items-center gap-3 border-b px-4">
        <div className="flex h-8 w-8 items-center justify-center rounded bg-primary">
          <Box className="h-5 w-5 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium">Karrio</span>
          <span className="text-xs text-muted-foreground">localhost:3000</span>
        </div>
      </div>
      <div className="px-2 py-4">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-2 py-2 text-sm text-gray-700 hover:bg-gray-100",
              "focus-visible:bg-gray-100 focus-visible:outline-none",
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
