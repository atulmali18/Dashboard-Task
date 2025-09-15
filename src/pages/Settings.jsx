import React from 'react'
import ThemeToggle from '../components/ThemeToggle.jsx'

export default function Settings() {
  return (
    <div className="space-y-10 p-8 bg-slate-50 dark:bg-slate-900 min-h-screen">
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">⚙️ Settings</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Customize your preferences and account settings
        </p>
      </header>

      {/* Theme Settings Card */}
      <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg transition hover:shadow-xl">
        <h2 className="text-xl font-semibold mb-5 text-slate-800 dark:text-slate-100">Appearance</h2>
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600 dark:text-slate-300">Theme Mode</span>
          <ThemeToggle />
        </div>
        <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">
          Toggle between Light and Dark modes. Your preference will be saved automatically.
        </p>
      </section>

      {/* Notifications Card */}
      <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg transition hover:shadow-xl">
        <h2 className="text-xl font-semibold mb-5 text-slate-800 dark:text-slate-100">Notifications</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Manage notification preferences and alerts. (Coming soon)
        </p>
      </section>

      {/* Add more cards here */}
    </div>
  )
}
