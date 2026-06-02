import { ArrowDownRight, ArrowUpRight, Check, CircleDot, MoveRight, Orbit } from "lucide-react";
import {
  siAnthropic,
  siClerk,
  siConvex,
  siGooglegemini,
  siNextdotjs,
  siTypescript,
  siVercel,
} from "simple-icons";
import type { SimpleIcon } from "simple-icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  capabilities,
  principles,
  processSteps,
  proofPoints,
  practicalIntelligence,
  selectedSystems,
  typicalProblems,
} from "@/lib/studio-content";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-signal">
      <CircleDot className="size-3" /> {children}
    </p>
  );
}

function SectionHeading({ eyebrow, title, copy, tone = "dark" }: { eyebrow: string; title: string; copy: string; tone?: "dark" | "light" }) {
  return (
    <div className="max-w-2xl">
      <SectionLabel>{eyebrow}</SectionLabel>
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      <p className={cn("mt-5 text-base leading-7 sm:text-lg", tone === "light" ? "text-ink/65" : "text-muted-foreground")}>{copy}</p>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 pb-14 pt-14 sm:px-8 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-24">
      <div className="hero-glow absolute -top-24 right-0 -z-10 h-[32rem] w-[32rem] opacity-70" />
      <div className="grid items-end gap-12 lg:grid-cols-[1.32fr_0.68fr]">
        <div>
          <SectionLabel>Technical studio / Edinburgh, Scotland</SectionLabel>
          <p className="mb-7 max-w-lg border-l border-signal/55 pl-4 font-mono text-[10px] uppercase leading-5 tracking-[0.18em] text-muted-foreground">
            Practical AI / better workflows / websites that work harder
          </p>
          <h1 className="max-w-5xl text-5xl font-semibold leading-[0.94] tracking-[-0.065em] sm:text-7xl lg:text-[7.35rem]">
            Scotland&apos;s <span className="block text-signal-soft">Elite Technical</span> Studio
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
            Practical AI, automation, websites, internal systems, and digital
            products built properly for ambitious businesses.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg"><Link href="/start-project">Start a project <ArrowUpRight /></Link></Button>
            <Button asChild size="lg" variant="outline"><Link href="/systems">View systems <ArrowDownRight /></Link></Button>
          </div>
        </div>
        <SystemPanel />
      </div>
      <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
        {proofPoints.map((point) => (
          <p className="bg-background/90 px-4 py-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground" key={point}>
            <Check className="mr-2 inline size-3 text-signal" /> {point}
          </p>
        ))}
      </div>
    </section>
  );
}

function SystemPanel() {
  return (
    <div className="relative mx-auto aspect-[0.92] w-full max-w-sm overflow-hidden rounded-2xl border border-white/12 bg-deep-blue/45 p-5 shadow-2xl shadow-black/20 lg:mr-0">
      <div className="technical-grid absolute inset-0 opacity-80" />
      <p className="relative font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">SYS_MCG_001 / business systems layer</p>
      <div className="absolute inset-[18%] rounded-full border border-signal/20">
        <div className="absolute inset-[18%] rounded-full border border-signal/25" />
        <div className="absolute inset-[38%] rounded-full border border-signal/70 shadow-[0_0_28px_rgba(58,167,255,0.2)]" />
        <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal" />
        <span className="absolute bottom-1/4 left-0 h-2 w-2 -translate-x-1/2 rounded-full bg-signal-soft" />
        <span className="absolute right-0 top-1/3 h-2 w-2 translate-x-1/2 rounded-full bg-signal-soft" />
      </div>
      <div className="absolute inset-x-5 bottom-5 rounded-lg border border-white/10 bg-background/90 p-4 font-mono text-[10px] leading-5 text-muted-foreground backdrop-blur">
        <p className="text-signal">&gt; Initialising studio system...</p>
        <p>WORKFLOW: clearer</p>
        <p>ADMIN: reduced</p>
        <p>STATE: visible</p>
      </div>
      <p className="absolute right-5 top-5 font-mono text-[8px] uppercase tracking-[0.16em] text-signal/70">01 / 04</p>
    </div>
  );
}

export function PositioningSection() {
  const points = [
    ["01", "Useful from day one", "Build around the work the business is already trying to do better."],
    ["02", "More than a website", "Connect the digital front door to the enquiries, admin, and customer journey behind it."],
    ["03", "Modern without the theatre", "Use AI where it helps, software where it matters, and human judgement where it counts."],
  ] as const;

  return (
    <section className="border-y border-white/8 bg-off-white text-ink" id="studio">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-18 sm:px-8 sm:py-24 lg:grid-cols-[0.7fr_1.3fr]">
        <SectionHeading eyebrow="Studio position" title="Serious systems for ordinary businesses." copy="McCaigs is a creative technical studio for ambitious businesses that need practical AI, automation, websites, internal tools, and digital products built around how the operation actually works." tone="light" />
        <div className="grid gap-px overflow-hidden rounded-xl border border-ink/10 bg-ink/10 sm:grid-cols-3">
          {points.map(([number, title, copy]) => (
            <div className="bg-off-white p-6" key={number}>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-deep-blue/60">{number}</p>
              <h3 className="mt-8 text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-ink/65">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const technologies = [
  { name: "OpenAI", label: "Language Models", code: "MODEL_01", icon: undefined },
  { name: "Anthropic", label: "Reasoning Systems", code: "MODEL_02", icon: siAnthropic },
  { name: "Google AI", label: "Multimodal Services", code: "MODEL_03", icon: siGooglegemini },
  { name: "Convex", label: "Realtime Data Layer", code: "DATA_01", icon: siConvex },
  { name: "Clerk", label: "Authentication", code: "AUTH_01", icon: siClerk },
  { name: "Vercel", label: "Deployment Infrastructure", code: "DEPLOY_01", icon: siVercel },
  { name: "Next.js", label: "Application Framework", code: "BUILD_01", icon: siNextdotjs },
  { name: "TypeScript", label: "Typed Engineering", code: "BUILD_02", icon: siTypescript },
] as const;

function TechnologyMark({ icon, name }: { icon?: SimpleIcon; name: string }) {
  return (
    <div className="flex size-11 items-center justify-center rounded-lg border border-signal/20 bg-signal/7 text-signal-soft">
      {icon ? (
        <svg aria-label={`${name} mark`} className="size-5 fill-current opacity-75" role="img" viewBox="0 0 24 24">
          <path d={icon.path} />
        </svg>
      ) : (
        <Orbit aria-label={`${name} mark`} className="size-5 opacity-75" role="img" />
      )}
    </div>
  );
}

export function TechnologyEcosystemSection() {
  return (
    <section className="border-y border-white/8 bg-deep-blue/20">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeading
          eyebrow="Studio operating environment"
          title="Built using the world's best tools. Applied to real business problems."
          copy="We combine proven platforms, modern engineering practices, deterministic systems, and practical AI to deliver solutions that are fast to build, easy to maintain, and commercially sensible."
        />
        <div className="technical-grid relative mt-10 overflow-hidden rounded-2xl border border-white/12 bg-background/65 p-3 shadow-2xl shadow-black/12 sm:p-5">
          <svg aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-24 w-full -translate-y-1/2 text-signal/45 lg:block" preserveAspectRatio="none" viewBox="0 0 1200 96">
            <path className="systems-path" d="M34 48 H1166" fill="none" stroke="currentColor" strokeDasharray="3 13" />
            <path className="systems-path systems-path-delayed" d="M34 72 C260 8 420 88 606 30 S940 12 1166 62" fill="none" stroke="currentColor" strokeDasharray="2 18" />
          </svg>
          <div className="relative grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {technologies.map(({ code, icon, label, name }) => (
              <article className="group min-h-39 rounded-xl border border-white/10 bg-deep-blue/80 p-4 backdrop-blur transition-colors duration-300 hover:border-signal/40 hover:bg-deep-blue" key={name}>
                <div className="flex items-start justify-between gap-3">
                  <TechnologyMark icon={icon} name={name} />
                  <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-signal/55">{code}</span>
                </div>
                <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.2em] text-signal-soft">{name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{label}</p>
              </article>
            ))}
          </div>
          <div className="relative mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-1 pt-3 font-mono text-[8px] uppercase tracking-[0.18em] text-muted-foreground">
            <span>Workshop systems layer / active components</span>
            <span className="text-signal">Integration state: ready</span>
          </div>
        </div>
      </div>
      <PracticalIntelligenceSection />
      <FromStudioSection />
    </section>
  );
}

function PracticalIntelligenceSection() {
  return (
    <div className="border-t border-white/8 bg-off-white text-ink">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeading
          eyebrow="Practical intelligence"
          title="We don't start with AI. We start with the problem."
          copy="Sometimes the answer is AI. Sometimes the answer is automation. Sometimes the answer is a workflow, rules engine, internal tool, or better information flow. The best solution is not the most complex one. It's the one that solves the problem reliably and economically."
          tone="light"
        />
        <div className="mt-10 overflow-hidden rounded-2xl border border-ink/12 bg-ink/12">
          <div className="grid gap-px md:grid-cols-2">
            <IntelligenceList
              eyebrow="AI where it creates value"
              items={practicalIntelligence.ai}
              number="01"
            />
            <IntelligenceList
              eyebrow="Deterministic where it performs better"
              items={practicalIntelligence.deterministic}
              number="02"
            />
          </div>
          <p className="border-t border-ink/12 bg-deep-blue px-5 py-5 text-lg font-semibold tracking-tight text-off-white sm:px-7 sm:text-xl">
            &ldquo;Don&apos;t pay for intelligence when logic is enough.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}

function IntelligenceList({ eyebrow, items, number }: { eyebrow: string; items: readonly string[]; number: string }) {
  return (
    <div className="bg-off-white p-5 sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-deep-blue">{eyebrow}</h3>
        <span className="font-mono text-[10px] text-deep-blue/55">{number}</span>
      </div>
      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <p className="flex items-center gap-2 text-sm text-ink/70" key={item}>
            <MoveRight className="size-3 shrink-0 text-deep-blue/65" /> {item}
          </p>
        ))}
      </div>
    </div>
  );
}

function FromStudioSection() {
  return (
    <div className="border-t border-white/8">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeading
          eyebrow="From the studio"
          title="Classified builds. Practical outcomes."
          copy="A closer look at the sort of work that happens inside the studio. Codenames protect the context; the operational problem, system shape, and outcome stay visible."
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {selectedSystems.map((system, index) => (
            <article className="overflow-hidden rounded-xl border border-white/10 bg-card/55" key={system.codename}>
              <div className="technical-grid flex items-end justify-between border-b border-white/10 bg-deep-blue/30 p-5">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-signal">Internal build / 0{index + 1}</p>
                  <h3 className="mt-5 text-2xl font-semibold uppercase tracking-tight">{system.codename}</h3>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-signal-soft">{system.type}</p>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">{system.buildTime}</span>
              </div>
              <div className="space-y-5 p-5">
                <StudioNote label="Problem" text={system.problem} />
                <StudioNote label="Solution" text={system.solution} />
                <StudioNote label="Outcome" text={system.outcome} />
                <Link className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-signal hover:text-signal-soft" href={`/systems#${system.slug}`}>
                  Open studio note <ArrowUpRight className="size-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function StudioNote({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-signal/75">{label}</p>
      <p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p>
    </div>
  );
}

export function CapabilitiesSection({ preview = false }: { preview?: boolean }) {
  const visibleCapabilities = preview ? capabilities.slice(0, 3) : capabilities;

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28" id="capabilities">
      <SectionHeading eyebrow="What we build" title="Technical creativity for businesses that need more than a standard website." copy="Websites, workflows, automations, and internal tools designed to work together, reduce friction, and create practical progress." />
      <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {visibleCapabilities.map(({ title, description, icon: Icon }) => (
          <Card className="group border-white/10 bg-card/55 transition-transform duration-300 hover:-translate-y-1 hover:border-signal/40" key={title}>
            <CardContent className="p-6">
              <div className="flex size-10 items-center justify-center rounded-lg border border-signal/20 bg-signal/8 text-signal"><Icon className="size-5" /></div>
              <h3 className="mt-8 text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      {preview ? <Button asChild className="mt-7" variant="outline"><Link href="/services">Explore services <ArrowUpRight /></Link></Button> : null}
    </section>
  );
}

export function TypicalProblemsSection() {
  return (
    <section className="border-y border-white/8 bg-deep-blue/20">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeading eyebrow="Typical problems we solve" title="The awkward parts of a growing business are often the opportunity." copy="You need the right improvements in the places where time, enquiries, and knowledge are currently slipping through the gaps." />
        <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {typicalProblems.map(({ copy, icon: Icon, title }, index) => (
            <Card className="border-white/10 bg-card/55" key={title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex size-10 items-center justify-center rounded-lg border border-signal/20 bg-signal/8 text-signal">
                    <Icon className="size-5" />
                  </div>
                  <span className="font-mono text-[9px] tracking-[0.16em] text-muted-foreground">0{index + 1}</span>
                </div>
                <h3 className="mt-7 text-lg font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section className="border-y border-white/8 bg-deep-blue/20" id="method">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading eyebrow="Studio method" title="Senior attention from diagnosis to delivery." copy="Each engagement stays close to the real operation. The aim is a useful release, evaluated properly, with a clear route to improvement." />
        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 md:grid-cols-3">
          {processSteps.map(([number, title, copy]) => (
            <div className="bg-background/95 p-6 sm:p-7" key={title}>
              <p className="font-mono text-[10px] tracking-[0.16em] text-signal">{number}</p>
              <h3 className="mt-10 text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SystemsSection({ preview = false }: { preview?: boolean }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28" id="systems">
      <SectionHeading eyebrow="Selected systems" title="Built quietly. Designed to make the work easier." copy="Commercial work often needs discretion. These codenamed builds show how better workflows, clearer information, and carefully applied AI can support a real business." />
      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        {selectedSystems.map((system, index) => (
          <Card className="group scroll-mt-24 overflow-hidden border-white/10 bg-card/55 transition-colors hover:border-signal/35" id={system.slug} key={system.codename}>
            <div className="technical-grid relative h-28 border-b border-white/10 bg-deep-blue/30 p-5">
              <Badge className="border-signal/25 bg-background/50 text-signal-soft" variant="outline">{system.status}</Badge>
              <p className="absolute bottom-4 right-5 font-mono text-3xl tracking-[-0.12em] text-white/8">0{index + 1}</p>
            </div>
            <CardContent className="p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-signal">{system.type}</p>
              <h3 className="mt-3 text-2xl font-semibold">{system.codename}</h3>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{system.summary}</p>
              <div className="mt-7 space-y-2 border-t border-white/10 pt-5">
                {system.signals.map((signal) => (
                  <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground" key={signal}>
                    <MoveRight className="size-3 text-signal" /> {signal}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {preview ? <Button asChild className="mt-7" variant="outline"><Link href="/systems">Explore systems <ArrowUpRight /></Link></Button> : null}
    </section>
  );
}

export function PrinciplesSection() {
  return (
    <section className="border-y border-ink/10 bg-off-white text-ink">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading eyebrow="Engineering principles" title="Precision before spectacle." copy="The studio is built around a small set of durable rules. They keep intelligent systems useful, explainable, and accountable." tone="light" />
        <div className="mt-12 grid gap-x-12 gap-y-0 md:grid-cols-2">
          {principles.map(([title, copy], index) => (
            <div className="flex gap-4 border-t border-ink/12 py-5" key={title}>
              <span className="font-mono text-[10px] text-deep-blue/60">0{index + 1}</span>
              <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-ink/65">{copy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
