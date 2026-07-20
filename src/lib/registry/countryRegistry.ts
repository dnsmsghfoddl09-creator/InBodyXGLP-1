import type { CountryId } from "@/data/countries";
import type { CountryRegistryEntry, StrategicDataSource } from "@/lib/registry/registryTypes";

const GOOGLE_NEWS_RSS = (query: string, locale = "en-US", region = "US") =>
  `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=${locale}&gl=${region}&ceid=${region}:${locale.split("-")[0]}`;

export const PLATFORM_GLOBAL_SOURCES: StrategicDataSource[] = [
  {
    id: "google-news-global",
    label: "Google News",
    category: "news",
    connectorType: "rss",
    provider: "Google News",
    url: GOOGLE_NEWS_RSS("GLP-1 OR obesity OR semaglutide OR tirzepatide OR InBody"),
    credibility: 55,
    status: "active",
  },
  {
    id: "who-news",
    label: "WHO News",
    category: "news",
    connectorType: "rss",
    provider: "WHO",
    url: "https://www.who.int/rss-feeds/news-english.xml",
    credibility: 90,
    status: "active",
  },
  {
    id: "fda-news",
    label: "FDA Press Releases",
    category: "government",
    connectorType: "rss",
    provider: "FDA",
    url: "https://www.fda.gov/about-fda/contact-fda/stay-informed/rss-feeds/press-releases/rss.xml",
    countryId: "usa",
    credibility: 95,
    status: "active",
  },
  {
    id: "ema-news",
    label: "EMA News",
    category: "government",
    connectorType: "rss",
    provider: "EMA",
    url: GOOGLE_NEWS_RSS("site:ema.europa.eu European Medicines Agency obesity diabetes"),
    credibility: 92,
    status: "active",
  },
  {
    id: "pubmed-global",
    label: "PubMed",
    category: "research",
    connectorType: "pubmed",
    provider: "PubMed",
    query: "GLP-1[Title/Abstract] AND obesity[MeSH Terms]",
    status: "configured",
  },
  {
    id: "clinicaltrials-global",
    label: "ClinicalTrials.gov",
    category: "clinical-trials",
    connectorType: "clinical-trials",
    provider: "ClinicalTrials.gov",
    url: "https://clinicaltrials.gov/api/v2/studies",
    status: "configured",
  },
];

function pubmedSource(id: string, label: string, query: string): StrategicDataSource {
  return {
    id,
    label,
    category: "research",
    connectorType: "pubmed",
    provider: "PubMed",
    query,
    status: "configured",
  };
}

function clinicalTrialsSource(id: string, label: string): StrategicDataSource {
  return {
    id,
    label,
    category: "clinical-trials",
    connectorType: "clinical-trials",
    provider: "ClinicalTrials.gov",
    url: "https://clinicaltrials.gov/api/v2/studies",
    status: "configured",
  };
}

function googleNewsCountry(id: string, label: string, query: string, locale: string, region: string): StrategicDataSource {
  return {
    id,
    label,
    category: "news",
    connectorType: "rss",
    provider: "Google News",
    url: GOOGLE_NEWS_RSS(query, locale, region),
    credibility: 55,
    status: "configured",
  };
}

function competitor(id: string, label: string): StrategicDataSource {
  return {
    id,
    label,
    category: "competitors",
    connectorType: "reference",
    status: "configured",
  };
}

function conference(id: string, label: string): StrategicDataSource {
  return {
    id,
    label,
    category: "conference",
    connectorType: "api",
    status: "configured",
  };
}

function governmentRegulatory(
  id: string,
  label: string,
  provider: StrategicDataSource["provider"],
): StrategicDataSource {
  return {
    id,
    label,
    category: "government",
    connectorType: "regulatory",
    provider,
    status: "configured",
  };
}

function insuranceSource(id: string, label: string): StrategicDataSource {
  return {
    id,
    label,
    category: "insurance",
    connectorType: "reference",
    status: "configured",
  };
}

function medicalSociety(id: string, label: string): StrategicDataSource {
  return {
    id,
    label,
    category: "medical-societies",
    connectorType: "reference",
    status: "configured",
  };
}

export const COUNTRY_REGISTRY: CountryRegistryEntry[] = [
  {
    id: "south-korea",
    name: "South Korea",
    isoCode: "KR",
    region: "APAC",
    language: "ko",
    currency: "KRW",
    timeZone: "Asia/Seoul",
    sources: [
      googleNewsCountry("kr-google-news", "Google News Korea", "GLP-1 OR obesity OR InBody site:kr", "ko", "KR"),
      { id: "kr-mfds", label: "MFDS", category: "government", connectorType: "regulatory", provider: "MFDS", status: "configured" },
      { id: "kr-mohw", label: "Ministry of Health and Welfare", category: "government", connectorType: "regulatory", status: "configured" },
      pubmedSource("kr-pubmed", "PubMed Korea Focus", "GLP-1 AND Korea[Affiliation]"),
      clinicalTrialsSource("kr-clinical", "ClinicalTrials.gov Korea"),
      insuranceSource("kr-nhis", "National Health Insurance Service"),
      conference("kr-kosid", "KOSID Obesity Summit"),
      competitor("kr-novo", "Novo Nordisk Korea"),
      competitor("kr-lilly", "Eli Lilly Korea"),
      medicalSociety("kr-kss", "Korean Society for the Study of Obesity"),
    ],
  },
  {
    id: "japan",
    name: "Japan",
    isoCode: "JP",
    region: "APAC",
    language: "ja",
    currency: "JPY",
    timeZone: "Asia/Tokyo",
    sources: [
      googleNewsCountry("jp-google-news", "Google News Japan", "GLP-1 OR obesity OR InBody", "ja", "JP"),
      { id: "jp-nikkei", label: "Nikkei", category: "news", connectorType: "rss", url: GOOGLE_NEWS_RSS("site:nikkei.com GLP-1 obesity", "ja", "JP"), status: "configured" },
      { id: "jp-nhk", label: "NHK", category: "news", connectorType: "rss", url: GOOGLE_NEWS_RSS("site:nhk.or.jp obesity GLP-1", "ja", "JP"), status: "configured" },
      governmentRegulatory("jp-pmda", "PMDA", "PMDA"),
      { id: "jp-mhlw", label: "Ministry of Health, Labour and Welfare", category: "government", connectorType: "regulatory", status: "configured" },
      pubmedSource("jp-pubmed", "PubMed", "GLP-1 AND Japan[Affiliation]"),
      clinicalTrialsSource("jp-clinical", "ClinicalTrials.gov"),
      conference("jp-aoco", "AOCO"),
      competitor("jp-novo", "Novo Nordisk Japan"),
      competitor("jp-lilly", "Eli Lilly Japan"),
      medicalSociety("jp-jasso", "Japan Society for the Study of Obesity"),
    ],
  },
  {
    id: "usa",
    name: "United States",
    isoCode: "US",
    region: "North America",
    language: "en",
    currency: "USD",
    timeZone: "America/New_York",
    sources: [
      googleNewsCountry("us-google-news", "Google News US", "GLP-1 OR obesity OR semaglutide OR tirzepatide", "en-US", "US"),
      governmentRegulatory("us-fda", "FDA", "FDA"),
      pubmedSource("us-pubmed", "PubMed", "GLP-1[Title/Abstract] AND obesity[MeSH Terms]"),
      clinicalTrialsSource("us-clinical", "ClinicalTrials.gov"),
      insuranceSource("us-cms", "CMS Coverage Database"),
      conference("us-ada", "ADA Scientific Sessions"),
      competitor("us-novo", "Novo Nordisk US"),
      competitor("us-lilly", "Eli Lilly US"),
      medicalSociety("us-tos", "The Obesity Society"),
    ],
  },
  {
    id: "china",
    name: "China",
    isoCode: "CN",
    region: "APAC",
    language: "zh",
    currency: "CNY",
    timeZone: "Asia/Shanghai",
    sources: [
      googleNewsCountry("cn-google-news", "Google News China", "GLP-1 OR obesity OR InBody site:cn", "zh-CN", "CN"),
      { id: "cn-nmpa", label: "NMPA", category: "government", connectorType: "regulatory", status: "configured" },
      pubmedSource("cn-pubmed", "PubMed China Focus", "GLP-1 AND China[Affiliation]"),
      clinicalTrialsSource("cn-clinical", "ClinicalTrials.gov China"),
      insuranceSource("cn-nhsa", "National Healthcare Security Administration"),
      conference("cn-cds", "CDS Annual Meeting"),
      competitor("cn-innovent", "Innovent Biologics"),
      medicalSociety("cn-cds-soc", "Chinese Diabetes Society"),
    ],
  },
  {
    id: "germany",
    name: "Germany",
    isoCode: "DE",
    region: "EMEA",
    language: "de",
    currency: "EUR",
    timeZone: "Europe/Berlin",
    sources: [
      googleNewsCountry("de-google-news", "Google News Germany", "GLP-1 OR Adipositas OR InBody", "de", "DE"),
      governmentRegulatory("de-bfarm", "BfArM", "EMA"),
      governmentRegulatory("de-ema", "EMA", "EMA"),
      pubmedSource("de-pubmed", "PubMed Germany Focus", "GLP-1 AND Germany[Affiliation]"),
      clinicalTrialsSource("de-clinical", "ClinicalTrials.gov Germany"),
      insuranceSource("de-gkv", "GKV Spitzenverband"),
      conference("de-easd", "EASD Annual Meeting"),
      competitor("de-novo", "Novo Nordisk Germany"),
      medicalSociety("de-dgo", "German Obesity Society"),
    ],
  },
  {
    id: "france",
    name: "France",
    isoCode: "FR",
    region: "EMEA",
    language: "fr",
    currency: "EUR",
    timeZone: "Europe/Paris",
    sources: [
      googleNewsCountry("fr-google-news", "Google News France", "GLP-1 OR obésité OR InBody", "fr", "FR"),
      governmentRegulatory("fr-ansm", "ANSM", "EMA"),
      governmentRegulatory("fr-ema", "EMA", "EMA"),
      pubmedSource("fr-pubmed", "PubMed France Focus", "GLP-1 AND France[Affiliation]"),
      clinicalTrialsSource("fr-clinical", "ClinicalTrials.gov France"),
      insuranceSource("fr-ameli", "Assurance Maladie"),
      conference("fr-sfd", "SFD Congress"),
      competitor("fr-novo", "Novo Nordisk France"),
      medicalSociety("fr-sfo", "Société Francophone d'Obésité"),
    ],
  },
  {
    id: "uk",
    name: "United Kingdom",
    isoCode: "GB",
    region: "EMEA",
    language: "en",
    currency: "GBP",
    timeZone: "Europe/London",
    sources: [
      googleNewsCountry("uk-google-news", "Google News UK", "GLP-1 OR obesity OR NICE", "en-GB", "GB"),
      governmentRegulatory("uk-mhra", "MHRA", "EMA"),
      { id: "uk-nice", label: "NICE", category: "government", connectorType: "regulatory", status: "configured" },
      pubmedSource("uk-pubmed", "PubMed UK Focus", "GLP-1 AND United Kingdom[Affiliation]"),
      clinicalTrialsSource("uk-clinical", "ClinicalTrials.gov UK"),
      insuranceSource("uk-nhs", "NHS England"),
      conference("uk-easo", "EASO Congress"),
      competitor("uk-novo", "Novo Nordisk UK"),
      medicalSociety("uk-royal", "Royal College of Physicians Obesity Group"),
    ],
  },
  {
    id: "singapore",
    name: "Singapore",
    isoCode: "SG",
    region: "APAC",
    language: "en",
    currency: "SGD",
    timeZone: "Asia/Singapore",
    sources: [
      googleNewsCountry("sg-google-news", "Google News Singapore", "GLP-1 OR obesity OR InBody", "en-SG", "SG"),
      { id: "sg-hsa", label: "Health Sciences Authority", category: "government", connectorType: "regulatory", status: "configured" },
      pubmedSource("sg-pubmed", "PubMed Singapore Focus", "GLP-1 AND Singapore[Affiliation]"),
      clinicalTrialsSource("sg-clinical", "ClinicalTrials.gov Singapore"),
      insuranceSource("sg-moh", "MOH Fee Benchmarks"),
      conference("sg-apac-obesity", "APAC Obesity Summit"),
      competitor("sg-novo", "Novo Nordisk Singapore"),
      medicalSociety("sg-ses", "Endocrine and Metabolic Society of Singapore"),
    ],
  },
  {
    id: "thailand",
    name: "Thailand",
    isoCode: "TH",
    region: "APAC",
    language: "th",
    currency: "THB",
    timeZone: "Asia/Bangkok",
    sources: [
      googleNewsCountry("th-google-news", "Google News Thailand", "GLP-1 OR obesity OR InBody", "th", "TH"),
      { id: "th-fda", label: "Thai FDA", category: "government", connectorType: "regulatory", status: "configured" },
      pubmedSource("th-pubmed", "PubMed Thailand Focus", "GLP-1 AND Thailand[Affiliation]"),
      clinicalTrialsSource("th-clinical", "ClinicalTrials.gov Thailand"),
      insuranceSource("th-nhs", "Universal Coverage Scheme"),
      conference("th-endocrine", "Thai Endocrine Society Congress"),
      competitor("th-novo", "Novo Nordisk Thailand"),
      medicalSociety("th-tes", "Thai Endocrine Society"),
    ],
  },
  {
    id: "indonesia",
    name: "Indonesia",
    isoCode: "ID",
    region: "APAC",
    language: "id",
    currency: "IDR",
    timeZone: "Asia/Jakarta",
    sources: [
      googleNewsCountry("id-google-news", "Google News Indonesia", "GLP-1 OR obesitas OR InBody", "id", "ID"),
      { id: "id-bpom", label: "BPOM", category: "government", connectorType: "regulatory", status: "configured" },
      pubmedSource("id-pubmed", "PubMed Indonesia Focus", "GLP-1 AND Indonesia[Affiliation]"),
      clinicalTrialsSource("id-clinical", "ClinicalTrials.gov Indonesia"),
      insuranceSource("id-bpjs", "BPJS Kesehatan"),
      conference("id-perkeni", "PERKENI Congress"),
      competitor("id-novo", "Novo Nordisk Indonesia"),
      medicalSociety("id-perkeni-soc", "PERKENI"),
    ],
  },
  {
    id: "australia",
    name: "Australia",
    isoCode: "AU",
    region: "APAC",
    language: "en",
    currency: "AUD",
    timeZone: "Australia/Sydney",
    sources: [
      googleNewsCountry("au-google-news", "Google News Australia", "GLP-1 OR obesity OR InBody", "en-AU", "AU"),
      { id: "au-tga", label: "TGA", category: "government", connectorType: "regulatory", status: "configured" },
      pubmedSource("au-pubmed", "PubMed Australia Focus", "GLP-1 AND Australia[Affiliation]"),
      clinicalTrialsSource("au-clinical", "ClinicalTrials.gov Australia"),
      insuranceSource("au-pbs", "Pharmaceutical Benefits Scheme"),
      conference("au-anzos", "ANZOS Annual Scientific Meeting"),
      competitor("au-novo", "Novo Nordisk Australia"),
      medicalSociety("au-anzos-soc", "ANZOS"),
    ],
  },
  {
    id: "canada",
    name: "Canada",
    isoCode: "CA",
    region: "North America",
    language: "en",
    currency: "CAD",
    timeZone: "America/Toronto",
    sources: [
      googleNewsCountry("ca-google-news", "Google News Canada", "GLP-1 OR obesity OR InBody", "en-CA", "CA"),
      { id: "ca-health-canada", label: "Health Canada", category: "government", connectorType: "regulatory", status: "configured" },
      pubmedSource("ca-pubmed", "PubMed Canada Focus", "GLP-1 AND Canada[Affiliation]"),
      clinicalTrialsSource("ca-clinical", "ClinicalTrials.gov Canada"),
      insuranceSource("ca-cadth", "CADTH"),
      conference("ca-csem", "CSEM Annual Meeting"),
      competitor("ca-novo", "Novo Nordisk Canada"),
      medicalSociety("ca-obesity-canada", "Obesity Canada"),
    ],
  },
];

const registryById = new Map<CountryId, CountryRegistryEntry>(
  COUNTRY_REGISTRY.map((entry) => [entry.id, entry]),
);

export function getCountryRegistryRecord(countryId: CountryId): CountryRegistryEntry | undefined {
  return registryById.get(countryId);
}

export function getSupportedRegistryCountryIds(): CountryId[] {
  return COUNTRY_REGISTRY.map((entry) => entry.id);
}

export function getPlatformRssSourceIds(): string[] {
  return ["google-news-global", "who-news", "fda-news", "ema-news"];
}
