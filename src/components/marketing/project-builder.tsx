"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Download, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  businessProblems,
  classifyProject,
  desiredOutcomes,
  downloadProjectSummary,
  getProjectShape,
  requestProjectEstimate,
  startProjectBuilder,
  submitProjectBuilder,
  type ProjectBuilderInput,
  type ProjectEstimate,
} from "@/lib/project-builder-client";
import type { SpecialOffer } from "@/lib/approved-knowledge";

const initialInput: ProjectBuilderInput = {
  company: "",
  complexity: {
    adminAreaRequired: false,
    aiRequired: false,
    existingSoftware: false,
    humanReview: false,
    integrations: "",
    loginRequired: false,
    paymentsRequired: false,
    users: "",
  },
  desiredOutcome: "",
  desiredOutcomeDetail: "",
  email: "",
  industry: "",
  name: "",
  problem: "",
  problemDetail: "",
  website: "",
};

const complexityQuestions = [
  ["loginRequired", "Login required?"],
  ["paymentsRequired", "Payments required?"],
  ["adminAreaRequired", "Admin area required?"],
  ["existingSoftware", "Existing software involved?"],
  ["aiRequired", "AI required?"],
  ["humanReview", "Human review required?"],
] as const;

export function ProjectBuilder({ offers }: { offers: SpecialOffer[] }) {
  const [estimate, setEstimate] = useState<ProjectEstimate | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [input, setInput] = useState<ProjectBuilderInput>(initialInput);
  const [pending, setPending] = useState(false);
  const [reference, setReference] = useState<string>();
  const [step, setStep] = useState(1);
  const [submission, setSubmission] = useState<"error" | "idle" | "preview" | "stored">("idle");

  function update<K extends keyof ProjectBuilderInput>(key: K, value: ProjectBuilderInput[K]) {
    setInput((current) => ({ ...current, [key]: value }));
  }

  function updateComplexity<K extends keyof ProjectBuilderInput["complexity"]>(key: K, value: ProjectBuilderInput["complexity"][K]) {
    setInput((current) => ({ ...current, complexity: { ...current.complexity, [key]: value } }));
  }

  async function continueFlow() {
    const nextErrors = validateStep(step, input);
    if (nextErrors.length) {
      setErrors(nextErrors);
      return;
    }
    setErrors([]);
    if (step === 1 && !reference) setReference(await startProjectBuilder());
    if (step === 5) {
      setPending(true);
      setEstimate(await requestProjectEstimate(input));
      setPending(false);
    }
    setStep((current) => Math.min(current + 1, 6));
  }

  async function submit() {
    setPending(true);
    try {
      const result = await submitProjectBuilder(input);
      setSubmission(result.stored ? "stored" : "preview");
      if (result.reference) setReference(result.reference);
    } catch {
      setSubmission("error");
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="text-ink">
      <div className="border-b border-deep-blue/12 pb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-deep-blue/75">Project builder / qualification workflow</p>
            <p className="mt-3 max-w-2xl text-xs leading-5 text-ink/60">A structured planning workspace for the business problem, likely scope, and sensible next step.</p>
          </div>
          <p className="flex shrink-0 items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-deep-blue/65">
            <CheckCircle2 className="size-3.5 text-signal" /> Approved rules active
          </p>
        </div>
        <div className="mt-5 grid grid-cols-6 gap-2">
          {[1, 2, 3, 4, 5, 6].map((number) => (
            <div className={number <= step ? "h-1 rounded-full bg-signal shadow-[0_0_10px_rgba(58,167,255,0.24)]" : "h-1 rounded-full bg-deep-blue/10"} key={number} />
          ))}
        </div>
        <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.16em] text-deep-blue/55">Step {step} / 6</p>
      </div>
      <div className="mt-8 rounded-2xl border border-deep-blue/12 bg-white/55 p-5 shadow-sm sm:p-7">
        {step === 1 ? <BusinessDetails input={input} update={update} /> : null}
        {step === 2 ? <BusinessProblem input={input} update={update} /> : null}
        {step === 3 ? <DesiredOutcome input={input} update={update} /> : null}
        {step === 4 ? <Classification input={input} /> : null}
        {step === 5 ? <Complexity input={input} update={updateComplexity} /> : null}
        {step === 6 && estimate ? <PlanningOutput estimate={estimate} input={input} offers={offers} pending={pending} reference={reference} submission={submission} submit={submit} /> : null}
        {errors.length ? <div className="mt-6 rounded-xl border border-destructive/30 bg-destructive/8 p-4 text-sm text-destructive">{errors.map((error) => <p key={error}>{error}</p>)}</div> : null}
        {step < 6 ? (
          <div className="mt-8 flex items-center justify-between gap-3 border-t border-deep-blue/10 pt-5">
            <Button className="text-deep-blue/70 hover:bg-deep-blue/6 hover:text-deep-blue" disabled={step === 1} onClick={() => setStep((current) => Math.max(current - 1, 1))} variant="ghost"><ArrowLeft /> Back</Button>
            <Button className="bg-deep-blue text-white hover:bg-deep-blue/90 hover:text-white" disabled={pending} onClick={() => void continueFlow()}>{pending ? "Preparing estimate..." : step === 5 ? "Generate planning estimate" : "Continue"} <ArrowRight /></Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function BusinessDetails({ input, update }: BuilderStepProps) {
  return (
    <StepIntro copy="Start with the business. These details are carried into the structured project summary." title="Business details">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name"><BuilderInput autoComplete="name" onChange={(event) => update("name", event.target.value)} value={input.name} /></Field>
        <Field label="Company"><BuilderInput autoComplete="organization" onChange={(event) => update("company", event.target.value)} value={input.company} /></Field>
        <Field label="Email"><BuilderInput autoComplete="email" onChange={(event) => update("email", event.target.value)} type="email" value={input.email} /></Field>
        <Field label="Website (optional)"><BuilderInput onChange={(event) => update("website", event.target.value)} placeholder="https://" value={input.website} /></Field>
        <Field label="Industry"><BuilderInput onChange={(event) => update("industry", event.target.value)} placeholder="For example: accountancy, hospitality, manufacturing" value={input.industry} /></Field>
      </div>
    </StepIntro>
  );
}

function BusinessProblem({ input, update }: BuilderStepProps) {
  return (
    <StepIntro copy="Choose the closest description, then add any detail that would help the studio understand the real operation." title="What should work better?">
      <ChoiceGrid choices={businessProblems} onChange={(problem) => update("problem", problem)} selected={input.problem} />
      <Field label="Tell us a little more"><Textarea className="mt-5 min-h-28 border-deep-blue/16 bg-white/70 text-ink placeholder:text-ink/45" onChange={(event) => update("problemDetail", event.target.value)} placeholder="What happens today, and where does it become difficult?" value={input.problemDetail} /></Field>
    </StepIntro>
  );
}

function DesiredOutcome({ input, update }: BuilderStepProps) {
  return (
    <StepIntro copy="Describe the practical result that would make the work worthwhile." title="What would success look like?">
      <ChoiceGrid choices={desiredOutcomes} onChange={(outcome) => update("desiredOutcome", outcome)} selected={input.desiredOutcome} />
      <Field label="Add useful detail"><Textarea className="mt-5 min-h-28 border-deep-blue/16 bg-white/70 text-ink placeholder:text-ink/45" onChange={(event) => update("desiredOutcomeDetail", event.target.value)} placeholder="What should become clearer, faster, or more reliable?" value={input.desiredOutcomeDetail} /></Field>
    </StepIntro>
  );
}

function Classification({ input }: { input: ProjectBuilderInput }) {
  return (
    <StepIntro copy="The project builder uses approved deterministic rules. No model decides the route." title="Project classification">
      <div className="rounded-xl border border-signal/35 bg-signal/8 p-5">
        <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-deep-blue/65">Recommended category</p>
        <p className="mt-3 text-2xl font-semibold text-deep-blue">{classifyProject(input.problem)}</p>
      </div>
    </StepIntro>
  );
}

function Complexity({ input, update }: ComplexityStepProps) {
  return (
    <StepIntro copy="These answers help identify the shape of the work, likely timeline, and approved budget range." title="Project shape">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Number of users"><Select onChange={(event) => update("users", event.target.value)} value={input.complexity.users}><option value="">Choose users</option><option>1 - 5</option><option>6 - 20</option><option>21 - 100</option><option>100+</option></Select></Field>
        <Field label="Integrations required"><Select onChange={(event) => update("integrations", event.target.value)} value={input.complexity.integrations}><option value="">Choose integrations</option><option>None</option><option>1 - 2</option><option>3+</option></Select></Field>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {complexityQuestions.map(([key, label]) => (
          <label className="flex items-center gap-3 rounded-lg border border-deep-blue/10 bg-white/35 px-3 py-3 text-sm text-ink/70" key={key}>
            <Checkbox checked={input.complexity[key]} className="border-deep-blue/25 data-checked:border-deep-blue data-checked:bg-deep-blue data-checked:text-white" onCheckedChange={(checked) => update(key, checked === true)} /> {label}
          </label>
        ))}
      </div>
    </StepIntro>
  );
}

function PlanningOutput({ estimate, input, offers, pending, reference, submission, submit }: OutputProps) {
  const mailSubject = encodeURIComponent(`McCaigs project summary: ${estimate.classification}`);
  const mailBody = encodeURIComponent(`${estimate.summary}\n\nThis is an indicative planning estimate, not a formal quotation.`);
  const projectShape = getProjectShape(estimate.complexity);
  return (
    <div>
      <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-deep-blue/70"><CheckCircle2 className="size-4 text-signal" /> Indicative planning output</p>
      <h2 className="mt-5 text-3xl font-semibold tracking-tight">Recommended route: {estimate.classification}</h2>
      <div className="mt-7 grid gap-3 sm:grid-cols-3">
        <Metric description={projectShape.description} label="Project shape" value={projectShape.label} />
        <Metric label="Indicative budget range" value={estimate.indicativeBudget} />
        <Metric label="Likely timeline" value={estimate.likelyTimeline} />
      </div>
      <p className="mt-6 text-sm leading-6 text-ink/65">{estimate.recommendedRoute}</p>
      <div className="mt-6 rounded-xl border border-deep-blue/12 bg-white/55 p-5">
        <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-deep-blue/65">Structured project summary</p>
        <pre className="mt-4 whitespace-pre-wrap font-sans text-sm leading-6 text-ink/70">{estimate.summary}</pre>
      </div>
      <div className="mt-6 space-y-2 border-t border-deep-blue/10 pt-5">
        <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-deep-blue/65">Important assumptions</p>
        {estimate.assumptions.map((assumption) => <p className="text-sm leading-6 text-ink/65" key={assumption}>- {assumption}</p>)}
      </div>
      <CurrentOffers offers={offers} />
      <p className="mt-6 rounded-xl border border-signal/25 bg-signal/8 p-4 text-sm leading-6 text-deep-blue">This is an indicative planning estimate, not a formal quotation.</p>
      {submission !== "idle" ? <p className="mt-5 text-sm leading-6 text-ink/65">{submission === "stored" ? `Your qualified enquiry has been stored. Reference: ${reference}` : submission === "error" ? "The enquiry could not be stored just now. Your summary is still ready to download or email, and the contact route remains available." : "The backend is not connected in this preview. Your summary is ready to download or email, and the contact route remains available."}</p> : null}
      <div className="mt-6 flex flex-wrap gap-2">
        <Button className="bg-deep-blue text-white hover:bg-deep-blue/90 hover:text-white" disabled={pending} onClick={() => void submit()}><Send /> Send enquiry to McCaigs</Button>
        <Button asChild className="border-deep-blue/16 bg-white/50 text-deep-blue hover:bg-white hover:text-deep-blue" variant="outline"><a href={`mailto:${input.email}?subject=${mailSubject}&body=${mailBody}`}><Mail /> Email summary to me</a></Button>
        <Button className="border-deep-blue/16 bg-white/50 text-deep-blue hover:bg-white hover:text-deep-blue" onClick={() => downloadProjectSummary(estimate)} variant="outline"><Download /> Download PDF summary</Button>
        <Button asChild className="border-deep-blue/16 bg-white/50 text-deep-blue hover:bg-white hover:text-deep-blue" variant="outline"><Link href="/contact">Book initial conversation <ArrowUpRight /></Link></Button>
      </div>
    </div>
  );
}

function CurrentOffers({ offers }: { offers: SpecialOffer[] }) {
  if (!offers.length) return null;
  return (
    <div className="mt-6 border-t border-deep-blue/10 pt-5">
      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-deep-blue/65">Current offers</p>
      <div className="mt-3 grid gap-3">
        {offers.map((offer) => (
          <div className="rounded-xl border border-signal/25 bg-signal/8 p-5" key={offer.id}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-semibold text-deep-blue">{offer.title}</p>
              <p className="font-mono text-sm text-deep-blue">{offer.price}</p>
            </div>
            <p className="mt-3 text-sm leading-6 text-ink/65">{offer.summary}</p>
            <p className="mt-3 text-xs leading-5 text-deep-blue/75">
              Includes: {offer.includes.slice(0, 5).join(", ")}.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChoiceGrid({ choices, onChange, selected }: { choices: readonly string[]; onChange: (choice: string) => void; selected: string }) {
  return <div className="grid gap-2 sm:grid-cols-2">{choices.map((choice) => <button className={selected === choice ? "rounded-xl border border-signal/60 bg-white p-4 text-left text-sm text-deep-blue shadow-sm" : "rounded-xl border border-deep-blue/12 bg-white/40 p-4 text-left text-sm text-ink/65 hover:border-signal/45 hover:bg-white/70 hover:text-deep-blue"} key={choice} onClick={() => onChange(choice)} type="button">{choice}</button>)}</div>;
}

function Field({ children, label }: { children: React.ReactNode; label: string }) {
  return <label className="grid gap-2 text-sm font-medium text-deep-blue">{label}{children}</label>;
}

function Metric({ description, label, value }: { description?: string; label: string; value: string }) {
  return <div className="rounded-xl border border-deep-blue/12 bg-deep-blue p-4"><p className="font-mono text-[9px] uppercase tracking-[0.16em] text-signal">{label}</p><p className="mt-3 font-semibold text-signal-soft">{value}</p>{description ? <p className="mt-2 text-xs leading-5 text-signal-soft/70">{description}</p> : null}</div>;
}

function Select(props: React.ComponentProps<"select">) {
  return <select className="h-10 w-full rounded-lg border border-deep-blue/16 bg-white/70 px-2.5 text-sm text-ink outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/35" {...props} />;
}

function BuilderInput(props: React.ComponentProps<"input">) {
  return <Input className="h-10 border-deep-blue/16 bg-white/70 text-ink placeholder:text-ink/45" {...props} />;
}

function StepIntro({ children, copy, title }: { children: React.ReactNode; copy: string; title: string }) {
  return <div><h2 className="text-3xl font-semibold tracking-tight text-deep-blue">{title}</h2><p className="mt-4 max-w-2xl text-sm leading-6 text-ink/60">{copy}</p><div className="mt-7">{children}</div></div>;
}

type BuilderStepProps = { input: ProjectBuilderInput; update: <K extends keyof ProjectBuilderInput>(key: K, value: ProjectBuilderInput[K]) => void };
type ComplexityStepProps = { input: ProjectBuilderInput; update: <K extends keyof ProjectBuilderInput["complexity"]>(key: K, value: ProjectBuilderInput["complexity"][K]) => void };
type OutputProps = { estimate: ProjectEstimate; input: ProjectBuilderInput; offers: SpecialOffer[]; pending: boolean; reference?: string; submission: "error" | "idle" | "preview" | "stored"; submit: () => Promise<void> };

function validateStep(step: number, input: ProjectBuilderInput) {
  if (step === 1 && (!input.name.trim() || !input.company.trim() || !input.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) || !input.industry.trim())) return ["Add your name, company, valid email address, and industry."];
  if (step === 2 && (!input.problem || input.problemDetail.trim().length < 15)) return ["Choose the closest business problem and add a little more detail."];
  if (step === 3 && (!input.desiredOutcome || input.desiredOutcomeDetail.trim().length < 15)) return ["Choose a desired outcome and describe what success should look like."];
  if (step === 5 && (!input.complexity.users || !input.complexity.integrations)) return ["Choose the number of users and integrations required."];
  return [];
}
