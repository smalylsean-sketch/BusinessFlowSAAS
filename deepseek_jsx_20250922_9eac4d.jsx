// pages/index.js
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Testimonials from '../components/Testimonials'
import CTASection from '../components/CTASection'

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Features />
      <Testimonials />
      <CTASection />
    </Layout>
  )
}