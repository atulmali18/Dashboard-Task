import React, { useMemo, useState } from 'react'
import { ChevronUpDownIcon } from '@heroicons/react/24/solid'

function compare(a, b, type) {
  if (type === 'number') return a - b
  if (type === 'date') return new Date(a) - new Date(b)
  return String(a).localeCompare(String(b))
}

export default function DataTable({
  ariaLabel = 'Data table',
  data = [],
  columns = [],
  pageSize = 10,
  searchPlaceholder = 'Search...',
  onRowClick
}) {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState({ key: null, dir: 'asc', type: 'string' })

  const filtered = useMemo(() => {
    if (!query) return data
    const q = query.toLowerCase()
    return data.filter((row) =>
      Object.values(row).some((v) => String(v).toLowerCase().includes(q))
    )
  }, [data, query])

  const sorted = useMemo(() => {
    if (!sort.key) return filtered
    const arr = [...filtered]
    arr.sort((a, b) => {
      const res = compare(a[sort.key], b[sort.key], sort.type)
      return sort.dir === 'asc' ? res : -res
    })
    return arr
  }, [filtered, sort])

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize))
  const current = useMemo(() => {
    const start = (page - 1) * pageSize
    return sorted.slice(start, start + pageSize)
  }, [sorted, page, pageSize])

  function toggleSort(col) {
    if (!col.sortable) return
    setPage(1)
    setSort((s) => {
      if (s.key !== col.key) return { key: col.key, dir: 'asc', type: col.sortType || 'string' }
      return { key: col.key, dir: s.dir === 'asc' ? 'desc' : 'asc', type: col.sortType || 'string' }
    })
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <label htmlFor="table-search" className="sr-only">Search</label>
        <input
          id="table-search"
          className="input"
          placeholder={searchPlaceholder}
          value={query}
          onChange={(e) => { setPage(1); setQuery(e.target.value) }}
          aria-label="Search table"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table" role="table" aria-label={ariaLabel}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key}>
                  <button
                    type="button"
                    className={`inline-flex items-center gap-1 ${col.sortable ? 'hover:underline' : 'cursor-default'}`}
                    onClick={() => toggleSort(col)}
                    aria-sort={sort.key === col.key ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none'}
                  >
                    <span>{col.label}</span>
                    {col.sortable && <ChevronUpDownIcon className="h-4 w-4 text-slate-400" aria-hidden="true" />}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {current.map((row) => (
              <tr
                key={row.id || JSON.stringify(row)}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer"
                onClick={() => onRowClick && onRowClick(row)}
                tabIndex={0}
                aria-label="View details"
              >
                {columns.map((col) => (
                  <td key={col.key}>
                    {col.render ? col.render(row[col.key], row) : String(row[col.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xs text-mute">
          Page {page} of {totalPages} • {sorted.length} results
        </p>
        <div className="flex items-center gap-2">
          <button className="btn" onClick={() => setPage(1)} disabled={page === 1} aria-label="First page">«</button>
          <button className="btn" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} aria-label="Previous page">‹</button>
          <button className="btn" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} aria-label="Next page">›</button>
          <button className="btn" onClick={() => setPage(totalPages)} disabled={page === totalPages} aria-label="Last page">»</button>
        </div>
      </div>
    </div>
  )
}


