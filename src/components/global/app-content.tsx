import type { FC } from "react";

interface AppContent {
  children?: React.ReactNode;
}

const AppContent: FC<AppContent> = ({ children }) => {
  return (
    <div className="px-6 py-1 flex-auto gap-4 border border-sidebar-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/50 rounded-lg shadow-sm m-2">
      {children}
    </div>
  );
};
export default AppContent;
