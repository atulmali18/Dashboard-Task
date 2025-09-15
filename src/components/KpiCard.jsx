import React, { useMemo } from 'react'
import { BanknotesIcon, UserGroupIcon, BoltIcon, UserPlusIcon } from '@heroicons/react/24/outline'

const icons = { BanknotesIcon, UserGroupIcon, BoltIcon, UserPlusIcon }

export default function KpiCard({
	title,
	value,
	delta,
	icon = 'BanknotesIcon',
	sparkData
}) {
	const Icon = icons[icon] || BanknotesIcon

	const data = useMemo(() => {
		if (Array.isArray(sparkData) && sparkData.length > 1) return sparkData
		// fallback small synthetic sparkline
		return [8, 10, 9, 11, 12, 10, 13, 14, 12, 16]
	}, [sparkData])

	const max = Math.max(...data)
	const min = Math.min(...data)
	const points = data
		.map((d, i) => {
			const x = (i / (data.length - 1)) * 100
			const y = 100 - ((d - min) / (max - min || 1)) * 100
			return `${x},${y}`
		})
		.join(' ')

	const isPositive = typeof delta === 'number' ? delta >= 0 : (delta || '').toString().startsWith('+')

	return (
		<div className="card p-4">
			<div className="flex items-start justify-between gap-3">
				<div className="space-y-1">
					<p className="text-sm text-mute">{title}</p>
					<p className="text-2xl font-semibold">{typeof value === 'number' ? value.toLocaleString() : value}</p>
					<p className={`text-xs font-medium ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
						{isPositive ? '▲' : '▼'} {typeof delta === 'number' ? Math.abs(delta).toFixed(1) + '%' : delta}
					</p>
				</div>
				<div className="shrink-0 h-10 w-10 rounded-lg bg-brand-500/10 text-brand-600 flex items-center justify-center">
					<Icon className="h-5 w-5" aria-hidden="true" />
				</div>
			</div>
			<div className="mt-3">
				<svg viewBox="0 0 100 30" className="w-full h-10 overflow-visible" aria-hidden="true">
					<polyline fill="none" stroke="currentColor" className="text-brand-500" strokeWidth="2" points={points.replace(/,(\\d+)/g, ',$1')} />
				</svg>
			</div>
		</div>
	)
}


