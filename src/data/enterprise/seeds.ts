import type { CountryId } from "@/data/countries";
import type { CoverageLevel, MarketMaturity } from "@/types/common";

export type CountrySeed = {
  marketSizeUsd: number;
  marketSize: string;
  forecast: string;
  growth: string;
  population: string;
  popM: number;
  obesity: string;
  diabetes: string;
  maturity: MarketMaturity;
  coverage: CoverageLevel;
  monthlyCost: string;
  score: number;
  currency: string;
  language: string;
  subsidiary: string | null;
};

export const COUNTRY_SEEDS: Record<CountryId, CountrySeed> = {
  "south-korea": { marketSizeUsd: 1.8, marketSize: "$1.8B", forecast: "$3.2B by 2028", growth: "+22%", population: "51.7M", popM: 51.7, obesity: "38.4%", diabetes: "13.8%", maturity: "Developing", coverage: "Partial", monthlyCost: "₩280K–450K", score: 91, currency: "KRW", language: "Korean", subsidiary: "InBody Korea" },
  japan: { marketSizeUsd: 3.4, marketSize: "$3.4B", forecast: "$5.8B by 2028", growth: "+18%", population: "124.8M", popM: 124.8, obesity: "33.2%", diabetes: "11.2%", maturity: "Developing", coverage: "Partial", monthlyCost: "¥45K–80K", score: 88, currency: "JPY", language: "Japanese", subsidiary: "InBody Japan" },
  china: { marketSizeUsd: 8.2, marketSize: "$8.2B", forecast: "$18B by 2028", growth: "+31%", population: "1.41B", popM: 1410, obesity: "34.3%", diabetes: "12.4%", maturity: "Emerging", coverage: "Limited", monthlyCost: "¥1.2K–2.8K", score: 85, currency: "CNY", language: "Mandarin", subsidiary: "InBody China" },
  taiwan: { marketSizeUsd: 0.62, marketSize: "$620M", forecast: "$1.1B by 2028", growth: "+16%", population: "23.6M", popM: 23.6, obesity: "27.8%", diabetes: "11.8%", maturity: "Developing", coverage: "Partial", monthlyCost: "NT$12K–22K", score: 79, currency: "TWD", language: "Mandarin", subsidiary: null },
  singapore: { marketSizeUsd: 0.48, marketSize: "$480M", forecast: "$820M by 2028", growth: "+14%", population: "5.9M", popM: 5.9, obesity: "29.1%", diabetes: "9.5%", maturity: "Mature", coverage: "Broad", monthlyCost: "S$800–1,400", score: 82, currency: "SGD", language: "English", subsidiary: null },
  thailand: { marketSizeUsd: 0.94, marketSize: "$940M", forecast: "$1.9B by 2028", growth: "+19%", population: "71.8M", popM: 71.8, obesity: "42.3%", diabetes: "10.9%", maturity: "Emerging", coverage: "Limited", monthlyCost: "฿8K–15K", score: 74, currency: "THB", language: "Thai", subsidiary: null },
  vietnam: { marketSizeUsd: 0.42, marketSize: "$420M", forecast: "$1.1B by 2028", growth: "+24%", population: "99.5M", popM: 99.5, obesity: "19.4%", diabetes: "6.8%", maturity: "Emerging", coverage: "Limited", monthlyCost: "₫3.5M–6M", score: 71, currency: "VND", language: "Vietnamese", subsidiary: null },
  indonesia: { marketSizeUsd: 1.1, marketSize: "$1.1B", forecast: "$3.4B by 2028", growth: "+26%", population: "277.5M", popM: 277.5, obesity: "21.8%", diabetes: "7.4%", maturity: "Emerging", coverage: "Limited", monthlyCost: "Rp 2.5M–4.5M", score: 76, currency: "IDR", language: "Indonesian", subsidiary: null },
  malaysia: { marketSizeUsd: 0.68, marketSize: "$680M", forecast: "$1.3B by 2028", growth: "+17%", population: "34.3M", popM: 34.3, obesity: "45.6%", diabetes: "13.1%", maturity: "Developing", coverage: "Partial", monthlyCost: "RM 1.2K–2.2K", score: 77, currency: "MYR", language: "Malay", subsidiary: null },
  philippines: { marketSizeUsd: 0.52, marketSize: "$520M", forecast: "$1.2B by 2028", growth: "+21%", population: "115.6M", popM: 115.6, obesity: "37.2%", diabetes: "8.6%", maturity: "Emerging", coverage: "Limited", monthlyCost: "₱18K–32K", score: 70, currency: "PHP", language: "Filipino", subsidiary: null },
  india: { marketSizeUsd: 2.8, marketSize: "$2.8B", forecast: "$7.2B by 2028", growth: "+28%", population: "1.43B", popM: 1430, obesity: "22.9%", diabetes: "11.4%", maturity: "Emerging", coverage: "Limited", monthlyCost: "₹8K–18K", score: 83, currency: "INR", language: "Hindi/English", subsidiary: "InBody India" },
  australia: { marketSizeUsd: 1.4, marketSize: "$1.4B", forecast: "$2.4B by 2028", growth: "+15%", population: "26.6M", popM: 26.6, obesity: "31.7%", diabetes: "8.2%", maturity: "Mature", coverage: "Broad", monthlyCost: "A$600–1,100", score: 80, currency: "AUD", language: "English", subsidiary: "InBody Australia" },
  usa: { marketSizeUsd: 42.8, marketSize: "$42.8B", forecast: "$68B by 2028", growth: "+12%", population: "335.9M", popM: 335.9, obesity: "41.9%", diabetes: "11.3%", maturity: "Advanced", coverage: "Broad", monthlyCost: "$900–1,400", score: 86, currency: "USD", language: "English", subsidiary: "InBody USA" },
  canada: { marketSizeUsd: 2.1, marketSize: "$2.1B", forecast: "$3.6B by 2028", growth: "+13%", population: "40.1M", popM: 40.1, obesity: "29.4%", diabetes: "9.4%", maturity: "Mature", coverage: "Partial", monthlyCost: "C$950–1,350", score: 78, currency: "CAD", language: "English/French", subsidiary: null },
  uk: { marketSizeUsd: 2.8, marketSize: "$2.8B", forecast: "$4.2B by 2028", growth: "+11%", population: "67.8M", popM: 67.8, obesity: "28.0%", diabetes: "7.9%", maturity: "Mature", coverage: "Partial", monthlyCost: "£250–450", score: 75, currency: "GBP", language: "English", subsidiary: "InBody UK" },
  germany: { marketSizeUsd: 3.2, marketSize: "$3.2B", forecast: "$4.8B by 2028", growth: "+10%", population: "84.4M", popM: 84.4, obesity: "24.3%", diabetes: "8.9%", maturity: "Mature", coverage: "Broad", monthlyCost: "€280–520", score: 77, currency: "EUR", language: "German", subsidiary: "InBody Germany" },
  france: { marketSizeUsd: 2.4, marketSize: "$2.4B", forecast: "$3.5B by 2028", growth: "+9%", population: "68.4M", popM: 68.4, obesity: "17.1%", diabetes: "6.2%", maturity: "Developing", coverage: "Partial", monthlyCost: "€220–400", score: 72, currency: "EUR", language: "French", subsidiary: null },
  italy: { marketSizeUsd: 1.9, marketSize: "$1.9B", forecast: "$2.8B by 2028", growth: "+10%", population: "58.9M", popM: 58.9, obesity: "21.0%", diabetes: "6.8%", maturity: "Developing", coverage: "Partial", monthlyCost: "€240–430", score: 73, currency: "EUR", language: "Italian", subsidiary: null },
  spain: { marketSizeUsd: 1.6, marketSize: "$1.6B", forecast: "$2.5B by 2028", growth: "+11%", population: "47.8M", popM: 47.8, obesity: "23.8%", diabetes: "7.1%", maturity: "Developing", coverage: "Partial", monthlyCost: "€230–410", score: 74, currency: "EUR", language: "Spanish", subsidiary: null },
  brazil: { marketSizeUsd: 1.8, marketSize: "$1.8B", forecast: "$3.6B by 2028", growth: "+20%", population: "216.4M", popM: 216.4, obesity: "26.8%", diabetes: "9.6%", maturity: "Developing", coverage: "Partial", monthlyCost: "R$800–1,500", score: 78, currency: "BRL", language: "Portuguese", subsidiary: null },
  mexico: { marketSizeUsd: 1.2, marketSize: "$1.2B", forecast: "$2.4B by 2028", growth: "+19%", population: "130.9M", popM: 130.9, obesity: "36.4%", diabetes: "14.4%", maturity: "Developing", coverage: "Limited", monthlyCost: "MX$3.5K–6.5K", score: 76, currency: "MXN", language: "Spanish", subsidiary: null },
  "saudi-arabia": { marketSizeUsd: 0.98, marketSize: "$980M", forecast: "$2.1B by 2028", growth: "+23%", population: "36.9M", popM: 36.9, obesity: "40.2%", diabetes: "18.7%", maturity: "Developing", coverage: "Partial", monthlyCost: "SAR 2.8K–4.5K", score: 81, currency: "SAR", language: "Arabic", subsidiary: null },
  uae: { marketSizeUsd: 0.72, marketSize: "$720M", forecast: "$1.4B by 2028", growth: "+18%", population: "9.5M", popM: 9.5, obesity: "32.7%", diabetes: "15.4%", maturity: "Mature", coverage: "Broad", monthlyCost: "AED 2.5K–4K", score: 84, currency: "AED", language: "Arabic/English", subsidiary: null },
};

export const REGULATORY_BODIES: Partial<Record<CountryId, string>> = {
  "south-korea": "MFDS",
  japan: "PMDA",
  china: "NMPA",
  usa: "FDA",
  uk: "MHRA",
  germany: "BfArM",
  singapore: "HSA",
  india: "CDSCO",
  australia: "TGA",
};

export const LOCAL_COMPETITOR_IDS: Partial<Record<CountryId, string>> = {
  china: "local-apac",
  india: "local-apac",
  japan: "local-apac",
  brazil: "local-latam",
  mexico: "local-latam",
  germany: "local-emea",
  france: "local-emea",
};

export const KOL_IDS_BY_COUNTRY: Partial<Record<CountryId, string[]>> = {
  "south-korea": ["kol-kim-snu", "kol-park-samsung"],
  japan: ["kol-tanaka-utokyo", "kol-suzuki-stluke"],
  usa: ["kol-maratos-ucsd", "kol-kaplan-harvard"],
  uk: ["kol-wilding-liverpool"],
  germany: ["kol-hamann-leipzig"],
  india: ["kol-misra-aiims"],
  australia: ["kol-dixon-melbourne"],
  singapore: ["kol-tan-nus"],
  thailand: ["kol-anong-chulalongkorn"],
  indonesia: ["kol-windarti-ui"],
};

export const CONFERENCE_IDS_BY_REGION: Record<string, string[]> = {
  APAC: ["aoco"],
  "North America": ["ada", "obesityweek"],
  EMEA: ["easd", "easo"],
  LATAM: ["obesityweek"],
  "Middle East": ["easd"],
};
