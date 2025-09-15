import React, { useMemo, useState } from 'react'
import { ChevronUpDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

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
    <div className="space-y-4">
      {/* Search */}
      <div className="relative w-full max-w-xs">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          id="table-search"
          className="w-full pl-9 pr-3 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          placeholder={searchPlaceholder}
          value={query}
          onChange={(e) => { setPage(1); setQuery(e.target.value) }}
          aria-label="Search table"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-100 dark:bg-slate-800/70 text-slate-700 dark:text-slate-200 text-xs uppercase">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 font-semibold">
                  <button
                    type="button"
                    className={`inline-flex items-center gap-1 ${col.sortable ? 'hover:text-brand-500' : 'cursor-default'}`}
                    onClick={() => toggleSort(col)}
                    aria-sort={sort.key === col.key ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none'}
                  >
                    <span>{col.label}</span>
                    {col.sortable && (
                      <ChevronUpDownIcon
                        className={`h-4 w-4 transition ${
                          sort.key === col.key ? 'text-brand-500' : 'text-slate-400'
                        }`}
                      />
                    )}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {current.length > 0 ? (
              current.map((row, idx) => (
                <tr
                  key={row.id || idx}
                  className={`border-t border-slate-100 dark:border-slate-700 ${
                    idx % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-800/40'
                  } hover:bg-brand-50 dark:hover:bg-brand-900/30 transition cursor-pointer`}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3">
                      {col.render ? col.render(row[col.key], row) : String(row[col.key])}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-4 py-6 text-center text-slate-500">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">
          Page {page} of {totalPages} • {sorted.length} results
        </p>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 rounded-md border text-sm disabled:opacity-40"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
          <button
            className="px-3 py-1 rounded-md border text-sm disabled:opacity-40"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
