import type { Metadata } from "next";
import { CountryExplorer } from "@/components/country-explorer/CountryExplorer";

export const metadata: Metadata = {
  title: "Country Explorer | InBody Global Strategy Intelligence",
  description: "Deep-dive intelligence by country and region for GLP-1 market strategy",
};

export default function CountryExplorerPage() {
  return <CountryExplorer />;
}
