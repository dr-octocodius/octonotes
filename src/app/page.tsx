"use client";
import AppContent from "@/components/global/app-content";
import Topbar from "@/components/editor/topbar";

import Tiptap from "@/components/editor/tiptap";
import { JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
import Placeholder from "@tiptap/extension-placeholder";

import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState<JSONContent>();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Markdown,
      Placeholder.configure({ placeholder: "Write something..." }),
    ],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "mx-auto mt-4 max-w-3xl focus:outline-none ",
      },
    },

    onUpdate: ({ editor }) => {
      setContent(editor.storage.markdown.getMarkdown());
    },
  });

  return (
    <main className="flex flex-col flex-auto">
      <AppContent>
        <Topbar />
        <Tiptap editor={editor} />
      </AppContent>
    </main>
  );
}
