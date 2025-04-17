import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Enrollment Page
 * 
 * Provides a comprehensive enrollment form for students wanting to join the Islamic center.
 * The form includes:
 * - Personal information collection
 * - Program selection
 * - Previous education details
 * - Emergency contact information
 * - Terms and conditions acceptance
 * 
 * Uses React Hook Form with Zod validation for form handling.
 */

// Define the enrollment form schema with validation rules
const formSchema = z.object({
  fullName: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  age: z.string().refine((val) => !isNaN(parseInt(val)), {
    message: "Please enter a valid age.",
  }),
  gender: z.string().min(1, {
    message: "Please select your gender.",
  }),
  address: z.string().min(5, {
    message: "Please enter your complete address.",
  }),
  program: z.string().min(1, {
    message: "Please select a program.",
  }),
  previousEducation: z.string().optional(),
  emergencyContact: z.string().min(10, {
    message: "Please provide an emergency contact number.",
  }),
  termsAccepted: z.string().refine((val) => val === "true", {
    errorMap: () => ({ message: "You must accept the terms and conditions." }),
  }),
});

const EnrollmentPage = () => {
  // Initialize form with React Hook Form and Zod validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      age: "",
      gender: "",
      address: "",
      program: "",
      previousEducation: "",
      emergencyContact: "",
      termsAccepted: false,
    },
  });

  // Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Enrollment submitted",
      description: "Your enrollment form has been submitted successfully. We will contact you soon.",
    });
    form.reset();
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Enrollment Form</h1>
          <p className="text-muted-foreground">
            Complete the form below to enroll in our Islamic education programs.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Student Information</CardTitle>
            <CardDescription>
              Please provide accurate information to process your enrollment.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Information Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Muhammad Abdullah" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="username@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (234) 567-8901" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                
                  <FormField
                    control={form.control}
                    name="program"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Program</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a program" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="quran_memorization">Quran Memorization</SelectItem>
                            <SelectItem value="arabic_language">Arabic Language</SelectItem>
                            <SelectItem value="islamic_studies">Islamic Studies</SelectItem>
                            <SelectItem value="fiqh">Islamic Jurisprudence (Fiqh)</SelectItem>
                            <SelectItem value="hadith">Hadith Sciences</SelectItem>
                            <SelectItem value="fulltime_madrasa">Full-time Madrasa</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Address Section */}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Your full address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Previous Education Section */}
                <FormField
                  control={form.control}
                  name="previousEducation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Previous Islamic Education (if any)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe any previous Islamic education" {...field} />
                      </FormControl>
                      <FormDescription>This helps us place you in the appropriate level</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Emergency Contact Section */}
                <FormField
                  control={form.control}
                  name="emergencyContact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Emergency Contact</FormLabel>
                      <FormControl>
                        <Input placeholder="Contact name and number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Terms and Conditions Section */}
                <FormField
                  control={form.control}
                  name="termsAccepted"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) => field.onChange(checked === true)}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I agree to the terms and conditions
                        </FormLabel>
                        <FormDescription>
                          I understand and agree to abide by the rules and regulations of the Islamic center.
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-800">
                  Submit Enrollment
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <p className="text-sm text-muted-foreground">
              Need help? Contact our admin office at <span className="font-medium">info@darulhudal.com</span>
            </p>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default EnrollmentPage;
