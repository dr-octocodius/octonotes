"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInput,
} from "@/components/ui/sidebar";
import { File, Tree, Folder } from "../ui/file-tree";
import {
  Settings,
  Search,
  Plus,
  FileText,
  FolderPlus,
  ChevronsLeft,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut";
import { useSidebar } from "@/components/ui/sidebar";
import NavDialog from "../navigation/nav-dialog";
import { useState } from "react";
import PlusItem from "../sidebar/plus-item";

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
          <div className="flex items-center gap-2 px-2 mb-2">
            <SidebarInput placeholder="Search notes..." className="h-8" />
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between pl-2 pr-3 py-2">
            <span className="text-sm font-medium text-muted-foreground">
              Notes
            </span>
            <PlusItem />
          </div>
          <Tree>
            <Folder element="Personal" value="personal">
              <File value="tasks">Tasks</File>
              <File value="ideas">Ideas</File>
              <File value="journal">Journal</File>
            </Folder>
            <Folder element="Work" value="work">
              <File value="projects">Projects</File>
              <File value="meetings">Meetings</File>
              <File value="goals">Goals</File>
            </Folder>
          </Tree>
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
