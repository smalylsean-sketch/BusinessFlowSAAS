// components/Testimonials.js
export default function Testimonials() {
  const testimonials = [
    {
      quote: "BusinessFlow transformed how we manage our finances. The AI insights alone have saved us countless hours.",
      author: "Sarah Johnson",
      company: "TechSolutions Inc.",
    },
    {
      quote: "The multi-currency support and crypto integration made international business so much easier for us.",
      author: "Michael Chen",
      company: "Global Imports Ltd.",
    },
    {
      quote: "As a growing startup, having all our financial operations in one platform has been a game-changer.",
      author: "Jessica Williams",
      company: "Nexus Startups",
    }
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mr-4 flex items-center justify-center text-white font-bold">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-gray-600 text-sm">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}