import InvestmentCalculator from "@/components/calculators/InvestmentCalculator";

export default function LumpSumPage() {
  return (
    <InvestmentCalculator 
      title="Lump Sum Investment Calculator"
      description="Calculate the future value of your one-time investment. See how your capital grows over time with compounding."
      type="lump-sum"
    />
  );
}
