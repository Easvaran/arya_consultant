"use client";

import { useEffect, useState } from "react";
import { 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  X, 
  Loader2,
  Landmark,
  FileText,
  CheckCircle2,
  Minus
} from "lucide-react";
import toast from "react-hot-toast";

export default function LoanTypesPage() {
  const [loanTypes, setLoanTypes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<any>(null);

  const fetchLoanTypes = async () => {
    try {
      const res = await fetch("/api/admin/loan-types");
      if (res.ok) {
        const data = await res.json();
        setLoanTypes(data.loanTypes);
      }
    } catch (error) {
      toast.error("Failed to fetch loan services");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLoanTypes();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this loan service?")) return;
    try {
      const res = await fetch(`/api/admin/loan-types/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Loan service deleted");
        fetchLoanTypes();
      } else {
        toast.error("Failed to delete loan service");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editForm._id ? `/api/admin/loan-types/${editForm._id}` : "/api/admin/loan-types";
    const method = editForm._id ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });

      if (res.ok) {
        toast.success(editForm._id ? "Loan service updated" : "Loan service created");
        fetchLoanTypes();
        setIsEditing(false);
        setEditForm(null);
      } else {
        const error = await res.json();
        toast.error(error.message || "Failed to save loan service");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleAddItem = (field: "benefits" | "documents") => {
    setEditForm({
      ...editForm,
      [field]: [...editForm[field], ""]
    });
  };

  const handleRemoveItem = (field: "benefits" | "documents", index: number) => {
    const newList = [...editForm[field]];
    newList.splice(index, 1);
    setEditForm({ ...editForm, [field]: newList });
  };

  const handleUpdateItem = (field: "benefits" | "documents", index: number, value: string) => {
    const newList = [...editForm[field]];
    newList[index] = value;
    setEditForm({ ...editForm, [field]: newList });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Loan Services</h1>
          <p className="text-slate-500 font-medium">Manage the loan types displayed on the website.</p>
        </div>
        <button
          onClick={() => {
            setEditForm({
              slug: "",
              type: "",
              title: "",
              description: "",
              benefits: [""],
              documents: [""]
            });
            setIsEditing(true);
          }}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
        >
          <Plus size={20} /> Add Service
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loanTypes.map((loan) => (
          <div key={loan._id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-primary/10 rounded-2xl text-primary">
                <Landmark size={24} />
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => {
                    setEditForm(loan);
                    setIsEditing(true);
                  }}
                  className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(loan._id)}
                  className="p-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">{loan.title}</h3>
            <p className="text-sm text-slate-500 font-medium line-clamp-3 mb-6">{loan.description}</p>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <span>Slug: {loan.slug}</span>
              <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
              <span>Type: {loan.type}</span>
            </div>
          </div>
        ))}
      </div>

      {isEditing && editForm && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsEditing(false)}></div>
          <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h2 className="text-xl font-black text-slate-900">{editForm._id ? "Edit Loan Service" : "New Loan Service"}</h2>
              <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                <X size={24} className="text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-8 max-h-[80vh] overflow-y-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Basic Details */}
                <div className="space-y-6">
                  <h3 className="text-xs font-black text-primary uppercase tracking-widest">Basic Configuration</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">Display Type</label>
                        <input
                          type="text"
                          required
                          value={editForm.type}
                          onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-primary outline-none transition-all font-semibold"
                          placeholder="e.g. Personal"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">URL Slug</label>
                        <input
                          type="text"
                          required
                          value={editForm.slug}
                          onChange={(e) => setEditForm({ ...editForm, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                          className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-primary outline-none transition-all font-semibold"
                          placeholder="e.g. personal"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">Page Title</label>
                      <input
                        type="text"
                        required
                        value={editForm.title}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-primary outline-none transition-all font-semibold text-lg"
                        placeholder="e.g. Personal Loan Details"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">Description</label>
                      <textarea
                        rows={4}
                        required
                        value={editForm.description}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-primary outline-none transition-all font-semibold resize-none"
                        placeholder="Detailed description of the loan service..."
                      />
                    </div>
                  </div>
                </div>

                {/* Lists */}
                <div className="space-y-8">
                  {/* Benefits */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xs font-black text-primary uppercase tracking-widest">Key Benefits</h3>
                      <button type="button" onClick={() => handleAddItem("benefits")} className="p-1 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-all">
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="space-y-2">
                      {editForm.benefits.map((benefit: string, idx: number) => (
                        <div key={idx} className="flex gap-2">
                          <input
                            type="text"
                            value={benefit}
                            onChange={(e) => handleUpdateItem("benefits", idx, e.target.value)}
                            className="flex-1 px-4 py-2 rounded-xl border border-slate-200 focus:border-primary outline-none transition-all text-sm"
                            placeholder="Benefit description"
                          />
                          <button type="button" onClick={() => handleRemoveItem("benefits", idx)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                            <Minus size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Documents */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xs font-black text-primary uppercase tracking-widest">Required Documents</h3>
                      <button type="button" onClick={() => handleAddItem("documents")} className="p-1 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-all">
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="space-y-2">
                      {editForm.documents.map((doc: string, idx: number) => (
                        <div key={idx} className="flex gap-2">
                          <input
                            type="text"
                            value={doc}
                            onChange={(e) => handleUpdateItem("documents", idx, e.target.value)}
                            className="flex-1 px-4 py-2 rounded-xl border border-slate-200 focus:border-primary outline-none transition-all text-sm"
                            placeholder="Document name"
                          />
                          <button type="button" onClick={() => handleRemoveItem("documents", idx)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                            <Minus size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex gap-4">
                <button
                  type="submit"
                  className="flex-1 py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                >
                  <Save size={20} /> {editForm._id ? "Save Changes" : "Create Service"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
