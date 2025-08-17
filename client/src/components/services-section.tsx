import { Tv, Megaphone, Music, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ServicesSection() {
  const services = [
    {
      icon: Tv,
      title: "TV Programme Production",
      description: "Professional production of Punjabi music shows for Doordarshan broadcasting, featuring authentic cultural content.",
      features: [
        "3 shows per week on Doordarshan",
        "Professional studio recording",
        "Cultural authenticity guaranteed"
      ]
    },
    {
      icon: Megaphone,
      title: "Advertisement Agency",
      description: "Licensed advertising services with Doordarshan, helping businesses reach Punjabi audiences effectively.",
      features: [
        "Doordarshan licensed agency",
        "Targeted Punjabi audience",
        "Cultural marketing expertise"
      ]
    },
    {
      icon: Music,
      title: "Artist Promotion",
      description: "Comprehensive promotion services for Punjabi singers and musicians on national television.",
      features: [
        "National TV exposure",
        "YouTube channel integration",
        "Professional production quality"
      ]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-punjabi-cream to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-poppins font-bold text-punjabi-dark mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional TV production and advertising solutions for Punjabi music industry
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="bg-white shadow-lg hover:shadow-2xl transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="text-4xl text-punjabi-orange mb-4 group-hover:scale-110 transition-transform">
                  <service.icon className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-poppins font-semibold text-punjabi-dark mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                <ul className="text-sm text-gray-500 space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-4 w-4 text-punjabi-gold mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
