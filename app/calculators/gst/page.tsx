import TaxCalculator from "@/components/calculators/TaxCalculator";

export default function GSTPage() {
  return (
    <TaxCalculator 
      title="GST Calculator"
      description="Quickly calculate GST (Goods and Services Tax) for your products or services. Support for both inclusive and exclusive GST."
      type="gst"
    />
  );
}
