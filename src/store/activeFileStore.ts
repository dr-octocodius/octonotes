import { create } from "zustand";

interface IFile {
  id: string;
  name: string;
  path: string;
}
export const useActiveFileStore = create<IFile>((set) => ({
  id: "",
  name: "",
  path: "",
  setFile: (file: IFile) => {
    set({
      id: file.id,
      name: file.name,
      path: file.path,
    });
  },
}));
