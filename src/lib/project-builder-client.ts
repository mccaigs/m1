export type ProjectClassification =
  | "Technical review"
  | "Website and workflow upgrade"
  | "Automation project"
  | "Internal system"
  | "Controlled AI assistant"
  | "Product / SaaS build";

export type ProjectBuilderInput = {
  company: string;
  complexity: {
    existingSoftware: boolean;
    humanReview: boolean;
    integrations: string;
    loginRequired: boolean;
    paymentsRequired: boolean;
    adminAreaRequired: boolean;
    aiRequired: boolean;
    users: string;
  };
  desiredOutcome: string;
  desiredOutcomeDetail: string;
  email: string;
  industry: string;
  name: string;
  problem: string;
  problemDetail: string;
  website?: string;
};

export type ProjectEstimate = {
  assumptions: string[];
  classification: ProjectClassification;
  complexity: "Low" | "Medium" | "High";
  complexityScore: number;
  indicativeBudget: string;
  likelyTimeline: string;
  recommendedRoute: string;
  summary: string;
};

export type ProjectShape = "Focused" | "Structured" | "Multi-part";

const projectShapes: Record<ProjectEstimate["complexity"], { description: string; label: ProjectShape }> = {
  Low: {
    description: "A clearly defined improvement that can usually be delivered quickly.",
    label: "Focused",
  },
  Medium: {
    description: "Several connected improvements delivered as a coordinated project.",
    label: "Structured",
  },
  High: {
    description: "A project involving multiple connected systems, workflows, or delivery phases.",
    label: "Multi-part",
  },
};

export function getProjectShape(complexity: ProjectEstimate["complexity"]) {
  return projectShapes[complexity];
}

export const businessProblems = [
  "We lose enquiries.",
  "We spend too much time on admin.",
  "Information is difficult to find.",
  "Our website is not generating enough business.",
  "We need a customer portal.",
  "We need an internal system.",
  "We want to automate repetitive work.",
  "We think AI could help.",
  "We need a product or SaaS platform.",
] as const;

export const desiredOutcomes = [
  "More enquiries.",
  "Faster response times.",
  "Less admin.",
  "Better reporting.",
  "Better customer experience.",
  "New digital product.",
  "Internal efficiency.",
  "Better use of business knowledge.",
] as const;

const apiUrl = process.env.NEXT_PUBLIC_ASSISTANT_API_URL?.replace(/\/$/, "");

const approvedRules: Record<ProjectClassification, { budget: string; route: string; timeline: string }> = {
  "Technical review": {
    budget: "£650 - £2,500",
    route: "Begin with a focused technical review.",
    timeline: "1 - 2 weeks",
  },
  "Website and workflow upgrade": {
    budget: "£2,500 - £8,000",
    route: "Start with the website, enquiry path, and connected workflow.",
    timeline: "2 - 6 weeks",
  },
  "Automation project": {
    budget: "£4,000 - £15,000",
    route: "Map the repeated work and define the smallest useful automation release.",
    timeline: "4 - 12 weeks",
  },
  "Internal system": {
    budget: "£4,000 - £15,000",
    route: "Map the current operation and define the smallest useful internal system.",
    timeline: "4 - 12 weeks",
  },
  "Controlled AI assistant": {
    budget: "£3,500 - £12,000",
    route: "Define the approved knowledge, boundaries, and fallback behaviour.",
    timeline: "3 - 8 weeks",
  },
  "Product / SaaS build": {
    budget: "£8,000 - £35,000+",
    route: "Define a deliberate first release around the core user journey.",
    timeline: "8 - 16+ weeks",
  },
};

export function classifyProject(problem: string): ProjectClassification {
  if (problem.includes("product or SaaS")) return "Product / SaaS build";
  if (problem.includes("website") || problem.includes("enquiries")) return "Website and workflow upgrade";
  if (problem.includes("internal system") || problem.includes("customer portal")) return "Internal system";
  if (problem.includes("AI")) return "Controlled AI assistant";
  if (problem.includes("automate") || problem.includes("admin")) return "Automation project";
  return "Technical review";
}

export function estimateProject(input: ProjectBuilderInput): ProjectEstimate {
  const classification = classifyProject(input.problem);
  const score = [
    input.complexity.users === "21 - 100" ? 1 : input.complexity.users === "100+" ? 2 : 0,
    input.complexity.integrations === "1 - 2" ? 1 : input.complexity.integrations === "3+" ? 2 : 0,
    input.complexity.loginRequired ? 1 : 0,
    input.complexity.paymentsRequired ? 2 : 0,
    input.complexity.adminAreaRequired ? 1 : 0,
    input.complexity.existingSoftware ? 1 : 0,
    input.complexity.aiRequired ? 1 : 0,
    input.complexity.humanReview ? 1 : 0,
  ].reduce((total, value) => total + value, 0);
  const complexity = score >= 6 ? "High" : score >= 3 ? "Medium" : "Low";
  const projectShape = getProjectShape(complexity);
  const rule = approvedRules[classification];
  const assumptions = [
    "The range assumes a focused first release.",
    "Final scope depends on requirements, integrations, data quality, urgency, and delivery constraints.",
    complexity === "High"
      ? "The project shape suggests planning around the upper part of the approved range."
      : "The current answers suggest a focused starting scope.",
  ];
  const summary = [
    `Business Problem: ${input.problemDetail || input.problem}`,
    `Desired Outcome: ${input.desiredOutcomeDetail || input.desiredOutcome}`,
    `Recommended Route: ${classification}`,
    `Project Shape: ${projectShape.label}`,
    `Indicative Budget: ${rule.budget}`,
    `Estimated Timeline: ${rule.timeline}`,
  ].join("\n");

  return {
    assumptions,
    classification,
    complexity,
    complexityScore: score,
    indicativeBudget: rule.budget,
    likelyTimeline: rule.timeline,
    recommendedRoute: rule.route,
    summary,
  };
}

export async function requestProjectEstimate(input: ProjectBuilderInput): Promise<ProjectEstimate> {
  if (!apiUrl) return estimateProject(input);
  try {
    const response = await fetch(`${apiUrl}/project-builder/estimate`, {
      body: JSON.stringify(toApiInput(input)),
      headers: { "content-type": "application/json" },
      method: "POST",
    });
    if (!response.ok) throw new Error("Project builder estimate request failed.");
    return fromApiEstimate(await response.json());
  } catch {
    return estimateProject(input);
  }
}

export async function submitProjectBuilder(input: ProjectBuilderInput): Promise<{ reference?: string; stored: boolean }> {
  const localResponse = await fetch("/api/project-builder", {
    body: JSON.stringify(input),
    headers: { "content-type": "application/json" },
    method: "POST",
  });

  if (localResponse.ok) {
    const result = (await localResponse.json()) as { reference?: string; stored: boolean };
    return { reference: result.reference, stored: result.stored };
  }

  if (!apiUrl) return { stored: false };

  const response = await fetch(`${apiUrl}/project-builder/submit`, {
    body: JSON.stringify(toApiInput(input)),
    headers: { "content-type": "application/json" },
    method: "POST",
  });
  if (!response.ok) throw new Error("The qualified project enquiry could not be stored just now.");
  const result = (await response.json()) as { reference: string };
  return { reference: result.reference, stored: true };
}

export async function startProjectBuilder(): Promise<string | undefined> {
  if (!apiUrl) return undefined;
  try {
    const response = await fetch(`${apiUrl}/project-builder/start`, { method: "POST" });
    if (!response.ok) return undefined;
    return ((await response.json()) as { reference: string }).reference;
  } catch {
    return undefined;
  }
}

function toApiInput(input: ProjectBuilderInput) {
  return {
    company: input.company,
    complexity: {
      admin_area_required: input.complexity.adminAreaRequired,
      ai_required: input.complexity.aiRequired,
      existing_software: input.complexity.existingSoftware,
      human_review: input.complexity.humanReview,
      integrations: input.complexity.integrations,
      login_required: input.complexity.loginRequired,
      payments_required: input.complexity.paymentsRequired,
      users: input.complexity.users,
    },
    desired_outcome: input.desiredOutcome,
    desired_outcome_detail: input.desiredOutcomeDetail,
    email: input.email,
    industry: input.industry,
    name: input.name,
    problem: input.problem,
    problem_detail: input.problemDetail,
    website: input.website || null,
  };
}

function fromApiEstimate(result: {
  assumptions: string[];
  classification: ProjectClassification;
  complexity: "Low" | "Medium" | "High";
  complexity_score: number;
  indicative_budget: string;
  likely_timeline: string;
  recommended_route: string;
  summary: string;
}): ProjectEstimate {
  const projectShape = getProjectShape(result.complexity);

  return {
    assumptions: result.assumptions,
    classification: result.classification,
    complexity: result.complexity,
    complexityScore: result.complexity_score,
    indicativeBudget: result.indicative_budget,
    likelyTimeline: result.likely_timeline,
    recommendedRoute: result.recommended_route,
    summary: result.summary.replace(
      /^Complexity:\s*(?:Low|Medium|High)$/m,
      `Project Shape: ${projectShape.label}`,
    ),
  };
}

export function downloadProjectSummary(estimate: ProjectEstimate) {
  const content = [
    "McCaigs Project Builder",
    "",
    estimate.summary.replaceAll("£", "GBP "),
    "",
    "Important assumptions:",
    ...estimate.assumptions.map((assumption) => `- ${assumption}`),
    "",
    "This is an indicative planning estimate, not a formal quotation.",
  ].join("\n");
  const escaped = content.replaceAll("\\", "\\\\").replaceAll("(", "\\(").replaceAll(")", "\\)").replaceAll("\n", ") Tj T* (");
  const stream = `BT /F1 10 Tf 14 TL 48 780 Td (${escaped}) Tj ET`;
  const objects = [
    "1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj",
    "2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj",
    "3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >> endobj",
    "4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj",
    `5 0 obj << /Length ${stream.length} >> stream\n${stream}\nendstream endobj`,
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  for (const object of objects) {
    offsets.push(pdf.length);
    pdf += `${object}\n`;
  }
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  pdf += offsets.slice(1).map((offset) => `${String(offset).padStart(10, "0")} 00000 n \n`).join("");
  pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  const link = document.createElement("a");
  link.download = "mccaigs-project-summary.pdf";
  link.href = URL.createObjectURL(new Blob([pdf], { type: "application/pdf" }));
  link.click();
  URL.revokeObjectURL(link.href);
}
