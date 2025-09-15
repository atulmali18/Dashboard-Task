import React from 'react'
import { NavLink } from 'react-router-dom'
import {
	HomeIcon,
	ChartBarIcon,
	UsersIcon,
	Cog6ToothIcon,
	ChevronDoubleLeftIcon,
} from '@heroicons/react/24/outline'

const nav = [
	{ to: '/dashboard', label: 'Dashboard', icon: HomeIcon },
	{ to: '/reports', label: 'Reports', icon: ChartBarIcon },
	{ to: '/users', label: 'Users', icon: UsersIcon },
	{ to: '/settings', label: 'Settings', icon: Cog6ToothIcon }
]

export default function Sidebar({ open = false, onClose, collapsed = false, onToggle }) {
	return (
		<>
			<div
				className={`fixed inset-0 bg-black/30 lg:hidden transition-opacity ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
				aria-hidden={!open}
				onClick={onClose}
			/>
			<aside
				className={`fixed lg:static z-40 h-full lg:min-h-screen ${collapsed ? 'w-20' : 'w-72 lg:w-64'} bg-card border-r border-slate-200/60 dark:border-slate-800 transform transition-transform ease-in-out duration-200 ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
				aria-label="Sidebar"
			>
				<div className="h-14 flex items-center justify-between px-3 border-b border-slate-200/60 dark:border-slate-800">
					<span className={`font-semibold truncate ${collapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>InsightDash</span>
					<button
						aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
						className="btn"
						onClick={onToggle}
						title={collapsed ? 'Expand' : 'Collapse'}
					>
						<ChevronDoubleLeftIcon className={`h-5 w-5 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
					</button>
				</div>
				<nav className="p-3">
					<ul className="space-y-1">
						{nav.map((item) => (
							<li key={item.to}>
								<NavLink
									to={item.to}
									className={({ isActive }) =>
										`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${isActive ? 'bg-brand-500/10 text-brand-700 dark:text-brand-200' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'}`
									}
									onClick={onClose}
									title={item.label}
								>
									<item.icon className="h-5 w-5" aria-hidden="true" />
									<span className={`${collapsed ? 'opacity-0 pointer-events-none w-0' : 'opacity-100 w-auto'} transition-opacity duration-150`}>
										{item.label}
									</span>
								</NavLink>
							</li>
						))}
					</ul>
				</nav>
			</aside>
		</>
	)
}


