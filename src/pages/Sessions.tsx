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
import { sessions } from '@/lib/mcp/data';

const SessionsPage = () => (
  <MainLayout>
    <div className="container py-16 max-w-5xl">
      <p className="eyebrow mb-3">Timetable</p>
      <h1 className="text-4xl md:text-5xl mb-4">Weekly class schedule</h1>
      <p className="text-lg text-muted-foreground mb-10 max-w-2xl">
        Morning, afternoon, evening and weekend sessions, so school-age children and working
        adults can both attend.
      </p>

      <div className="border border-border rounded-md overflow-x-auto bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Class</TableHead>
              <TableHead>Days</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Teacher</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-medium">{s.title}</TableCell>
                <TableCell className="text-muted-foreground">{s.days}</TableCell>
                <TableCell className="text-muted-foreground whitespace-nowrap">{s.time}</TableCell>
                <TableCell className="text-muted-foreground">{s.location}</TableCell>
                <TableCell className="text-muted-foreground">{s.teacher}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Button size="lg" className="mt-10" asChild>
        <Link to="/admission">Apply for a class</Link>
      </Button>
    </div>
  </MainLayout>
);

export default SessionsPage;
