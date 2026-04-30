import EMICalculator from "@/components/calculators/EMICalculator";

export default function CarLoanCalculator() {
  return (
    <EMICalculator 
      title="Car Loan EMI Calculator"
      description="Calculate your monthly car loan EMI. Get the best rates for your new or used vehicle purchase."
      defaultAmount={800000}
      maxAmount={5000000}
      minAmount={100000}
      defaultRate={9.5}
      defaultTenure={60}
      maxTenure={84}
    />
  );
}
