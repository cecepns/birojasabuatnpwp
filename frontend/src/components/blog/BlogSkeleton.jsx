export default function BlogSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden animate-pulse">
      <div className="aspect-[16/9] bg-slate-200" />
      <div className="p-6 space-y-3">
        <div className="h-4 w-20 bg-slate-200 rounded-full" />
        <div className="h-5 w-full bg-slate-200 rounded" />
        <div className="h-5 w-3/4 bg-slate-200 rounded" />
        <div className="h-4 w-full bg-slate-100 rounded" />
        <div className="h-4 w-2/3 bg-slate-100 rounded" />
      </div>
    </div>
  );
}
