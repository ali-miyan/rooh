import { Truck, Shield, RotateCcw, Headphones } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Free shipping all over India",
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "100% secure payment processing",
    },
    {
      icon: RotateCcw,
      title: "No Returns",
      description: "No Returns and Refunds",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Dedicated customer support team",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 theme-primary rounded-full mb-4 group-hover:scale-110 transition-transform duration-200">
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
