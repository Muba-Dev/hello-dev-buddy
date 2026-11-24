import { useEffect, useMemo, useState } from "react";
import { Loader2, LogOut, RefreshCw, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { findProgramBySlug } from "@/data/school";
import {
  admissionStatuses,
  callSla,
  formatDateTime,
  paymentMethodLabels,
  statusMeta,
  type AdmissionStatus,
  type Application,
  type AuditEntry,
  type PaymentMethod,
  type PaymentStatus,
} from "@/lib/admin";

type Draft = {
  status: AdmissionStatus;
  assigned_level: string;
  teacher_notes: string;
  payment_status: PaymentStatus;
  payment_method: PaymentMethod | "";
  receipt_note: string;
  payment_verified_at: string;
};

const toDateTimeLocal = (value: string | null) =>
  value ? new Date(value).toISOString().slice(0, 16) : "";

const draftFrom = (app: Application): Draft => ({
  status: app.status,
  assigned_level: app.assigned_level ?? "",
  teacher_notes: app.teacher_notes ?? "",
  payment_status: app.payment_status,
  payment_method: app.payment_method ?? "",
  receipt_note: app.receipt_note ?? "",
  payment_verified_at: toDateTimeLocal(app.payment_verified_at),
});

const AdminAdmissions = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [audit, setAudit] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<AdmissionStatus | "ALL">("ALL");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Application | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(null);
    const [appsResult, auditResult] = await Promise.all([
      supabase.from("admission_applications").select("*").order("created_at", { ascending: false }),
      supabase.from("admission_audit_log").select("*").order("created_at", { ascending: false }).limit(500),
    ]);
    if (appsResult.error) {
      setError(appsResult.error.message);
    } else {
      setApplications(appsResult.data ?? []);
    }
    setAudit(auditResult.data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    void load();
  }, []);

  const counts = useMemo(() => {
    const result = Object.fromEntries(admissionStatuses.map((s) => [s, 0])) as Record<AdmissionStatus, number>;
    for (const app of applications) result[app.status] += 1;
    return result;
  }, [applications]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return applications.filter((app) => {
      if (statusFilter !== "ALL" && app.status !== statusFilter) return false;
      if (!q) return true;
      return [app.reference_id, app.full_name, app.phone, app.email ?? ""]
        .some((value) => value.toLowerCase().includes(q));
    });
  }, [applications, search, statusFilter]);

  const openApplication = (app: Application) => {
    setSelected(app);
    setDraft(draftFrom(app));
  };

  const save = async () => {
    if (!selected || !draft) return;
    setSaving(true);
    const paid = draft.payment_status === "PAID";
    const { error: updateError } = await supabase
      .from("admission_applications")
      .update({
        status: draft.status,
        assigned_level: draft.assigned_level.trim() || null,
        teacher_notes: draft.teacher_notes.trim() || null,
        payment_status: draft.payment_status,
        payment_method: paid ? draft.payment_method || null : null,
        receipt_note: paid ? draft.receipt_note.trim() || null : null,
        payment_verified_at: paid
          ? draft.payment_verified_at
            ? new Date(draft.payment_verified_at).toISOString()
            : new Date().toISOString()
          : null,
      })
      .eq("id", selected.id);

    setSaving(false);
    if (updateError) {
      toast({ title: "Could not save", description: updateError.message, variant: "destructive" });
      return;
    }
    toast({ title: "Application updated", description: `${selected.reference_id} saved.` });
    setSelected(null);
    setDraft(null);
    await load();
  };

  const selectedAudit = audit.filter((entry) => entry.application_id === selected?.id);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container flex flex-wrap items-center justify-between gap-3 py-4">
          <div>
            <p className="eyebrow mb-1">Staff area</p>
            <h1 className="font-serif text-2xl">Admissions pipeline</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => void load()} disabled={loading}>
              <RefreshCw size={15} className={`mr-2 ${loading ? "animate-spin" : ""}`} aria-hidden="true" />
              Refresh
            </Button>
            <Button variant="ghost" size="sm" onClick={() => void supabase.auth.signOut()}>
              <LogOut size={15} className="mr-2" aria-hidden="true" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8 space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {admissionStatuses.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`rounded-md border p-3 text-left transition-colors hover:bg-secondary/60 ${
                statusFilter === status ? "border-primary bg-secondary" : "border-border bg-card"
              }`}
            >
              <p className="text-xs text-muted-foreground">{statusMeta[status].step}</p>
              <p className="font-serif text-2xl">{counts[status]}</p>
              <p className="text-xs font-medium">{statusMeta[status].label}</p>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search reference, name, phone or email"
              className="pl-9"
              aria-label="Search applications"
            />
          </div>
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as AdmissionStatus | "ALL")}>
            <SelectTrigger className="w-[190px]" aria-label="Filter by status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All statuses</SelectItem>
              {admissionStatuses.map((status) => (
                <SelectItem key={status} value={status}>{statusMeta[status].label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {statusFilter !== "ALL" && (
            <Button variant="ghost" size="sm" onClick={() => setStatusFilter("ALL")}>Clear filter</Button>
          )}
        </div>

        {error && <p className="text-sm text-destructive" role="alert">{error}</p>}

        <div className="rounded-md border border-border bg-card overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center py-16" role="status">
              <Loader2 className="animate-spin text-muted-foreground" aria-hidden="true" />
              <span className="sr-only">Loading applications…</span>
            </div>
          ) : filtered.length === 0 ? (
            <p className="py-16 text-center text-sm text-muted-foreground">No applications match this view.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference</TableHead>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Programme</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Call SLA</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead><span className="sr-only">Open</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((app) => {
                  const sla = callSla(app);
                  return (
                    <TableRow key={app.id} className="cursor-pointer" onClick={() => openApplication(app)}>
                      <TableCell className="font-mono text-xs">{app.reference_id}</TableCell>
                      <TableCell>
                        <p className="font-medium">{app.full_name}</p>
                        <p className="text-xs text-muted-foreground">{app.phone}</p>
                      </TableCell>
                      <TableCell>{findProgramBySlug(app.program_slug)?.title ?? app.program_slug}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{formatDateTime(app.created_at)}</TableCell>
                      <TableCell>
                        {app.status === "NEW" && (
                          <Badge className={sla === "breached" ? "bg-red-100 text-red-900" : sla === "due" ? "bg-amber-100 text-amber-900" : "bg-muted text-muted-foreground"}>
                            {sla === "breached" ? "Overdue" : sla === "due" ? "Due today" : "On track"}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={statusMeta[app.status].badge}>{statusMeta[app.status].label}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={app.payment_status === "PAID" ? "default" : "outline"}>
                          {app.payment_status === "PAID" ? "Paid" : "Unpaid"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Open</Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </div>
      </main>

      <Dialog open={Boolean(selected)} onOpenChange={(open) => { if (!open) { setSelected(null); setDraft(null); } }}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">{selected?.reference_id}</DialogTitle>
            <DialogDescription>
              {selected?.full_name} · {selected ? findProgramBySlug(selected.program_slug)?.title : ""}
            </DialogDescription>
          </DialogHeader>

          {selected && (
            <div className="space-y-6">
              <section className="grid sm:grid-cols-2 gap-x-6 gap-y-2 rounded-md bg-secondary/40 p-4 text-sm">
                <p><span className="text-muted-foreground">Age: </span>{selected.age}</p>
                <p><span className="text-muted-foreground">Gender: </span>{selected.gender}</p>
                <p><span className="text-muted-foreground">Phone: </span>{selected.phone}</p>
                <p><span className="text-muted-foreground">Email: </span>{selected.email ?? "—"}</p>
                <p className="sm:col-span-2"><span className="text-muted-foreground">Guardian: </span>{selected.guardian_name ?? "—"}</p>
                <p className="sm:col-span-2"><span className="text-muted-foreground">Address: </span>{selected.home_address}</p>
                <p className="sm:col-span-2"><span className="text-muted-foreground">Previous education: </span>{selected.previous_education ?? "—"}</p>
                <p className="sm:col-span-2"><span className="text-muted-foreground">Emergency contact: </span>{selected.emergency_contact}</p>
              </section>

              {draft && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Pipeline status</Label>
                    <Select value={draft.status} onValueChange={(value) => setDraft({ ...draft, status: value as AdmissionStatus })}>
                      <SelectTrigger id="status"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {admissionStatuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {statusMeta[status].label} — {statusMeta[status].step}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">{statusMeta[draft.status].hint}</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="assignedLevel">Assigned level / class</Label>
                    <Input
                      id="assignedLevel"
                      placeholder="e.g. Beginner Qa'idah, Hifz Track A"
                      value={draft.assigned_level}
                      onChange={(event) => setDraft({ ...draft, assigned_level: event.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="teacherNotes">Teacher notes (internal)</Label>
                    <Textarea
                      id="teacherNotes"
                      rows={3}
                      value={draft.teacher_notes}
                      onChange={(event) => setDraft({ ...draft, teacher_notes: event.target.value })}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 rounded-md border border-border p-4">
                    <div className="space-y-2">
                      <Label htmlFor="paymentStatus">Payment status</Label>
                      <Select
                        value={draft.payment_status}
                        onValueChange={(value) => setDraft({ ...draft, payment_status: value as PaymentStatus })}
                      >
                        <SelectTrigger id="paymentStatus"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UNPAID">Unpaid</SelectItem>
                          <SelectItem value="PAID">Paid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {draft.payment_status === "PAID" && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="paymentMethod">Payment method</Label>
                          <Select
                            value={draft.payment_method}
                            onValueChange={(value) => setDraft({ ...draft, payment_method: value as PaymentMethod })}
                          >
                            <SelectTrigger id="paymentMethod"><SelectValue placeholder="Select method" /></SelectTrigger>
                            <SelectContent>
                              {(Object.keys(paymentMethodLabels) as PaymentMethod[]).map((method) => (
                                <SelectItem key={method} value={method}>{paymentMethodLabels[method]}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="verifiedAt">Date verified</Label>
                          <Input
                            id="verifiedAt"
                            type="datetime-local"
                            value={draft.payment_verified_at}
                            onChange={(event) => setDraft({ ...draft, payment_verified_at: event.target.value })}
                          />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="receiptNote">Receipt / reference note</Label>
                          <Input
                            id="receiptNote"
                            placeholder="e.g. Teller #12345 or transfer reference"
                            value={draft.receipt_note}
                            onChange={(event) => setDraft({ ...draft, receipt_note: event.target.value })}
                          />
                        </div>
                      </>
                    )}
                  </div>

                  <Button onClick={() => void save()} disabled={saving} className="w-full">
                    {saving && <Loader2 size={16} className="mr-2 animate-spin" aria-hidden="true" />}
                    Save changes
                  </Button>
                </div>
              )}

              <section>
                <h3 className="font-serif text-lg mb-3">Audit trail</h3>
                {selectedAudit.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No changes recorded yet.</p>
                ) : (
                  <ul className="space-y-2 text-sm">
                    {selectedAudit.map((entry) => (
                      <li key={entry.id} className="flex flex-wrap justify-between gap-2 border-b border-border pb-2">
                        <span className="font-medium">{entry.action.replace(/_/g, " ")}</span>
                        <span className="text-muted-foreground">
                          {formatDateTime(entry.created_at)} · {entry.changed_by ? "Staff" : "System"}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminAdmissions;
