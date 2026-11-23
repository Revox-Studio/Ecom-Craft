export default function SortDropdown() {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-sm font-medium">Sort by:</label>
      <select id="sort" className="rounded border px-2 py-1 text-sm">
        <option value="featured">Featured</option>
        <option value="newest">Newest</option>
        <option value="name-asc">Name (A-Z)</option>
        <option value="name-desc">Name (Z-A)</option>
      </select>
    </div>
  );
}
