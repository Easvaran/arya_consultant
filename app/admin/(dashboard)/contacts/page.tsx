"use client";

import { useEffect, useState } from "react";
import { 
  Mail, 
  User, 
  Calendar, 
  Trash2, 
  CheckCircle, 
  Clock, 
  Loader2,
  Search,
  MessageSquare,
  X
} from "lucide-react";
import toast from "react-hot-toast";

export default function ContactMessagesPage() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<any>(null);

  const fetchSubmissions = async () => {
    try {
      const res = await fetch("/api/admin/contacts");
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data.submissions);
      }
    } catch (error) {
      toast.error("Failed to fetch messages");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        toast.success(`Message marked as ${status.toLowerCase()}`);
        fetchSubmissions();
        if (selectedMessage?._id === id) {
          setSelectedMessage({ ...selectedMessage, status });
        }
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const deleteSubmission = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Message deleted");
        fetchSubmissions();
        if (selectedMessage?._id === id) {
          setSelectedMessage(null);
        }
      }
    } catch (error) {
      toast.error("Failed to delete message");
    }
  };

  const filteredSubmissions = submissions.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <h1 className="text-3xl font-black text-slate-900 mb-2">Contact Messages</h1>
        <p className="text-slate-500 font-medium">Manage and respond to user inquiries.</p>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-100 bg-slate-50/30">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border-2 border-slate-100 focus:border-primary focus:ring-0 outline-none transition-all font-semibold"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-xs font-black uppercase tracking-[0.2em]">
                <th className="px-8 py-6">Sender</th>
                <th className="px-8 py-6">Subject</th>
                <th className="px-8 py-6">Date</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSubmissions.map((s) => (
                <tr key={s._id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div>
                      <p className="font-bold text-slate-900">{s.name}</p>
                      <p className="text-xs text-slate-400 font-medium">{s.email}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="font-semibold text-slate-700 line-clamp-1">{s.subject}</p>
                  </td>
                  <td className="px-8 py-6 text-slate-500 text-sm">
                    {new Date(s.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 w-fit
                      ${s.status === 'New' ? 'bg-blue-100 text-blue-700' : ''}
                      ${s.status === 'Read' ? 'bg-amber-100 text-amber-700' : ''}
                      ${s.status === 'Replied' ? 'bg-green-100 text-green-700' : ''}
                    `}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setSelectedMessage(s)}
                        className="p-3 bg-slate-100 text-slate-600 hover:bg-primary hover:text-white rounded-xl transition-all"
                        title="View Message"
                      >
                        <MessageSquare size={18} />
                      </button>
                      <button
                        onClick={() => deleteSubmission(s._id)}
                        className="p-3 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-all"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredSubmissions.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-slate-400 font-bold uppercase tracking-widest">
                    No messages found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedMessage(null)}></div>
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h2 className="text-xl font-black text-slate-900">Message Details</h2>
              <button onClick={() => setSelectedMessage(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                <X size={24} className="text-slate-500" />
              </button>
            </div>
            
            <div className="p-8 space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-black text-primary uppercase tracking-widest mb-1">From</p>
                    <p className="font-bold text-slate-900 text-lg">{selectedMessage.name}</p>
                    <p className="text-slate-500 font-medium">{selectedMessage.email}</p>
                  </div>
                  <div>
                    <p className="text-xs font-black text-primary uppercase tracking-widest mb-1">Date</p>
                    <p className="font-bold text-slate-900">{new Date(selectedMessage.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-black text-primary uppercase tracking-widest mb-1">Subject</p>
                  <p className="font-bold text-slate-900 text-lg">{selectedMessage.subject}</p>
                  <div className="mt-4">
                    <p className="text-xs font-black text-primary uppercase tracking-widest mb-1">Status</p>
                    <select 
                      value={selectedMessage.status}
                      onChange={(e) => updateStatus(selectedMessage._id, e.target.value)}
                      className="px-4 py-2 rounded-xl border-2 border-slate-100 font-bold text-sm outline-none focus:border-primary transition-all"
                    >
                      <option value="New">New</option>
                      <option value="Read">Read</option>
                      <option value="Replied">Replied</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs font-black text-primary uppercase tracking-widest mb-3">Message</p>
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-slate-700 leading-relaxed font-medium">
                  {selectedMessage.message}
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex gap-4">
              <button
                onClick={() => setSelectedMessage(null)}
                className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-primary transition-all"
              >
                Close
              </button>
              <button
                onClick={() => deleteSubmission(selectedMessage._id)}
                className="py-4 px-6 bg-red-50 text-red-600 rounded-2xl font-bold hover:bg-red-100 transition-all"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
