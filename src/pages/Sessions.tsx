
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, MapPin } from "lucide-react";

const SessionsPage = () => {
  const sessions = [
    {
      id: 1,
      title: "Morning Quran Class",
      days: "Monday to Friday",
      time: "6:00 AM - 8:00 AM",
      location: "Main Hall",
      teacher: "Sheikh Abdullah",
      type: "Regular"
    },
    {
      id: 2,
      title: "Afternoon Fiqh Studies",
      days: "Monday, Wednesday, Friday",
      time: "2:00 PM - 4:00 PM",
      location: "Room 102",
      teacher: "Ustadh Ibrahim",
      type: "Regular"
    },
    {
      id: 3,
      title: "Evening Arabic Classes",
      days: "Tuesday and Thursday",
      time: "6:00 PM - 8:00 PM",
      location: "Room 103",
      teacher: "Ustadha Aisha",
      type: "Regular"
    },
    {
      id: 4,
      title: "Weekend Hadith Session",
      days: "Saturday",
      time: "10:00 AM - 12:00 PM",
      location: "Main Hall",
      teacher: "Sheikh Yusuf",
      type: "Weekly"
    },
    {
      id: 5,
      title: "Islamic History Lecture",
      days: "Sunday",
      time: "11:00 AM - 1:00 PM",
      location: "Lecture Hall",
      teacher: "Dr. Muhammad Ali",
      type: "Weekly"
    },
    {
      id: 6,
      title: "Evening Tafsir Class",
      days: "Monday and Thursday",
      time: "8:00 PM - 9:30 PM",
      location: "Main Hall",
      teacher: "Sheikh Ahmad",
      type: "Regular"
    },
    {
      id: 7,
      title: "Women's Study Circle",
      days: "Wednesday",
      time: "10:00 AM - 12:00 PM",
      location: "Room 105",
      teacher: "Ustadha Fatima",
      type: "Weekly"
    },
    {
      id: 8,
      title: "Children's Quran Class",
      days: "Saturday and Sunday",
      time: "9:00 AM - 11:00 AM",
      location: "Children's Center",
      teacher: "Ustadh Hamza",
      type: "Weekend"
    }
  ];

  // Group sessions by their schedule type
  const regularSessions = sessions.filter(session => session.type === "Regular");
  const weeklySessions = sessions.filter(session => session.type === "Weekly");
  const weekendSessions = sessions.filter(session => session.type === "Weekend");

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Class Sessions</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            View our scheduled classes and sessions for Islamic studies. All times are subject to change during Ramadan and other Islamic holidays.
          </p>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <CalendarDays className="text-accent" />
              <span>Regular Sessions (Weekdays)</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {regularSessions.map((session) => (
                <SessionCard key={session.id} session={session} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <CalendarDays className="text-accent" />
              <span>Weekly Special Sessions</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {weeklySessions.map((session) => (
                <SessionCard key={session.id} session={session} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <CalendarDays className="text-accent" />
              <span>Weekend Sessions</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {weekendSessions.map((session) => (
                <SessionCard key={session.id} session={session} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
};

interface SessionProps {
  session: {
    id: number;
    title: string;
    days: string;
    time: string;
    location: string;
    teacher: string;
    type: string;
  };
}

const SessionCard: React.FC<SessionProps> = ({ session }) => {
  return (
    <Card className="border-l-4 border-l-accent">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{session.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <CalendarDays size={18} className="text-accent" />
            <span>{session.days}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-accent" />
            <span>{session.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-accent" />
            <span>{session.location}</span>
          </div>
          <div className="pt-2">
            <Badge className="bg-secondary text-primary hover:bg-emerald-200">
              {session.teacher}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SessionsPage;
