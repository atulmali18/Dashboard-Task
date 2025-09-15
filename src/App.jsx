import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'
import KpiCard from './components/KpiCard.jsx'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen flex bg-surface">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((v) => !v)}
      />
      <div className="flex-1 flex flex-col">
        <Navbar onMenu={() => setSidebarOpen((v) => !v)} />
        <main className="p-4 sm:p-6 lg:p-8 space-y-6">
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Dashboard</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <KpiCard title="Revenue" value={128430} delta={5.4} icon="BanknotesIcon" />
            <KpiCard title="Active Users" value={8421} delta={2.1} icon="UserGroupIcon" />
            <KpiCard title="Conversion" value={'3.8%'} delta={-0.4} icon="BoltIcon" />
            <KpiCard title="New Leads" value={392} delta={6.3} icon="UserPlusIcon" />
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
