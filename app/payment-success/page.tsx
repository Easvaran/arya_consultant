"use client";

import Link from "next/link";
import { CheckCircle2, ArrowRight, Download } from "lucide-react";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function PaymentSuccessContent() {
  const [details, setDetails] = useState<any>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Simulate fetching transaction details
    setDetails({
      transactionId: searchParams.get("id") || "TXN" + Math.random().toString(36).substr(2, 9).toUpperCase(),
      amount: searchParams.get("amount") || "5,000",
      date: new Date().toLocaleDateString(),
      status: "Successful",
    });
  }, [searchParams]);

  return (
    <div className="max-w-md w-full bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 text-center">
      <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
        <CheckCircle2 className="text-green-600" size={56} />
      </div>
      
      <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
      <p className="text-gray-500 mb-10">Your transaction has been processed successfully.</p>

      <div className="bg-gray-50 rounded-2xl p-6 mb-10 text-left space-y-4">
        <div className="flex justify-between border-b border-gray-200 pb-3">
          <span className="text-gray-500 text-sm">Transaction ID</span>
          <span className="font-bold text-sm">{details?.transactionId}</span>
        </div>
        <div className="flex justify-between border-b border-gray-200 pb-3">
          <span className="text-gray-500 text-sm">Amount Paid</span>
          <span className="font-bold text-sm text-green-600">₹{details?.amount}</span>
        </div>
        <div className="flex justify-between border-b border-gray-200 pb-3">
          <span className="text-gray-500 text-sm">Date</span>
          <span className="font-bold text-sm">{details?.date}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 text-sm">Status</span>
          <span className="font-bold text-sm text-green-600">{details?.status}</span>
        </div>
      </div>

      <div className="space-y-4">
        <button className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-black transition-all">
          <Download size={20} /> Download Receipt
        </button>
        <Link
          href="/"
          className="w-full flex items-center justify-center gap-2 bg-primary/10 text-primary py-4 rounded-xl font-bold hover:bg-primary/20 transition-all"
        >
          Back to Home <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <Suspense fallback={<div className="text-center">Loading...</div>}>
        <PaymentSuccessContent />
      </Suspense>
    </div>
  );
}
