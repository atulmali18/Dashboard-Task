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
    { key: 'status', label: 'Status', sortable: true, render: (v) => (
      <span className={`badge ${v === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'}`}>{v}</span>
    ) },
    { key: 'createdAt', label: 'Created', sortable: true, sortType: 'date' },
    { key: 'actions', label: 'Actions', render: (_, row) => <button className="btn" onClick={() => setSelected(row)}>View</button> }
  ]), [])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Users</h1>
        {loading && <span className="text-sm text-mute">Loading…</span>}
      </div>

      <section className="card p-4">
        <DataTable
          ariaLabel="Users table"
          data={users}
          columns={columns}
          pageSize={5}
          searchPlaceholder="Search users..."
          onRowClick={(row) => setSelected(row)}
        />
      </section>

      <Modal open={!!selected} onClose={() => setSelected(null)} title="User details">
        {selected && (
          <div className="text-sm space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <p className="text-mute">ID</p><p className="font-medium">{selected.id}</p>
              <p className="text-mute">Name</p><p className="font-medium">{selected.name}</p>
              <p className="text-mute">Email</p><p className="font-medium">{selected.email}</p>
              <p className="text-mute">Role</p><p className="font-medium">{selected.role}</p>
              <p className="text-mute">Status</p><p className="font-medium">{selected.status}</p>
              <p className="text-mute">Created</p><p className="font-medium">{selected.createdAt}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}


