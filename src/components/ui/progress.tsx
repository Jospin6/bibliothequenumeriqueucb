
export function Progress({ value, className }: { value: number; className?: string }) {
  return (
    <div className={`relative w-full h-3 bg-white/20 rounded-lg overflow-hidden ${className}`}>
      <div
        className="absolute left-0 top-0 h-full bg-blue-500 transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
