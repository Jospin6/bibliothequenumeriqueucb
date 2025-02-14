import { ReactNode } from "react";

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={`bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={`space-y-6 ${className}`}>{children}</div>;
}
