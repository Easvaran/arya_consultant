import Link from "next/link";
import { 
  Home, 
  Car, 
  Bike,
  Coins, 
  Calculator, 
  UserCheck, 
  Percent, 
  Columns, 
  TrendingUp, 
  Briefcase, 
  RotateCcw, 
  BarChart, 
  Building2, 
  Clock, 
  Target, 
  Receipt, 
  Wallet, 
  BadgePercent 
} from "lucide-react";

const calculatorCategories = [
  {
    title: "Loan & EMI Calculators",
    icon: <Calculator className="text-blue-600" size={24} />,
    calculators: [
      { name: "Home Loan EMI Calculator", href: "/calculators/home-loan", icon: <Home size={18} /> },
      { name: "Car Loan EMI Calculator", href: "/calculators/car-loan", icon: <Car size={18} /> },
      { name: "Bike Loan EMI Calculator", href: "/calculators/bike-loan", icon: <Bike size={18} /> },
      { name: "Gold Loan Calculator", href: "/calculators/gold-loan", icon: <Coins size={18} /> },
      { name: "EMI Calculator (Monthly)", href: "/calculators/emi", icon: <Calculator size={18} /> },
      { name: "Loan Eligibility Calculator", href: "/calculators/eligibility", icon: <UserCheck size={18} /> },
      { name: "Interest Rate Calculator", href: "/calculators/interest-rate", icon: <Percent size={18} /> },
      { name: "Loan Comparison Calculator", href: "/calculators/comparison", icon: <Columns size={18} /> },
    ],
  },
  {
    title: "Investment Calculators",
    icon: <TrendingUp className="text-green-600" size={24} />,
    calculators: [
      { name: "SIP Calculator", href: "/calculators/sip", icon: <TrendingUp size={18} /> },
      { name: "Lump Sum Calculator", href: "/calculators/lump-sum", icon: <Briefcase size={18} /> },
      { name: "Compound Interest Calculator", href: "/calculators/compound-interest", icon: <RotateCcw size={18} /> },
      { name: "ROI Calculator", href: "/calculators/roi", icon: <BarChart size={18} /> },
    ],
  },
  {
    title: "Banking & Savings",
    icon: <Building2 className="text-purple-600" size={24} />,
    calculators: [
      { name: "Fixed Deposit (FD) Calculator", href: "/calculators/fd", icon: <Building2 size={18} /> },
      { name: "Recurring Deposit (RD) Calculator", href: "/calculators/rd", icon: <Clock size={18} /> },
      { name: "Savings Goal Calculator", href: "/calculators/savings-goal", icon: <Target size={18} /> },
    ],
  },
  {
    title: "Tax & Salary",
    icon: <Receipt className="text-orange-600" size={24} />,
    calculators: [
      { name: "Income Tax Calculator", href: "/calculators/income-tax", icon: <Receipt size={18} /> },
      { name: "Salary / Take-home Calculator", href: "/calculators/salary", icon: <Wallet size={18} /> },
      { name: "GST Calculator", href: "/calculators/gst", icon: <BadgePercent size={18} /> },
    ],
  },
];

export default function CalculatorsPage() {
  return (
    <div className="py-20 bg-gray-50 min-h-screen px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Financial Calculators
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Plan your finances with our comprehensive suite of professional calculators. Accurate, fast, and easy to use.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {calculatorCategories.map((category, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex items-center gap-3">
                {category.icon}
                <h2 className="text-xl font-bold text-gray-800">{category.title}</h2>
              </div>
              <div className="p-6 grid sm:grid-cols-1 gap-3">
                {category.calculators.map((calc, cIdx) => (
                  <Link
                    key={cIdx}
                    href={calc.href}
                    className="flex items-center gap-3 p-4 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all group border border-transparent hover:border-blue-100"
                  >
                    <div className="text-gray-400 group-hover:text-blue-500 transition-colors">
                      {calc.icon}
                    </div>
                    <span className="font-medium">{calc.name}</span>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                      <TrendingUp size={16} className="rotate-90" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
