import EMICalculator from "@/components/calculators/EMICalculator";

export default function HomeLoanCalculator() {
  return (
    <EMICalculator 
      title="Home Loan EMI Calculator"
      description="Calculate your monthly home loan EMI. Plan your dream home purchase with our accurate home loan calculator."
      defaultAmount={5000000}
      maxAmount={50000000}
      minAmount={500000}
      defaultRate={8.5}
      defaultTenure={240}
      maxTenure={360}
    />
  );
}
