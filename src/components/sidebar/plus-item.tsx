import type { FC } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { FileText, FolderPlus, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const PlusItem: FC = ({}) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const addNote = () => {
    toast({
      title: "Note added",
      description: "Your note has been added.",
      action: <Button size="sm">Undo</Button>,
    });
    setOpen(false);
  };

  const addFolder = () => {
    toast({
      title: "Folder added",
      description: "Your folder has been added.",
      action: <Button size="sm">Undo</Button>,
    });
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <Plus className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-0" align="end">
        <div className="flex flex-col">
          <Button
            onClick={addNote}
            variant="ghost"
            className="flex items-center justify-start gap-2 px-3 py-2 text-sm"
          >
            <FileText className="h-4 w-4" />
            New Note
          </Button>
          <Button
            onClick={addFolder}
            variant="ghost"
            className="flex items-center justify-start gap-2 px-3 py-2 text-sm"
          >
            <FolderPlus className="h-4 w-4" />
            New Folder
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default PlusItem;
