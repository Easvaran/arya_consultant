"use client";

import { User, Briefcase, Coins, TrendingUp, ArrowRight, Bike, Car, Home, Building2 } from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  // Financial services list
  const services = [
    {
      id: "personal",
      title: "Personal Loan",
      icon: <User className="text-primary" size={40} />,
      description: "Quick cash for your personal needs. Wedding, travel, or medical emergencies.",
      features: ["Up to ₹25 Lakhs", "Salary Person Eligible", "TAT - 2 Days"],
    },
    {
      id: "business",
      title: "Business Loan",
      icon: <Briefcase className="text-primary" size={40} />,
      description: "Grow your business with our flexible financing options for entrepreneurs.",
      features: ["Up to ₹1 Crore", "Collateral Free", "TAT - 3 Days"],
    },
    {
      id: "lap",
      title: "Loan Against Property & HOUSING LOAN",
      icon: <Building2 className="text-primary" size={40} />,
      description: "Lean against property and HOUSING LOAN (LAP). Perfect for business owners and salaried individuals.",
      features: ["Up to ₹5 Crore", "LTV 80%", "Cash/Account Salary/BUSINESS PERSON"],
    },
    {
      id: "bike",
      title: "Bike Loan",
      icon: <Bike className="text-primary" size={40} />,
      description: "Get on the road with our quick and easy bike loans for your favorite two-wheeler.",
      features: ["Up to 95% Funding", "Quick Approval", "Flexible EMIs"],
    },
    {
      id: "car",
      title: "Car Loan",
      icon: <Car className="text-primary" size={40} />,
      description: "Drive your dream car today with our low-interest car loans.",
      features: ["Up to 95% Funding", "New & Used Cars", "Fast Processing"],
    },
  ];

  return (
    <div className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Our Financial Services</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of financial products tailored to meet your unique needs and goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div key={service.id} id={service.id} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="mb-6">{service.icon}</div>
              <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={`/details/${service.id}`}
                className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
              >
                Apply for {service.title} <ArrowRight size={18} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
