import { ShieldCheck, Target, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">About Arya Finance</h1>
        
        <div className="prose prose-lg mx-auto text-gray-600 mb-16 text-center">
          <p>
            Founded in 2010, Arya Finance has been at the forefront of digital lending and financial services. 
            Our mission is to make credit accessible, affordable, and transparent for everyone. 
            We believe in empowering individuals and businesses to achieve their dreams without financial hurdles.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="text-primary" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Our Mission</h3>
            <p className="text-gray-500">To simplify finance through technology and trust.</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="text-primary" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Security</h3>
            <p className="text-gray-500">Bank-grade encryption for all your data.</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="text-primary" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Trust</h3>
            <p className="text-gray-500">Serving over 1 million happy customers.</p>
          </div>
        </div>

        <div className="bg-gray-50 p-10 rounded-2xl border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-center">Why Trust Us?</h2>
          <div className="space-y-4">
            <p className="flex items-start gap-3">
              <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs mt-1">✓</span>
              <span>Fully regulated and compliant with international financial standards.</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs mt-1">✓</span>
              <span>Transparent pricing with no hidden charges or processing fees.</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs mt-1">✓</span>
              <span>Dedicated customer support available 24/7 to assist you.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
