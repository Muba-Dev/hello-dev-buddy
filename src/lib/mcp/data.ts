/**
 * Public reference data for Darul-Huda Wal-Furquran, exposed over MCP.
 * This mirrors the publicly visible content of the website.
 */

export const courses = [
  { id: 1, title: "Quran Memorization", description: "Memorize the Holy Quran with proper Tajweed under expert guidance.", level: "All Levels", duration: "1-3 years", classSize: "25 per class" },
  { id: 2, title: "Arabic Language", description: "Learn to read, write, and speak Arabic from basics to advanced levels.", level: "Beginner to Advanced", duration: "6 months per level", classSize: "20 per class" },
  { id: 3, title: "Islamic Jurisprudence (Fiqh)", description: "Study the principles of Islamic law and their applications in daily life.", level: "Intermediate", duration: "1 year", classSize: "15 per class" },
  { id: 4, title: "Hadith Sciences", description: "Learn about the sayings and traditions of Prophet Muhammad (SAW).", level: "Intermediate to Advanced", duration: "1 year", classSize: "15 per class" },
  { id: 5, title: "Islamic History", description: "Explore the rich history of Islam from its beginnings to modern times.", level: "All Levels", duration: "8 months", classSize: "30 per class" },
  { id: 6, title: "Islamic Ethics (Akhlaq)", description: "Learn about moral values and character development in Islam.", level: "All Levels", duration: "6 months", classSize: "20 per class" },
] as const;

export const sessions = [
  { id: 1, title: "Morning Quran Class", days: "Monday to Friday", time: "6:00 AM - 8:00 AM", location: "Main Hall", teacher: "Sheikh Abdullah", type: "Regular" },
  { id: 2, title: "Afternoon Fiqh Studies", days: "Monday, Wednesday, Friday", time: "2:00 PM - 4:00 PM", location: "Room 102", teacher: "Ustadh Ibrahim", type: "Regular" },
  { id: 3, title: "Evening Arabic Classes", days: "Tuesday and Thursday", time: "6:00 PM - 8:00 PM", location: "Room 103", teacher: "Ustadha Aisha", type: "Regular" },
  { id: 4, title: "Weekend Hadith Session", days: "Saturday", time: "10:00 AM - 12:00 PM", location: "Main Hall", teacher: "Sheikh Yusuf", type: "Weekly" },
  { id: 5, title: "Islamic History Lecture", days: "Sunday", time: "11:00 AM - 1:00 PM", location: "Lecture Hall", teacher: "Dr. Muhammad Ali", type: "Weekly" },
  { id: 6, title: "Evening Tafsir Class", days: "Monday and Thursday", time: "8:00 PM - 9:30 PM", location: "Main Hall", teacher: "Sheikh Ahmad", type: "Regular" },
  { id: 7, title: "Women's Study Circle", days: "Wednesday", time: "10:00 AM - 12:00 PM", location: "Room 105", teacher: "Ustadha Fatima", type: "Weekly" },
  { id: 8, title: "Children's Quran Class", days: "Saturday and Sunday", time: "9:00 AM - 11:00 AM", location: "Children's Center", teacher: "Ustadh Hamza", type: "Weekend" },
] as const;

export const feeStructure = [
  { id: 1, program: "Quran Memorization", monthly: 75, quarterly: 200, annual: 750, registration: 50 },
  { id: 2, program: "Arabic Language Program", monthly: 80, quarterly: 220, annual: 800, registration: 50 },
  { id: 3, program: "Islamic Studies Program", monthly: 85, quarterly: 230, annual: 850, registration: 50 },
  { id: 4, program: "Full-time Madrasa Program", monthly: 150, quarterly: 400, annual: 1500, registration: 100 },
  { id: 5, program: "Weekend Islamic School", monthly: 60, quarterly: 160, annual: 600, registration: 40 },
] as const;

export const paymentPlans = [
  { id: 1, name: "Basic", price: 75, period: "monthly", features: ["Access to one program", "Learning materials included", "Flexible schedule", "Monthly assessments"] },
  { id: 2, name: "Standard", price: 200, period: "quarterly", popular: true, features: ["Access to two programs", "Learning materials included", "Flexible schedule", "Monthly assessments", "One-on-one sessions"] },
  { id: 3, name: "Premium", price: 850, period: "annual", features: ["Access to all programs", "All learning materials included", "Flexible schedule", "Monthly assessments", "Weekly one-on-one sessions", "Certificate upon completion"] },
] as const;

export const enrollmentInfo = {
  page: "/admission",
  requiredFields: [
    "Full name (min. 3 characters)",
    "Email address",
    "Phone number (min. 10 digits)",
    "Age",
    "Gender",
    "Home address",
    "Program selection",
    "Emergency contact number",
    "Acceptance of terms and conditions",
  ],
  optionalFields: ["Previous Islamic education"],
  notes: "Enrollment is submitted through the enrollment form on the website. A registration fee applies per program.",
} as const;
