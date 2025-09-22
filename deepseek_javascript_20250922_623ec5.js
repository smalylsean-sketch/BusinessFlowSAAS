// pages/api/auth/signup.js
import { supabase } from '../../../lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { email, password, name, company } = req.body

    if (!email || !password || !name || !company) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    // Create user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError) {
      return res.status(400).json({ error: authError.message })
    }

    // Create user profile
    const { error: profileError } = await supabase
      .from('users')
      .insert([
        {
          id: authData.user.id,
          email: email,
          name: name,
          role: 'owner',
          company_name: company,
          created_at: new Date().toISOString()
        }
      ])

    if (profileError) {
      return res.status(400).json({ error: 'Failed to create user profile' })
    }

    res.status(201).json({
      success: true,
      message: 'Account created successfully! Please check your email for verification.',
      user: {
        id: authData.user.id,
        email: authData.user.email,
        name: name
      }
    })

  } catch (error) {
    console.error('Signup error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}