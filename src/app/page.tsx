import Tiptap from "@/components/editor/tiptap";
import AppContent from "@/components/global/app-content";

export default function Home() {
  return (
    <main className="flex flex-col flex-auto">
      <AppContent>
        <Tiptap />
      </AppContent>
    </main>
  );
}
