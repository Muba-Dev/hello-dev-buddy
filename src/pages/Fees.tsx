import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { programs } from '@/data/school';

const FeesPage = () => (
  <MainLayout>
    <div className="container py-16 max-w-5xl">
      <p className="eyebrow mb-3">Fees</p>
      <h1 className="text-4xl md:text-5xl mb-4">Fees, in full, with no surprises</h1>
      <p className="text-lg text-muted-foreground mb-10 max-w-2xl">
        A one-off registration fee per programme, then monthly tuition. Quarterly and annual
        payment plans cost less overall — ask the office for current rates.
      </p>

      <div className="border border-border rounded-md overflow-x-auto bg-card mb-10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Programme</TableHead>
              <TableHead>Level</TableHead>
              <TableHead className="text-right">Registration</TableHead>
              <TableHead className="text-right">Monthly</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {programs.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.title}</TableCell>
                <TableCell className="text-muted-foreground">{p.level}</TableCell>
                <TableCell className="text-right">${p.registrationFee}</TableCell>
                <TableCell className="text-right">${p.monthlyFee}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="grid sm:grid-cols-3 gap-6 mb-10">
        {[
          { title: 'Monthly', detail: 'Pay at the start of each month. Most flexible.' },
          { title: 'Quarterly', detail: 'Pay for three months at once and save.' },
          { title: 'Annual', detail: 'Best value, includes all learning materials.' },
        ].map((plan) => (
          <div key={plan.title} className="border-t-2 border-accent pt-4">
            <h2 className="font-serif text-xl mb-1">{plan.title}</h2>
            <p className="text-sm text-muted-foreground">{plan.detail}</p>
          </div>
        ))}
      </div>

      <p className="text-sm text-muted-foreground mb-8">
        Support is available for families who need it. Speak to the office before applying.
      </p>

      <Button size="lg" asChild>
        <Link to="/admission">Apply now</Link>
      </Button>
    </div>
  </MainLayout>
);

export default FeesPage;
