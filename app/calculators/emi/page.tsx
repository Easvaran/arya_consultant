import EMICalculator from "@/components/calculators/EMICalculator";

export default function GenericEMICalculator() {
  return (
    <EMICalculator 
      title="EMI Calculator"
      description="Quickly calculate your monthly installments for any type of loan with our easy-to-use EMI tool."
      defaultAmount={500000}
      maxAmount={10000000}
      minAmount={10000}
      defaultRate={10.5}
      defaultTenure={36}
      maxTenure={360}
    />
  );
}
