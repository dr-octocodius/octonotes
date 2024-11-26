import type { FC } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { FolderSearch, ShipWheel } from "lucide-react";
import { Input } from "../ui/input";

interface NavDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const NavDialog: FC<NavDialogProps> = ({ open, setOpen }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="h-9 w-full">
          <FolderSearch className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="[&>button]:hidden">
        <DialogHeader>
          <div className="flex flex-col">
            <DialogTitle className=" invisible h-0 w-0">
              Search dialog
            </DialogTitle>
            <Input type="search" placeholder="Search..." />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default NavDialog;
