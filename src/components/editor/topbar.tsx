"use client";

import { FileIcon } from "lucide-react";

const Topbar = () => {
  return (
    <div className="h-12 border-b border-border flex items-center px-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-foreground/60">
          <FileIcon className="h-4 w-4" />
        </span>
        <span className="text-sm font-medium text-foreground">untitled</span>
      </div>
    </div>
  );
};

export default Topbar;
