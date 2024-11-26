"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Settings, ChevronsLeft } from "lucide-react";
import { Button } from "../ui/button";

import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut";
import { useSidebar } from "@/components/ui/sidebar";
import NavDialog from "../navigation/nav-dialog";
import { useState } from "react";
import Files from "../navigation/files";

export function AppSidebar() {
  const [open, setOpen] = useState(false);
  const { toggleSidebar } = useSidebar();

  useKeyboardShortcut({ key: "b", modifiers: ["ctrl"] }, () => toggleSidebar());
  useKeyboardShortcut({ key: "e", modifiers: ["ctrl"] }, () => setOpen(!open));

  return (
    <Sidebar side="left" variant="floating">
      <SidebarHeader className="p-4  border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold tracking-tight inline">
            oNotes
          </h1>
          <Button onClick={toggleSidebar} variant="ghost" className="h-8 w-8">
            <ChevronsLeft className="h-4 w-4" />
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <Files />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <div className="flex">
          <Button variant="ghost" className="w-full h-9">
            <Settings className="h-4 w-4" />
          </Button>
          <NavDialog setOpen={setOpen} open={open} />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
