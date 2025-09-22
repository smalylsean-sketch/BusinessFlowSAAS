// components/Features.js
export default function Features() {
  const features = [
    {
      title: "AI-Powered Insights",
      description: "Get intelligent forecasts and explanations of your financial data",
      icon: "📊"
    },
    {
      title: "Multi-Currency & Crypto",
      description: "Manage fiat and cryptocurrency payments in one platform",
      icon: "💱"
    },
    {
      title: "Collaboration Tools",
      description: "Work with your team on financial tasks and approvals",
      icon: "👥"
    },
    {
      title: "Automated Payroll",
      description: "Process payroll with tax calculations and compliance built-in",
      icon: "💰"
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Powerful Features for Your Business</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}