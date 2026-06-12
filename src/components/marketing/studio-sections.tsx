import { ArrowDownRight, ArrowUpRight, Check, CircleDot, MoveRight } from "lucide-react";
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
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HeroOpenerVideo } from "@/components/marketing/hero-opener-video";
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

function SectionLabel({
  children,
  tone = "dark",
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <p
      className={cn(
        "mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] sm:mb-5",
        tone === "light" ? "text-deep-blue" : "text-signal",
      )}
    >
      <CircleDot className="size-3" /> {children}
    </p>
  );
}

function SectionHeading({ eyebrow, title, copy, tone = "dark" }: { eyebrow: string; title: string; copy: string; tone?: "dark" | "light" }) {
  return (
    <div className="max-w-2xl">
      <SectionLabel tone={tone}>{eyebrow}</SectionLabel>
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      <p className={cn("mt-4 text-base leading-7 sm:mt-5 sm:text-lg", tone === "light" ? "text-ink/65" : "text-muted-foreground")}>{copy}</p>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 pb-9 pt-9 sm:px-8 sm:pb-17 sm:pt-17 lg:pb-24 lg:pt-20">
      <div className="hero-glow absolute -top-24 right-0 -z-10 h-[32rem] w-[32rem] opacity-70" />
      <div className="grid items-start gap-7 sm:gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-8">
        <div>
          <SectionLabel>Technical studio / Edinburgh, Scotland</SectionLabel>
          <p className="mb-5 max-w-lg border-l border-signal/55 pl-4 font-mono text-[10px] uppercase leading-5 tracking-[0.18em] text-muted-foreground sm:mb-6">
            Practical AI / better workflows / websites that work harder
          </p>
          <h1 className="max-w-5xl text-[2.75rem] font-semibold leading-[0.94] tracking-[-0.065em] sm:text-[4.25rem] lg:text-[6.45rem]">
            Scotland&apos;s <span className="block text-signal-soft">Elite Technical</span> Studio
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground sm:mt-7 sm:text-xl">
            Practical AI, automation, websites, internal systems, and digital
            products built properly for ambitious businesses.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
            <Button asChild className="min-h-11 sm:min-h-0" size="lg"><Link href="/start-project">Start a project <ArrowUpRight /></Link></Button>
            <Button asChild className="min-h-11 sm:min-h-0" size="lg" variant="outline"><Link href="/systems">View systems <ArrowDownRight /></Link></Button>
          </div>
          <div className="mt-4 font-mono text-[9px] uppercase leading-5 tracking-[0.14em] text-muted-foreground/70 sm:mt-5">
            <p>Startups <span aria-hidden="true">•</span> SMEs <span aria-hidden="true">•</span> Enterprise Teams</p>
            <p className="normal-case tracking-[0.08em]">Systems shipped in days, not months.</p>
          </div>
        </div>
        <ProductDemoPanel />
      </div>
      <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:mt-11 sm:grid-cols-2 lg:grid-cols-4">
        {proofPoints.map((point) => (
          <p className="bg-background/90 px-3 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:px-4 sm:py-4" key={point}>
            <Check className="mr-2 inline size-3 text-signal" /> {point}
          </p>
        ))}
      </div>
    </section>
  );
}

function ProductDemoPanel() {
  return (
    <div className="relative mx-auto w-full max-w-[23rem] overflow-hidden rounded-2xl border border-white/12 bg-deep-blue/45 p-3 shadow-[0_0_80px_rgba(37,99,235,0.08),0_25px_60px_rgba(0,0,0,0.2)] sm:max-w-[27rem] lg:-mt-3 lg:mr-0 lg:max-w-[29rem]">
      <div className="technical-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-background/85 px-3 py-2 backdrop-blur">
        <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-signal-soft">SYS_MCG_DEMO / product interfaces</p>
        <span className="size-1.5 rounded-full bg-signal shadow-[0_0_14px_rgba(58,167,255,0.7)]" />
      </div>
      <div className="relative mt-2.5">
        <HeroOpenerVideo />
      </div>
      <div className="relative mt-2.5 rounded-lg border border-white/10 bg-background/90 px-3 py-2.5 font-mono text-[9px] uppercase leading-5 tracking-[0.12em] text-muted-foreground backdrop-blur">
        <p className="text-signal">Live studio reel / demo data</p>
        <p>Assistant / Project builder / Studio OS</p>
      </div>
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
      <div className="mx-auto grid max-w-7xl gap-7 px-5 py-14 sm:gap-10 sm:px-8 sm:py-24 lg:grid-cols-[0.7fr_1.3fr]">
        <SectionHeading eyebrow="Studio position" title="Serious systems for ordinary businesses." copy="McCaigs is a creative technical studio for ambitious businesses that need practical AI, automation, websites, internal tools, and digital products built around how the operation actually works." tone="light" />
        <div className="grid gap-px overflow-hidden rounded-xl border border-ink/10 bg-ink/10 sm:grid-cols-3">
          {points.map(([number, title, copy]) => (
            <div className="bg-off-white p-5 sm:p-6" key={number}>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-deep-blue/75">{number}</p>
              <h3 className="mt-4 text-xl font-semibold sm:mt-8">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-ink/65">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const technologies: readonly { code: string; icon?: SimpleIcon; label: string; name: string; src?: string }[] = [
  { name: "OpenAI", label: "Language Models", code: "MODEL_01", icon: undefined, src: "/technology/openai-blossom.svg" },
  { name: "Anthropic", label: "Reasoning Systems", code: "MODEL_02", icon: siAnthropic },
  { name: "Google AI", label: "Multimodal Services", code: "MODEL_03", icon: siGooglegemini },
  { name: "Convex", label: "Realtime Data Layer", code: "DATA_01", icon: siConvex },
  { name: "Clerk", label: "Authentication", code: "AUTH_01", icon: siClerk },
  { name: "Vercel", label: "Deployment Infrastructure", code: "DEPLOY_01", icon: siVercel },
  { name: "Next.js", label: "Application Framework", code: "BUILD_01", icon: siNextdotjs },
  { name: "TypeScript", label: "Typed Engineering", code: "BUILD_02", icon: siTypescript },
] as const;

function TechnologyMark({ icon, name, src }: { icon?: SimpleIcon; name: string; src?: string }) {
  return (
    <div className="flex size-11 items-center justify-center rounded-lg border border-signal/20 bg-signal/7 text-signal-soft">
      {src ? (
        <Image alt={`${name} mark`} className="size-5 opacity-85" height={20} src={src} width={20} />
      ) : icon ? (
        <svg aria-label={`${name} mark`} className="size-5 fill-current opacity-75" role="img" viewBox="0 0 24 24">
          <path d={icon.path} />
        </svg>
      ) : null}
    </div>
  );
}

export function TechnologyEcosystemSection() {
  return (
    <section className="border-y border-white/8 bg-deep-blue/20">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-24">
        <SectionHeading
          eyebrow="Studio operating environment"
          title="Built using the world's best tools. Applied to real business problems."
          copy="We build with proven platforms and established infrastructure so projects move faster, remain dependable, and stay commercially sensible. Your investment goes into solving the business problem, not rebuilding technology that already works."
        />
        <div className="technical-grid relative mt-7 overflow-hidden rounded-2xl border border-white/12 bg-background/65 p-2 shadow-2xl shadow-black/12 sm:mt-10 sm:p-5">
          <svg aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-24 w-full -translate-y-1/2 text-signal/45 lg:block" preserveAspectRatio="none" viewBox="0 0 1200 96">
            <path className="systems-path" d="M34 48 H1166" fill="none" stroke="currentColor" strokeDasharray="3 13" />
            <path className="systems-path systems-path-delayed" d="M34 72 C260 8 420 88 606 30 S940 12 1166 62" fill="none" stroke="currentColor" strokeDasharray="2 18" />
          </svg>
          <div className="relative grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {technologies.map(({ code, icon, label, name, src }) => (
              <article className="group rounded-xl border border-white/10 bg-deep-blue/80 p-3 backdrop-blur transition-colors duration-300 hover:border-signal/40 hover:bg-deep-blue sm:min-h-39 sm:p-4" key={name}>
                <div className="flex items-start justify-between gap-3">
                  <TechnologyMark icon={icon} name={name} src={src} />
                  <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-signal/55">{code}</span>
                </div>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-signal-soft sm:mt-7">{name}</p>
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
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-24">
        <SectionHeading
          eyebrow="Practical intelligence"
          title="We don't start with AI. We start with the problem."
          copy="Sometimes the answer is AI. Sometimes the answer is automation. Sometimes the answer is a workflow, rules engine, internal tool, or better information flow. The best solution is not the most complex one. It's the one that solves the problem reliably and economically."
          tone="light"
        />
        <div className="mt-7 overflow-hidden rounded-2xl border border-ink/12 bg-ink/12 sm:mt-10">
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
          <p className="border-t border-ink/12 bg-deep-blue px-5 py-4 text-lg font-semibold tracking-tight text-off-white sm:px-7 sm:py-5 sm:text-xl">
            &ldquo;Don&apos;t pay for intelligence when logic is enough.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}

function IntelligenceList({ eyebrow, items, number }: { eyebrow: string; items: readonly string[]; number: string }) {
  return (
    <div className="bg-off-white p-4 sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-deep-blue">{eyebrow}</h3>
        <span className="font-mono text-[10px] text-deep-blue/75">{number}</span>
      </div>
      <div className="mt-5 grid gap-2 sm:mt-7 sm:grid-cols-2 sm:gap-3">
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
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-24">
        <SectionHeading
          eyebrow="From the studio"
          title="Classified builds. Practical outcomes."
          copy="A closer look at the sort of work that happens inside the studio. Codenames protect the context; the operational problem, system shape, and outcome stay visible."
        />
        <div className="mt-7 grid overflow-hidden sm:mt-10 sm:gap-4 lg:grid-cols-3">
          {selectedSystems.map((system, index) => (
            <article
              className={cn(
                "relative overflow-hidden rounded-xl border border-white/10 bg-card/55",
                index < selectedSystems.length - 1 && "-mb-3 sm:mb-0",
              )}
              key={system.codename}
              style={{ zIndex: index + 1 }}
            >
              <div className="technical-grid flex items-end justify-between border-b border-white/10 bg-deep-blue/30 p-4 sm:p-5">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-signal">Internal build / 0{index + 1}</p>
                  <h3 className="mt-3 text-2xl font-semibold uppercase tracking-tight sm:mt-5">{system.codename}</h3>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-signal-soft">{system.type}</p>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">{system.buildTime}</span>
              </div>
              <div
                className={cn(
                  "space-y-4 p-4 sm:space-y-5 sm:p-5",
                  index < selectedSystems.length - 1 && "hidden sm:block",
                )}
              >
                <StudioNote label="Problem" text={system.problem} />
                <StudioNote label="Solution" text={system.solution} />
                <StudioNote label="Outcome" text={system.outcome} />
                <Link className="inline-flex min-h-11 items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-signal hover:text-signal-soft sm:min-h-0" href={`/systems#${system.slug}`}>
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
      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-signal">{label}</p>
      <p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p>
    </div>
  );
}

export function CapabilitiesSection({ preview = false }: { preview?: boolean }) {
  const visibleCapabilities = preview ? capabilities.slice(0, 3) : capabilities;

  return (
    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-28" id="capabilities">
      <SectionHeading eyebrow="What we build" title="Technical creativity for businesses that need more than a standard website." copy="Websites, workflows, automations, and internal tools designed to work together, reduce friction, and create practical progress." />
      <div className="mt-7 grid gap-3 sm:mt-12 md:grid-cols-2 lg:grid-cols-3">
        {visibleCapabilities.map(({ title, description, icon: Icon }) => (
          <Card className="group border-white/10 bg-card/55 transition-transform duration-300 hover:-translate-y-1 hover:border-signal/40" key={title}>
            <CardContent className="p-5 sm:p-6">
              <div className="flex size-10 items-center justify-center rounded-lg border border-signal/20 bg-signal/8 text-signal"><Icon className="size-5" /></div>
              <h3 className="mt-5 text-xl font-semibold sm:mt-8">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      {preview ? <Button asChild className="mt-7 min-h-11 sm:min-h-0" variant="outline"><Link href="/services">Explore services <ArrowUpRight /></Link></Button> : null}
    </section>
  );
}

export function TypicalProblemsSection() {
  return (
    <section className="border-y border-white/8 bg-deep-blue/20">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-24">
        <SectionHeading eyebrow="Typical problems we solve" title="The awkward parts of a growing business are often the opportunity." copy="You need the right improvements in the places where time, enquiries, and knowledge are currently slipping through the gaps." />
        <div className="mt-7 grid gap-3 sm:mt-10 md:grid-cols-2 lg:grid-cols-3">
          {typicalProblems.map(({ copy, icon: Icon, title }, index) => (
            <Card className="border-white/10 bg-card/55" key={title}>
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex size-10 items-center justify-center rounded-lg border border-signal/20 bg-signal/8 text-signal">
                    <Icon className="size-5" />
                  </div>
                  <span className="font-mono text-[9px] tracking-[0.16em] text-muted-foreground">0{index + 1}</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold sm:mt-7">{title}</h3>
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
              <span className="font-mono text-[10px] text-deep-blue/75">0{index + 1}</span>
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
