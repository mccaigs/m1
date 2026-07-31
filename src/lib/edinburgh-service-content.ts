import { absoluteUrl, siteUrl } from "@/lib/seo";

export type EdinburghPage = {
  approach: string[];
  cta: string;
  definition: string;
  deliverables: string[];
  description: string;
  eyebrow: string;
  faqs: Array<{ answer: string; question: string }>;
  fit: string[];
  h1: string;
  kind: "service" | "comparison";
  limitations: string[];
  path: string;
  price: string;
  proof: Array<{ href: string; label: string; text: string }>;
  related: Array<{ href: string; label: string }>;
  reviewed: string;
  sections: Array<{ heading: string; paragraphs: string[] }>;
  slug: EdinburghPageSlug;
  title: string;
};

const reviewed = "31 July 2026";

const noGuarantee = {
  question: "Can mccaigs guarantee rankings or inclusion in AI answers?",
  answer: "No. Search and answer systems decide what they index, rank, cite, or recommend. mccaigs can improve the accuracy, structure, crawlability, and usefulness of the source material, but cannot control an external platform.",
};

export const edinburghPages = [
  {
    slug: "aeo-agency-edinburgh",
    path: "/aeo-agency-edinburgh",
    title: "AEO Agency Edinburgh",
    description: "Edinburgh AEO partner for technical audits, structured content, schema, entity clarity, AI visibility monitoring, and careful implementation.",
    h1: "An AEO agency in Edinburgh for technical implementation",
    eyebrow: "AEO partner / Edinburgh",
    kind: "service",
    definition: "An AEO agency helps an organisation make its public information easier for answer engines to find, understand, extract, and represent accurately. mccaigs combines technical SEO, structured content, schema, entity clarification, public knowledge files, and deterministic assistants for organisations in Edinburgh and across Scotland.",
    price: "AEO Audit from £299. Full Technical AEO Implementation from £799.",
    cta: "Discuss an Edinburgh AEO project",
    sections: [
      { heading: "A technical partner, not a conventional content agency", paragraphs: ["AEO overlaps with SEO, but it asks a different set of questions. Can a machine identify the organisation, its services, locations, evidence, and limitations? Can it extract a direct answer without losing the meaning? Is the supporting source crawlable and consistent?", "mccaigs diagnoses those questions and then implements the answer in the website and approved knowledge system. The work is senior-led and logic-first. It does not depend on publishing large volumes of generic copy or buying links."] },
      { heading: "From audit to implementation and monitoring", paragraphs: ["An engagement normally begins with the current site, search presentation, entity signals, service architecture, structured data, internal links, public knowledge files, and a sample of relevant answer-engine prompts. Findings become a prioritised implementation plan rather than a score with no route forward.", "Implementation can include page architecture, technical fixes, schema, concise answers, evidence handling, llms files, and deterministic knowledge. Continuing monitoring checks whether the public source remains clear and where external systems still produce incomplete or inaccurate descriptions."] },
    ],
    approach: ["Audit crawlability, metadata, schema, entities, service coverage, and answer extractability.", "Map commercial questions to one canonical page for each intent.", "Implement visible copy and matching structured data in the existing website architecture.", "Connect approved public knowledge, internal links, and deterministic answers.", "Monitor representative prompts and report uncertainty honestly."],
    deliverables: ["AEO and technical SEO audit", "Entity and service architecture", "Answer-ready page implementation", "Schema and breadcrumb implementation", "Public knowledge and llms file alignment", "AI visibility baseline and monitoring plan"],
    fit: ["Edinburgh and Scottish organisations with a credible service that is poorly explained online", "Teams that want technical implementation as well as recommendations", "Businesses that need SEO, AEO, web engineering, and controlled knowledge to work together"],
    limitations: ["A conventional campaign agency is a better fit for paid media, social media management, digital PR, or high-volume content production.", "mccaigs is not the right provider for anyone seeking guaranteed rankings, citations, recommendations, or a backlink package."],
    proof: [{ href: "/ai-visibility-case-study", label: "mccaigs AI visibility case study", text: "A repository-backed account of the site's connected AEO pages, schema, public knowledge, sitemap coverage, and deterministic assistant." }],
    related: [{ href: "/answer-engine-optimisation-edinburgh", label: "How AEO implementation works" }, { href: "/ai-visibility-edinburgh", label: "AI visibility in Edinburgh" }, { href: "/seo-vs-aeo-vs-ai-visibility", label: "Compare SEO, AEO, and AI visibility" }, { href: "/answer-engine-optimisation-scotland", label: "AEO across Scotland" }],
    reviewed,
    faqs: [
      { question: "What does an AEO agency do?", answer: "It improves the technical and editorial signals that help answer engines understand an organisation. Typical work includes crawlability, information architecture, entities, direct answers, structured data, public knowledge, internal links, and measurement." },
      { question: "How is mccaigs different from a conventional SEO agency?", answer: "mccaigs is a technical studio. It can diagnose and implement the website, structured data, knowledge files, and deterministic assistant. It does not offer generic campaign management, social packages, or backlink selling." },
      { question: "What does an AEO audit cost?", answer: "The approved public starting price for an AEO Audit is £299. Scope and any implementation work are confirmed after discovery." },
      { question: "Do you work beyond Edinburgh?", answer: "Yes. mccaigs is based in Edinburgh and works with organisations across Scotland and the wider UK where the project is a good fit." },
      { question: "How quickly does AEO work produce a result?", answer: "Technical changes can be implemented on a defined schedule, but external discovery systems update on their own timescales. Monitoring should be treated as evidence gathering, not a promise of immediate visibility." },
      noGuarantee,
    ],
  },
  {
    slug: "answer-engine-optimisation-edinburgh",
    path: "/answer-engine-optimisation-edinburgh",
    title: "Answer Engine Optimisation Edinburgh",
    description: "A practical Edinburgh guide to Answer Engine Optimisation, covering crawlability, entities, evidence, schema, extractable answers, and implementation.",
    h1: "Answer Engine Optimisation for Edinburgh businesses",
    eyebrow: "AEO explained / Edinburgh",
    kind: "service",
    definition: "Answer Engine Optimisation, or AEO, is the work of making trustworthy information easier for search and AI answer systems to understand and extract. For an Edinburgh business, that includes clear services and geography, crawlable pages, direct answers, consistent entities, visible evidence, useful internal links, and structured data that matches the page.",
    price: "AEO Audit from £299. Full Technical AEO Implementation from £799.",
    cta: "Plan an AEO implementation",
    sections: [
      { heading: "How answer engines use public information", paragraphs: ["Google's AI-assisted experiences and other answer engines may combine indexed pages, structured information, citations, and wider source signals. AEO cannot dictate the output. It can reduce ambiguity by making the source page technically accessible, specific, well organised, and supported by evidence.", "AEO therefore sits alongside SEO. Crawlability, performance, internal linking, and authority still matter. The additional emphasis is on extractable answers, named entities, relationships, evidence, and information that remains clear when summarised."] },
      { heading: "A practical implementation process", paragraphs: ["mccaigs maps the questions a buyer asks, checks whether each intent has a useful canonical page, and reviews what a machine can establish about the business. The next step is implementation across content, metadata, schema, navigation, sitemaps, and approved knowledge.", "Common mistakes include thin location pages, duplicated service copy, schema that says more than the visible page, vague claims, conflicting organisation data, and treating llms.txt as a ranking switch. Good AEO is a connected system, not one file or markup type."] },
    ],
    approach: ["Establish the questions, entities, services, locations, and evidence that matter.", "Check indexing, crawl paths, canonical URLs, metadata, and content hierarchy.", "Write direct answers and supporting explanations for people first.", "Add schema only when it accurately reflects visible content.", "Test extraction, internal links, public knowledge, and representative prompts."],
    deliverables: ["Technical and content audit", "Intent and canonical route map", "AEO page and FAQ implementation", "Organisation, service, FAQ, and breadcrumb schema where accurate", "Knowledge-file and sitemap updates", "Documented limitations and monitoring baseline"],
    fit: ["Businesses whose specialist services are difficult to summarise", "Organisations with useful evidence but weak page structure", "Teams modernising a website and wanting SEO and AEO built together"],
    limitations: ["AEO cannot compensate for an unclear offer, unsupported claims, or missing evidence.", "A content marketing or PR provider may also be needed when the main gap is independent coverage or sustained editorial production."],
    proof: [{ href: "/answer-engine-optimisation", label: "Answer Engine Optimisation", text: "The established mccaigs service explanation covering technical SEO, structured data, entity clarity, llms.txt, AI-readable content, and deterministic assistants." }],
    related: [{ href: "/aeo-agency-edinburgh", label: "Choose an Edinburgh AEO partner" }, { href: "/answer-engine-optimisation-scotland", label: "AEO in Scotland" }, { href: "/ai-search-optimisation", label: "AI search optimisation" }, { href: "/seo-vs-aeo-vs-ai-visibility", label: "SEO, AEO, and AI visibility compared" }],
    reviewed,
    faqs: [
      { question: "What does AEO mean?", answer: "AEO means Answer Engine Optimisation. It makes clear, supported information easier for answer systems to locate, interpret, and extract." },
      { question: "Is AEO part of SEO?", answer: "They overlap. AEO depends on many SEO foundations, while placing extra emphasis on entities, direct answers, evidence, citations, structured data, and accurate summarisation." },
      { question: "Does schema alone improve AEO?", answer: "No. Schema can clarify visible content, but it cannot replace useful pages, crawlability, evidence, or consistent public information." },
      { question: "What are common AEO mistakes?", answer: "Common mistakes include duplicate location pages, vague service claims, hidden FAQ schema, inconsistent business details, weak internal links, and treating llms.txt as a guaranteed ranking tool." },
      { question: "What can AEO influence?", answer: "AEO can improve the source material and reduce ambiguity. It cannot control when an external system crawls, selects, cites, ranks, or recommends that material." },
      noGuarantee,
    ],
  },
  {
    slug: "ai-visibility-edinburgh",
    path: "/ai-visibility-edinburgh",
    title: "AI Visibility Edinburgh",
    description: "AI visibility assessment and implementation for Edinburgh organisations, covering entity consistency, service clarity, sources, structured knowledge, and monitoring.",
    h1: "AI visibility for Edinburgh organisations",
    eyebrow: "AI discovery / Edinburgh",
    kind: "service",
    definition: "AI visibility describes whether an organisation can be discovered, understood, and represented accurately in AI-assisted research and search. It is not another name for rankings. mccaigs assesses public source signals, entity consistency, service clarity, structured knowledge, and representative prompts, then separates monitoring findings from implementation work.",
    price: "AI Visibility Management from £99 per month.",
    cta: "Start an AI visibility review",
    sections: [
      { heading: "Measure understanding, not just mentions", paragraphs: ["A useful review asks whether the brand is identified correctly, whether its services and geography are clear, which public sources support the description, and where systems return incomplete or inaccurate answers. A mention without the correct context is not necessarily useful visibility.", "Prompt checks are snapshots. Results can vary by platform, model, location, account, and date. Monitoring records what was observed and connects each gap to source material that can be improved."] },
      { heading: "Monitoring and implementation are different", paragraphs: ["Monitoring provides a baseline and shows changes over time. Implementation improves the owned sources through clearer pages, entity relationships, technical SEO, structured data, citations, internal links, and public knowledge.", "mccaigs reports the limits of the evidence. It does not imply control over ChatGPT, Claude, Gemini, Perplexity, Google, Bing, Copilot, or another external system."] },
    ],
    approach: ["Define representative discovery questions and record the date and platform tested.", "Review brand, founder, services, geography, and organisation consistency.", "Trace observed answers back to available public sources.", "Prioritise owned-source improvements separately from monitoring.", "Repeat tests carefully and report variance and uncertainty."],
    deliverables: ["AI visibility baseline", "Entity and source consistency review", "Prompt observation record", "Owned-source improvement plan", "Technical implementation scope", "Measured follow-up report"],
    fit: ["Organisations already investing in clear public information", "Teams concerned about inaccurate or incomplete AI-assisted descriptions", "Businesses that want evidence before commissioning wider implementation"],
    limitations: ["Monitoring cannot prove how every user or platform will see a business.", "mccaigs cannot guarantee a recommendation, citation, mention, ranking, or inclusion."],
    proof: [{ href: "/ai-visibility-case-study", label: "How mccaigs built its AI visibility system", text: "A verifiable account of the connected public-source architecture used on this website." }],
    related: [{ href: "/aeo-agency-edinburgh", label: "AEO agency Edinburgh" }, { href: "/answer-engine-optimisation-edinburgh", label: "AEO implementation" }, { href: "/ai-visibility", label: "UK and Scotland AI visibility service" }, { href: "/seo-vs-aeo-vs-ai-visibility", label: "Choose the right discipline" }],
    reviewed,
    faqs: [
      { question: "What is AI visibility?", answer: "It is the degree to which public sources allow AI-assisted systems to discover, understand, and represent an organisation accurately." },
      { question: "Is AI visibility the same as search ranking?", answer: "No. Rankings describe ordered search results. AI visibility also considers descriptions, citations, entity accuracy, service understanding, and appearance across varied answer experiences." },
      { question: "How do you assess AI visibility?", answer: "mccaigs reviews owned sources, entity consistency, technical accessibility, structured knowledge, and a dated set of representative prompt observations." },
      { question: "Why can prompt results vary?", answer: "Platforms use different sources, models, personalisation, locations, and update cycles. A test is a dated observation rather than a universal result." },
      { question: "What is the approved starting price?", answer: "AI Visibility Management currently starts from £99 per month. Wider implementation is priced following discovery." },
      noGuarantee,
    ],
  },
  {
    slug: "ai-systems-edinburgh",
    path: "/ai-systems-edinburgh",
    title: "AI Systems Edinburgh",
    description: "Practical AI systems in Edinburgh: deterministic assistants, knowledge systems, portals, internal tools, workflows, and production applications.",
    h1: "Practical AI systems built in Edinburgh",
    eyebrow: "Operational AI / Edinburgh",
    kind: "service",
    definition: "mccaigs builds practical AI systems that fit real operations: deterministic assistants, structured knowledge tools, client portals, internal applications, workflow orchestration, and carefully bounded AI-assisted features. Work beyond the demo means clear ownership, tested logic, usable interfaces, and a system that still makes sense after the presentation ends.",
    price: "Priced following discovery.",
    cta: "Discuss a practical AI system",
    sections: [
      { heading: "A working system is more than a model call", paragraphs: ["A demonstration can answer an impressive question. A production system must also manage identity, permissions, data quality, fallbacks, auditability, user experience, cost, and what happens when an integration fails.", "mccaigs begins with the operational truth. Deterministic rules handle decisions that must remain predictable. Generative AI is used only where interpretation or drafting adds enough value to justify its variability."] },
      { heading: "Connect AI to the business process", paragraphs: ["Useful systems may retrieve approved knowledge, prepare a draft for human review, classify an enquiry, support a handover, or surface the next action in a portal. The workflow around the feature matters as much as the feature itself.", "The result can integrate with existing tools or replace a fragile collection of forms, spreadsheets, and manual checks with one controlled application."] },
    ],
    approach: ["Map the users, decisions, data, permissions, and failure states.", "Choose deterministic logic wherever prediction is unnecessary.", "Prototype the smallest complete workflow, not an isolated model demo.", "Add validation, human review, fallbacks, logs, and ownership.", "Test the production path and document operating limits."],
    deliverables: ["Deterministic assistants", "Internal knowledge tools", "Client or staff portals", "AI-assisted workflow applications", "Structured project systems", "Integration and operating documentation"],
    fit: ["Teams with a defined operational problem and accessible source data", "Organisations that need control, permissions, and human oversight", "Businesses moving from an AI experiment to a maintained application"],
    limitations: ["mccaigs may not be the right fit for open-ended research with no approved boundary or owner.", "A standard SaaS product may be better where the process is common and does not need bespoke software."],
    proof: [{ href: "/assistant", label: "mccaigs deterministic assistant", text: "A live demonstration that selects approved knowledge and uses a controlled fallback rather than inventing an answer." }],
    related: [{ href: "/systems", label: "Selected technical systems" }, { href: "/ai-automation-edinburgh", label: "AI automation Edinburgh" }, { href: "/custom-software-edinburgh", label: "Custom software Edinburgh" }, { href: "/insights/deterministic-ai-for-ordinary-businesses", label: "Deterministic AI for ordinary businesses" }],
    reviewed,
    faqs: [
      { question: "What is a practical AI system?", answer: "It is a maintained application that applies AI or deterministic logic inside a complete workflow with data, users, validation, fallbacks, and ownership." },
      { question: "What is a deterministic assistant?", answer: "It answers from approved knowledge using defined matching and fallback rules. This improves control and consistency within the approved boundary, but does not eliminate every possible error." },
      { question: "Can you integrate with existing processes?", answer: "Yes, where the existing tools expose suitable APIs or reliable data exchange. Integration scope is confirmed during discovery." },
      { question: "Do all AI systems need generative AI?", answer: "No. Many business decisions are cheaper and more reliable as rules, validation, search, or workflow state." },
      { question: "Can a prototype become a production system?", answer: "Yes, if production requirements such as permissions, data quality, monitoring, support, and failure handling are deliberately added rather than assumed." },
    ],
  },
  {
    slug: "ai-automation-edinburgh",
    path: "/ai-automation-edinburgh",
    title: "AI Automation Edinburgh",
    description: "AI automation for Edinburgh businesses, covering enquiries, qualification, knowledge retrieval, documents, reporting, approvals, and human oversight.",
    h1: "AI automation for repeatable business work",
    eyebrow: "AI automation / Edinburgh",
    kind: "service",
    definition: "AI automation combines workflow rules with selected AI capabilities to reduce repeatable operational handling. It can support enquiry triage, knowledge retrieval, reporting, document workflows, client communication, approvals, and handovers. The mccaigs principle is simple: do not pay for intelligence when logic is enough.",
    price: "Priced following discovery.",
    cta: "Map an AI automation opportunity",
    sections: [
      { heading: "Automate the repeatable part", paragraphs: ["The strongest automation candidates have a clear trigger, known inputs, a repeatable decision, and an identifiable owner. AI may help interpret free text or draft a response, while rules control routing, approvals, status, and the final action.", "Human oversight is designed into the process where judgement, risk, or customer impact requires it. The aim is not to remove people indiscriminately. It is to remove needless handling and make responsibility clearer."] },
      { heading: "Keep the workflow observable", paragraphs: ["A useful automation records what arrived, which rule or model step ran, what was produced, who reviewed it, and what happened next. That makes improvement and fault-finding possible.", "mccaigs can connect forms, structured data, internal interfaces, notifications, and approved knowledge into one controlled path. Generative output is validated before it influences business state."] },
    ],
    approach: ["Identify volume, delay, repetition, errors, and handover points.", "Separate deterministic decisions from interpretation or drafting.", "Design human review and exception routes before implementation.", "Build the smallest end-to-end automation with visible state.", "Measure handling saved and failures without inventing projected returns."],
    deliverables: ["Enquiry and lead qualification flows", "Knowledge retrieval", "Document and reporting workflows", "Approval and notification routes", "Client communication support", "Structured handovers and audit trails"],
    fit: ["Businesses with recurring work and clear owners", "Teams using repeated copy, manual routing, or inconsistent handovers", "Organisations prepared to define approved inputs, outputs, and exceptions"],
    limitations: ["A poorly understood or constantly changing process should be mapped before it is automated.", "High-risk decisions should not be delegated to an unreviewed generative output."],
    proof: [{ href: "/process", label: "mccaigs delivery process", text: "The existing diagnose, design, build, evaluate, ship, and improve process used to control technical delivery." }],
    related: [{ href: "/business-automation-edinburgh", label: "Business automation without unnecessary AI" }, { href: "/ai-systems-edinburgh", label: "AI systems Edinburgh" }, { href: "/systems", label: "Systems and workflow examples" }, { href: "/start-project", label: "Start a project" }],
    reviewed,
    faqs: [
      { question: "What tasks can AI automation support?", answer: "Common examples include enquiry triage, knowledge retrieval, draft reporting, document classification, communications, structured handovers, and routing work for approval." },
      { question: "When should automation use rules instead of AI?", answer: "Use rules when the inputs and outcome can be defined reliably. Rules are usually cheaper, faster, easier to test, and more predictable." },
      { question: "Will people remain involved?", answer: "Yes where judgement, risk, exceptions, or customer impact require human review. Oversight should be part of the design, not an afterthought." },
      { question: "Can you automate our existing tools?", answer: "Often, provided the tools have suitable APIs, exports, or reliable interfaces. The constraints are checked during discovery." },
      { question: "How is success measured?", answer: "Suitable measures can include handling time, queue age, error rate, completion rate, and exception volume. Baselines are needed before claiming improvement." },
    ],
  },
  {
    slug: "business-automation-edinburgh",
    path: "/business-automation-edinburgh",
    title: "Business Automation Edinburgh",
    description: "Business process and rule-based automation for Edinburgh organisations, including mapping, data handoffs, approvals, notifications, dashboards, and portals.",
    h1: "Business automation built around the real process",
    eyebrow: "Process automation / Edinburgh",
    kind: "service",
    definition: "Business automation improves a process by connecting data, responsibilities, rules, notifications, and interfaces. It may not need AI at all. mccaigs maps duplicated administration, disconnected tools, handoffs, approval routes, and reporting needs, then builds a dependable workflow or operational system.",
    price: "Priced following discovery.",
    cta: "Map a business process",
    sections: [
      { heading: "Fix the process before adding technology", paragraphs: ["Repeated administration is often a symptom of unclear inputs, duplicated records, missing ownership, or tools that do not share state. Automating the existing mess can make the failure happen faster.", "mccaigs first maps the trigger, data, decision, owner, exception, and outcome. The implementation may be a focused workflow, dashboard, portal, integration layer, or a combination of simple tools."] },
      { heading: "Reliable rules and visible handoffs", paragraphs: ["Rule-based automation is appropriate when the business can state what should happen. It can validate a submission, create a record, request approval, notify the right person, update status, and provide a clear operational view.", "AI is considered only where an interpretive step adds value. The core process remains understandable and auditable."] },
    ],
    approach: ["Map the current process with its owners, tools, and exceptions.", "Remove duplicate steps and define one source for each important field.", "Design states, approvals, notifications, and recovery routes.", "Build a usable staff or client interface around the workflow.", "Measure operational outcomes against an agreed baseline."],
    deliverables: ["Process map and automation specification", "Rule-based workflow", "Data handoff and integration design", "Approval and notification routes", "Operational dashboard", "Client or staff portal where useful"],
    fit: ["Teams losing time to copying data between tools", "Businesses with approval bottlenecks or unclear status", "Organisations that have outgrown spreadsheets and inbox-based coordination"],
    limitations: ["mccaigs may recommend improving the process before building software.", "A well-supported off-the-shelf tool is preferable when it meets the need without harmful compromise."],
    proof: [{ href: "/systems", label: "Systems that earn their place", text: "Existing codenamed system descriptions show the studio's focus on workflow state, validation, traceability, and clear ownership without invented client outcomes." }],
    related: [{ href: "/ai-automation-edinburgh", label: "AI automation Edinburgh" }, { href: "/custom-software-edinburgh", label: "Custom operational software" }, { href: "/services", label: "All mccaigs services" }, { href: "/process", label: "Delivery process" }],
    reviewed,
    faqs: [
      { question: "Does business automation require AI?", answer: "No. Many processes are best handled with validation, business rules, workflow state, integrations, and clear interfaces." },
      { question: "What should be automated first?", answer: "Start with repeatable work that has meaningful volume, a clear owner, known inputs, and an outcome that can be checked." },
      { question: "Can automation connect spreadsheets and existing software?", answer: "Often, yes. The quality of APIs, exports, identifiers, and source data determines the safest integration route." },
      { question: "What if our process is inconsistent?", answer: "The first deliverable may be a process map and a simpler operating rule. Software should not hide unresolved ownership or policy questions." },
      { question: "Can you build an operational dashboard?", answer: "Yes. A dashboard can expose status, queues, exceptions, ownership, and agreed measures when the underlying data is reliable." },
    ],
  },
  {
    slug: "custom-software-edinburgh",
    path: "/custom-software-edinburgh",
    title: "Custom Software Edinburgh",
    description: "Bespoke operational software in Edinburgh: Next.js applications, portals, dashboards, workflows, integrations, authentication, and maintainable production systems.",
    h1: "Custom software for Edinburgh organisations",
    eyebrow: "Bespoke systems / Edinburgh",
    kind: "service",
    definition: "mccaigs designs and builds bespoke operational software for organisations whose process no longer fits generic tools. Typical work includes Next.js applications, authenticated portals, dashboards, role-based workflows, structured content platforms, integrations, and Convex-backed systems where realtime data and application state are appropriate.",
    price: "Priced following discovery.",
    cta: "Scope a custom software project",
    sections: [
      { heading: "Build around the operation, not a technology list", paragraphs: ["Custom software is justified when the workflow, permissions, data, or customer experience is distinctive enough that off-the-shelf compromises create lasting cost. The important decisions concern scope, ownership, maintainability, and the smallest useful production release.", "mccaigs commonly uses Next.js and TypeScript for modern web applications. Convex can support realtime application data, functions, and files where it suits the system. Authentication, roles, validation, and auditability are designed around the actual users."] },
      { heading: "Move from prototype to controlled production", paragraphs: ["A prototype answers whether the core interaction is useful. Production work adds permissions, error handling, data migration, observability, responsive interfaces, accessibility, and a support route.", "Controlled scope matters. mccaigs defines a credible first release and records what is deliberately deferred, so the system can grow without pretending every future requirement is already known."] },
    ],
    approach: ["Diagnose users, workflows, data, integrations, risks, and success measures.", "Compare bespoke development with available products before committing.", "Define a controlled first release and technical architecture.", "Build server-rendered, accessible interfaces with typed validation.", "Test permissions, failure paths, responsive behaviour, and handover."],
    deliverables: ["Next.js web applications", "Authentication and user roles", "Client and staff portals", "Dashboards and workflow systems", "Structured content platforms", "Integrations and production handover"],
    fit: ["Organisations with a stable, valuable process that generic software handles poorly", "Teams needing role-based access or a joined operational view", "Founders progressing a validated prototype into a credible product"],
    limitations: ["Custom development is not sensible when a standard product meets the requirement at lower cost and risk.", "mccaigs may not be the right partner for an undefined product with no owner, users, or route to validation."],
    proof: [{ href: "/systems", label: "Selected technical builds", text: "Codenamed examples of decision systems, internal tools, workflow engines, automation layers, and SaaS foundations already described on the site." }],
    related: [{ href: "/web-development-edinburgh", label: "Web development Edinburgh" }, { href: "/ai-systems-edinburgh", label: "AI systems Edinburgh" }, { href: "/business-automation-edinburgh", label: "Business automation Edinburgh" }, { href: "/systems", label: "Systems" }],
    reviewed,
    faqs: [
      { question: "What custom software does mccaigs build?", answer: "Typical work includes portals, dashboards, workflow systems, structured content platforms, internal tools, integrations, and software-enabled service products." },
      { question: "Why use Next.js?", answer: "Next.js provides a strong foundation for server-rendered React applications, routing, metadata, performance, and modern web delivery. The choice still depends on the product." },
      { question: "When is Convex appropriate?", answer: "Convex can suit applications needing realtime data, typed functions, files, and coordinated state. It is used when those capabilities match the system, not by default." },
      { question: "Can you add authentication and roles?", answer: "Yes. Authentication and authorisation can be designed for staff, clients, administrators, and organisations, with server-side permission checks." },
      { question: "How do you control scope?", answer: "Discovery defines the smallest complete release, explicit acceptance criteria, known integrations, and a recorded list of deferred requirements." },
    ],
  },
  {
    slug: "seo-agency-edinburgh",
    path: "/seo-agency-edinburgh",
    title: "Technical SEO Agency Edinburgh",
    description: "Technical SEO in Edinburgh from a hands-on studio: crawlability, architecture, schema, performance, local entity clarity, AEO, and web implementation.",
    h1: "Technical SEO implementation in Edinburgh",
    eyebrow: "Technical SEO / Edinburgh",
    kind: "service",
    definition: "mccaigs provides technical SEO, website and information architecture, crawlability improvements, schema, structured content, local entity clarity, performance-oriented development, AEO, and AI visibility work. It is a technical studio, not a conventional full-service marketing agency offering social media packages or generic campaign management.",
    price: "Priced following discovery. AEO Audit from £299 where that is the correct starting point.",
    cta: "Discuss a technical SEO project",
    sections: [
      { heading: "Choose the provider that matches the problem", paragraphs: ["A technical studio is the strongest fit when the obstacle sits in the website, rendering, architecture, structured data, content model, performance, or integration between search and the product. An AEO specialist is useful when the organisation also needs answer-ready content, entity clarity, and AI discovery measurement.", "A conventional SEO marketing agency may be the better lead provider for ongoing editorial campaigns, digital PR, outreach, or broad campaign management. Some organisations need both providers with clear ownership."] },
      { heading: "Technical work that can be implemented", paragraphs: ["mccaigs reviews indexability, canonical URLs, metadata, sitemaps, robots rules, internal links, structured content, schema, accessibility, and page performance. Recommendations can be implemented directly in a modern website rather than passed on as an unactioned audit.", "For Edinburgh businesses, local entity clarity includes accurate location and service-area language, consistent organisation data, and useful pages that explain genuine local relevance without producing thin doorway content."] },
    ],
    approach: ["Identify whether the primary gap is technical, editorial, authority, local visibility, or AEO.", "Audit crawl paths, rendering, index controls, metadata, schema, performance, and internal links.", "Map each search intent to a useful canonical page.", "Implement technical and structured-content changes in the site.", "Measure what can be observed and state dependencies clearly."],
    deliverables: ["Technical SEO audit and implementation", "Information and URL architecture", "Metadata and canonical review", "Schema and structured content", "Performance-oriented web development", "Local entity and AEO alignment"],
    fit: ["Organisations with technical debt or weak site architecture", "Businesses needing developers to implement recommendations", "Teams combining a website modernisation with technical SEO and AEO"],
    limitations: ["mccaigs does not sell backlinks, social media packages, or generic campaign retainers.", "A content, PR, or full-service marketing agency may be needed when technical implementation is not the main constraint."],
    proof: [{ href: "/ai-visibility-case-study", label: "Technical AI visibility case study", text: "A visible example of route architecture, schema, sitemaps, knowledge files, and internal discovery working as one system." }],
    related: [{ href: "/aeo-agency-edinburgh", label: "AEO agency Edinburgh" }, { href: "/web-development-edinburgh", label: "Web development Edinburgh" }, { href: "/seo-vs-aeo-vs-ai-visibility", label: "Which discipline do you need?" }, { href: "/ai-search-optimisation", label: "AI search optimisation" }],
    reviewed,
    faqs: [
      { question: "Is mccaigs a full-service SEO agency?", answer: "No. mccaigs focuses on technical SEO, website architecture, structured content, schema, performance, local entity clarity, AEO, and implementation." },
      { question: "Do you provide local SEO?", answer: "mccaigs can improve location and service-area clarity, technical foundations, structured data, and locally relevant pages. It does not invent addresses, reviews, or local relationships." },
      { question: "Do you build the recommended changes?", answer: "Yes. Direct implementation is a core reason to choose a technical studio, subject to access, scope, and the website architecture." },
      { question: "Do you sell backlinks?", answer: "No. mccaigs does not sell backlink packages or promise rankings based on purchased links." },
      { question: "Do we need SEO, AEO, or both?", answer: "Most organisations still need sound SEO foundations. AEO adds value when services, entities, evidence, and direct answers also need to be clearer for answer engines." },
      noGuarantee,
    ],
  },
  {
    slug: "web-development-edinburgh",
    path: "/web-development-edinburgh",
    title: "Web Development Edinburgh",
    description: "Modern Next.js web development in Edinburgh with performance, accessibility, structured content, technical SEO, AEO, and operational integration.",
    h1: "Web development in Edinburgh for technically serious organisations",
    eyebrow: "Modern websites / Edinburgh",
    kind: "service",
    definition: "mccaigs builds modern websites and web applications that explain the business clearly, perform well, support technical SEO and AEO, and connect with operational workflows where useful. The work centres on maintainable Next.js architecture, accessibility, structured content, integrations, and measured modernisation rather than cheap template production.",
    price: "Priced following discovery. Existing approved website offers remain available through the project builder where suitable.",
    cta: "Discuss an Edinburgh website",
    sections: [
      { heading: "A website should support discovery and operation", paragraphs: ["A strong website is fast, accessible, crawlable, understandable, and easy to maintain. Service pages, metadata, schema, internal links, and content models should support human decisions as well as search and AI-assisted discovery.", "Forms can connect to structured enquiry handling, qualification, notifications, and operational systems. A deterministic assistant can answer within approved knowledge when that improves the customer journey."] },
      { heading: "Modernise without losing what already works", paragraphs: ["Existing websites may need a technical rebuild, a content and URL migration, or focused improvements rather than a full replacement. mccaigs preserves useful routes and establishes redirects only where necessary.", "Next.js supports fast server-rendered pages and modern application features. Multilingual architecture, static or dynamic content, and integrations are chosen according to the organisation's publishing and operational needs."] },
    ],
    approach: ["Audit the current site, content, routes, search equity, integrations, and publishing needs.", "Define a maintainable content and component architecture.", "Build accessible, responsive, server-rendered pages.", "Implement technical SEO, structured data, AEO, forms, and integrations.", "Validate performance, metadata, redirects, and production behaviour."],
    deliverables: ["Next.js website development", "Responsive and accessible components", "Structured static or dynamic content", "Technical SEO and AEO implementation", "Forms and operational integrations", "Migration, redirects, and handover"],
    fit: ["Established organisations modernising a technically weak website", "Specialist firms needing clearer services and stronger discovery foundations", "Businesses that want the website connected to real operational work"],
    limitations: ["mccaigs is not positioned as a low-cost template web design supplier.", "A visual branding agency may be needed when the primary requirement is a complete brand identity rather than technical delivery."],
    proof: [{ href: "/ai-visibility-case-study", label: "mccaigs website architecture case study", text: "The current site demonstrates server-rendered structured pages, schema, public knowledge, deterministic answers, and machine-readable discovery surfaces." }],
    related: [{ href: "/custom-software-edinburgh", label: "Custom software Edinburgh" }, { href: "/seo-agency-edinburgh", label: "Technical SEO Edinburgh" }, { href: "/answer-engine-optimisation-edinburgh", label: "AEO implementation" }, { href: "/ai-ready-websites", label: "AI-ready websites" }],
    reviewed,
    faqs: [
      { question: "Does mccaigs build Next.js websites?", answer: "Yes. mccaigs builds maintainable Next.js websites and applications where that architecture suits the project." },
      { question: "Will the website support technical SEO?", answer: "Yes. Crawlability, metadata, canonical URLs, sitemaps, structured data, content hierarchy, performance, and internal links are considered during implementation." },
      { question: "Can you modernise an existing website?", answer: "Yes. The work can range from focused technical improvements to a controlled rebuild with preserved URLs and carefully planned redirects." },
      { question: "Can the site support multiple languages?", answer: "Yes, where there is a real publishing requirement and approved translated content. Locale routes, metadata, alternates, and content ownership need to be planned together." },
      { question: "Can forms connect to our workflow?", answer: "Yes. Forms can validate data and connect to approved enquiry, notification, CRM, or internal workflow routes where suitable integrations exist." },
    ],
  },
  {
    slug: "seo-vs-aeo-vs-ai-visibility",
    path: "/seo-vs-aeo-vs-ai-visibility",
    title: "SEO vs AEO vs AI Visibility",
    description: "Compare SEO, local SEO, AEO, AI visibility, deterministic assistants, and business automation, with clear guidance on where each discipline fits.",
    h1: "SEO, AEO, and AI visibility are related, but not interchangeable",
    eyebrow: "Service comparison / Decision guide",
    kind: "comparison",
    definition: "SEO helps webpages earn visibility in conventional search. Local SEO focuses on maps and location searches. AEO makes trustworthy information easier for answer engines to understand and extract. AI visibility assesses how a brand appears across AI-assisted discovery. Deterministic assistants control answers on the organisation's own site, while business automation connects operational work.",
    price: "The right starting point is priced according to the selected discipline. Approved AEO Audit pricing starts from £299.",
    cta: "Choose the right starting point",
    sections: [
      { heading: "Where the disciplines overlap", paragraphs: ["All six disciplines benefit from clear information, sound architecture, accurate entities, useful evidence, and measurable objectives. SEO and AEO share technical foundations. Local SEO adds geographic relevance. AI visibility observes whether those sources are reflected accurately in answer experiences.", "A deterministic assistant is different because the organisation controls its approved knowledge boundary. Business automation is different again: it connects enquiries, staff, data, decisions, and operational state. One project may involve several disciplines, but each should have a clear purpose."] },
      { heading: "Select by requirement, not label", paragraphs: ["If pages cannot be crawled or indexed, begin with technical SEO. If local location and map visibility is the main issue, local SEO needs attention. If the organisation is difficult to summarise accurately, AEO and entity clarification may be appropriate.", "If the question is what AI systems currently say, begin with AI visibility assessment. If customers need controlled answers on the website, consider a deterministic assistant. If the problem is repeated handling behind the website, start with business automation."] },
    ],
    approach: ["Define the business requirement and current evidence.", "Identify the relevant discovery or operational surface.", "Fix shared technical foundations once.", "Assign a clear objective to each selected discipline.", "Measure each objective with honest limitations."],
    deliverables: ["Requirement and discipline map", "Canonical route and content plan", "Technical SEO and AEO priorities", "AI visibility baseline where needed", "Assistant or automation scope where needed", "Ownership and measurement plan"],
    fit: ["Decision-makers comparing overlapping service labels", "Teams planning a website, visibility, or automation programme", "Organisations needing multiple providers with clear responsibilities"],
    limitations: ["No single discipline guarantees demand, rankings, citations, or recommendations.", "Some programmes need a technical studio alongside editorial, PR, local listing, or conventional marketing specialists."],
    proof: [{ href: "/ai-visibility-case-study", label: "AI visibility architecture case study", text: "The existing public case study shows how structured pages, schema, sitemaps, knowledge files, and deterministic answers support one connected visibility system." }],
    related: [{ href: "/seo-agency-edinburgh", label: "Technical SEO Edinburgh" }, { href: "/aeo-agency-edinburgh", label: "AEO agency Edinburgh" }, { href: "/ai-visibility-edinburgh", label: "AI visibility Edinburgh" }, { href: "/assistant", label: "Deterministic assistant" }, { href: "/business-automation-edinburgh", label: "Business automation Edinburgh" }],
    reviewed,
    faqs: [
      { question: "What is the main difference between SEO and AEO?", answer: "SEO focuses on discoverable, competitive webpages. AEO adds a focus on making information and entities easy for answer systems to interpret and extract." },
      { question: "Is local SEO included in AEO?", answer: "They overlap around location and entity clarity, but local SEO has distinct map, profile, listing, review, and proximity considerations." },
      { question: "Is AI visibility a type of ranking?", answer: "No. It may include presence, but also tests descriptions, citations, accuracy, service understanding, and variation across answer experiences." },
      { question: "What does a deterministic assistant add?", answer: "It provides controlled answers on the organisation's own site from approved knowledge and a defined fallback. It does not control third-party answer systems." },
      { question: "Where does business automation fit?", answer: "It improves the work behind discovery and enquiries by connecting people, data, rules, approvals, and operational state." },
      noGuarantee,
    ],
  },
] as const satisfies readonly EdinburghPage[];

export type EdinburghPageSlug =
  | "aeo-agency-edinburgh"
  | "answer-engine-optimisation-edinburgh"
  | "ai-visibility-edinburgh"
  | "ai-systems-edinburgh"
  | "ai-automation-edinburgh"
  | "business-automation-edinburgh"
  | "custom-software-edinburgh"
  | "seo-agency-edinburgh"
  | "web-development-edinburgh"
  | "seo-vs-aeo-vs-ai-visibility";

export const edinburghPageMap = Object.fromEntries(edinburghPages.map((page) => [page.slug, page])) as unknown as Record<EdinburghPageSlug, EdinburghPage>;

export const serviceComparison = [
  ["Rank conventional webpages", "SEO", "/seo-agency-edinburgh"],
  ["Appear prominently in local maps and location searches", "Local SEO", "/seo-agency-edinburgh"],
  ["Make information easier for answer engines to understand and extract", "AEO", "/answer-engine-optimisation-edinburgh"],
  ["Assess how a brand appears across AI-assisted discovery", "AI visibility", "/ai-visibility-edinburgh"],
  ["Provide controlled answers on the organisation's own website", "Deterministic assistant", "/assistant"],
  ["Connect enquiries, staff, data, and operational processes", "Business automation", "/business-automation-edinburgh"],
] as const;

export function createEdinburghStructuredData(page: EdinburghPage) {
  const url = absoluteUrl(page.path);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        name: page.title,
        description: page.description,
        dateModified: "2026-07-31",
        author: { "@type": "Person", name: "David Robertson", url: absoluteUrl("/about") },
        isPartOf: { "@id": `${siteUrl}/#website` },
        url,
      },
      ...(page.kind === "service" ? [{
        "@type": "Service",
        "@id": `${url}#service`,
        name: page.title,
        description: page.definition,
        areaServed: [{ "@type": "City", name: "Edinburgh" }, { "@type": "Country", name: "Scotland" }, { "@type": "Country", name: "United Kingdom" }],
        provider: { "@id": `${siteUrl}/#professional-service` },
        serviceType: page.title,
        url,
      }] : []),
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: page.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
      },
    ],
  };
}
