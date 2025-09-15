import React from 'react'
import ThemeToggle from '../components/ThemeToggle.jsx'

export default function Settings() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Settings</h1>
      <section className="card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold">Appearance</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">Toggle light/dark themes</p>
          </div>
          <ThemeToggle />
        </div>
      </section>
    </div>
  )
}


