import { useState } from 'react'

export function PageRangeInput({ onParse, totalPages }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()
    if (!value.trim()) return
    const err = onParse(value, totalPages)
    setError(err || null)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-start">
      <div className="flex-1">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="e.g. 1-3, 6, 10-12"
          className={`w-full text-sm border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:border-accent transition-colors ${
            error ? 'border-error focus:ring-error/20' : 'border-hairline focus:ring-accent/20'
          }`}
        />
        {error && <p className="text-xs text-error mt-1 ml-1">{error}</p>}
      </div>
      <button type="submit" className="btn-secondary text-sm whitespace-nowrap">Apply range</button>
    </form>
  )
}
