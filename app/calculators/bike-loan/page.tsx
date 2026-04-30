import EMICalculator from "@/components/calculators/EMICalculator";

export default function BikeLoanCalculatorPage() {
  return (
    <EMICalculator
      title="Bike Loan EMI Calculator"
      description="Calculate your monthly EMI for your new two-wheeler. Plan your purchase with ease and get the best interest rates."
      defaultAmount={100000}
      maxAmount={500000}
      minAmount={20000}
      defaultRate={10.5}
      defaultTenure={36}
      maxTenure={60}
    />
  );
}
