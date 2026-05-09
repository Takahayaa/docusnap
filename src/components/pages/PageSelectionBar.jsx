export function PageSelectionBar({ onSelectAll, onClear, onSelectOdd, onSelectEven }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button className="btn-ghost" onClick={onSelectAll}>All pages</button>
      <button className="btn-ghost" onClick={onClear}>Clear</button>
      <button className="btn-ghost" onClick={onSelectOdd}>Odd pages</button>
      <button className="btn-ghost" onClick={onSelectEven}>Even pages</button>
    </div>
  )
}
