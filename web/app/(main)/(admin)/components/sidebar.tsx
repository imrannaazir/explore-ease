"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Calendar, Home, Menu, PlusCircleIcon, Tent } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { icon: Home, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Tent, label: "Expeditions", href: "/admin/expedition" },
  {
    icon: PlusCircleIcon,
    label: "Create Expedition",
    href: "/admin/create-expedition",
  },
  { icon: Calendar, label: "Booking", href: "/admin/booked-expedition" },
];

export function Sidebar() {
  const pathname = usePathname();

  const SidebarContent = (
    <div className="space-y-4 py-4">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold">Dashboard</h2>
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href ? "bg-accent" : "transparent"
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.label}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden w-64 overflow-y-auto border-r bg-gray-100/40 lg:block">
        {SidebarContent}
      </aside>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed left-4 top-4 z-50 lg:hidden "
          >
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          {SidebarContent}
        </SheetContent>
      </Sheet>
    </>
  );
}
