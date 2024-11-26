"use client";
import { EditorContent } from "@tiptap/react";
import type { Editor } from "@tiptap/core";
interface TiptapProps {
  editor: Editor | null;
}

const Tiptap = ({ editor }: TiptapProps) => {
  return <EditorContent editor={editor} />;
};

export default Tiptap;
