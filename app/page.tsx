import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Percent, Users, TrendingUp, Calculator, Landmark } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-primary to-blue-700 py-32 text-white px-4 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none opacity-20">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium mb-8 border border-white/20">
            <span className="flex h-2 w-2 rounded-full bg-yellow-400 animate-pulse"></span>
            Trusted by over 10,000+ customers
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight">
            Arya Finance & <br />
            <span className="text-blue-200">Loan Services</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-blue-50 max-w-3xl mx-auto leading-relaxed">
            Your trusted partner for loans and financial solutions. Experience the future of digital banking.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/services"
              className="bg-white text-primary px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              Apply Now <ArrowRight size={22} />
            </Link>
            <Link
              href="/calculators"
              className="bg-blue-800/30 backdrop-blur-md border border-white/30 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/10 hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              Explore Calculators
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-gray-50 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose Arya Finance?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We combine cutting-edge technology with personalized financial services to give you the best experience possible.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { 
                title: "Low Interest Rates", 
                desc: "Competitive rates starting from 8.5% p.a. to help you save more on every loan.",
                icon: <Percent className="text-blue-600" size={32} />,
                color: "blue"
              },
              { 
                title: "Instant Approval", 
                desc: "Get your loan approved in minutes with our fully digital, paperless application process.",
                icon: <Zap className="text-yellow-600" size={32} />,
                color: "yellow"
              },
              { 
                title: "Secure Payments", 
                desc: "Your data and transactions are protected with bank-grade encryption and security protocols.",
                icon: <ShieldCheck className="text-green-600" size={32} />,
                color: "green"
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className={`bg-${feature.color}-50 w-20 h-20 rounded-2xl flex items-center justify-center mb-8`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculators Preview Section */}
      <section className="py-32 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Smart Financial Tools</h2>
              <p className="text-gray-600 text-lg">
                Use our professional calculators to plan your loans, investments, and taxes with precision. 
                Get instant results to make informed decisions.
              </p>
            </div>
            <Link 
              href="/calculators" 
              className="group text-primary font-bold flex items-center gap-2 transition-all border-b-2 border-primary pb-2 hover:gap-3"
            >
              View All 18 Calculators <ArrowRight size={22} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Home Loan EMI", href: "/calculators/home-loan", icon: <Calculator className="text-blue-600" /> },
              { title: "SIP Calculator", href: "/calculators/sip", icon: <TrendingUp className="text-green-600" /> },
              { title: "Income Tax", href: "/calculators/income-tax", icon: <Landmark className="text-purple-600" /> },
              { title: "GST Calculator", href: "/calculators/gst", icon: <Percent className="text-orange-600" /> },
            ].map((calc, i) => (
              <Link 
                key={i} 
                href={calc.href}
                className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all group"
              >
                <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  {calc.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{calc.title}</h3>
                <p className="text-gray-500 text-sm mb-6 flex items-center gap-1">
                  Calculate now <ArrowRight size={14} />
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            What Our Customers Say
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-gray-100 p-8 rounded-xl bg-white italic">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center">
                    <Users size={20} className="text-gray-500" />
                  </div>
                  <div>
                    <p className="font-bold not-italic">Customer {i}</p>
                    <p className="text-sm text-gray-500 not-italic">Verified User</p>
                  </div>
                </div>
                &quot;Arya Finance helped me get a loan in minutes! The process was incredibly smooth and transparent.&quot;
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
