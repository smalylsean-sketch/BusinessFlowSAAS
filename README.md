# BusinessFlow SaaS Platform

A modern business management platform built with Next.js, Supabase, and Tailwind CSS.

## Features

- User authentication and authorization
- Dashboard with financial insights
- Invoicing system
- Payroll management
- Multi-currency support
- AI-powered financial insights

## Tech Stack

- **Frontend**: Next.js 13, React 18, Tailwind CSS
- **Backend**: Next.js API Routes, Supabase
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel

## Environment Variables

Copy `.env.local.example` to `.env.local` and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
JWT_SECRET=your_jwt_secret
