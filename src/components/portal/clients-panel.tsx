"use client";

import { useState, type FormEvent } from "react";
import { useMutation, useQuery } from "convex/react";
import { makeFunctionReference } from "convex/server";
import { Plus, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SetupState } from "@/components/portal/setup-state";
import { useWorkspace } from "@/components/portal/workspace-shell";

type Client = {
  _id: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  clerkUserId?: string;
  status: string;
};

const listClients = makeFunctionReference<"query", Record<string, never>, Client[]>(
  "clients:list",
);
const createClient = makeFunctionReference<
  "mutation",
  {
    name: string;
    company: string;
    email: string;
    phone?: string;
    clerkUserId?: string;
    status: string;
  },
  string
>("clients:create");

export function ClientsPanel() {
  const { configured, role } = useWorkspace();
  const clients = useQuery(listClients, configured ? {} : "skip");
  const create = useMutation(createClient);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string>();

  if (!configured) return <SetupState />;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      await create({
        name: String(form.get("name")),
        company: String(form.get("company")),
        email: String(form.get("email")),
        phone: String(form.get("phone") || "") || undefined,
        clerkUserId: String(form.get("clerkUserId") || "") || undefined,
        status: "active",
      });
      event.currentTarget.reset();
      setOpen(false);
      setMessage("Client created.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Client could not be created.");
    }
  }

  return (
    <div className="space-y-5">
      {role === "owner" || role === "admin" ? (
        <div className="flex justify-end">
          <Button onClick={() => setOpen((value) => !value)}>
            <Plus /> New client
          </Button>
        </div>
      ) : null}
      {open ? (
        <Card className="border-signal/20 bg-card/70">
          <CardContent className="p-5">
            <form className="grid gap-3 md:grid-cols-2" onSubmit={submit}>
              <Input name="name" placeholder="Contact name" required />
              <Input name="company" placeholder="Company" required />
              <Input name="email" placeholder="Email" required type="email" />
              <Input name="phone" placeholder="Phone (optional)" />
              <Input
                className="md:col-span-2"
                name="clerkUserId"
                placeholder="Clerk user ID (optional)"
              />
              <Button className="md:w-fit" type="submit">
                Create client
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : null}
      {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}
      <div className="grid gap-4 xl:grid-cols-2">
        {(clients ?? []).map((client) => (
          <Card className="border-white/10 bg-card/55" key={client._id}>
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="rounded-lg border border-white/10 bg-background/45 p-2 text-signal">
                  <UserRound className="size-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-semibold text-signal-soft">{client.company}</h2>
                    <span className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.12em] text-muted-foreground">
                      {client.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm">{client.name}</p>
                  <a
                    className="mt-1 block truncate text-sm text-muted-foreground hover:text-signal-soft"
                    href={`mailto:${client.email}`}
                  >
                    {client.email}
                  </a>
                  <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                    {client.clerkUserId ? "Portal access linked" : "Portal access not linked"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {clients?.length === 0 ? (
        <p className="rounded-xl border border-dashed border-white/12 p-8 text-center text-sm text-muted-foreground">
          No client records yet.
        </p>
      ) : null}
    </div>
  );
}
