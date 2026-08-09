import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import classroom from '@/assets/classroom.jpg';
import {
  SCHOOL_NAME,
  SCHOOL_LOCATION,
  FOUNDED_YEAR,
  facts,
  teachers,
  recognitions,
} from '@/data/school';

const AboutPage = () => (
  <MainLayout>
    <div className="container py-16 max-w-5xl">
      <p className="eyebrow mb-3">About</p>
      <h1 className="text-4xl md:text-5xl mb-6 max-w-3xl">
        {SCHOOL_NAME} — Arabic and Islamic studies in Osogbo
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mb-10">
        Founded in {FOUNDED_YEAR} in {SCHOOL_LOCATION}, the school teaches Qur'an memorisation,
        Arabic and the Islamic sciences to children, teens and adults.
      </p>

      <img
        src={classroom}
        alt="Traditional madrasa classroom with wooden desks and arched windows"
        className="rounded-md w-full h-auto mb-14"
        loading="lazy"
        width={1200}
        height={800}
      />

      <div className="grid sm:grid-cols-4 gap-6 mb-16">
        {facts.map((f) => (
          <div key={f.label} className="border-t-2 border-accent pt-3">
            <div className="font-serif text-3xl">{f.value}</div>
            <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{f.label}</div>
          </div>
        ))}
      </div>

      <section className="grid md:grid-cols-2 gap-10 mb-16">
        <div>
          <h2 className="text-2xl mb-3">Our mission</h2>
          <p className="text-muted-foreground">
            Teach authentic Islamic knowledge clearly, at a pace each student can keep, and build
            character alongside memorisation.
          </p>
        </div>
        <div>
          <h2 className="text-2xl mb-3">How we teach</h2>
          <p className="text-muted-foreground">
            Students are placed by level, not age. Every class has a fixed timetable, daily
            revision, and a monthly assessment shared with parents.
          </p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl mb-6">Recognition and affiliation</h2>
        <ul className="grid md:grid-cols-3 gap-6">
          {recognitions.map((r) => (
            <li key={r.title} className="border border-border rounded-md p-5 bg-card">
              <h3 className="font-medium text-base mb-1">{r.title}</h3>
              <p className="text-sm text-muted-foreground">{r.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl mb-6">Our teachers</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers.map((t) => (
            <Card key={t.name}>
              <CardContent className="pt-6">
                <div
                  className="w-12 h-12 rounded-full bg-secondary text-primary font-serif text-xl flex items-center justify-center mb-4"
                  aria-hidden="true"
                >
                  {t.name.split(' ')[1]?.[0] ?? t.name[0]}
                </div>
                <h3 className="font-serif text-xl">{t.name}</h3>
                <p className="text-sm text-primary mb-2">{t.role}</p>
                <p className="text-sm text-muted-foreground mb-3">{t.bio}</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  {t.focus} · {t.years} years teaching
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <div className="border-t border-border pt-10">
        <h2 className="text-2xl mb-4">Ready to join?</h2>
        <Button size="lg" asChild>
          <Link to="/admission">Start your application</Link>
        </Button>
      </div>
    </div>
  </MainLayout>
);

export default AboutPage;
