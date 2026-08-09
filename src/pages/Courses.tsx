
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, BookOpen } from "lucide-react";

const CoursesPage = () => {
  const courses = [
    {
      id: 1,
      title: "Quran Memorization",
      description: "Memorize the Holy Quran with proper Tajweed under expert guidance.",
      level: "All Levels",
      duration: "1-3 years",
      students: "25 per class",
      image: "quran.jpg"
    },
    {
      id: 2,
      title: "Arabic Language",
      description: "Learn to read, write, and speak Arabic from basics to advanced levels.",
      level: "Beginner to Advanced",
      duration: "6 months per level",
      students: "20 per class",
      image: "arabic.jpg"
    },
    {
      id: 3,
      title: "Islamic Jurisprudence (Fiqh)",
      description: "Study the principles of Islamic law and their applications in daily life.",
      level: "Intermediate",
      duration: "1 year",
      students: "15 per class",
      image: "fiqh.jpg"
    },
    {
      id: 4,
      title: "Hadith Sciences",
      description: "Learn about the sayings and traditions of Prophet Muhammad (SAW).",
      level: "Intermediate to Advanced",
      duration: "1 year",
      students: "15 per class",
      image: "hadith.jpg"
    },
    {
      id: 5,
      title: "Islamic History",
      description: "Explore the rich history of Islam from its beginnings to modern times.",
      level: "All Levels",
      duration: "8 months",
      students: "30 per class",
      image: "history.jpg"
    },
    {
      id: 6,
      title: "Islamic Ethics (Akhlaq)",
      description: "Learn about moral values and character development in Islam.",
      level: "All Levels",
      duration: "6 months",
      students: "20 per class",
      image: "ethics.jpg"
    }
  ];

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Our Islamic Courses</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our comprehensive Islamic education programs designed to nurture spiritual 
            growth and deepen your understanding of Islam.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {courses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-emerald-100 flex items-center justify-center">
                <BookOpen className="h-16 w-16 text-emerald-700" />
              </div>
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Users size={14} /> {course.students}
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Clock size={14} /> {course.duration}
                  </Badge>
                  <Badge variant="outline">{course.level}</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-emerald-700 hover:bg-emerald-800">Learn More</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default CoursesPage;
