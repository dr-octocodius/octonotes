import type { FC } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { FileText, FolderPlus, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { create, readDir, mkdir, BaseDirectory } from "@tauri-apps/plugin-fs";
import NameInputDialog from "../ui/name-input-dialog";

interface PlusItemProps {
  onFileChange?: () => void;
}

const NOTES_DIR = "notes";

const PlusItem: FC<PlusItemProps> = ({ onFileChange }) => {
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"note" | "folder">("note");
  const { toast } = useToast();

  const handleAddNote = () => {
    setDialogType("note");
    setDialogOpen(true);
    setOpen(false);
  };

  const handleAddFolder = () => {
    setDialogType("folder");
    setDialogOpen(true);
    setOpen(false);
  };

  const handleCreate = async (name: string) => {
    try {
      if (dialogType === "note") {
        const fileName = `${name}.md`;
        await create(`${NOTES_DIR}/${fileName}`, {
          baseDir: BaseDirectory.AppData,
        });

        toast({
          title: "Note added",
          description: "Your note has been created successfully.",
        });
      } else {
        const folderName = name;
        await mkdir(`${NOTES_DIR}/${folderName}`, {
          recursive: true,
          baseDir: BaseDirectory.AppData,
        });

        toast({
          title: "Folder added",
          description: "Your folder has been created successfully.",
        });
      }

      onFileChange?.();
    } catch (e) {
      console.error(`Error creating new ${dialogType}:`, e);
      toast({
        title: "Error",
        description: `Failed to create new ${dialogType}. Please check permissions.`,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Plus className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-40 p-0" align="end">
          <div className="flex flex-col">
            <Button
              onClick={handleAddNote}
              variant="ghost"
              className="flex items-center justify-start gap-2 px-3 py-2 text-sm"
            >
              <FileText className="h-4 w-4" />
              New Note
            </Button>
            <Button
              onClick={handleAddFolder}
              variant="ghost"
              className="flex items-center justify-start gap-2 px-3 py-2 text-sm"
            >
              <FolderPlus className="h-4 w-4" />
              New Folder
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <NameInputDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleCreate}
        title={`Create New ${dialogType === "note" ? "Note" : "Folder"}`}
        type={dialogType}
      />
    </>
  );
};

export default PlusItem;
