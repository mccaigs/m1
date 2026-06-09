"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, CornerDownLeft } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  answerAssistantQuestion,
  assistantTopics,
} from "@/lib/enquiry-assistant";

const initialAnswer =
  "Choose a topic or ask a focused question. This assistant answers from a fixed local knowledge base and will not improvise.";

export function DeterministicEnquiryAssistant({ feature = false }: { feature?: boolean }) {
  const [answer, setAnswer] = useState(initialAnswer);
  const [question, setQuestion] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAnswer(answerAssistantQuestion(question));
    setQuestion("");
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-card/60 shadow-2xl shadow-black/10">
      <div className="technical-grid border-b border-white/10 bg-deep-blue/25 p-5 sm:p-6">
        <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-signal">
          <Logo size="sm" /> Controlled enquiry assistant
        </p>
        <p className="mt-3 text-xs leading-5 text-muted-foreground">
          Controlled responses only. No general-purpose chat. No invented answers.
        </p>
      </div>
      <div className={feature ? "p-5 sm:p-8" : "p-5 sm:p-6"}>
        <div className={feature ? "min-h-56 rounded-xl border border-signal/15 bg-background/75 p-5 sm:p-6" : "min-h-44 rounded-xl border border-signal/15 bg-background/75 p-4"}>
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-signal">Approved response</p>
          <p className="mt-4 text-sm leading-6 text-signal-soft">{answer}</p>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {assistantTopics.slice(0, feature ? 12 : 7).map((topic) => (
            <button
              className="rounded-full border border-white/10 bg-white/3 px-3 py-2 text-left text-xs text-muted-foreground transition-colors hover:border-signal/30 hover:text-foreground"
              key={topic.id}
              onClick={() => setAnswer(topic.answer)}
              type="button"
            >
              {topic.label}
            </button>
          ))}
        </div>
        <form className="mt-5 flex gap-2" onSubmit={handleSubmit}>
          <Input
            aria-label="Ask the controlled enquiry assistant"
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Ask a focused question"
            value={question}
          />
          <Button aria-label="Ask question" size="icon" type="submit">
            <CornerDownLeft />
          </Button>
        </form>
        <p className="mt-4 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
          Local knowledge base <ArrowUpRight className="size-3 text-signal" />
        </p>
      </div>
    </section>
  );
}
