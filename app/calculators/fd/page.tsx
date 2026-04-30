import BankingCalculator from "@/components/calculators/BankingCalculator";

export default function FDPage() {
  return (
    <BankingCalculator 
      title="Fixed Deposit (FD) Calculator"
      description="Calculate the maturity amount and interest earned on your fixed deposit with different compounding options."
      type="fd"
    />
  );
}
