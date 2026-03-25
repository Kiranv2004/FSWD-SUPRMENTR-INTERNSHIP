const SkeletonCard = () => {
  return (
    <div className="animate-pulse rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-3 h-40 rounded bg-slate-200 dark:bg-slate-700" />
      <div className="mb-2 h-4 w-2/3 rounded bg-slate-200 dark:bg-slate-700" />
      <div className="mb-2 h-4 w-1/3 rounded bg-slate-200 dark:bg-slate-700" />
      <div className="h-9 rounded bg-slate-200 dark:bg-slate-700" />
    </div>
  );
};

export default SkeletonCard;
