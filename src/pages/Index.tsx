import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { ArrowRight } from 'lucide-react';

const programs = [
  {
    number: '01.',
    title: 'Quran Studies',
    blurb: 'Advanced Tajweed, Hifdh, and profound Tafsir methodology.',
  },
  {
    number: '02.',
    title: 'Islamic Law (Fiqh)',
    blurb: 'Jurisprudence according to the established madhahib.',
  },
  {
    number: '03.',
    title: 'Hadith Sciences',
    blurb: 'Critical analysis and authentication of Prophetic traditions.',
  },
  {
    number: '04.',
    title: 'Arabic Language',
    blurb: 'Classical morphology, syntax, and literary eloquence.',
  },
];

const Index = () => {
  return (
    <MainLayout bleed>
      <div className="grid grid-cols-1 md:grid-cols-12">
        {/* Left column: mission + about */}
        <section className="md:col-span-7 md:border-r border-border flex flex-col">
          <div className="p-8 md:p-16 border-b border-border rise-in">
            <span className="eyebrow text-accent block mb-6">Our Mission</span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.9] italic mb-8">
              Walking the Path of the <span className="not-italic">Prophet Muhammad</span> (SAW)
            </h1>
            <p className="max-w-md text-lg leading-relaxed font-light text-muted-foreground">
              Preserving the sanctity of Islamic education through a rigorous, traditional
              curriculum designed for the modern seeker of truth.
            </p>
            <Link
              to="/courses"
              className="mt-10 group inline-flex items-center gap-4 text-sm uppercase tracking-widest font-semibold"
            >
              Explore our curriculum
              <span className="w-12 h-px bg-foreground transition-all duration-300 group-hover:w-20" />
            </Link>
          </div>

          <div className="p-8 md:p-12 bg-secondary/50 flex-grow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="font-display text-3xl mb-4">About Our Center</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Located at the heart of our community, Darul-Hudal Wal-Furquran serves as a
                  beacon of classical learning, bridging ancient wisdom with contemporary
                  application.
                </p>
                <Link
                  to="/sessions"
                  className="mt-6 inline-block text-xs uppercase tracking-widest underline underline-offset-8 decoration-accent hover:text-accent transition-colors"
                >
                  View session calendar
                </Link>
              </div>
              <div className="flex items-end justify-end">
                <div className="w-full aspect-[4/5] bg-primary/10 border border-border p-2">
                  <div className="w-full h-full bg-secondary flex items-center justify-center italic text-accent font-display text-xl">
                    Archive View
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right column: curriculum index */}
        <section className="md:col-span-5 flex flex-col border-t md:border-t-0 border-border">
          <div className="p-6 border-b border-border bg-primary text-primary-foreground">
            <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold font-sans">Curriculum Index</h2>
          </div>

          <div className="flex-grow">
            {programs.map((program, i) => (
              <Link
                key={program.title}
                to="/courses"
                className={`index-row ${i === programs.length - 1 ? 'border-b-0' : ''}`}
              >
                <span className="font-display text-xl italic text-accent mb-2 block">
                  {program.number}
                </span>
                <h3 className="text-2xl font-display uppercase tracking-tight transition-transform duration-300 group-hover:translate-x-2">
                  {program.title}
                </h3>
                <p className="text-xs mt-3 leading-relaxed text-muted-foreground">{program.blurb}</p>
              </Link>
            ))}
          </div>

          <div className="p-8 bg-secondary border-t border-border mt-auto">
            <p className="text-[11px] uppercase tracking-widest font-bold mb-4">Admissions Open</p>
            <div className="flex justify-between items-center gap-4">
              <span className="font-display text-2xl">Join the Cohort</span>
              <Link
                to="/enrollment"
                aria-label="Go to enrollment"
                className="w-12 h-12 rounded-full border border-primary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all shrink-0"
              >
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Index;
