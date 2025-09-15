import React, { useEffect, useState } from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'

export default function ThemeToggle() {
	const [theme, setTheme] = useState(() => {
		const stored = localStorage.getItem('theme')
		if (stored) return stored
		const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
		return prefersDark ? 'dark' : 'light'
	})

	useEffect(() => {
		if (theme === 'dark') {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}
		localStorage.setItem('theme', theme)
	}, [theme])

	function toggle() {
		setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
	}

	return (
		<button
			className="btn"
			onClick={toggle}
			aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
			title="Toggle theme"
		>
			{theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
			<span className="hidden sm:inline">{theme === 'dark' ? 'Light' : 'Dark'}</span>
		</button>
	)
}


