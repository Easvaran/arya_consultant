"use client";

import { useEffect, useState } from "react";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Loader2,
  Search,
  FileText,
  Mail,
  Phone as PhoneIcon,
  Calendar,
  User,
  MapPin,
  Briefcase,
  X,
  Trash2,
  Edit,
  Save
} from "lucide-react";
import toast from "react-hot-toast";

export default function ApplicationsPage() {
  const [loans, setLoans] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedLoan, setSelectedLoan] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<any>(null);

  const fetchLoans = async () => {
    try {
      const res = await fetch("/api/admin/loans");
      if (res.ok) {
        const data = await res.json();
        setLoans(data.loans);
      }
    } catch (error) {
      toast.error("Failed to fetch loans");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const updateLoanStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/loans/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        toast.success(`Loan ${newStatus.toLowerCase()} successfully`);
        fetchLoans();
      } else {
        toast.error("Failed to update loan status");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this application?")) return;

    try {
      const res = await fetch(`/api/admin/loans/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Application deleted successfully");
        fetchLoans();
        if (selectedLoan?._id === id) setSelectedLoan(null);
      } else {
        toast.error("Failed to delete application");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/admin/loans/${editForm._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });

      if (res.ok) {
        toast.success("Application updated successfully");
        fetchLoans();
        setIsEditing(false);
        setEditForm(null);
        if (selectedLoan?._id === editForm._id) {
          const updatedLoan = await res.json();
          setSelectedLoan(updatedLoan.loan);
        }
      } else {
        toast.error("Failed to update application");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const filteredLoans = loans.filter((loan) => {
    const matchesSearch = 
      loan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.loanType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || loan.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

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
        <h1 className="text-3xl font-black text-slate-900 mb-2">Loan Applications</h1>
        <p className="text-slate-500 font-medium">Review and manage incoming loan requests.</p>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row gap-6 justify-between bg-slate-50/30">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border-2 border-slate-100 focus:border-primary focus:ring-0 outline-none transition-all font-semibold"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-6 py-4 rounded-2xl border-2 border-slate-100 focus:border-primary outline-none bg-white font-bold text-slate-700 min-w-[180px]"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-xs font-black uppercase tracking-[0.2em]">
                <th className="px-8 py-6">Applicant</th>
                <th className="px-8 py-6">Type & Tenure</th>
                <th className="px-8 py-6">Financials</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLoans.map((loan) => (
                <tr key={loan._id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                        {loan.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{loan.name}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-slate-400 flex items-center gap-1"><Mail size={12}/> {loan.email}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1">
                      <p className="font-bold text-slate-700">{loan.loanType} Loan</p>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{loan.loanTenure} Years</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1">
                      <p className="font-black text-slate-900 text-lg">₹{Number(loan.loanAmount).toLocaleString()}</p>
                      <p className="text-xs font-bold text-primary/70">Income: ₹{Number(loan.monthlyIncome).toLocaleString()}/mo</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 w-fit
                      ${loan.status === 'Pending' ? 'bg-amber-100 text-amber-700' : ''}
                      ${loan.status === 'Approved' ? 'bg-green-100 text-green-700' : ''}
                      ${loan.status === 'Rejected' ? 'bg-red-100 text-red-700' : ''}
                    `}>
                      <div className={`w-1.5 h-1.5 rounded-full 
                        ${loan.status === 'Pending' ? 'bg-amber-500' : ''}
                        ${loan.status === 'Approved' ? 'bg-green-500' : ''}
                        ${loan.status === 'Rejected' ? 'bg-red-500' : ''}
                      `}></div>
                      {loan.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {loan.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => updateLoanStatus(loan._id, "Approved")}
                            className="p-3 bg-green-50 text-green-600 hover:bg-green-600 hover:text-white rounded-xl transition-all"
                            title="Approve"
                          >
                            <CheckCircle size={20} />
                          </button>
                          <button
                            onClick={() => updateLoanStatus(loan._id, "Rejected")}
                            className="p-3 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-all"
                            title="Reject"
                          >
                            <XCircle size={20} />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => setSelectedLoan(loan)}
                        className="p-3 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-xl transition-all"
                        title="View Details"
                      >
                        <FileText size={20} />
                      </button>
                      <button
                        onClick={() => {
                          setEditForm(loan);
                          setIsEditing(true);
                        }}
                        className="p-3 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all"
                        title="Edit Application"
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(loan._id)}
                        className="p-3 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-all"
                        title="Delete Application"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredLoans.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                        <Search size={40} />
                      </div>
                      <p className="text-slate-400 font-bold uppercase tracking-widest">No applications found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && editForm && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => {
              setIsEditing(false);
              setEditForm(null);
            }}
          ></div>
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h2 className="text-xl font-black text-slate-900">Edit Application</h2>
              <button 
                onClick={() => {
                  setIsEditing(false);
                  setEditForm(null);
                }}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X size={24} className="text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-8 max-h-[70vh] overflow-y-auto">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xs font-black text-primary uppercase tracking-widest">Personal Info</h3>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">Full Name</label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-primary outline-none transition-all font-semibold text-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">Email</label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-primary outline-none transition-all font-semibold text-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">Phone</label>
                    <input
                      type="text"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-primary outline-none transition-all font-semibold text-slate-700"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xs font-black text-primary uppercase tracking-widest">Loan Info</h3>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">Loan Amount</label>
                    <input
                      type="number"
                      value={editForm.loanAmount}
                      onChange={(e) => setEditForm({ ...editForm, loanAmount: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-primary outline-none transition-all font-semibold text-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">Loan Tenure (Years)</label>
                    <input
                      type="text"
                      value={editForm.loanTenure}
                      onChange={(e) => setEditForm({ ...editForm, loanTenure: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-primary outline-none transition-all font-semibold text-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">Status</label>
                    <select
                      value={editForm.status}
                      onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-primary outline-none transition-all font-semibold text-slate-700"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <button
                  type="submit"
                  className="flex-1 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                >
                  <Save size={20} /> Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setEditForm(null);
                  }}
                  className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {selectedLoan && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setSelectedLoan(null)}
          ></div>
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  {selectedLoan.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900">Application Details</h2>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">ID: {selectedLoan._id}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => {
                    setEditForm(selectedLoan);
                    setIsEditing(true);
                  }}
                  className="p-2 hover:bg-blue-50 text-blue-600 rounded-full transition-colors"
                  title="Edit"
                >
                  <Edit size={20} />
                </button>
                <button 
                  onClick={() => handleDelete(selectedLoan._id)}
                  className="p-2 hover:bg-red-50 text-red-600 rounded-full transition-colors"
                  title="Delete"
                >
                  <Trash2 size={20} />
                </button>
                <button 
                  onClick={() => setSelectedLoan(null)}
                  className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                >
                  <X size={24} className="text-slate-500" />
                </button>
              </div>
            </div>

            <div className="p-8 max-h-[70vh] overflow-y-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Personal Section */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-4">Personal Info</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <User size={18} className="text-slate-400" />
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase">Full Name</p>
                          <p className="font-bold text-slate-700">{selectedLoan.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar size={18} className="text-slate-400" />
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase">Date of Birth</p>
                          <p className="font-bold text-slate-700">{new Date(selectedLoan.dob).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <User size={18} className="text-slate-400" />
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase">Gender</p>
                          <p className="font-bold text-slate-700">{selectedLoan.gender}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-4">Contact Details</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Mail size={18} className="text-slate-400" />
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase">Email Address</p>
                          <p className="font-bold text-slate-700">{selectedLoan.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <PhoneIcon size={18} className="text-slate-400" />
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase">Phone Number</p>
                          <p className="font-bold text-slate-700">{selectedLoan.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin size={18} className="text-slate-400 mt-1" />
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase">Address</p>
                          <p className="font-bold text-slate-700 leading-relaxed">{selectedLoan.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Loan Section */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-4">Loan Details</h3>
                    <div className="space-y-4 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase">Requested Amount</p>
                        <p className="text-2xl font-black text-slate-900">₹{Number(selectedLoan.loanAmount).toLocaleString()}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase">Loan Type</p>
                          <p className="font-bold text-slate-700">{selectedLoan.loanType}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase">Tenure</p>
                          <p className="font-bold text-slate-700">{selectedLoan.loanTenure} Years</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-4">Financial Status</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Briefcase size={18} className="text-slate-400" />
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase">Employment</p>
                          <p className="font-bold text-slate-700">{selectedLoan.employmentType}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-[18px] h-[18px] border-2 border-slate-400 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-400">₹</div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase">Monthly Income</p>
                          <p className="font-bold text-slate-700">₹{Number(selectedLoan.monthlyIncome).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex gap-4">
              {selectedLoan.status === 'Pending' ? (
                <>
                  <button
                    onClick={() => {
                      updateLoanStatus(selectedLoan._id, "Approved");
                      setSelectedLoan(null);
                    }}
                    className="flex-1 py-4 bg-green-600 text-white rounded-2xl font-bold shadow-lg shadow-green-200 hover:bg-green-700 transition-all"
                  >
                    Approve Application
                  </button>
                  <button
                    onClick={() => {
                      updateLoanStatus(selectedLoan._id, "Rejected");
                      setSelectedLoan(null);
                    }}
                    className="flex-1 py-4 bg-red-50 text-red-600 rounded-2xl font-bold hover:bg-red-100 transition-all"
                  >
                    Reject Application
                  </button>
                </>
              ) : (
                <div className={`w-full py-4 rounded-2xl font-bold text-center
                  ${selectedLoan.status === 'Approved' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}
                `}>
                  This application has been {selectedLoan.status.toLowerCase()}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
