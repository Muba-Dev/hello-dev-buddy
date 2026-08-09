import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Check } from 'lucide-react';
import campus from '@/assets/campus.jpg';
import quranStudy from '@/assets/quran-study.jpg';
import {
  SCHOOL_NAME,
  FOUNDED_YEAR,
  facts,
  programs,
  testimonials,
  recognitions,
  enrollmentSteps,
} from '@/data/school';

const Index = () => {
  return (
    <MainLayout>
      {/* Hero */}
      <section className="relative">
        <img
          src={campus}
          alt="Sandstone courtyard of the school with arched colonnade and carved screens"
          className="absolute inset-0 w-full h-full object-cover"
          width={1408}
          height={912}
        />
        <div className="absolute inset-0 bg-foreground/65" aria-hidden="true" />
        <div className="container relative py-24 md:py-32">
          <div className="max-w-2xl text-background">
            <p className="eyebrow text-background/70 mb-4">Osogbo, Osun State · Since {FOUNDED_YEAR}</p>
            <h1 className="text-4xl md:text-6xl leading-[1.05] mb-6">
              Learn the Qur'an and Arabic with teachers who know your name
            </h1>
            <p className="text-lg text-background/85 mb-8 max-w-xl">
              Structured Hifz, Arabic and Islamic studies programmes for children, teens and
              adults — small classes, fixed timetables, and fees you can plan for.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link to="/admission">Start your application</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-background border-background/60 hover:bg-background hover:text-foreground"
                asChild
              >
                <Link to="/programs">See programmes &amp; fees</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Facts */}
      <section className="border-b border-border bg-secondary/60">
        <div className="container grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {facts.map((f) => (
            <div key={f.label} className="py-8 px-4 text-center">
              <div className="font-serif text-3xl md:text-4xl">{f.value}</div>
              <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground mt-1">
                {f.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="container py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="eyebrow mb-3">About the school</p>
            <h2 className="text-3xl md:text-4xl mb-5">
              A madrasa in Itaolokan, teaching without shortcuts since {FOUNDED_YEAR}
            </h2>
            <p className="text-muted-foreground mb-4">
              {SCHOOL_NAME} teaches Qur'an memorisation, Arabic language and the core Islamic
              sciences. Every student is placed by level, revised daily, and assessed each month.
            </p>
            <p className="text-muted-foreground mb-6">
              Classes run morning, afternoon, evening and weekends, so working adults and
              school-age children can both attend.
            </p>
            <Button variant="outline" asChild>
              <Link to="/about">
                More about us <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
          <img
            src={quranStudy}
            alt="Open Qur'an on a carved wooden rehal stand beside prayer beads"
            className="rounded-md w-full h-auto"
            loading="lazy"
            width={1200}
            height={800}
          />
        </div>
      </section>

      {/* Programmes */}
      <section className="bg-secondary/50 border-y border-border py-20">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <p className="eyebrow mb-3">Programmes</p>
              <h2 className="text-3xl md:text-4xl">Six programmes, one clear path</h2>
            </div>
            <Button variant="outline" asChild>
              <Link to="/programs">View full details</Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.slice(0, 6).map((p) => (
              <Card key={p.id} className="h-full">
                <CardContent className="pt-6">
                  <h3 className="font-serif text-xl mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{p.summary}</p>
                  <dl className="text-sm space-y-1.5 text-muted-foreground">
                    <div className="flex justify-between gap-4">
                      <dt>Level</dt>
                      <dd className="text-foreground text-right">{p.level}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt>Duration</dt>
                      <dd className="text-foreground text-right">{p.duration}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt>Schedule</dt>
                      <dd className="text-foreground text-right">{p.schedule}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt>From</dt>
                      <dd className="text-foreground text-right">${p.monthlyFee}/month</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enrollment steps */}
      <section className="container py-20">
        <p className="eyebrow mb-3">Admission</p>
        <h2 className="text-3xl md:text-4xl mb-10">Enrolling takes five steps</h2>
        <ol className="grid md:grid-cols-5 gap-6">
          {enrollmentSteps.map((s) => (
            <li key={s.step} className="border-t-2 border-accent pt-4">
              <div className="font-serif text-2xl text-primary mb-1">0{s.step}</div>
              <h3 className="font-medium mb-1.5 text-base">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.detail}</p>
            </li>
          ))}
        </ol>
        <Button size="lg" className="mt-10" asChild>
          <Link to="/admission">Apply now — it takes 5 minutes</Link>
        </Button>
      </section>

      {/* Recognition */}
      <section className="bg-secondary/50 border-y border-border py-16">
        <div className="container">
          <p className="eyebrow mb-3">Recognition</p>
          <h2 className="text-3xl mb-8">Registered and affiliated</h2>
          <ul className="grid md:grid-cols-3 gap-6">
            {recognitions.map((r) => (
              <li key={r.title} className="flex gap-3">
                <Check size={18} className="text-primary mt-1 shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="font-medium text-base">{r.title}</h3>
                  <p className="text-sm text-muted-foreground">{r.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container py-20">
        <p className="eyebrow mb-3">Student results</p>
        <h2 className="text-3xl md:text-4xl mb-10">What families say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <figure key={t.quote} className="bg-card border border-border rounded-md p-6">
              <blockquote className="font-serif text-lg leading-snug mb-4">“{t.quote}”</blockquote>
              <figcaption className="text-sm text-muted-foreground">
                {t.author} · {t.program}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-foreground text-background">
        <div className="container py-16 text-center">
          <h2 className="text-3xl md:text-4xl mb-4">Admissions are open all year</h2>
          <p className="max-w-xl mx-auto mb-8 text-background/80">
            Send the form today and a teacher will call you within three working days to confirm
            your child's level and start date.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/admission">Apply now</Link>
          </Button>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
