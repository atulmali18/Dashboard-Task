import React, { useEffect, useState } from 'react'
import ChartLine from '../components/ChartLine.jsx'
import ChartBar from '../components/ChartBar.jsx'
import ChartPie from '../components/ChartPie.jsx'
import { getRevenueTrend, getSalesByProduct, getTrafficSources } from '../services/api.js'

export default function Reports() {
  const [lineData, setLineData] = useState([])
  const [barData, setBarData] = useState([])
  const [pieData, setPieData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      const [r, b, p] = await Promise.all([
        getRevenueTrend(),
        getSalesByProduct(),
        getTrafficSources()
      ])
      if (!mounted) return
      setLineData(r)
      setBarData(b)
      setPieData(p)
      setLoading(false)
    }
    load()
    return () => { mounted = false }
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Reports</h1>

      <section className="card p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Revenue Trend</h2>
          {loading && <span className="text-sm text-mute">Loading…</span>}
        </div>
        <ChartLine data={lineData} xKey="date" yKey="revenue" yLabel="Revenue" />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <section className="card p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Sales by Product</h2>
          </div>
          <ChartBar data={barData} xKey="month" bars={[
            { dataKey: 'alpha', name: 'Alpha' },
            { dataKey: 'beta', name: 'Beta' },
            { dataKey: 'gamma', name: 'Gamma' }
          ]} />
        </section>

        <section className="card p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Traffic Sources</h2>
          </div>
          <ChartPie data={pieData} dataKey="value" nameKey="source" />
        </section>
      </div>
    </div>
  )
}


