const SidebarFilters = ({ filters, setFilters, categories }) => {
  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
      <h3 className="mb-3 text-lg font-semibold">Filters</h3>

      <label className="mb-2 block text-sm font-medium">Category</label>
      <select
        value={filters.category}
        onChange={(event) => setFilters((prev) => ({ ...prev, category: event.target.value }))}
        className="mb-4 w-full rounded border border-slate-300 bg-white px-2 py-2 dark:border-slate-600 dark:bg-slate-900"
      >
        <option value="">All</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <label className="mb-2 block text-sm font-medium">Min Price</label>
      <input
        type="number"
        value={filters.minPrice}
        onChange={(event) => setFilters((prev) => ({ ...prev, minPrice: event.target.value }))}
        className="mb-3 w-full rounded border border-slate-300 bg-white px-2 py-2 dark:border-slate-600 dark:bg-slate-900"
      />

      <label className="mb-2 block text-sm font-medium">Rating (at least)</label>
      <input
        type="number"
        min="0"
        max="5"
        step="0.5"
        value={filters.rating}
        onChange={(event) => setFilters((prev) => ({ ...prev, rating: event.target.value }))}
        className="mb-3 w-full rounded border border-slate-300 bg-white px-2 py-2 dark:border-slate-600 dark:bg-slate-900"
      />

      <button
        type="button"
        onClick={() => setFilters({ category: "", minPrice: "", rating: "", sort: "latest", page: 1 })}
        className="w-full rounded bg-slate-200 px-2 py-2 text-sm hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600"
      >
        Reset Filters
      </button>
    </aside>
  );
};

export default SidebarFilters;
