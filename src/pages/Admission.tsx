import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { CheckCircle2 } from 'lucide-react';
import { programs, enrollmentSteps, SCHOOL_PHONE, SCHOOL_EMAIL } from '@/data/school';

const AdmissionPage = () => {
  const [params] = useSearchParams();
  const [program, setProgram] = useState(params.get('program') ?? '');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!program) {
      toast({ title: 'Choose a programme', description: 'Select the programme you want to join.' });
      return;
    }
    setSubmitted(true);
    toast({
      title: 'Application received',
      description: 'A teacher will call you within three working days.',
    });
  };

  return (
    <MainLayout>
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
          {enrollmentSteps.map((s) => (
            <li key={s.step} className="border-t-2 border-accent pt-4">
              <div className="font-serif text-2xl text-primary mb-1">0{s.step}</div>
              <h2 className="font-medium text-base mb-1.5">{s.title}</h2>
              <p className="text-sm text-muted-foreground">{s.detail}</p>
            </li>
          ))}
        </ol>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h2 className="text-3xl mb-6">Admission form</h2>

            {submitted ? (
              <div className="border border-border rounded-md bg-card p-8 text-center">
                <CheckCircle2 className="mx-auto mb-4 text-primary" size={40} aria-hidden="true" />
                <h3 className="font-serif text-2xl mb-2">Application received</h3>
                <p className="text-muted-foreground mb-6">
                  Thank you. A teacher will call within three working days to confirm placement.
                </p>
                <Button variant="outline" onClick={() => setSubmitted(false)}>
                  Submit another application
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 bg-card border border-border rounded-md p-6">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full name</Label>
                    <Input id="fullName" name="fullName" required minLength={3} placeholder="Student's full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" name="age" type="number" min={4} max={99} required placeholder="12" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone number</Label>
                    <Input id="phone" name="phone" type="tel" required placeholder="0803 000 0000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email (optional)</Label>
                    <Input id="email" name="email" type="email" placeholder="you@example.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="program">Programme</Label>
                  <Select value={program} onValueChange={setProgram}>
                    <SelectTrigger id="program">
                      <SelectValue placeholder="Choose a programme" />
                    </SelectTrigger>
                    <SelectContent>
                      {programs.map((p) => (
                        <SelectItem key={p.id} value={p.title}>
                          {p.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Home address</Label>
                  <Input id="address" name="address" required placeholder="Street, area, town" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="background">Previous Islamic education (optional)</Label>
                  <Textarea
                    id="background"
                    name="background"
                    rows={3}
                    placeholder="e.g. read up to Juz' Amma, two years of Arabic"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms" className="text-sm font-normal leading-snug">
                    I confirm the details above are correct and agree to the school's attendance
                    and fee terms.
                  </Label>
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Submit application
                </Button>
              </form>
            )}
          </div>

          <aside className="space-y-6">
            <div className="border border-border rounded-md p-6 bg-secondary/50">
              <h2 className="font-serif text-xl mb-3">Prefer to talk first?</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Call or email the school office, or visit us on any weekday between 9:00 AM and
                4:00 PM.
              </p>
              <p className="text-sm">
                <a href={`tel:${SCHOOL_PHONE.replace(/\s/g, '')}`} className="text-primary hover:underline">
                  {SCHOOL_PHONE}
                </a>
                <br />
                <a href={`mailto:${SCHOOL_EMAIL}`} className="text-primary hover:underline">
                  {SCHOOL_EMAIL}
                </a>
              </p>
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
    </MainLayout>
  );
};

export default AdmissionPage;
