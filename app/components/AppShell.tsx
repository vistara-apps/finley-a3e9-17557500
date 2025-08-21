
"use client";

import { ReactNode } from "react";

interface AppShellProps {
  children: ReactNode;
  variant?: 'default';
}

export function AppShell({ children, variant = 'default' }: AppShellProps) {
  return (
    <div className="flex flex-col min-h-screen max-w-xl mx-auto bg-bg text-text">
      <div className="flex-1 flex flex-col animate-fade-in">
        {children}
      </div>
    </div>
  );
}
