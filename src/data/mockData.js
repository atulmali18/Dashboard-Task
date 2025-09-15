export const dashboardStats = {
  revenue: 128430,
  revenueChange: 5.4,
  activeUsers: 8421,
  usersChange: 2.1,
  conversion: '3.8%',
  conversionChange: -0.4,
  newLeads: 392,
  leadsChange: 6.3
}

export const revenueTrend = Array.from({ length: 12 }).map((_, i) => {
  const month = new Date(2024, i, 1)
  return {
    date: month.toLocaleString('en', { month: 'short' }),
    revenue: Math.round(8000 + Math.sin(i / 2) * 2500 + i * 500 + Math.random() * 1000)
  }
})

export const salesByProduct = [
  { month: 'Jan', alpha: 1200, beta: 900, gamma: 600 },
  { month: 'Feb', alpha: 1400, beta: 980, gamma: 700 },
  { month: 'Mar', alpha: 1600, beta: 1200, gamma: 900 },
  { month: 'Apr', alpha: 1800, beta: 1300, gamma: 1000 },
  { month: 'May', alpha: 1900, beta: 1500, gamma: 1100 },
  { month: 'Jun', alpha: 2100, beta: 1700, gamma: 1200 }
]

export const trafficSources = [
  { source: 'Organic', value: 48 },
  { source: 'Paid', value: 22 },
  { source: 'Referral', value: 15 },
  { source: 'Social', value: 10 },
  { source: 'Email', value: 5 }
]

const statuses = ['Paid', 'Pending', 'Failed']
function randomItem(list) { return list[Math.floor(Math.random() * list.length)] }

export const transactions = Array.from({ length: 57 }).map((_, i) => {
  const date = new Date()
  date.setDate(date.getDate() - i)
  return {
    id: `TX-${String(1000 + i)}`,
    customer: ['Alice', 'Bob', 'Charlie', 'Diana', 'Evan', 'Fiona'][i % 6],
    date: date.toISOString().slice(0, 10),
    amount: Math.round(20 + Math.random() * 1000),
    status: randomItem(statuses)
  }
})

// Simple mock users list
export const users = Array.from({ length: 24 }).map((_, i) => {
  const created = new Date()
  created.setDate(created.getDate() - (i * 3))
  const roles = ['Admin', 'Manager', 'Analyst', 'Viewer']
  return {
    id: `U-${100 + i}`,
    name: ['Alice Johnson','Bob Smith','Charlie Nguyen','Diana Patel','Evan Lee','Fiona Garcia','Grace Kim','Henry Chen','Ivy Davis','Jack Wilson','Karen Brown','Leo Martinez'][i % 12],
    email: `user${i}@example.com`,
    role: roles[i % roles.length],
    status: i % 5 === 0 ? 'Inactive' : 'Active',
    createdAt: created.toISOString().slice(0,10)
  }
})


