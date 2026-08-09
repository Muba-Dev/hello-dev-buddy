import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { faqs } from '@/data/school';

const FaqPage = () => (
  <MainLayout>
    <div className="container py-16 max-w-3xl">
      <p className="eyebrow mb-3">FAQ</p>
      <h1 className="text-4xl md:text-5xl mb-4">Questions parents and students ask</h1>
      <p className="text-lg text-muted-foreground mb-10">
        If your question isn't here, call the office or send the admission form and ask in the
        notes.
      </p>

      <Accordion type="single" collapsible className="mb-12">
        {faqs.map((f, i) => (
          <AccordionItem key={f.q} value={`item-${i}`}>
            <AccordionTrigger className="text-left text-base">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Button size="lg" asChild>
        <Link to="/admission">Apply now</Link>
      </Button>
    </div>
  </MainLayout>
);

export default FaqPage;
