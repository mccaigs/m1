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
] as const;

export type PublicRoute = (typeof publicRoutes)[number]["path"];

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function createPageMetadata({
  description,
  path,
  title,
}: {
  description: string;
  path: PublicRoute;
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
