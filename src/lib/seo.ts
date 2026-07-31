import type { Metadata } from "next";

export const siteUrl = "https://www.mccaigs.com";
export const socialImageUrl = `${siteUrl}/media/mccaigs-opener-poster.webp`;

export const siteConfig = {
  description:
    "Scotland's Elite Technical Studio. Practical AI, automation, websites, internal systems, and digital products built properly.",
  founder: "David Robertson",
  legalName: "MCCAIGS GROUP LTD",
  linkedIn: "https://www.linkedin.com/company/mccaigs",
  location: "Edinburgh, Scotland",
  name: "mccaigs",
  title: "Scotland's Elite Technical Studio",
  twitter: "https://x.com/mccaigs",
} as const;

export const publicRoutes = [
  { changeFrequency: "weekly", description: siteConfig.description, path: "/", priority: 1, title: "mccaigs" },
  { changeFrequency: "monthly", description: "Learn how mccaigs works as an Edinburgh technical studio for Scottish SMEs, startups, and specialist organisations.", path: "/studio", priority: 0.85, title: "Studio" },
  { changeFrequency: "monthly", description: "Explore practical AI systems, business automation, internal platforms, websites, and product development services from mccaigs.", path: "/services", priority: 0.9, title: "Services" },
  { changeFrequency: "monthly", description: "Explore codenamed mccaigs builds including decision systems, internal tools, workflow engines, automation layers, and SaaS foundations.", path: "/systems", priority: 0.85, title: "Systems" },
  { changeFrequency: "monthly", description: "Understand the senior-led mccaigs process: diagnose, design, build, evaluate, ship, and improve.", path: "/process", priority: 0.8, title: "Process" },
  { changeFrequency: "weekly", description: "Ask the deterministic mccaigs Assistant about AI systems, automation, websites, internal software, project fit, budgets, and delivery.", path: "/assistant", priority: 0.8, title: "Assistant" },
  { changeFrequency: "weekly", description: "Read practical mccaigs studio notes on reliable AI, business automation, internal systems, websites, and useful software.", path: "/insights", priority: 0.8, title: "Insights" },
  { changeFrequency: "monthly", description: "Contact mccaigs in Edinburgh to discuss a practical AI, automation, website, internal software, or digital product project.", path: "/contact", priority: 0.8, title: "Contact" },
  { changeFrequency: "monthly", description: "Scope a mccaigs project through a structured discovery workflow and receive an indicative planning estimate.", path: "/start-project", priority: 0.8, title: "Start a Project" },
  { changeFrequency: "monthly", description: "mccaigs is a Scottish technical studio founded by David Robertson, building practical AI systems, automation, websites, internal tools, and digital products for startups, SMEs, and organisations.", path: "/about", priority: 0.85, title: "About" },
  { changeFrequency: "monthly", description: "Answer Engine Optimisation services from mccaigs: technical SEO, structured data, entity clarity, llms.txt, AI-readable content, and deterministic assistants.", path: "/answer-engine-optimisation", priority: 0.86, title: "Answer Engine Optimisation" },
  { changeFrequency: "monthly", description: "Scottish Answer Engine Optimisation services for businesses that want clearer AI visibility across ChatGPT, Google AI, Gemini, and modern search.", path: "/answer-engine-optimisation-scotland", priority: 0.82, title: "Answer Engine Optimisation Scotland" },
  { changeFrequency: "monthly", description: "UK Answer Engine Optimisation services that help businesses prepare for AI search, answer engines, structured data, and AI-readable websites.", path: "/answer-engine-optimisation-uk", priority: 0.82, title: "Answer Engine Optimisation UK" },
  { changeFrequency: "monthly", description: "AI Search Optimisation from mccaigs for businesses preparing their websites for ChatGPT, Gemini, Google AI, and modern answer engines.", path: "/ai-search-optimisation", priority: 0.82, title: "AI Search Optimisation" },
  { changeFrequency: "monthly", description: "AI Visibility services from mccaigs, including readiness checks, ChatGPT and Gemini prompt testing, structured data, llms.txt, and practical reporting.", path: "/ai-visibility", priority: 0.84, title: "AI Visibility" },
  { changeFrequency: "monthly", description: "ChatGPT SEO services from mccaigs: prepare your website, entity signals, service pages, FAQs, and llms.txt for AI-assisted recommendations.", path: "/chatgpt-seo", priority: 0.8, title: "ChatGPT SEO" },
  { changeFrequency: "monthly", description: "Google AI Overviews readiness from mccaigs: practical technical SEO, structured content, schema, FAQs, and crawlable AI-ready website improvements.", path: "/google-ai-overviews", priority: 0.8, title: "Google AI Overviews Readiness" },
  { changeFrequency: "monthly", description: "llms.txt planning and implementation from mccaigs, with concise AI-readable summaries, key pages, services, and deterministic assistant context.", path: "/llms-txt", priority: 0.78, title: "llms.txt" },
  { changeFrequency: "monthly", description: "AI-ready websites from mccaigs: fast, structured, crawlable sites with clear services, schema, llms.txt, and deterministic assistant options.", path: "/ai-ready-websites", priority: 0.82, title: "AI-ready Websites" },
  { changeFrequency: "monthly", description: "A practical guide from mccaigs on preparing your website for Google AI: technical SEO, structured content, schema, FAQs, and crawlability.", path: "/how-to-appear-in-google-ai", priority: 0.76, title: "How to Appear in Google AI" },
  { changeFrequency: "monthly", description: "A practical guide from mccaigs on improving the signals that may help ChatGPT understand, compare, and cite your business.", path: "/how-to-get-recommended-by-chatgpt", priority: 0.76, title: "How to Get Recommended by ChatGPT" },
  { changeFrequency: "monthly", description: "How mccaigs built its own AI Visibility system using AEO pages, llms files, public assistant knowledge, schema, sitemap coverage, and deterministic assistant answers.", path: "/ai-visibility-case-study", priority: 0.8, title: "AI Visibility Case Study" },
  { changeFrequency: "monthly", description: "Edinburgh AEO partner for technical audits, structured content, schema, entity clarity, AI visibility monitoring, and careful implementation.", path: "/aeo-agency-edinburgh", priority: 0.95, title: "AEO Agency Edinburgh" },
  { changeFrequency: "monthly", description: "A practical Edinburgh guide to Answer Engine Optimisation, covering crawlability, entities, evidence, schema, extractable answers, and implementation.", path: "/answer-engine-optimisation-edinburgh", priority: 0.93, title: "Answer Engine Optimisation Edinburgh" },
  { changeFrequency: "monthly", description: "AI visibility assessment and implementation for Edinburgh organisations, covering entity consistency, service clarity, sources, structured knowledge, and monitoring.", path: "/ai-visibility-edinburgh", priority: 0.92, title: "AI Visibility Edinburgh" },
  { changeFrequency: "monthly", description: "Practical AI systems in Edinburgh: deterministic assistants, knowledge systems, portals, internal tools, workflows, and production applications.", path: "/ai-systems-edinburgh", priority: 0.9, title: "AI Systems Edinburgh" },
  { changeFrequency: "monthly", description: "AI automation for Edinburgh businesses, covering enquiries, qualification, knowledge retrieval, documents, reporting, approvals, and human oversight.", path: "/ai-automation-edinburgh", priority: 0.9, title: "AI Automation Edinburgh" },
  { changeFrequency: "monthly", description: "Business process and rule-based automation for Edinburgh organisations, including mapping, data handoffs, approvals, notifications, dashboards, and portals.", path: "/business-automation-edinburgh", priority: 0.89, title: "Business Automation Edinburgh" },
  { changeFrequency: "monthly", description: "Bespoke operational software in Edinburgh: Next.js applications, portals, dashboards, workflows, integrations, authentication, and maintainable production systems.", path: "/custom-software-edinburgh", priority: 0.89, title: "Custom Software Edinburgh" },
  { changeFrequency: "monthly", description: "Technical SEO in Edinburgh from a hands-on studio: crawlability, architecture, schema, performance, local entity clarity, AEO, and web implementation.", path: "/seo-agency-edinburgh", priority: 0.88, title: "Technical SEO Agency Edinburgh" },
  { changeFrequency: "monthly", description: "Modern Next.js web development in Edinburgh with performance, accessibility, structured content, technical SEO, AEO, and operational integration.", path: "/web-development-edinburgh", priority: 0.88, title: "Web Development Edinburgh" },
  { changeFrequency: "monthly", description: "Compare SEO, local SEO, AEO, AI visibility, deterministic assistants, and business automation, with clear guidance on where each discipline fits.", path: "/seo-vs-aeo-vs-ai-visibility", priority: 0.86, title: "SEO vs AEO vs AI Visibility" },
] as const;

export type PublicRoute = (typeof publicRoutes)[number]["path"];

export const publicTextAssets = [
  { changeFrequency: "monthly", path: "/llms.txt", priority: 0.5 },
  { changeFrequency: "monthly", path: "/llms-full.txt", priority: 0.5 },
  { changeFrequency: "monthly", path: "/assistant-knowledge.json", priority: 0.55 },
  { changeFrequency: "monthly", path: "/assistant-knowledge.md", priority: 0.55 },
  { changeFrequency: "monthly", path: "/ai-knowledge.json", priority: 0.5 },
  { changeFrequency: "monthly", path: "/ai-knowledge.md", priority: 0.5 },
] as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function createPageMetadata({
  description,
  path,
  title,
}: {
  description: string;
  path: string;
  title: string;
}): Metadata {
  const url = absoluteUrl(path);
  const pageTitle = path === "/" ? `${siteConfig.name} | ${siteConfig.title}` : `${title} | ${siteConfig.name}`;

  return {
    alternates: {
      canonical: url,
    },
    description,
    openGraph: {
      description,
      images: [{ alt: "mccaigs studio systems interface", height: 720, url: socialImageUrl, width: 1280 }],
      locale: "en_GB",
      siteName: siteConfig.name,
      title: pageTitle,
      type: "website",
      url,
    },
    title: {
      absolute: pageTitle,
    },
    twitter: {
      card: "summary_large_image",
      description,
      images: [socialImageUrl],
      site: "@mccaigs",
      title: pageTitle,
    },
  };
}

export function createBreadcrumbStructuredData(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      item: absoluteUrl(item.path),
      name: item.name,
      position: index + 1,
    })),
  };
}

export function createFaqStructuredData(items: Array<{ answer: string; question: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ answer, question }) => ({
      "@type": "Question",
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
      name: question,
    })),
  };
}

export const frequentlyAskedQuestions = [
  {
    answer:
      "mccaigs is an Edinburgh-based technical studio. We design and build practical AI systems, business automation, websites, internal tools, SaaS products, and modern digital platforms.",
    question: "What does mccaigs do?",
  },
  {
    answer:
      "A technical studio is a hands-on build partner. mccaigs starts with the operational problem, chooses the simplest reliable approach, and delivers working software around the needs of the business.",
    question: "What is a technical studio?",
  },
  {
    answer:
      "mccaigs combines technical diagnosis with direct delivery. The focus is not a campaign or a generic technology category. It is a useful system, clear ownership, and a commercially sensible result.",
    question: "How is mccaigs different from an agency?",
  },
  {
    answer:
      "Yes. mccaigs works with ambitious SMEs and owner-managed businesses, including organisations that need a better website, less administration, clearer information, or software that fits the operation properly.",
    question: "Do you work with SMEs?",
  },
  {
    answer:
      "Yes. mccaigs helps startups shape and build credible first releases for SaaS products, portals, marketplaces, and software-enabled services.",
    question: "Do you work with startups?",
  },
  {
    answer:
      "Yes. mccaigs builds controlled AI assistants, AI-assisted workflows, research systems, document processes, and data-backed decision tools. AI is used where it creates practical value.",
    question: "Do you build AI systems?",
  },
  {
    answer:
      "Timelines depend on the problem and scope. A focused technical review may take one to two weeks. Website and workflow upgrades often take two to six weeks. Larger automation, internal system, and product builds take longer.",
    question: "How long does a project take?",
  },
  {
    answer:
      "mccaigs uses proven platforms including Next.js, TypeScript, Convex, Clerk, Vercel, OpenAI, Anthropic, and Google AI where they are appropriate to the project.",
    question: "What technologies do you use?",
  },
  {
    answer:
      "Yes. Ongoing support and improvement can be scoped around the system, the operational need, and the level of ownership required after launch.",
    question: "Do you offer ongoing support?",
  },
] as const;

const services = [
  ["AI Systems", "Controlled AI assistants, AI-assisted workflows, research systems, and data-backed decision tools."],
  ["Answer Engine Optimisation & AI Visibility", "Technical SEO, structured data, entity clarity, llms.txt, AI-readable websites, and AI visibility reporting."],
  ["Business Automation", "Practical automation for enquiries, administration, documents, routing, approvals, and reporting."],
  ["Startup Product Development", "Credible first-release foundations for SaaS products, portals, marketplaces, and software-enabled services."],
  ["Internal Platforms", "Calm internal tools and operational platforms designed around the real work of a team."],
  ["Digital Products", "Websites and digital platforms that explain the business clearly and contribute to the work behind them."],
  ["Technical Consulting", "Senior technical reviews and practical guidance before a larger software or AI investment."],
] as const;

export const rootStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@id": `${siteUrl}/#organisation`,
      "@type": "Organization",
      address: {
        "@type": "PostalAddress",
        addressCountry: "GB",
        addressLocality: "Edinburgh",
        addressRegion: "Scotland",
      },
      description: siteConfig.title,
      image: socialImageUrl,
      legalName: siteConfig.legalName,
      logo: absoluteUrl("/logo.svg"),
      name: siteConfig.name,
      alternateName: "mccaigs studio",
      knowsAbout: [
        "Answer Engine Optimisation",
        "AI Search Optimisation",
        "AI Visibility",
        "AI-ready websites",
        "Deterministic AI assistants",
        "AI chatbots for business",
        "Google AI Overviews readiness",
        "ChatGPT SEO",
        "Gemini discoverability",
        "Claude discoverability",
        "Perplexity discoverability",
        "AI Visibility Report",
        "AEO Audit",
        "AEO Implementation",
        "AI Visibility Management",
        "Scottish AI studio",
        "UK AI software studio",
      ],
      founder: {
        "@id": `${siteUrl}/about#david-robertson`,
        "@type": "Person",
        name: siteConfig.founder,
      },
      sameAs: [siteConfig.linkedIn, siteConfig.twitter],
      url: siteUrl,
    },
    {
      "@id": `${siteUrl}/#professional-service`,
      "@type": "ProfessionalService",
      address: {
        "@type": "PostalAddress",
        addressCountry: "GB",
        addressLocality: "Edinburgh",
        addressRegion: "Scotland",
      },
      areaServed: [
        { "@type": "Country", name: "Scotland" },
        { "@type": "Country", name: "United Kingdom" },
      ],
      description:
        siteConfig.description,
      knowsAbout: [
        "Answer Engine Optimisation",
        "AI Search Optimisation",
        "AI Visibility",
        "AI-ready websites",
        "Deterministic AI assistants",
        "AI chatbots for business",
        "Google AI Overviews readiness",
        "ChatGPT SEO",
        "Gemini discoverability",
        "Claude discoverability",
        "Perplexity discoverability",
        "AI Visibility Report",
        "AEO Audit",
        "AEO Implementation",
        "AI Visibility Management",
        "Scottish AI studio",
        "UK AI software studio",
      ],
      image: socialImageUrl,
      founder: {
        "@id": `${siteUrl}/about#david-robertson`,
        "@type": "Person",
        name: siteConfig.founder,
      },
      name: siteConfig.name,
      alternateName: "mccaigs studio",
      parentOrganization: { "@id": `${siteUrl}/#organisation` },
      url: siteUrl,
    },
    {
      "@id": `${siteUrl}/#local-business`,
      "@type": "LocalBusiness",
      address: {
        "@type": "PostalAddress",
        addressCountry: "GB",
        addressLocality: "Edinburgh",
        addressRegion: "Scotland",
      },
      areaServed: ["Edinburgh", "Scotland", "United Kingdom"],
      image: socialImageUrl,
      name: siteConfig.name,
      parentOrganization: { "@id": `${siteUrl}/#organisation` },
      url: siteUrl,
    },
    {
      "@id": `${siteUrl}/#website`,
      "@type": "WebSite",
      image: socialImageUrl,
      name: "mccaigs.com",
      alternateName: "mccaigs official website",
      potentialAction: {
        "@type": "SearchAction",
        "query-input": "required name=search_term_string",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteUrl}/assistant?question={search_term_string}`,
        },
      },
      publisher: { "@id": `${siteUrl}/#organisation` },
      url: siteUrl,
    },
    ...services.map(([name, description]) => ({
      "@type": "Service",
      areaServed: ["Scotland", "United Kingdom"],
      description,
      name,
      provider: { "@id": `${siteUrl}/#professional-service` },
      url: absoluteUrl("/services"),
    })),
  ],
};

export const faqStructuredData = {
  ...createFaqStructuredData([...frequentlyAskedQuestions]),
};
