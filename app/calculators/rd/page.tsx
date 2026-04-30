import BankingCalculator from "@/components/calculators/BankingCalculator";

export default function RDPage() {
  return (
    <BankingCalculator 
      title="Recurring Deposit (RD) Calculator"
      description="Calculate the maturity value of your monthly recurring deposits. Plan your regular savings effectively."
      type="rd"
    />
  );
}
