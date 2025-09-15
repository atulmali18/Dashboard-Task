import React from 'react'
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'

export default function ChartLine({ data = [], xKey = 'date', yKey = 'value', yLabel = 'Value' }) {
  return (
    <div className="h-64 sm:h-80" role="img" aria-label={`Line chart for ${yLabel}`}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-slate-800" />
          <XAxis dataKey={xKey} stroke="currentColor" className="text-slate-400" />
          <YAxis stroke="currentColor" className="text-slate-400" />
          <Tooltip />
          <Line type="monotone" dataKey={yKey} stroke="#06b6d4" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}


