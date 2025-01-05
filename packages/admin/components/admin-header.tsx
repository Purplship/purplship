import { Button } from "@karrio/insiders/components/ui/button";
import { Input } from "@karrio/insiders/components/ui/input";
import { Bell, Box, Search } from "lucide-react";
import Link from "next/link";

export function AdminHeader() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex h-14 items-center justify-between gap-4 bg-[#1a1a1a] px-4">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Box className="h-5 w-5 text-white" />
        </Link>
        <span className="rounded bg-[#303030] px-2 py-1 text-xs text-white">
          Winter &apos;25
        </span>
      </div>

      <div className="flex-1 px-20">
        <div className="relative max-w-[460px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Search"
            className="h-9 w-full bg-[#303030] pl-9 text-white placeholder:text-gray-400 border-0 ring-offset-0 focus-visible:ring-1 focus-visible:ring-white/30"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-white hover:bg-white/10"
        >
          <Bell className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
