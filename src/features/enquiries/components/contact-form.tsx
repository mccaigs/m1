"use client";

import { useState, type FormEvent } from "react";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  LoaderCircle,
  LockKeyhole,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  budgetRanges,
  projectTypes,
  timelineOptions,
} from "@/lib/studio-content";
import {
  contactSubmissionSchema,
  type ContactSubmission,
} from "@/lib/validation/contact";

type FieldErrors = Partial<Record<keyof ContactSubmission, string>>;
type SubmissionState =
  | { type: "idle" }
  | { message: string; type: "error" }
  | { mobile: string; type: "success" };

export function ContactForm() {
  const [consent, setConsent] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [pending, setPending] = useState(false);
  const [submission, setSubmission] = useState<SubmissionState>({ type: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldErrors({});
    setSubmission({ type: "idle" });

    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    const result = contactSubmissionSchema.safeParse({ ...values, consent });

    if (!result.success) {
      const errors = result.error.issues.reduce<FieldErrors>((currentErrors, issue) => {
        const field = issue.path[0] as keyof ContactSubmission | undefined;
        if (field && !currentErrors[field]) currentErrors[field] = issue.message;
        return currentErrors;
      }, {});
      setFieldErrors(errors);
      setSubmission({ message: "Check the highlighted fields and add the missing detail.", type: "error" });
      return;
    }

    try {
      setPending(true);
      const response = await fetch("/api/enquiries", {
        body: JSON.stringify(result.data),
        headers: { "content-type": "application/json" },
        method: "POST",
      });
      const body = (await response.json()) as {
        directContact?: { mobile?: string };
        error?: string;
      };

      if (!response.ok || !body.directContact?.mobile) {
        throw new Error(body.error ?? "The enquiry could not be sent just now.");
      }

      form.reset();
      setConsent(false);
      setSubmission({ mobile: body.directContact.mobile, type: "success" });
    } catch (error) {
      setSubmission({
        message: error instanceof Error ? error.message : "The enquiry could not be sent just now.",
        type: "error",
      });
    } finally {
      setPending(false);
    }
  }

  if (submission.type === "success") {
    return (
      <div className="flex min-h-[38rem] flex-col justify-between rounded-2xl border border-signal/30 bg-card/65 p-6 shadow-2xl shadow-black/10 sm:p-8">
        <div className="flex size-12 items-center justify-center rounded-full border border-signal/25 bg-signal/10 text-signal">
          <CheckCircle2 className="size-6" />
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal">Qualified enquiry received</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">Thank you. The studio has your brief.</h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
            Your enquiry has been received for review. If speaking directly is useful, the private contact line is now available below.
          </p>
          <a className="mt-7 flex items-center gap-3 rounded-xl border border-signal/25 bg-signal/8 p-4 text-signal-soft transition-colors hover:bg-signal/12" href={`tel:${submission.mobile}`}>
            <Phone className="size-5 text-signal" />
            <span>
              <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-signal">Direct mobile</span>
              <span className="mt-1 block text-lg font-semibold">{submission.mobile}</span>
            </span>
          </a>
        </div>
        <p className="flex items-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="size-4 text-signal" /> Revealed after validated enquiry submission.</p>
      </div>
    );
  }

  return (
    <form className="rounded-2xl border border-white/10 bg-card/65 p-5 shadow-2xl shadow-black/10 sm:p-7" onSubmit={handleSubmit}>
      <div className="mb-6 flex items-start gap-3 rounded-lg border border-signal/20 bg-signal/5 p-4">
        <LockKeyhole className="mt-0.5 size-4 shrink-0 text-signal" />
        <p className="text-xs leading-5 text-muted-foreground">
          The direct contact line is revealed only after a validated project enquiry is received.
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field error={fieldErrors.name} label="Name" name="name"><Input aria-invalid={Boolean(fieldErrors.name)} autoComplete="name" id="name" name="name" placeholder="Your name" /></Field>
        <Field error={fieldErrors.company} label="Company or organisation" name="company"><Input aria-invalid={Boolean(fieldErrors.company)} autoComplete="organization" id="company" name="company" placeholder="Organisation name" /></Field>
        <Field error={fieldErrors.email} label="Email address" name="email"><Input aria-invalid={Boolean(fieldErrors.email)} autoComplete="email" id="email" name="email" placeholder="you@company.co.uk" type="email" /></Field>
        <Field error={fieldErrors.budgetRange} label="Working budget" name="budgetRange">
          <Select name="budgetRange"><SelectTrigger aria-invalid={Boolean(fieldErrors.budgetRange)} className="w-full" id="budgetRange"><SelectValue placeholder="Choose the closest range" /></SelectTrigger><SelectContent>{budgetRanges.map((range) => <SelectItem key={range} value={range}>{range}</SelectItem>)}</SelectContent></Select>
        </Field>
        <Field error={fieldErrors.projectType} label="Closest project type" name="projectType">
          <Select name="projectType"><SelectTrigger aria-invalid={Boolean(fieldErrors.projectType)} className="w-full" id="projectType"><SelectValue placeholder="Choose the closest fit" /></SelectTrigger><SelectContent>{projectTypes.map((type) => <SelectItem key={type} value={type}>{type}</SelectItem>)}</SelectContent></Select>
        </Field>
        <Field error={fieldErrors.timeline} label="Expected timeline" name="timeline">
          <Select name="timeline"><SelectTrigger aria-invalid={Boolean(fieldErrors.timeline)} className="w-full" id="timeline"><SelectValue placeholder="Choose the closest timing" /></SelectTrigger><SelectContent>{timelineOptions.map((timeline) => <SelectItem key={timeline} value={timeline}>{timeline}</SelectItem>)}</SelectContent></Select>
        </Field>
        <div className="sm:col-span-2">
          <Field error={fieldErrors.message} label="Project brief" name="message"><Textarea aria-invalid={Boolean(fieldErrors.message)} className="min-h-40" id="message" name="message" placeholder="Describe the operational problem, the opportunity, and what a useful outcome would look like." /></Field>
        </div>
        <div className="sm:col-span-2">
          <Field error={fieldErrors.captcha} label="Deterministic check" name="captcha">
            <Input aria-invalid={Boolean(fieldErrors.captcha)} autoComplete="off" id="captcha" name="captcha" placeholder="What two letters are hidden inside McCaigs?" />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <div className="flex items-start gap-3">
            <Checkbox checked={consent} id="consent" onCheckedChange={(checked) => setConsent(checked === true)} />
            <Label className="text-xs font-normal leading-5 text-muted-foreground" htmlFor="consent">
              I consent to McCaigs using these details to review and reply to this project enquiry.
            </Label>
          </div>
          {fieldErrors.consent ? <p className="mt-2 text-xs leading-5 text-destructive">{fieldErrors.consent}</p> : null}
        </div>
      </div>
      {submission.type === "error" ? (
        <Alert className="mt-5" variant="destructive">
          <AlertCircle />
          <AlertTitle>Enquiry not sent</AlertTitle>
          <AlertDescription>{submission.message}</AlertDescription>
        </Alert>
      ) : null}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-muted-foreground">Validated locally before the secure submission route is called.</p>
        <Button disabled={pending} type="submit">{pending ? <LoaderCircle className="animate-spin" /> : null} Send qualified enquiry <ArrowUpRight /></Button>
      </div>
    </form>
  );
}

function Field({ children, error, label, name }: { children: React.ReactNode; error?: string; label: string; name: string }) {
  return <div className="grid gap-2"><Label htmlFor={name}>{label}</Label>{children}{error ? <p className="text-xs leading-5 text-destructive">{error}</p> : null}</div>;
}
