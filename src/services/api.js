import axios from 'axios'
import { dashboardStats, revenueTrend, salesByProduct, trafficSources, transactions, users } from '../data/mockData.js'

// Simulated API layer. Each call returns a Promise with slight delay.

function simulate(data, delay = 400) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(JSON.parse(JSON.stringify(data))), delay)
  })
}

// Example usage of axios to show structure (not actually calling a server)
export async function ping() {
  try {
    await axios.get('https://httpbin.org/get', { timeout: 1500 })
    return true
  } catch {
    return false
  }
}

export function getDashboardStats() {
  return simulate(dashboardStats, 300)
}

export function getRevenueTrend() {
  return simulate(revenueTrend, 350)
}

export function getSalesByProduct() {
  return simulate(salesByProduct, 350)
}

export function getTrafficSources() {
  return simulate(trafficSources, 300)
}

export function getTransactions() {
  return simulate(transactions, 450)
}

export function getUsers() {
  return simulate(users, 350)
}


