import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { CheckCircle2, Copy, Loader2, MessageCircle } from "lucide-react";
import {
  ADMISSION_TERMS,
  enrollmentSteps,
  findProgramBySlug,
  findProgramByTitle,
  OFFICE_HOURS,
  programs,
  SCHOOL_EMAIL,
  SCHOOL_LOCATION,
  SCHOOL_PHONE,
  whatsappLink,
} from "@/data/school";
import { supabase } from "@/integrations/supabase/client";
import { admissionSchema, type AdmissionFormValues } from "@/lib/admission";

type Receipt = {
  referenceId: string;
  fullName: string;
  programme: string;
  duplicate: boolean;
  message: string;
};

const FieldError = ({ message }: { message?: string }) =>
  message ? <p className="text-sm text-destructive">{message}</p> : null;

const TermsContent = () => (
  <div className="space-y-6 py-2">
    <section>
      <h3 className="font-serif text-lg mb-2">Attendance</h3>
      <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
        {ADMISSION_TERMS.attendance.map((term) => (
          <li key={term}>{term}</li>
        ))}
      </ul>
    </section>
    <section>
      <h3 className="font-serif text-lg mb-2">Fees</h3>
      <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
        {ADMISSION_TERMS.fees.map((term) => (
          <li key={term}>{term}</li>
        ))}
      </ul>
    </section>
    <p className="text-xs text-muted-foreground border-t border-border pt-4">
      These terms are placeholder wording until the school publishes its approved policy.
    </p>
  </div>
);

const AdmissionPage = () => {
  const [params] = useSearchParams();
  const requestedProgram = params.get("program") ?? "";
  // Accept both the current slug links and legacy links that used the title.
  const initialProgram =
    findProgramBySlug(requestedProgram)?.slug ??
    findProgramByTitle(requestedProgram)?.slug ??
    "";

  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AdmissionFormValues>({
    resolver: zodResolver(admissionSchema),
    defaultValues: {
      fullName: "",
      age: "",
      guardianName: "",
      phone: "",
      email: "",
      program: initialProgram,
      address: "",
      background: "",
      emergencyContact: "",
      honeypot: "",
    },
  });

  const age = Number(watch("age"));
  const isMinor = Number.isInteger(age) && age > 0 && age < 18;

  const onSubmit = async (values: AdmissionFormValues) => {
    setSubmitError(null);
    const { data, error } = await supabase.functions.invoke<Receipt>("submit-admission", {
      body: values,
    });

    if (error) {
      const context = error.context as { error?: string } | undefined;
      const message = context?.error ?? "We could not submit your application.";
      setSubmitError(message);
      toast({ title: "Could not submit your application", description: message, variant: "destructive" });
      return;
    }

    if (!data?.referenceId) {
      setSubmitError("We could not confirm your submission. Please call the office.");
      return;
    }

    setReceipt(data);
    toast({
      title: data.duplicate ? "Application already on file" : "Application received",
      description: "A teacher will call you within three working days.",
    });
  };

  const startAnother = () => {
    reset();
    setSubmitError(null);
    setReceipt(null);
    setCopied(false);
  };

  const copyReference = async () => {
    if (!receipt) return;
    try {
      await navigator.clipboard.writeText(receipt.referenceId);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const whatsappMessage = receipt
    ? `Hello, I submitted an admission application. Reference: ${receipt.referenceId}. Name: ${receipt.fullName}.`
    : "";

  return (
    <div className="container py-16 max-w-5xl">
      <p className="eyebrow mb-3">Admission</p>
      <h1 className="text-4xl md:text-5xl mb-4 max-w-3xl">
        Apply in five minutes — no documents needed to start
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mb-12">
        Admissions run all year. Send the form below and we will confirm your level, timetable
        and fees before you pay anything.
      </p>

      <ol className="grid sm:grid-cols-5 gap-6 mb-16">
        {enrollmentSteps.map((step) => (
          <li key={step.step} className="border-t-2 border-accent pt-4">
            <div className="font-serif text-2xl text-primary mb-1">0{step.step}</div>
            <h2 className="font-medium text-base mb-1.5">{step.title}</h2>
            <p className="text-sm text-muted-foreground">{step.detail}</p>
          </li>
        ))}
      </ol>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2" id="admission-form">
          <h2 className="text-3xl mb-6">Admission form</h2>

          {receipt ? (
            <div className="border border-border rounded-md bg-card p-8 text-center">
              <CheckCircle2 className="mx-auto mb-4 text-primary" size={40} aria-hidden="true" />
              <h3 className="font-serif text-2xl mb-2">
                {receipt.duplicate ? "Application already on file" : "Application received"}
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">{receipt.message}</p>

              <div className="rounded-md border border-border bg-secondary/40 p-5 mb-6 text-left max-w-md mx-auto">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Reference ID</p>
                    <p className="font-mono text-xl font-semibold text-primary">{receipt.referenceId}</p>
                  </div>
                  <Button type="button" variant="outline" size="icon" onClick={copyReference} aria-label="Copy reference ID">
                    <Copy size={16} />
                  </Button>
                </div>
                {copied && <p className="text-xs text-muted-foreground mt-2">Copied to clipboard.</p>}
                <dl className="mt-4 pt-4 border-t border-border space-y-2 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Student</dt>
                    <dd className="font-medium text-right">{receipt.fullName}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Programme</dt>
                    <dd className="font-medium text-right">{receipt.programme}</dd>
                  </div>
                </dl>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild>
                  <a href={whatsappLink(whatsappMessage)} target="_blank" rel="noopener noreferrer">
                    <MessageCircle size={17} className="mr-2" aria-hidden="true" />
                    Message school on WhatsApp
                  </a>
                </Button>
                <Button variant="outline" onClick={startAnother}>
                  Submit another application
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-5">
                Keep this reference for your records. Office hours: {OFFICE_HOURS}.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-5 bg-card border border-border rounded-md p-6"
            >
              {/* Honeypot: hidden from users, tempting to bots. */}
              <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
                <label htmlFor="honeypot">Leave this field empty</label>
                <Input id="honeypot" tabIndex={-1} autoComplete="off" {...register("honeypot")} />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Student's full name</Label>
                  <Input
                    id="fullName"
                    placeholder="Student's full name"
                    aria-invalid={Boolean(errors.fullName)}
                    {...register("fullName")}
                  />
                  <FieldError message={errors.fullName?.message} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    min={4}
                    max={100}
                    placeholder="12"
                    aria-invalid={Boolean(errors.age)}
                    {...register("age")}
                  />
                  <FieldError message={errors.age?.message} />
                </div>

                {isMinor && (
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="guardianName">Parent / guardian full name</Label>
                    <Input
                      id="guardianName"
                      placeholder="Full name of parent or guardian"
                      aria-invalid={Boolean(errors.guardianName)}
                      {...register("guardianName")}
                    />
                    <FieldError message={errors.guardianName?.message} />
                    <p className="text-xs text-muted-foreground">
                      Required because the applicant is under 18. We will call this number first.
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="phone">
                    {isMinor ? "Parent / guardian phone number" : "Applicant phone number"}
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    placeholder="0803 123 4567"
                    aria-invalid={Boolean(errors.phone)}
                    {...register("phone")}
                  />
                  <FieldError message={errors.phone?.message} />
                  {isMinor && (
                    <p className="text-xs text-muted-foreground">Primary contact for the placement call.</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email (optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    aria-invalid={Boolean(errors.email)}
                    {...register("email")}
                  />
                  <FieldError message={errors.email?.message} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">
                    {isMinor ? "Secondary / emergency contact number" : "Emergency contact number"}
                  </Label>
                  <Input
                    id="emergencyContact"
                    type="tel"
                    inputMode="tel"
                    placeholder="0805 987 6543"
                    aria-invalid={Boolean(errors.emergencyContact)}
                    {...register("emergencyContact")}
                  />
                  <FieldError message={errors.emergencyContact?.message} />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="program">Programme</Label>
                  <Controller
                    control={control}
                    name="program"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id="program" aria-invalid={Boolean(errors.program)}>
                          <SelectValue placeholder="Choose a programme" />
                        </SelectTrigger>
                        <SelectContent>
                          {programs.map((program) => (
                            <SelectItem key={program.id} value={program.slug}>
                              {program.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FieldError message={errors.program?.message} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Controller
                    control={control}
                    name="gender"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id="gender" aria-invalid={Boolean(errors.gender)}>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="male">Male</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FieldError message={errors.gender?.message} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Home address</Label>
                <Input
                  id="address"
                  placeholder="Street, area, town"
                  aria-invalid={Boolean(errors.address)}
                  {...register("address")}
                />
                <FieldError message={errors.address?.message} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="background">Previous Islamic education (optional)</Label>
                <Textarea
                  id="background"
                  rows={3}
                  maxLength={500}
                  placeholder="e.g. read up to Juz' Amma, two years of Arabic"
                  aria-invalid={Boolean(errors.background)}
                  {...register("background")}
                />
                <FieldError message={errors.background?.message} />
              </div>

              <Dialog>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <Controller
                      control={control}
                      name="agreedToTerms"
                      render={({ field }) => (
                        <Checkbox
                          id="agreedToTerms"
                          checked={field.value === true}
                          onCheckedChange={(checked) => field.onChange(checked === true)}
                          aria-label="Accept attendance and fee terms"
                          aria-invalid={Boolean(errors.agreedToTerms)}
                        />
                      )}
                    />
                    <p className="text-sm leading-snug">
                      I confirm the details above are correct and agree to the school's{" "}
                      <DialogTrigger asChild>
                        <button type="button" className="text-primary underline underline-offset-2 hover:no-underline">
                          attendance and fee terms
                        </button>
                      </DialogTrigger>
                      .
                    </p>
                  </div>
                  <FieldError message={errors.agreedToTerms?.message} />
                </div>

                <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="font-serif text-2xl">Attendance and fee terms</DialogTitle>
                    <DialogDescription>
                      Please read these before submitting your application.
                    </DialogDescription>
                  </DialogHeader>
                  <TermsContent />
                </DialogContent>
              </Dialog>

              {submitError && (
                <p className="text-sm text-destructive" role="alert">
                  {submitError} Please try again or call the school office.
                </p>
              )}

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                    Submitting…
                  </>
                ) : (
                  "Submit application"
                )}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                We will never ask for payment or documents at this stage.
              </p>
            </form>
          )}
        </div>

        <aside className="space-y-6">
          <div className="border border-border rounded-md p-6 bg-secondary/50">
            <h2 className="font-serif text-xl mb-3">Prefer to talk first?</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Call or email the school office, or visit us on any weekday. Office hours: {OFFICE_HOURS}.
            </p>
            <p className="text-sm">
              <a href={`tel:${SCHOOL_PHONE.replace(/\s/g, "")}`} className="text-primary hover:underline">
                {SCHOOL_PHONE}
              </a>
              <br />
              <a href={`mailto:${SCHOOL_EMAIL}`} className="text-primary hover:underline">
                {SCHOOL_EMAIL}
              </a>
            </p>
            <p className="text-xs text-muted-foreground mt-3">{SCHOOL_LOCATION}</p>
          </div>
          <div className="border border-border rounded-md p-6">
            <h2 className="font-serif text-xl mb-3">What happens next</h2>
            <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
              <li>We call within three working days.</li>
              <li>A short placement conversation sets your level.</li>
              <li>Pay the registration fee to confirm your seat.</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AdmissionPage;
