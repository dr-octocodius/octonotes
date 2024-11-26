import { FC, useEffect, useState, useCallback } from "react";
import {
  readDir,
  mkdir,
  BaseDirectory,
  writeTextFile,
  readTextFile,
} from "@tauri-apps/plugin-fs";
import { type DirEntry } from "@tauri-apps/plugin-fs";
import { join } from "@tauri-apps/api/path";
import { Search } from "lucide-react";
import PlusItem from "../sidebar/plus-item";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { File, Tree, Folder } from "../ui/file-tree";
import { Button } from "../ui/button";
import { SidebarInput } from "../ui/sidebar";

interface FilesProps {}

interface ExtendedDirEntry extends DirEntry {
  children?: ExtendedDirEntry[];
  position?: number;
  id: string;
}

interface FileOrder {
  [path: string]: number;
}

const NOTES_DIR = "notes";
const FILE_ORDER_CONFIG = "file_order.json";

const Files: FC<FilesProps> = ({}) => {
  const [files, setFiles] = useState<JSX.Element[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFiles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Create notes directory in app data if it doesn't exist
      try {
        await mkdir(NOTES_DIR, {
          recursive: true,
          baseDir: BaseDirectory.AppData,
        });
      } catch (e) {
        // Directory might already exist, ignore error
      }

      const dir = NOTES_DIR;

      // Read directory contents
      const entries = await readDir(dir, {
        baseDir: BaseDirectory.AppData,
      } as const);

      // Sort entries: directories first, then files, both alphabetically
      entries.sort((a, b) => {
        if (a.isDirectory && !b.isDirectory) return -1;
        if (!a.isDirectory && b.isDirectory) return 1;
        return a.name.localeCompare(b.name);
      });

      await processEntriesRecursively(dir, entries as ExtendedDirEntry[]);
    } catch (e) {
      console.error("Error loading files:", e);
      setError("Failed to load files. Please check permissions.");
    } finally {
      setLoading(false);
    }
  }, []);

  async function processEntriesRecursively(
    parent: string,
    entries: ExtendedDirEntry[]
  ) {
    for (const entry of entries) {
      if (entry.isDirectory) {
        const dir = await join(parent, entry.name);
        const childEntries = await readDir(dir, {
          baseDir: BaseDirectory.AppData,
        });

        // Sort child entries
        childEntries.sort((a, b) => {
          if (a.isDirectory && !b.isDirectory) return -1;
          if (!a.isDirectory && b.isDirectory) return 1;
          return a.name.localeCompare(b.name);
        });

        (entry as ExtendedDirEntry).children =
          childEntries as ExtendedDirEntry[];
        await processEntriesRecursively(
          dir,
          childEntries as ExtendedDirEntry[]
        );
      }
    }
  }

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const entries = await readDir(NOTES_DIR, {
          baseDir: BaseDirectory.AppData,
        });
        const fileTree = await renderFileTree(entries as ExtendedDirEntry[]);
        setFiles(fileTree);
        setLoading(false);
      } catch (error) {
        console.error("Error reading directory:", error);
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  const renderFileTree = async (entries: ExtendedDirEntry[]) => {
    return Promise.all(
      entries.map(async (entry, index) => {
        if (entry.isDirectory) {
          const children = await readDir(await join(NOTES_DIR, entry.name), {
            baseDir: BaseDirectory.AppData,
          });
          return (
            <Folder
              key={`${entry.name}-${index}`}
              element={entry.name}
              value={`${entry.name}-${index}`}
            >
              {await renderFileTree(children as ExtendedDirEntry[])}
            </Folder>
          );
        } else {
          return (
            <File
              key={`${entry.name}-${index}`}
              value={`${entry.name}-${index}`}
            >
              {entry.name}
            </File>
          );
        }
      })
    );
  };

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  if (loading) {
    return <div className="p-4">Loading files...</div>;
  }

  return (
    <>
      <div className="flex items-center gap-2 px-2 mb-2">
        <SidebarInput placeholder="Search notes..." className="h-8" />
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Search className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center justify-between pl-2 pr-3 py-2">
        <span className="text-sm font-medium text-muted-foreground">Notes</span>
        <PlusItem onFileChange={loadFiles} />
      </div>
      <Tree>
        {files.length === 0 ? (
          <div key="no-files" className="px-2 text-sm text-muted-foreground">
            No files found
          </div>
        ) : (
          files
        )}
      </Tree>
    </>
  );
};

export default Files;
