// components/Hero.js
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Streamline Your Business Operations
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          All-in-one platform for invoicing, payroll, reporting, and financial management with AI-powered insights.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/signup" className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-300">
            Get Started Free
          </Link>
          <Link href="/demo" className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition duration-300">
            Request Demo
          </Link>
        </div>
      </div>
    </section>
  )
}