import TaxCalculator from "@/components/calculators/TaxCalculator";

export default function IncomeTaxPage() {
  return (
    <TaxCalculator 
      title="Income Tax Calculator"
      description="Estimate your annual income tax liability and see how deductions can help you save more on taxes."
      type="income-tax"
    />
  );
}
