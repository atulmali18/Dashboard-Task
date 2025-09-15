import React, { useEffect, useMemo, useState } from 'react'
import { getDashboardStats, getRevenueTrend, getSalesByProduct, getTrafficSources, getTransactions } from '../services/api.js'
import KpiCard from '../components/KpiCard.jsx'
import ChartLine from '../components/ChartLine.jsx'
import ChartBar from '../components/ChartBar.jsx'
import ChartPie from '../components/ChartPie.jsx'
import DataTable from '../components/DataTable.jsx'
import Modal from '../components/Modal.jsx'
import { formatCurrency } from '../utils/format.js'

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [lineData, setLineData] = useState([])
  const [barData, setBarData] = useState([])
  const [pieData, setPieData] = useState([])
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedTx, setSelectedTx] = useState(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      const [s, r, b, p, t] = await Promise.all([
        getDashboardStats(),
        getRevenueTrend(),
        getSalesByProduct(),
        getTrafficSources(),
        getTransactions()
      ])
      if (!mounted) return
      setStats(s)
      setLineData(r)
      setBarData(b)
      setPieData(p)
      setTransactions(t)
      setLoading(false)
    }
    load()
    return () => { mounted = false }
  }, [])

  const kpis = useMemo(() => (stats ? [
    { title: 'Revenue', value: stats.revenue, delta: stats.revenueChange, icon: 'BanknotesIcon' },
    { title: 'Active Users', value: stats.activeUsers, delta: stats.usersChange, icon: 'UserGroupIcon' },
    { title: 'Conversion', value: stats.conversion, delta: stats.conversionChange, icon: 'BoltIcon' },
    { title: 'New Leads', value: stats.newLeads, delta: stats.leadsChange, icon: 'UserPlusIcon' }
  ] : []), [stats])

  return (
    <div className="space-y-6">
      <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <KpiCard key={k.title} {...k} loading={loading} />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <section className="card p-4 xl:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Revenue over time</h2>
          </div>
          <ChartLine data={lineData} xKey="date" yKey="revenue" yLabel="Revenue" />
        </section>

        <section className="card p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Traffic sources</h2>
          </div>
          <ChartPie data={pieData} dataKey="value" nameKey="source" />
        </section>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <section className="card p-4 xl:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Monthly sales by product</h2>
          </div>
          <ChartBar data={barData} xKey="month" bars={[
            { dataKey: 'alpha', name: 'Alpha' },
            { dataKey: 'beta', name: 'Beta' },
            { dataKey: 'gamma', name: 'Gamma' }
          ]} />
        </section>

        <section className="card p-4 xl:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Recent transactions</h2>
          </div>
          <DataTable
            ariaLabel="Recent transactions"
            data={transactions}
            columns={[
              { key: 'id', label: 'ID' },
              { key: 'customer', label: 'User' },
              { key: 'date', label: 'Date', sortable: true, sortType: 'date' },
              { key: 'amount', label: 'Amount', sortable: true, sortType: 'number', render: (v) => formatCurrency(v) },
              { key: 'status', label: 'Status', render: (v) => <span className={`badge ${v === 'Paid' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' : v === 'Pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300' : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'}`}>{v}</span> },
              { key: 'actions', label: 'Actions', render: (_, row) => <button className="btn" onClick={() => setSelectedTx(row)}>View</button> }
            ]}
            pageSize={5}
            searchPlaceholder="Search by user or ID..."
            onRowClick={(row) => setSelectedTx(row)}
          />
        </section>
      </div>

      <Modal open={!!selectedTx} onClose={() => setSelectedTx(null)} title="Transaction details">
        {selectedTx && (
          <div className="space-y-2 text-sm">
            <div className="grid grid-cols-2 gap-2">
              <p className="text-mute">ID</p><p className="font-medium">{selectedTx.id}</p>
              <p className="text-mute">User</p><p className="font-medium">{selectedTx.customer}</p>
              <p className="text-mute">Date</p><p className="font-medium">{selectedTx.date}</p>
              <p className="text-mute">Amount</p><p className="font-medium">{formatCurrency(selectedTx.amount)}</p>
              <p className="text-mute">Status</p><p className="font-medium">{selectedTx.status}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}


