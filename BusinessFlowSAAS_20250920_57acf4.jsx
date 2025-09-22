// pages/index.js
import Head from 'next/head'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Testimonials from '../components/Testimonials'
import CTASection from '../components/CTASection'

export default function Home() {
  return (
    <div>
      <Head>
        <title>BusinessFlow - Modern Business Management</title>
        <meta name="description" content="All-in-one business management platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero />
      <Features />
      <Testimonials />
      <CTASection />
    </div>
  )
}