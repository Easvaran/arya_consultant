import EMICalculator from "@/components/calculators/EMICalculator";

export default function GoldLoanCalculator() {
  return (
    <EMICalculator 
      title="Gold Loan Calculator"
      description="Estimate your gold loan amount and EMI based on the current gold rate and your requirements."
      defaultAmount={200000}
      maxAmount={2000000}
      minAmount={10000}
      defaultRate={12}
      defaultTenure={12}
      maxTenure={36}
    />
  );
}
