import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import campus from '@/assets/campus.jpg';
import classroom from '@/assets/classroom.jpg';
import quranStudy from '@/assets/quran-study.jpg';
import pattern from '@/assets/pattern.jpg';

const images = [
  { src: campus, alt: 'School courtyard with sandstone arches and carved screens', w: 1408, h: 912 },
  { src: classroom, alt: 'Classroom with wooden desks, mats and arched windows', w: 1200, h: 800 },
  { src: quranStudy, alt: "Open Qur'an on a carved wooden rehal stand", w: 1200, h: 800 },
  { src: pattern, alt: 'Carved arabesque lattice screen catching afternoon light', w: 1200, h: 700 },
];

const GalleryPage = () => (
  <MainLayout>
    <div className="container py-16 max-w-5xl">
      <p className="eyebrow mb-3">Gallery</p>
      <h1 className="text-4xl md:text-5xl mb-4">Inside the school</h1>
      <p className="text-lg text-muted-foreground mb-10 max-w-2xl">
        Our courtyard, classrooms and study spaces in Itaolokan, Osogbo.
      </p>
      <div className="grid sm:grid-cols-2 gap-6">
        {images.map((img) => (
          <figure key={img.alt} className="overflow-hidden rounded-md border border-border">
            <img
              src={img.src}
              alt={img.alt}
              width={img.w}
              height={img.h}
              loading="lazy"
              className="w-full h-64 object-cover"
            />
            <figcaption className="p-3 text-sm text-muted-foreground">{img.alt}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  </MainLayout>
);

export default GalleryPage;
