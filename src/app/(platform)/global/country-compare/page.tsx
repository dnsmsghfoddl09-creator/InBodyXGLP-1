import type { Metadata } from "next";
import { CountryCompare } from "@/components/country-compare/CountryCompare";

export const metadata: Metadata = {
  title: "Country Compare | InBody Global Strategy Intelligence",
  description: "Side-by-side country comparison for GLP-1 market strategy and InBody opportunities",
};

export default function CountryComparePage() {
  return <CountryCompare />;
}
