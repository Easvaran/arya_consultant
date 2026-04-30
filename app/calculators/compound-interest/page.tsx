import InvestmentCalculator from "@/components/calculators/InvestmentCalculator";

export default function CompoundInterestPage() {
  return (
    <InvestmentCalculator 
      title="Compound Interest Calculator"
      description="Understand the magic of compounding. Calculate how your money grows when interest earns interest."
      type="compound-interest"
    />
  );
}
