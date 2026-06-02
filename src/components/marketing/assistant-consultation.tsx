"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CornerDownLeft,
  LoaderCircle,
  ShieldCheck,
} from "lucide-react";
import {
  askAssistant,
  initialAssistantReply,
  type AssistantCta,
  type AssistantReply,
} from "@/lib/assistant-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/brand/logo";

type ConversationMessage =
  | { content: string; id: number; role: "user" }
  | { id: number; reply: AssistantReply; role: "assistant" };

const featuredPrompts = [
  "What does McCaigs do?",
  "Can AI help my business?",
  "We spend too much time on admin",
  "What kind of budget should we expect?",
] as const;

export function AssistantConsultation() {
  const [messages, setMessages] = useState<ConversationMessage[]>([
    { id: 1, reply: initialAssistantReply, role: "assistant" },
  ]);
  const [pending, setPending] = useState(false);
  const [question, setQuestion] = useState("");
  const [revealingMessageId, setRevealingMessageId] = useState<number | undefined>(1);
  const conversationRef = useRef<HTMLDivElement>(null);
  const messageId = useRef(1);
  const reducedMotion = useReducedMotion();
  const busy = pending || revealingMessageId !== undefined;
  const latestReply = [...messages].reverse().find((message) => message.role === "assistant")?.reply ?? initialAssistantReply;

  useEffect(() => {
    const conversation = conversationRef.current;
    if (!conversation) return;
    const scrollToLatest = () => conversation.scrollTo({ behavior: reducedMotion ? "auto" : "smooth", top: conversation.scrollHeight });
    const observer = new MutationObserver(scrollToLatest);
    observer.observe(conversation, { childList: true, subtree: true });
    scrollToLatest();
    return () => observer.disconnect();
  }, [reducedMotion]);

  const handleRevealComplete = useCallback((id: number) => {
    setRevealingMessageId((current) => (current === id ? undefined : current));
  }, []);

  async function sendMessage(content: string) {
    const trimmed = content.trim();
    if (!trimmed || busy) return;
    messageId.current += 1;
    setMessages((current) => [...current, { content: trimmed, id: messageId.current, role: "user" }]);
    setQuestion("");
    setPending(true);
    const reply = await askAssistant(trimmed);
    await wait(reducedMotion ? 0 : 520);
    messageId.current += 1;
    const replyId = messageId.current;
    setMessages((current) => [...current, { id: replyId, reply, role: "assistant" }]);
    setPending(false);
    setRevealingMessageId(replyId);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(question);
  }

  return (
    <section aria-label="McCaigs guided assistant" className="text-ink">
      <div className="flex flex-col gap-4 border-b border-deep-blue/12 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-deep-blue/75">
            <Logo imageClassName="size-5" showLabel={false} size="sm" /> Assistant / consultation channel
          </p>
          <p className="mt-2 max-w-2xl text-xs leading-5 text-ink/60">Ask a business question. The assistant will check approved studio knowledge and guide the next step.</p>
        </div>
        <p className="flex shrink-0 items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-deep-blue/65">
          <ShieldCheck className="size-3.5 text-signal" /> Deterministic routing active
        </p>
      </div>
      <div className="flex min-h-[36rem] flex-col">
        <div className="min-h-[26rem] py-8 sm:py-10" ref={conversationRef}>
          <div className="space-y-6">
            {messages.map((message) =>
              message.role === "user" ? (
                <UserMessage content={message.content} key={message.id} />
              ) : (
                <AssistantMessage
                  isRevealing={message.id === revealingMessageId}
                  key={message.id}
                  messageId={message.id}
                  onRevealComplete={handleRevealComplete}
                  reducedMotion={reducedMotion}
                  reply={message.reply}
                />
              ),
            )}
            {pending ? <TypingIndicator /> : null}
          </div>
        </div>
        <div className="mt-auto border-t border-deep-blue/12 pt-5">
          {!busy ? (
            <>
              <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.16em] text-deep-blue/60">
                {messages.length === 1 ? "Suggested questions" : "Continue the conversation"}
              </p>
              <div className="mb-4 grid grid-cols-2 gap-2 lg:flex lg:flex-wrap">
                {(messages.length === 1 ? featuredPrompts : latestReply.followups).map((prompt) => (
                  <button
                    className="rounded-xl border border-deep-blue/14 bg-white/35 px-3 py-2 text-left text-xs leading-5 text-deep-blue/70 transition-colors hover:border-signal/60 hover:bg-white/65 hover:text-deep-blue focus-visible:border-signal lg:rounded-full"
                    key={prompt}
                    onClick={() => void sendMessage(prompt)}
                    type="button"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <p className="mb-4 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-deep-blue/60">
              <LoaderCircle className="size-3 animate-spin motion-reduce:animate-none" /> Consultation in progress
            </p>
          )}
          <form className="flex gap-2" onSubmit={handleSubmit}>
            <Input
              aria-label="Ask McCaigs Assistant"
              className="h-11 border-deep-blue/16 bg-white/70 px-3 text-ink placeholder:text-ink/45"
              disabled={busy}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Ask what should work better"
              value={question}
            />
            <Button aria-label="Send question" className="size-11 shrink-0" disabled={busy || !question.trim()} size="icon" type="submit">
              <CornerDownLeft />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

function UserMessage({ content }: { content: string }) {
  return (
    <div className="ml-auto max-w-2xl">
      <p className="mb-2 text-right font-mono text-[9px] uppercase tracking-[0.16em] text-deep-blue/55">Your question</p>
      <p className="rounded-2xl rounded-br-sm border border-deep-blue/10 bg-deep-blue px-4 py-3 text-sm leading-6 text-signal-soft">{content}</p>
    </div>
  );
}

function AssistantMessage({ isRevealing, messageId, onRevealComplete, reducedMotion, reply }: AssistantMessageProps) {
  return (
    <div className="max-w-3xl">
      <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.16em] text-deep-blue/55">McCaigs Assistant</p>
      <div className="rounded-2xl rounded-bl-sm border border-deep-blue/12 bg-white/55 p-5 sm:p-6">
        <p className="sr-only" aria-live="polite">{reply.response}</p>
        <ProgressiveResponse
          animate={isRevealing}
          messageId={messageId}
          onComplete={onRevealComplete}
          reducedMotion={reducedMotion}
          response={reply.response}
        />
        {isRevealing ? <TypingDots /> : null}
        {!isRevealing && reply.ctas.length ? (
          <div className="mt-5 flex flex-wrap gap-2 border-t border-deep-blue/10 pt-4">
            {reply.ctas.map((cta) => <AssistantCtaLink cta={cta} key={`${cta.href}-${cta.label}`} />)}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ProgressiveResponse({ animate, messageId, onComplete, reducedMotion, response }: ProgressiveResponseProps) {
  const [visibleLength, setVisibleLength] = useState(animate && !reducedMotion ? 0 : response.length);
  const displayedResponse = animate && !reducedMotion ? response.slice(0, visibleLength) : response;
  const displayedParagraphs = useMemo(() => displayedResponse.split("\n\n").filter(Boolean), [displayedResponse]);

  useEffect(() => {
    if (!animate) return;
    if (reducedMotion || visibleLength >= response.length) {
      onComplete(messageId);
      return;
    }
    const previousCharacter = response.charAt(Math.max(0, visibleLength - 1));
    const delay = /[.!?]/.test(previousCharacter) ? 180 : previousCharacter === "\n" ? 120 : 12;
    const timer = window.setTimeout(() => setVisibleLength((current) => current + 1), delay);
    return () => window.clearTimeout(timer);
  }, [animate, messageId, onComplete, reducedMotion, response, visibleLength]);

  return (
    <div aria-hidden="true" className="space-y-3 text-sm leading-6 text-ink/78">
      {displayedParagraphs.map((paragraph, index) => <p key={`${messageId}-${index}`}>{paragraph}</p>)}
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="max-w-3xl" role="status">
      <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.16em] text-deep-blue/55">McCaigs Assistant</p>
      <div className="inline-flex items-center gap-3 rounded-2xl rounded-bl-sm border border-deep-blue/12 bg-white/55 px-4 py-3">
        <TypingDots compact />
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-deep-blue/55">Checking approved knowledge</span>
      </div>
    </div>
  );
}

function TypingDots({ compact = false }: { compact?: boolean }) {
  return (
    <span className={compact ? "flex gap-1.5" : "mt-4 flex gap-1.5"} aria-hidden="true">
      {[0, 1, 2].map((dot) => <span className="size-1.5 animate-pulse rounded-full bg-signal motion-reduce:animate-none" key={dot} style={{ animationDelay: `${dot * 160}ms` }} />)}
    </span>
  );
}

function AssistantCtaLink({ cta }: { cta: AssistantCta }) {
  return (
    <Button asChild className="bg-deep-blue text-white hover:bg-deep-blue/90 hover:text-white" size="sm">
      <Link className="text-white hover:text-white" href={cta.href}>{cta.label} <ArrowUpRight /></Link>
    </Button>
  );
}

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return reducedMotion;
}

function wait(duration: number) {
  return new Promise((resolve) => window.setTimeout(resolve, duration));
}

type AssistantMessageProps = {
  isRevealing: boolean;
  messageId: number;
  onRevealComplete: (messageId: number) => void;
  reducedMotion: boolean;
  reply: AssistantReply;
};

type ProgressiveResponseProps = {
  animate: boolean;
  messageId: number;
  onComplete: (messageId: number) => void;
  reducedMotion: boolean;
  response: string;
};
