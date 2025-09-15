import React, { useState } from 'react'
import { Bars3Icon, MagnifyingGlassIcon, ChevronDownIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import ThemeToggle from './ThemeToggle.jsx'

export default function Navbar({ title = 'InsightDash', onMenu }) {
	const [open, setOpen] = useState(false)

	return (
		<header className="sticky top-0 z-30 border-b border-slate-200/60 dark:border-slate-800 bg-card/80 backdrop-blur">
			<div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-3">
				<div className="flex items-center gap-2">
					<button
						className="btn lg:hidden"
						aria-label="Open navigation menu"
						onClick={onMenu}
					>
						<Bars3Icon className="h-5 w-5" />
					</button>
					<span className="inline-flex items-center gap-2 font-semibold">
						<span className="h-2.5 w-2.5 rounded-full bg-brand-500 shadow-[0_0_0_3px_rgba(6,182,212,0.2)]" aria-hidden="true"></span>
						<span>{title}</span>
					</span>
				</div>

				<div className="flex-1 max-w-xl hidden md:flex items-center">
					<label htmlFor="global-search" className="sr-only">Search</label>
					<div className="relative w-full">
						<MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
						<input
							id="global-search"
							type="text"
							placeholder="Search…"
							className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
						/>
					</div>
				</div>

				<div className="flex items-center gap-2">
					<ThemeToggle />
					<div className="relative">
						<button
							className="btn"
							aria-haspopup="menu"
							aria-expanded={open}
							onClick={() => setOpen((v) => !v)}
							title="Account"
						>
							<UserCircleIcon className="h-5 w-5" />
							<span className="hidden sm:inline">Account</span>
							<ChevronDownIcon className="h-4 w-4" />
						</button>
						{open && (
							<div
								className="absolute right-0 mt-2 w-40 card p-1"
								role="menu"
								aria-label="Profile menu"
							>
								<button className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 text-sm" role="menuitem">
									Profile (stub)
								</button>
								<button className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 text-sm" role="menuitem">
									Sign out (stub)
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	)
}


