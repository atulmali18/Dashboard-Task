import React from 'react'
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts'

export default function ChartBar({ data = [], xKey = 'name', bars = [] }) {
  return (
    <div className="h-64" role="img" aria-label="Bar chart">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-slate-800" />
          <XAxis dataKey={xKey} stroke="currentColor" className="text-slate-400" />
          <YAxis stroke="currentColor" className="text-slate-400" />
          <Tooltip />
          <Legend />
          {bars.map((b, idx) => (
            <Bar key={b.dataKey} dataKey={b.dataKey} name={b.name} fill={['#06b6d4', '#0ea5e9', '#22c55e', '#f97316'][idx % 4]} radius={[4, 4, 0, 0]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}


