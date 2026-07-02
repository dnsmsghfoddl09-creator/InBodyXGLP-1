export type StrategicInsight = {
  id: string;
  headline: string;
  whyItMatters: string;
  businessImpact: string;
  suggestedAction: string;
  priority: 1 | 2 | 3 | 4 | 5;
};

export type StrategicSection = {
  id: string;
  title: string;
  emoji: string;
  href: string;
  description: string;
  insights: StrategicInsight[];
};

export type QuickAction = {
  label: string;
  emoji: string;
  href: string;
};

export const executiveSummary: StrategicInsight = {
  id: "exec-1",
  headline: "APAC hospital GLP-1 programs are opening a 90-day window for InBody placement",
  whyItMatters:
    "Three tier-1 hospital systems in Korea and Japan are launching integrated obesity pathways this quarter. First-mover device partnerships will define the clinical workflow standard.",
  businessImpact:
    "Est. $2.4M pipeline in Q3–Q4 if InBody secures co-placement in ≥2 programs. Delay beyond 6 weeks risks losing to generic body composition vendors.",
  suggestedAction:
    "Schedule executive outreach to SNUH and Univ. of Tokyo obesity centers this week. Prepare GLP-1 + body composition clinical brief for KOL meetings.",
  priority: 1,
};

export const strategicSections: StrategicSection[] = [
  {
    id: "intelligence",
    title: "Today's Intelligence",
    emoji: "🧠",
    href: "/global/dashboard",
    description: "Signals that should shape today's decisions",
    insights: [
      {
        id: "intel-1",
        headline: "Oral GLP-1 FDA advisory panel set for August — primary care access may expand",
        whyItMatters:
          "Oral formulations could shift prescribing from specialty clinics to primary care, changing where body composition screening occurs.",
        businessImpact:
          "Potential 40% expansion of screening touchpoints; InBody must position for clinic-based workflows, not just hospital obesity centers.",
        suggestedAction:
          "Brief product team on primary care form factor requirements. Draft positioning memo by Friday.",
        priority: 1,
      },
      {
        id: "intel-2",
        headline: "Novo Nordisk APAC supply expansion may compress regional pricing in H2",
        whyItMatters:
          "Increased Wegovy availability in 12 markets accelerates patient volume but intensifies payer negotiations.",
        businessImpact:
          "Hospital budgets may reallocate from devices to drug access; InBody must tie ROI to outcomes, not capital spend.",
        suggestedAction:
          "Update hospital value proposition deck with outcomes-based ROI model before next APAC sales cycle.",
        priority: 2,
      },
    ],
  },
  {
    id: "opportunities",
    title: "Business Opportunities",
    emoji: "💡",
    href: "/business-opportunities",
    description: "Revenue and partnership plays worth pursuing now",
    insights: [
      {
        id: "opp-1",
        headline: "InBody + GLP-1 Monitoring Bundle for obesity clinics",
        whyItMatters:
          "Clinics prescribing GLP-1 need adherence and body composition tracking to demonstrate outcomes to payers.",
        businessImpact:
          "Score 92/100. Est. $800K ARR from 50 clinic deployments in NA within 12 months.",
        suggestedAction:
          "Assign owner for pilot design. Identify 3 clinic partners for Q3 proof-of-concept.",
        priority: 1,
      },
      {
        id: "opp-2",
        headline: "Corporate wellness GLP-1 analytics for self-insured employers",
        whyItMatters:
          "Employers covering GLP-1 need metabolic health dashboards to manage spend and prove program ROI.",
        businessImpact:
          "Score 87/100. Enterprise segment could open $1.2M+ annual contracts with benefits platforms.",
        suggestedAction:
          "Validate with 2 HR benefits consultants. Scope MVP dashboard requirements.",
        priority: 3,
      },
    ],
  },
  {
    id: "competitors",
    title: "Competitor Watch",
    emoji: "🏢",
    href: "/intelligence/competitors",
    description: "Moves from Novo Nordisk, Lilly, and emerging players",
    insights: [
      {
        id: "comp-1",
        headline: "Eli Lilly orforglipron Phase III meets primary endpoint",
        whyItMatters:
          "Oral GLP-1 from Lilly could reach market 18 months ahead of some competitors, reshaping the access landscape.",
        businessImpact:
          "Lilly may bundle digital health tools with pharmacy channels — InBody should pursue Lilly partnership conversations now.",
        suggestedAction:
          "Request competitive intel brief on Lilly digital health strategy. Identify partnership entry point.",
        priority: 1,
      },
      {
        id: "comp-2",
        headline: "Novo Nordisk filed ultra-long-acting GLP-1 patent",
        whyItMatters:
          "Extended dosing intervals could reduce clinic visit frequency, affecting device screening touchpoints.",
        businessImpact:
          "May reduce in-clinic body composition measurement frequency by 30%; remote monitoring becomes critical.",
        suggestedAction:
          "Accelerate home/remote InBody integration roadmap discussion with product leadership.",
        priority: 2,
      },
    ],
  },
  {
    id: "glp1-market",
    title: "GLP-1 Market",
    emoji: "💉",
    href: "/glp1-market/market-overview",
    description: "Prescription trends and market dynamics",
    insights: [
      {
        id: "market-1",
        headline: "US weekly GLP-1 Rx volume up 5.2% — obesity segment outpacing diabetes",
        whyItMatters:
          "Obesity indication is now the primary growth driver, expanding the patient population beyond traditional diabetes clinics.",
        businessImpact:
          "TAM for body composition monitoring in obesity care growing 18% YoY; aligns with InBody's strategic focus.",
        suggestedAction:
          "Share updated TAM slide with sales leadership. Align Q3 targets to obesity segment accounts.",
        priority: 2,
      },
      {
        id: "market-2",
        headline: "Mounjaro capturing share from Wegovy in US retail pharmacy",
        whyItMatters:
          "Pharmacy-led dispensing shifts patient journey away from hospital-centric models.",
        businessImpact:
          "Pharmacy channel partnerships may become as important as hospital placements for device visibility.",
        suggestedAction:
          "Review pharmacy partnership pipeline. Prioritize CVS and Walgreens wellness program discussions.",
        priority: 3,
      },
    ],
  },
  {
    id: "conferences",
    title: "Conference Calendar",
    emoji: "🎤",
    href: "/conferences/calendar",
    description: "Events requiring preparation or attendance decisions",
    insights: [
      {
        id: "conf-1",
        headline: "ADA Scientific Sessions in 14 days — Chicago",
        whyItMatters:
          "Premier diabetes/obesity conference; key KOLs and competitor presence. Missing it means losing narrative control.",
        businessImpact:
          "Historical ADA presence generated 12 qualified hospital leads. Competitors will showcase GLP-1 + device integrations.",
        suggestedAction:
          "Confirm InBody booth and symposium submission status. Schedule 5 pre-booked KOL meetings.",
        priority: 1,
      },
      {
        id: "conf-2",
        headline: "ObesityWeek registration deadline in 21 days",
        whyItMatters:
          "Primary obesity medicine audience; ideal for launching body composition + GLP-1 clinical data.",
        businessImpact:
          "Opportunity to present InBody evidence to 3,000+ obesity specialists.",
        suggestedAction:
          "Submit abstract if not done. Confirm strategy team attendance (2–3 members).",
        priority: 3,
      },
    ],
  },
  {
    id: "papers",
    title: "Recent Papers",
    emoji: "📚",
    href: "/intelligence/research",
    description: "Publications that affect positioning and KOL conversations",
    insights: [
      {
        id: "paper-1",
        headline: "JAMA: Muscle mass preservation during GLP-1-mediated weight loss",
        whyItMatters:
          "Validates InBody's core value proposition — tracking lean mass loss, not just weight, during GLP-1 therapy.",
        businessImpact:
          "Strong evidence for payer and KOL conversations. Can differentiate InBody from scale-only competitors.",
        suggestedAction:
          "Distribute summary to sales and medical affairs. Add to KOL briefing pack and hospital deck.",
        priority: 2,
      },
      {
        id: "paper-2",
        headline: "NEJM: 5-year semaglutide cardiovascular outcomes follow-up",
        whyItMatters:
          "Long-term safety data supports sustained GLP-1 adoption, expanding the monitoring patient pool.",
        businessImpact:
          "Extended treatment duration increases lifetime value per patient for monitoring devices.",
        suggestedAction:
          "Reference in longevity-of-care messaging. Update market sizing assumptions.",
        priority: 4,
      },
    ],
  },
  {
    id: "regulatory",
    title: "Regulatory Updates",
    emoji: "📋",
    href: "/intelligence/regulatory-updates",
    description: "FDA, EMA, MFDS, and PMDA movements affecting market access",
    insights: [
      {
        id: "reg-1",
        headline: "FDA oral GLP-1 advisory panel scheduled for August 2026",
        whyItMatters:
          "Oral formulations could expand prescribing to primary care, reshaping device screening workflows globally.",
        businessImpact:
          "HQ and subsidiaries must align positioning for clinic-based monitoring before Q4 launch cycles.",
        suggestedAction:
          "Brief regional leads by end of week. Update global regulatory tracker.",
        priority: 1,
      },
      {
        id: "reg-2",
        headline: "MFDS updates obesity drug reimbursement criteria in Korea",
        whyItMatters:
          "Korea is a priority APAC market; reimbursement changes directly affect hospital program adoption.",
        businessImpact:
          "Subsidiary pipeline of 4 hospital accounts depends on updated payer pathway clarity.",
        suggestedAction:
          "Coordinate with Korea subsidiary on hospital outreach timeline.",
        priority: 2,
      },
    ],
  },
  {
    id: "country-focus",
    title: "Country Focus",
    emoji: "🌍",
    href: "/global/country-explorer",
    description: "Regional priorities for HQ and overseas subsidiaries",
    insights: [
      {
        id: "country-1",
        headline: "Japan: Univ. of Tokyo obesity pathway launch in 6 weeks",
        whyItMatters:
          "Japan subsidiary flagged this as the highest-probability InBody + GLP-1 integration opportunity in APAC.",
        businessImpact:
          "Est. ¥180M pipeline; first-mover advantage vs. generic BIA devices.",
        suggestedAction:
          "HQ to join subsidiary call with hospital procurement this Thursday.",
        priority: 1,
      },
      {
        id: "country-2",
        headline: "Germany: EMA-aligned hospitals expanding metabolic programs",
        whyItMatters:
          "EMEA subsidiary reports 8 new hospital inquiries linked to GLP-1 volume growth.",
        businessImpact:
          "Regional revenue uplift of €1.2M if 3 pilots convert in H2.",
        suggestedAction:
          "Assign EMEA BD lead to prioritize top 3 accounts.",
        priority: 3,
      },
    ],
  },
  {
    id: "content",
    title: "Content Opportunities",
    emoji: "🎬",
    href: "/content-studio",
    description: "Marketing and thought leadership gaps to fill",
    insights: [
      {
        id: "content-1",
        headline: "GLP-1 + InBody clinical whitepaper stuck in review for 3 weeks",
        whyItMatters:
          "Sales team lacks current collateral for hospital conversations; competitors are publishing faster.",
        businessImpact:
          "Delayed whitepaper may cost 2–3 hospital deals in active pipeline this quarter.",
        suggestedAction:
          "Escalate review to medical affairs lead. Set hard publish date within 7 days.",
        priority: 2,
      },
      {
        id: "content-2",
        headline: "Q3 market trends deck needed for board presentation",
        whyItMatters:
          "Leadership needs GLP-1 market narrative for quarterly board review in 10 days.",
        businessImpact:
          "Board visibility on strategy team's GLP-1 initiative; affects 2027 budget allocation.",
        suggestedAction:
          "Assign deck owner today. Pull data from intelligence feed and market module.",
        priority: 1,
      },
    ],
  },
  {
    id: "weekly-missions",
    title: "Weekly Missions",
    emoji: "📋",
    href: "/global/weekly-research-mission",
    description: "Assigned research tasks for HQ and overseas teams",
    insights: [
      {
        id: "mission-1",
        headline: "APAC payer landscape scan — due Friday",
        whyItMatters:
          "Tokyo subsidiary needs HQ synthesis of reimbursement trends to prioritize hospital targets.",
        businessImpact:
          "Unlocks Q3 APAC go-to-market sequencing for 6 active accounts.",
        suggestedAction:
          "Assign analyst to complete scan by Thursday EOD. Share with APAC lead.",
        priority: 2,
      },
      {
        id: "mission-2",
        headline: "Lilly oral GLP-1 competitive brief — due Thursday",
        whyItMatters:
          "Executive team needs unified competitive response before ADA meetings.",
        businessImpact:
          "Informs partnership and positioning decisions worth $3M+ pipeline.",
        suggestedAction:
          "Pull competitor module data. Draft 2-page brief for leadership review.",
        priority: 1,
      },
    ],
  },
];

export const quickActions: QuickAction[] = [
  { label: "Generate Executive Report", emoji: "📈", href: "/executive-reports" },
  { label: "Ask AI Strategy Assistant", emoji: "🤖", href: "/ai-assistant" },
  { label: "Compare Countries", emoji: "🌍", href: "/global/country-compare" },
  { label: "Review ADA Prep", emoji: "🎤", href: "/conferences/calendar/ada" },
  { label: "Explore Business Opportunities", emoji: "💡", href: "/business-opportunities" },
  { label: "Open Content Studio", emoji: "🎬", href: "/content-studio" },
];
