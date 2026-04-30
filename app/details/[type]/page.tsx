"use client";

import LoanApplicationForm from "@/components/LoanApplicationForm";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function LoanDetailsPage({ params }: { params: { type: string } }) {
  const [details, setDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const type = params.type.toLowerCase();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`/api/loan-types/${type}`);
        if (res.ok) {
          const data = await res.json();
          setDetails(data);
        }
      } catch (error) {
        console.error("Failed to fetch loan details");
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [type]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  if (!details) {
    notFound();
  }

  return (
    <LoanApplicationForm
      defaultLoanType={details.type}
      title={details.title}
      description={details.description}
      benefits={details.benefits}
      documents={details.documents}
    />
  );
}
