import React from 'react'
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell, Legend } from 'recharts'

const COLORS = ['#06b6d4', '#0ea5e9', '#22c55e', '#f97316', '#a78bfa', '#ef4444']

export default function ChartPie({ data = [], dataKey = 'value', nameKey = 'name' }) {
  return (
    <div className="h-64" role="img" aria-label="Pie chart">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey={dataKey} nameKey={nameKey} outerRadius={90} innerRadius={50} paddingAngle={2}>
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}


