import { absoluteUrl, siteConfig, siteUrl } from "@/lib/seo";

export type AeoPageKind = "service" | "article";

export type AeoFaq = {
  answer: string;
  question: string;
};

export type AeoPage = {
  body: string[];
  cta: string;
  description: string;
  eyebrow: string;
  evidence?: Array<{ label: string; value: string }>;
  faqs: AeoFaq[];
  h1: string;
  kind: AeoPageKind;
  path: string;
  points: string[];
  region: string;
  reportFocus?: string;
  slug: AeoPageSlug;
  title: string;
};

const sharedFaqs = [
  {
    question: "Can AEO guarantee inclusion in AI answers?",
    answer:
      "No. No studio can guarantee that ChatGPT, Gemini, Google AI Overviews, or another answer engine will cite a business. The practical aim is to improve the quality, clarity, structure, and crawlability of the signals those systems may use.",
  },
  {
    question: "How is Answer Engine Optimisation different from SEO?",
    answer:
      "Traditional SEO helps people find a website in search results. Answer Engine Optimisation helps AI systems understand what the business does, who it serves, why it is credible, and when it may be a relevant recommendation.",
  },
  {
    question: "Does mccaigs use runtime AI calls for AEO pages?",
    answer:
      "No. These pages and the supporting site signals are static and deterministic. mccaigs only adds live AI behaviour where it is useful, controlled, and appropriate to the project.",
  },
] as const;

export const aeoPages = [
  {
    slug: "answer-engine-optimisation",
    path: "/answer-engine-optimisation",
    title: "Answer Engine Optimisation",
    description:
      "Answer Engine Optimisation services from mccaigs: technical SEO, structured data, entity clarity, llms.txt, AI-readable content, and deterministic assistants.",
    h1: "Answer Engine Optimisation for businesses that want to be understood by AI",
    eyebrow: "AEO / AI discoverability",
    region: "UK and Scotland",
    kind: "service",
    cta: "Prepare your website for AI search",
    body: [
      "Answer Engine Optimisation is the practical work of making a business easier for modern AI systems to understand, cite, and recommend. It sits alongside traditional SEO, but the emphasis is different: answer engines need clear entities, well-structured services, trustworthy pages, useful FAQs, and crawlable supporting context.",
      "mccaigs helps businesses build those signals into their website without hype or guarantees. The work combines technical SEO, structured data, entity optimisation, content architecture, llms.txt, deterministic assistants, and fast modern websites.",
    ],
    points: [
      "Map the business, services, sectors, geography, and proof points into clear site architecture.",
      "Improve metadata, structured data, FAQs, internal links, and AI-readable service copy.",
      "Create llms.txt and llms-full.txt so AI crawlers can find a concise knowledge summary.",
      "Keep deterministic AI positioning intact where controlled assistants are the better answer.",
    ],
    reportFocus: "Overall AI Readiness Score",
    faqs: [
      {
        question: "Who is Answer Engine Optimisation for?",
        answer:
          "It is useful for businesses that rely on being found, compared, trusted, and recommended online: professional services, local businesses, recruiters, solicitors, estate agents, trades, hospitality, education providers, and specialist SMEs.",
      },
      ...sharedFaqs,
    ],
  },
  {
    slug: "answer-engine-optimisation-scotland",
    path: "/answer-engine-optimisation-scotland",
    title: "Answer Engine Optimisation Scotland",
    description:
      "Scottish Answer Engine Optimisation services for businesses that want clearer AI visibility across ChatGPT, Google AI, Gemini, and modern search.",
    h1: "Answer Engine Optimisation in Scotland",
    eyebrow: "AEO / Scotland",
    region: "Scotland",
    kind: "service",
    cta: "Improve Scottish AI visibility",
    body: [
      "Scottish businesses need digital signals that explain both what they do and where they are relevant. AI systems often compress local context into short answers, so geography, service area, sector focus, and business credibility need to be obvious.",
      "mccaigs is based in Edinburgh and helps Scottish organisations prepare their websites for AI search with restrained, technical, AI-readable improvements.",
    ],
    points: [
      "Clarify Scottish service areas, location signals, and relevant local business context.",
      "Strengthen service pages with structured data and plain-English explanations.",
      "Build internal links between AEO, AI visibility, websites, assistant, and service pages.",
      "Check whether the site can be crawled, understood, and summarised accurately.",
    ],
    reportFocus: "Entity clarity",
    faqs: [
      {
        question: "Do Scottish businesses need different AEO work?",
        answer:
          "The fundamentals are the same, but location and service-area clarity matter. A Scottish firm should make it easy for AI systems to understand whether it serves Edinburgh, Scotland, the UK, or a specific local market.",
      },
      ...sharedFaqs,
    ],
  },
  {
    slug: "answer-engine-optimisation-uk",
    path: "/answer-engine-optimisation-uk",
    title: "Answer Engine Optimisation UK",
    description:
      "UK Answer Engine Optimisation services that help businesses prepare for AI search, answer engines, structured data, and AI-readable websites.",
    h1: "Answer Engine Optimisation for UK businesses",
    eyebrow: "AEO / United Kingdom",
    region: "United Kingdom",
    kind: "service",
    cta: "Prepare your UK business for answer engines",
    body: [
      "Across the UK, answer engines are changing how people compare suppliers, local firms, and specialist services. Websites need to be clear enough for humans and structured enough for machines.",
      "mccaigs helps UK businesses improve the foundations that answer engines may use: metadata, schema, FAQs, entity signals, service architecture, crawlability, and concise AI-readable summaries.",
    ],
    points: [
      "Shape service pages around clear buyer questions and practical answers.",
      "Improve schema coverage for organisation, services, FAQs, breadcrumbs, and articles.",
      "Prepare concise AI-readable summaries through llms.txt and llms-full.txt.",
      "Use careful wording that improves chances without promising AI inclusion.",
    ],
    reportFocus: "Structured data coverage",
    faqs: [
      {
        question: "Can mccaigs work with businesses outside Scotland?",
        answer:
          "Yes. mccaigs is based in Scotland and works with UK businesses where practical AI, technical SEO, websites, automation, or deterministic assistants are a good fit.",
      },
      ...sharedFaqs,
    ],
  },
  {
    slug: "ai-search-optimisation",
    path: "/ai-search-optimisation",
    title: "AI Search Optimisation",
    description:
      "AI Search Optimisation from mccaigs for businesses preparing their websites for ChatGPT, Gemini, Google AI, and modern answer engines.",
    h1: "AI Search Optimisation for clearer machine-readable websites",
    eyebrow: "AI search / Technical SEO",
    region: "UK and Scotland",
    kind: "service",
    cta: "Optimise your website for AI search",
    body: [
      "AI Search Optimisation focuses on the signals that help AI-assisted search systems interpret a business correctly. It is not about tricking a model. It is about making the website clearer, more structured, and easier to cite.",
      "mccaigs combines modern website engineering with practical SEO and deterministic AI thinking, so the site explains the business accurately to people and machines.",
    ],
    points: [
      "Improve page titles, descriptions, internal links, and topic coverage.",
      "Add schema that reflects real services rather than aspirational claims.",
      "Use FAQs to answer practical buyer questions in clean, crawlable language.",
      "Keep site performance, accessibility, and content architecture aligned.",
    ],
    reportFocus: "AI crawlability",
    faqs: [
      {
        question: "Is AI Search Optimisation the same as technical SEO?",
        answer:
          "It overlaps with technical SEO, but it adds a stronger focus on entity clarity, answer-ready content, structured data, and how AI systems may summarise the business.",
      },
      ...sharedFaqs,
    ],
  },
  {
    slug: "ai-visibility",
    path: "/ai-visibility",
    title: "AI Visibility",
    description:
      "AI Visibility services from mccaigs, including readiness checks, ChatGPT and Gemini prompt testing, structured data, llms.txt, and practical reporting.",
    h1: "AI Visibility for businesses that need to be easier to understand and cite",
    eyebrow: "AI visibility / Management",
    region: "UK and Scotland",
    kind: "service",
    cta: "Start an AI visibility review",
    body: [
      "AI Visibility is the ongoing discipline of checking whether a business is easy for answer engines to understand. It looks at website structure, content clarity, schema coverage, entity signals, crawlability, and what AI tools currently say when prompted.",
      "mccaigs treats AI visibility as practical evidence gathering, not theatre. The output is a clear view of what is working, what is missing, and what should be improved next.",
    ],
    points: [
      "Run monthly ChatGPT, Gemini, and Google AI prompt checks.",
      "Track entity clarity, FAQ coverage, schema coverage, and crawlability.",
      "Recommend updates to content, metadata, internal links, and llms files.",
      "Report findings without guaranteeing rankings or inclusion.",
    ],
    reportFocus: "ChatGPT visibility",
    faqs: [
      {
        question: "What is an AI Visibility Report?",
        answer:
          "It is a practical report showing example metrics such as AI Readiness Score, entity clarity, structured data coverage, FAQ coverage, AI crawlability, llms.txt presence, and prompt-test visibility across major AI systems.",
      },
      ...sharedFaqs,
    ],
  },
  {
    slug: "chatgpt-seo",
    path: "/chatgpt-seo",
    title: "ChatGPT SEO",
    description:
      "ChatGPT SEO services from mccaigs: prepare your website, entity signals, service pages, FAQs, and llms.txt for AI-assisted recommendations.",
    h1: "ChatGPT SEO without the hype",
    eyebrow: "ChatGPT SEO / AI recommendations",
    region: "UK and Scotland",
    kind: "service",
    cta: "Make your business easier for ChatGPT to understand",
    body: [
      "ChatGPT SEO is a shorthand for improving the public signals that may help AI assistants understand a business. It should not be treated as a promise that a model will recommend you.",
      "mccaigs helps businesses prepare the foundations: clear service pages, helpful FAQs, strong entity signals, structured data, internal links, and AI-readable summaries.",
    ],
    points: [
      "Clarify who the business serves and what problems it solves.",
      "Use practical service copy that answers real customer questions.",
      "Create llms.txt and llms-full.txt as concise machine-readable summaries.",
      "Test prompts carefully and report what can be improved.",
    ],
    reportFocus: "ChatGPT visibility",
    faqs: [
      {
        question: "Can you get my business recommended by ChatGPT?",
        answer:
          "mccaigs cannot guarantee a recommendation. The useful work is to make your business easier to understand, verify, and cite when ChatGPT or another assistant has access to relevant public information.",
      },
      ...sharedFaqs,
    ],
  },
  {
    slug: "google-ai-overviews",
    path: "/google-ai-overviews",
    title: "Google AI Overviews Readiness",
    description:
      "Google AI Overviews readiness from mccaigs: practical technical SEO, structured content, schema, FAQs, and crawlable AI-ready website improvements.",
    h1: "Prepare your website for Google AI Overviews",
    eyebrow: "Google AI / Readiness",
    region: "UK and Scotland",
    kind: "service",
    cta: "Review Google AI readiness",
    body: [
      "Google AI Overviews can change how users discover and compare businesses. There is no reliable shortcut and no guaranteed inclusion. The sensible work is to prepare your site so its pages are clear, useful, technically sound, and easy to understand.",
      "mccaigs helps businesses improve the foundations that matter: crawlability, fast pages, structured content, FAQs, service clarity, internal links, and schema that matches the real organisation.",
    ],
    points: [
      "Review indexability, sitemap coverage, robots rules, and page metadata.",
      "Improve service pages so answer engines can extract a plain-English summary.",
      "Add FAQ and breadcrumb schema where it accurately reflects the page.",
      "Avoid claims that promise ranking, inclusion, or privileged placement.",
    ],
    reportFocus: "Google AI visibility",
    faqs: [
      {
        question: "Can you guarantee Google AI Overview inclusion?",
        answer:
          "No. The responsible approach is to prepare and optimise the website, improve the quality of the public signals, and track changes over time.",
      },
      ...sharedFaqs,
    ],
  },
  {
    slug: "llms-txt",
    path: "/llms-txt",
    title: "llms.txt",
    description:
      "llms.txt planning and implementation from mccaigs, with concise AI-readable summaries, key pages, services, and deterministic assistant context.",
    h1: "llms.txt is useful, but it is only the start",
    eyebrow: "AI-readable websites / llms.txt",
    region: "UK and Scotland",
    kind: "article",
    cta: "Add AI-readable site summaries",
    body: [
      "An llms.txt file gives AI crawlers and tools a concise guide to a website. It can explain who the business is, what it does, which pages matter, and how the site should be described.",
      "It is not a magic ranking file. It works best as part of a broader AI visibility strategy that also improves service pages, structured data, internal links, FAQs, and the underlying website.",
    ],
    points: [
      "Create a concise public llms.txt file at the site root.",
      "Add a fuller llms-full.txt knowledge summary for deeper context.",
      "Keep both files accurate, restrained, and aligned with visible site content.",
      "Use llms files alongside schema, sitemap coverage, and good page architecture.",
    ],
    reportFocus: "llms.txt present",
    faqs: [
      {
        question: "Does every business need llms.txt?",
        answer:
          "Not every business needs it urgently, but it is a sensible low-risk addition for organisations investing in AI visibility and answer engine readiness.",
      },
      ...sharedFaqs,
    ],
  },
  {
    slug: "ai-ready-websites",
    path: "/ai-ready-websites",
    title: "AI-ready Websites",
    description:
      "AI-ready websites from mccaigs: fast, structured, crawlable sites with clear services, schema, llms.txt, and deterministic assistant options.",
    h1: "AI-ready websites built for people and machines",
    eyebrow: "Websites / AI readiness",
    region: "UK and Scotland",
    kind: "service",
    cta: "Build an AI-ready website",
    body: [
      "An AI-ready website is not a website with a chatbot bolted on. It is a fast, clear, structured website that explains the business properly and gives modern search and AI systems a dependable set of signals.",
      "mccaigs builds websites with practical AI readiness in mind: clean architecture, strong metadata, service clarity, structured data, accessible content, llms files, and deterministic assistants where they genuinely help.",
    ],
    points: [
      "Design service pages that answer buyer questions plainly.",
      "Use structured data and internal links to clarify relationships.",
      "Keep pages fast, responsive, accessible, and easy to crawl.",
      "Add controlled assistants only when approved knowledge and fallback logic are in place.",
    ],
    reportFocus: "AI crawlability",
    faqs: [
      {
        question: "Is an AI-ready website just an SEO website?",
        answer:
          "Good SEO remains important, but an AI-ready website also focuses on answer-ready content, machine-readable summaries, entity clarity, and controlled assistant behaviour where appropriate.",
      },
      ...sharedFaqs,
    ],
  },
  {
    slug: "how-to-appear-in-google-ai",
    path: "/how-to-appear-in-google-ai",
    title: "How to Appear in Google AI",
    description:
      "A practical guide from mccaigs on preparing your website for Google AI: technical SEO, structured content, schema, FAQs, and crawlability.",
    h1: "How to improve your chances of appearing in Google AI answers",
    eyebrow: "Guide / Google AI",
    region: "UK and Scotland",
    kind: "article",
    cta: "Review your Google AI readiness",
    body: [
      "There is no guaranteed method to appear in Google AI answers. The practical route is to make your website genuinely useful, technically accessible, and clear enough for both search systems and people to understand.",
      "mccaigs focuses on the fundamentals: crawlability, clear service pages, precise metadata, structured data, FAQs, internal linking, and content that answers real customer questions without exaggeration.",
    ],
    points: [
      "Make sure important pages are indexable and included in the sitemap.",
      "Use schema only where it accurately represents the page and business.",
      "Answer common buyer questions in direct, useful language.",
      "Build stronger entity signals around the business, services, and locations served.",
    ],
    reportFocus: "Google AI visibility",
    faqs: [
      {
        question: "What should I avoid when trying to appear in Google AI?",
        answer:
          "Avoid thin content, exaggerated claims, fake authority, duplicate pages, and promises that cannot be substantiated. AI visibility starts with credible public information.",
      },
      ...sharedFaqs,
    ],
  },
  {
    slug: "how-to-get-recommended-by-chatgpt",
    path: "/how-to-get-recommended-by-chatgpt",
    title: "How to Get Recommended by ChatGPT",
    description:
      "A practical guide from mccaigs on improving the signals that may help ChatGPT understand, compare, and cite your business.",
    h1: "How to improve your chances of being recommended by ChatGPT",
    eyebrow: "Guide / ChatGPT",
    region: "UK and Scotland",
    kind: "article",
    cta: "Improve ChatGPT readiness",
    body: [
      "No one can honestly promise that ChatGPT will recommend a business. What you can do is make the business easier to understand, compare, verify, and cite when AI systems use public web information.",
      "mccaigs helps businesses improve those signals through service architecture, structured data, plain-English FAQs, llms.txt, stronger internal links, and practical AI visibility testing.",
    ],
    points: [
      "Explain the business, services, customers, location, and differentiators clearly.",
      "Publish useful pages that answer the questions customers actually ask.",
      "Use structured data and AI-readable summaries to reduce ambiguity.",
      "Monitor prompts over time and improve the source material where gaps appear.",
    ],
    reportFocus: "ChatGPT visibility",
    faqs: [
      {
        question: "What kind of pages help ChatGPT understand a business?",
        answer:
          "Clear service pages, about pages, FAQs, case-style explanations, structured data, and concise AI-readable summaries all help reduce ambiguity.",
      },
      ...sharedFaqs,
    ],
  },
  {
    slug: "ai-visibility-case-study",
    path: "/ai-visibility-case-study",
    title: "AI Visibility Case Study",
    description:
      "How mccaigs built its own AI Visibility system using Answer Engine Optimisation pages, llms.txt, public assistant knowledge, schema, sitemap coverage, and deterministic assistant answers.",
    h1: "How mccaigs built its own AI Visibility system",
    eyebrow: "Case study / AI visibility",
    region: "UK and Scotland",
    kind: "article",
    cta: "Plan your AI visibility system",
    body: [
      "mccaigs treated its own website as a practical AI Visibility project: clarify the entity, explain the services, publish AI-readable knowledge, connect related pages, and keep the deterministic assistant aligned with approved public facts.",
      "The aim was not to guarantee inclusion in ChatGPT, Gemini, Claude, Perplexity, Google AI, or Google AI Overviews. The aim was to make mccaigs easier for visitors, crawlers, and answer engines to understand, cite, and verify.",
      "The implementation is verifiable in the public routes and repository architecture. No exact ranking, traffic, conversion, citation, or recommendation claim is made because dated supporting evidence is not part of this case study.",
    ],
    points: [
      "Built a connected AEO page set covering Answer Engine Optimisation, AI Search Optimisation, AI Visibility, ChatGPT SEO, Google AI Overviews readiness, llms.txt, and AI-ready websites.",
      "Published llms.txt, llms-full.txt, assistant-knowledge.json, and assistant-knowledge.md as safe public knowledge sources.",
      "Updated sitemap, robots, schema, internal links, footer discovery, and assistant answers so public signals agree.",
      "Kept the assistant deterministic by using approved static knowledge rather than runtime AI calls.",
    ],
    evidence: [
      { label: "Discovery routes", value: "22 connected pages" },
      { label: "AI-readable files", value: "llms.txt, llms-full.txt, JSON, Markdown" },
      { label: "Assistant model", value: "Static approved knowledge" },
      { label: "Promise boundary", value: "No ranking or inclusion guarantees" },
    ],
    reportFocus: "Recommended next actions",
    faqs: [
      {
        question: "What did mccaigs build for its own AI visibility?",
        answer:
          "mccaigs built a static AI visibility system: AEO service pages, AI-readable knowledge files, structured metadata, sitemap and robots coverage, internal links, and deterministic assistant answers from approved knowledge.",
      },
      {
        question: "Does this guarantee mccaigs will appear in AI answers?",
        answer:
          "No. It prepares and improves the public signals that answer engines may use, but no one can guarantee inclusion, citations, rankings, or recommendations in ChatGPT, Gemini, Claude, Perplexity, Google AI, or Google AI Overviews.",
      },
      {
        question: "Can the same approach work for another business?",
        answer:
          "Yes, if the business has useful public facts to organise. The details change by sector, location, services, proof points, and buyer questions, but the principle is the same: reduce ambiguity and make the business easier to understand.",
      },
      ...sharedFaqs,
    ],
  },
] as const satisfies readonly AeoPage[];

export type AeoPageSlug =
  | "answer-engine-optimisation"
  | "answer-engine-optimisation-scotland"
  | "answer-engine-optimisation-uk"
  | "ai-search-optimisation"
  | "ai-visibility"
  | "chatgpt-seo"
  | "google-ai-overviews"
  | "llms-txt"
  | "ai-ready-websites"
  | "how-to-appear-in-google-ai"
  | "how-to-get-recommended-by-chatgpt"
  | "ai-visibility-case-study";

export const aeoPageMap = Object.fromEntries(aeoPages.map((page) => [page.slug, page])) as unknown as Record<AeoPageSlug, AeoPage>;

export const aeoPackages = [
  {
    title: "AI Visibility and AEO Audit",
    price: "£299 standard",
    includes: [
      "AI visibility check",
      "Technical SEO review",
      "Structured data review",
      "Entity signals review",
      "llms.txt review",
      "Recommendations report",
    ],
  },
  {
    title: "AEO Implementation",
    price: "from £799",
    includes: [
      "llms.txt and llms-full.txt",
      "Metadata improvements",
      "Schema improvements",
      "FAQ structure",
      "Internal linking",
      "AI-readable service copy",
      "Sitemap and crawl checks",
    ],
  },
  {
    title: "AI Visibility Management",
    price: "from £99 per month",
    includes: [
      "Monthly AI visibility testing",
      "ChatGPT, Gemini, and Google AI prompt checks",
      "Content recommendations",
      "Schema and content updates",
      "Visibility report",
    ],
  },
] as const;

export const aiVisibilityMetrics = [
  "Overall AI Readiness Score",
  "Entity clarity",
  "Structured data coverage",
  "FAQ coverage",
  "AI crawlability",
  "llms.txt present",
  "ChatGPT visibility",
  "Gemini visibility",
  "Google AI visibility",
  "Recommended next actions",
] as const;

export function getAeoRelatedPages(currentSlug: AeoPageSlug) {
  const caseStudy = aeoPageMap["ai-visibility-case-study"];
  const candidates = aeoPages.filter((page) => page.slug !== currentSlug);
  const related = currentSlug === "ai-visibility-case-study"
    ? candidates
    : [caseStudy, ...candidates.filter((page) => page.slug !== "ai-visibility-case-study")];

  return related.slice(0, 6);
}

export function createAeoStructuredData(page: AeoPage) {
  const url = absoluteUrl(page.path);
  const common = {
    "@context": "https://schema.org",
    "@type": page.kind === "service" ? "Service" : "Article",
    about: [
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
    description: page.description,
    headline: page.h1,
    name: page.title,
    provider: {
      "@id": `${siteUrl}/#professional-service`,
      "@type": "ProfessionalService",
      name: siteConfig.name,
    },
    url,
  };

  if (page.kind === "service") {
    return {
      ...common,
      areaServed: [page.region, "Scotland", "United Kingdom"],
      serviceType: page.title,
    };
  }

  return {
    ...common,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteUrl,
    },
    publisher: {
      "@id": `${siteUrl}/#organisation`,
    },
  };
}
