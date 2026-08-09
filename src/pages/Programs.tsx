import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { programs } from '@/data/school';

const ProgramsPage = () => (
  <MainLayout>
    <div className="container py-16 max-w-6xl">
      <p className="eyebrow mb-3">Programs</p>
      <h1 className="text-4xl md:text-5xl mb-4 max-w-3xl">
        Every programme, with its duration, level, schedule and fee
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mb-12">
        Pick the one that matches your level and the hours you can attend. Not sure? Apply and a
        teacher will place you.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {programs.map((p) => (
          <Card key={p.id} className="h-full">
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="secondary">{p.level}</Badge>
                <Badge variant="outline">{p.classSize}</Badge>
              </div>
              <h2 className="font-serif text-2xl mb-2">{p.title}</h2>
              <p className="text-muted-foreground mb-5">{p.summary}</p>

              <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm border-t border-border pt-4 mb-5">
                <div>
                  <dt className="text-muted-foreground">Duration</dt>
                  <dd className="font-medium">{p.duration}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Schedule</dt>
                  <dd className="font-medium">{p.schedule}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Monthly fee</dt>
                  <dd className="font-medium">${p.monthlyFee}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Registration</dt>
                  <dd className="font-medium">${p.registrationFee} once</dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-muted-foreground">Who it's for</dt>
                  <dd className="font-medium">{p.forWho}</dd>
                </div>
              </dl>

              <h3 className="text-sm font-semibold uppercase tracking-wider mb-2">
                What you'll gain
              </h3>
              <ul className="space-y-1.5 mb-6">
                {p.outcomes.map((o) => (
                  <li key={o} className="flex gap-2 text-sm text-muted-foreground">
                    <Check size={16} className="text-primary mt-0.5 shrink-0" aria-hidden="true" />
                    {o}
                  </li>
                ))}
              </ul>

              <Button className="w-full" asChild>
                <Link to={`/admission?program=${encodeURIComponent(p.title)}`}>
                  Apply for this programme
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </MainLayout>
);

export default ProgramsPage;
