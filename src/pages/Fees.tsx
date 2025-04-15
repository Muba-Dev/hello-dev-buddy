
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Check, HelpCircle } from "lucide-react";

const FeesPage = () => {
  const feeStructure = [
    {
      id: 1,
      program: "Quran Memorization",
      monthly: 75,
      quarterly: 200,
      annual: 750,
      registration: 50
    },
    {
      id: 2,
      program: "Arabic Language Program",
      monthly: 80,
      quarterly: 220,
      annual: 800,
      registration: 50
    },
    {
      id: 3,
      program: "Islamic Studies Program",
      monthly: 85,
      quarterly: 230,
      annual: 850,
      registration: 50
    },
    {
      id: 4,
      program: "Full-time Madrasa Program",
      monthly: 150,
      quarterly: 400,
      annual: 1500,
      registration: 100
    },
    {
      id: 5,
      program: "Weekend Islamic School",
      monthly: 60,
      quarterly: 160,
      annual: 600,
      registration: 40
    }
  ];

  const paymentPlans = [
    {
      id: 1,
      name: "Basic",
      price: 75,
      period: "monthly",
      features: [
        "Access to one program",
        "Learning materials included",
        "Flexible schedule",
        "Monthly assessments"
      ]
    },
    {
      id: 2,
      name: "Standard",
      price: 200,
      period: "quarterly",
      features: [
        "Access to two programs",
        "Learning materials included",
        "Flexible schedule",
        "Monthly assessments",
        "One-on-one sessions"
      ],
      popular: true
    },
    {
      id: 3,
      name: "Premium",
      price: 850,
      period: "annual",
      features: [
        "Access to all programs",
        "All learning materials included",
        "Flexible schedule",
        "Monthly assessments",
        "Weekly one-on-one sessions",
        "Certificate upon completion"
      ]
    }
  ];

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">School Fees Structure</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our fee structure is designed to be affordable while ensuring quality education.
            We offer various payment plans to accommodate different needs.
          </p>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-6">Detailed Fee Structure</h2>
            <Card>
              <CardContent className="pt-6 px-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[200px]">Program</TableHead>
                        <TableHead className="text-right">Monthly</TableHead>
                        <TableHead className="text-right">Quarterly</TableHead>
                        <TableHead className="text-right">Annual</TableHead>
                        <TableHead className="text-right">Registration Fee</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {feeStructure.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.program}</TableCell>
                          <TableCell className="text-right">${item.monthly}</TableCell>
                          <TableCell className="text-right">${item.quarterly}</TableCell>
                          <TableCell className="text-right">${item.annual}</TableCell>
                          <TableCell className="text-right">${item.registration}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Payment Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {paymentPlans.map((plan) => (
                <Card 
                  key={plan.id} 
                  className={`${
                    plan.popular ? 'border-emerald-600 relative' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-emerald-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Popular Choice
                    </div>
                  )}
                  <CardHeader className={`${plan.popular ? 'pt-6' : ''}`}>
                    <CardTitle>{plan.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <span className="text-3xl font-bold">${plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Check size={18} className="text-emerald-600" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className={`w-full ${plan.popular ? 'bg-emerald-600 hover:bg-emerald-700' : ''}`}>
                      Select Plan
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>

          <section className="bg-emerald-50 p-8 rounded-xl">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-3/4">
                <h2 className="text-2xl font-semibold mb-4">Financial Assistance</h2>
                <p className="mb-4">
                  We believe that financial circumstances should not prevent anyone from seeking Islamic knowledge. 
                  Our center offers financial assistance and scholarships to deserving students.
                </p>
                <div className="flex items-center gap-3 text-emerald-700">
                  <HelpCircle size={20} />
                  <span>Contact our administration office for more information on scholarships and fee waivers.</span>
                </div>
              </div>
              <div className="w-full md:w-1/4 flex justify-center">
                <Button size="lg" variant="outline" className="border-emerald-700 text-emerald-700 hover:bg-emerald-700 hover:text-white">
                  Apply for Assistance
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
};

export default FeesPage;
