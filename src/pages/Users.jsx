import React, { useEffect, useMemo, useState } from 'react'
import DataTable from '../components/DataTable.jsx'
import Modal from '../components/Modal.jsx'
import { getUsers } from '../services/api.js'

export default function Users() {
  const [users, setUsers] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      const data = await getUsers()
      if (!mounted) return
      setUsers(data)
      setLoading(false)
    }
    load()
    return () => { mounted = false }
  }, [])

  const columns = useMemo(() => ([
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role', sortable: true },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true, 
      render: (v) => (
        <span
          className={`inline-flex px-3 py-1 rounded-full text-xs font-medium capitalize ${
            v === 'Active'
              ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
              : v === 'Suspended'
              ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
              : 'bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
          }`}
        >
          {v}
        </span>
      ) 
    },
    { key: 'createdAt', label: 'Created', sortable: true, sortType: 'date' },
    { 
      key: 'actions', 
      label: 'Actions', 
      render: (_, row) => (
        <button 
          className="px-3 py-1.5 rounded-md bg-brand-500 text-white text-sm font-medium hover:bg-brand-600 transition"
          onClick={() => setSelected(row)}
        >
          View Details
        </button>
      ) 
    }
  ]), [])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">👥 Users</h1>
          <p className="text-sm text-slate-500">Manage platform users and view their details.</p>
        </div>
        {loading && (
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span className="h-4 w-4 border-2 border-brand-500 border-t-transparent rounded-full animate-spin"></span>
            Loading…
          </div>
        )}
      </div>

      {/* Users Table */}
      <section className="card p-6 shadow-md rounded-xl border border-slate-200 dark:border-slate-700">
        <DataTable
          ariaLabel="Users table"
          data={users}
          columns={columns}
          pageSize={8}
          searchPlaceholder="🔍 Search users by name, email, or role..."
          onRowClick={(row) => setSelected(row)}
          rowClassName="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
        />
      </section>

      {/* User Details Modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title="User Profile">
        {selected && (
          <div className="space-y-6">
            {/* Profile Header */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="h-20 w-20 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-2xl font-bold shadow">
                {selected.name.charAt(0)}
              </div>
              <div>
                <p className="text-lg font-semibold">{selected.name}</p>
                <p className="text-sm text-slate-500">{selected.email}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  selected.status === 'Active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {selected.status}
              </span>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4 text-sm border-t border-slate-200 pt-4 dark:border-slate-700">
              <div>
                <p className="text-slate-500">User ID</p>
                <p className="font-medium">{selected.id}</p>
              </div>
              <div>
                <p className="text-slate-500">Role</p>
                <p className="font-medium">{selected.role}</p>
              </div>
              <div>
                <p className="text-slate-500">Created</p>
                <p className="font-medium">{selected.createdAt}</p>
              </div>
              <div>
                <p className="text-slate-500">Email</p>
                <p className="font-medium break-all">{selected.email}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
