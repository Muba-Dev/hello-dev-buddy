
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, CalendarDays, Users, FileText } from "lucide-react";

const Index = () => {
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16 text-center relative py-16 px-4 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-900 text-white">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">
              Darul-Hudal Wal-Furquran Islamic Center
            </h1>
            <p className="text-xl mb-8">
              Follow the path of our beloved Prophet Muhammad (SAW) through comprehensive 
              Islamic education focused on Quran, Hadith, Fiqh, and Islamic values.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-emerald-800 hover:bg-emerald-100" asChild>
                <Link to="/courses">
                  Explore Courses
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-800" asChild>
                <Link to="/enrollment">
                  Enroll Now
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-emerald-800">Our Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="mb-4 mx-auto w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center">
                  <BookOpen size={30} />
                </div>
                <h3 className="text-xl font-medium mb-2">Quran Studies</h3>
                <p className="text-muted-foreground">
                  Learn Quran recitation with proper Tajweed and memorization classes.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="mb-4 mx-auto w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center">
                  <Users size={30} />
                </div>
                <h3 className="text-xl font-medium mb-2">Islamic Law (Fiqh)</h3>
                <p className="text-muted-foreground">
                  Study Islamic jurisprudence and the legal framework of Islam.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="mb-4 mx-auto w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center">
                  <CalendarDays size={30} />
                </div>
                <h3 className="text-xl font-medium mb-2">Hadith Sciences</h3>
                <p className="text-muted-foreground">
                  Learn the traditions and sayings of Prophet Muhammad (SAW).
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="mb-4 mx-auto w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center">
                  <FileText size={30} />
                </div>
                <h3 className="text-xl font-medium mb-2">Arabic Language</h3>
                <p className="text-muted-foreground">
                  Master the language of the Quran to understand its deeper meanings.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* About Section */}
        <section className="mb-16">
          <div className="bg-emerald-50 rounded-xl p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-bold mb-4 text-emerald-800">About Our Center</h2>
                <p className="mb-4">
                  Darul-Hudal Wal-Furquran is dedicated to providing quality Islamic education 
                  that nurtures both spiritual growth and academic excellence.
                </p>
                <p className="mb-6">
                  Our mission is to guide students on the path of Prophet Muhammad (SAW) 
                  by teaching authentic Islamic knowledge with modern educational methods.
                </p>
                <Button variant="outline" className="border-emerald-800 text-emerald-800 hover:bg-emerald-800 hover:text-white" asChild>
                  <Link to="/courses">Learn More</Link>
                </Button>
              </div>
              <div className="w-full md:w-1/2 bg-emerald-200 h-64 rounded-lg flex items-center justify-center">
                <span className="text-emerald-800 font-medium">Islamic Center Image</span>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mb-16 text-center bg-emerald-800 text-white p-10 rounded-xl">
          <h2 className="text-3xl font-bold mb-4">Join Our Islamic Community</h2>
          <p className="max-w-2xl mx-auto mb-6">
            Enroll today to embark on a journey of Islamic knowledge and spiritual growth.
            Our doors are open to all who seek to learn and grow in their faith.
          </p>
          <Button size="lg" className="bg-white text-emerald-800 hover:bg-emerald-100" asChild>
            <Link to="/enrollment">Enroll Now</Link>
          </Button>
        </section>
      </div>
    </MainLayout>
  );
};

export default Index;
