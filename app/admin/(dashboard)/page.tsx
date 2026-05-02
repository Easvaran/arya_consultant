"use client";

import { useEffect, useState } from "react";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Loader2,
  FileText,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const [loans, setLoans] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await fetch("/api/admin/loans");
        if (res.ok) {
          const data = await res.json();
          setLoans(data.loans);
        }
      } catch (error) {
        toast.error("Failed to fetch dashboard data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchLoans();
  }, []);

  const stats = {
    total: loans.length,
    pending: loans.filter(l => l.status === "Pending").length,
    approved: loans.filter(l => l.status === "Approved").length,
    rejected: loans.filter(l => l.status === "Rejected").length,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 mb-2">Dashboard Overview</h1>
        <p className="text-slate-500 font-medium">Welcome back to the Arya Finance administration portal.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Applications", value: stats.total, icon: <FileText size={24} />, color: "blue" },
          { label: "Pending Review", value: stats.pending, icon: <Clock size={24} />, color: "amber" },
          { label: "Approved Loans", value: stats.approved, icon: <CheckCircle size={24} />, color: "green" },
          { label: "Rejected Loans", value: stats.rejected, icon: <XCircle size={24} />, color: "red" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 group hover:border-primary/20 transition-all duration-300">
            <div className={`w-14 h-14 bg-${stat.color}-50 text-${stat.color}-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-4xl font-black text-slate-900 tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mt-12">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
            <button className="text-primary font-bold text-sm hover:underline">View All</button>
          </div>
          <div className="space-y-6">
            {loans.slice(0, 5).map((loan) => (
              <div key={loan._id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-primary font-bold">
                    {loan.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{loan.name}</p>
                    <p className="text-sm text-slate-500 font-medium">{loan.loanType} Loan • ₹{Number(loan.loanAmount).toLocaleString()}</p>
                  </div>
                </div>
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold
                  ${loan.status === 'Pending' ? 'bg-amber-100 text-amber-700' : ''}
                  ${loan.status === 'Approved' ? 'bg-green-100 text-green-700' : ''}
                  ${loan.status === 'Rejected' ? 'bg-red-100 text-red-700' : ''}
                `}>
                  {loan.status}
                </span>
              </div>
            ))}
            {loans.length === 0 && (
              <p className="text-center text-slate-400 py-8 font-medium">No recent activity found.</p>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary to-blue-700 p-8 rounded-[2.5rem] text-white shadow-xl shadow-primary/20 flex flex-col justify-between">
          <div>
            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8">
              <TrendingUp size={28} />
            </div>
            <h2 className="text-2xl font-bold mb-4">Growth Statistics</h2>
            <p className="text-white/80 font-medium leading-relaxed">
              Your platform has seen a 12% increase in loan applications compared to last month.
            </p>
          </div>
          <div className="mt-8">
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-5xl font-black">₹{(stats.total * 500000).toLocaleString()}</span>
            </div>
            <p className="text-white/60 text-sm font-bold uppercase tracking-widest">Total Managed Capital</p>
          </div>
        </div>
      </div>
    </div>
  );
}
