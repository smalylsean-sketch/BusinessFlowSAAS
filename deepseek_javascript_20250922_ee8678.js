// pages/api/dashboard.js
import { supabase } from '../../lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    // Mock data for demo
    const stats = {
      totalRevenue: 24500,
      profit: 8200,
      pendingInvoices: 12,
      payrollDue: '3 days'
    }

    const recentActivity = [
      {
        id: 1,
        type: 'invoice',
        description: 'Invoice #INV-0025 created',
        amount: 2500,
        date: '2023-08-10',
        client: 'TechCorp Inc.',
        status: 'paid'
      },
      {
        id: 2,
        type: 'payroll',
        description: 'Payroll processed',
        amount: 18750,
        date: '2023-08-05',
        client: '12 employees',
        status: 'completed'
      }
    ]

    res.json({
      success: true,
      stats,
      recentActivity
    })

  } catch (error) {
    console.error('Dashboard error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}