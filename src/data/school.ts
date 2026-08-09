/**
 * Central content source for the school website.
 *
 * NOTE FOR THE SCHOOL: the founding date, staff list, recognition and
 * testimonials below are PLACEHOLDERS written to show the layout.
 * Replace every value in this file with your real details before publishing.
 */

export const SCHOOL_NAME = "Darul-Huda Wal-Furquran";
export const SCHOOL_FULL_NAME =
  "Darul-Huda Wal-Furquran School of Arabic and Islamic Studies";
export const SCHOOL_LOCATION = "Itaolokan Area, Osogbo, Osun State, Nigeria";
export const SCHOOL_PHONE = "+234 800 000 0000";
export const SCHOOL_EMAIL = "info@darulhuda.ng";
export const FOUNDED_YEAR = 1998;

export const facts = [
  { label: "Founded", value: `${FOUNDED_YEAR}` },
  { label: "Students enrolled", value: "400+" },
  { label: "Teachers", value: "18" },
  { label: "Huffaz graduated", value: "120+" },
];

export const recognitions = [
  {
    title: "Osun State Ministry of Education",
    detail: "Registered as a private Arabic and Islamic studies institution.",
  },
  {
    title: "League of Imams and Alfas, Osun State",
    detail: "Affiliated member school for Qur'anic and Arabic instruction.",
  },
  {
    title: "National Board for Arabic and Islamic Studies",
    detail: "Students sit approved external examinations at each level.",
  },
];

export const teachers = [
  {
    name: "Sheikh Abdullah Adebayo",
    role: "Head of Qur'an Memorisation",
    focus: "Hifz, Tajweed",
    years: 20,
    bio: "Certified in the Hafs recitation with an unbroken chain of transmission; leads the morning Hifz circles.",
  },
  {
    name: "Ustadh Ibrahim Salaudeen",
    role: "Head of Fiqh Studies",
    focus: "Fiqh, Usul al-Fiqh",
    years: 15,
    bio: "Graduate of Arabic and Islamic studies; teaches jurisprudence for intermediate and senior classes.",
  },
  {
    name: "Ustadha Aisha Bello",
    role: "Arabic Language Coordinator",
    focus: "Arabic grammar, conversation",
    years: 12,
    bio: "Builds the beginner-to-advanced Arabic curriculum and runs the evening language classes.",
  },
  {
    name: "Sheikh Yusuf Olawale",
    role: "Hadith Instructor",
    focus: "Hadith sciences",
    years: 18,
    bio: "Teaches the weekend Hadith session and supervises senior student research.",
  },
  {
    name: "Dr. Muhammad Ali Ogunleye",
    role: "Islamic History Lecturer",
    focus: "Seerah, Islamic history",
    years: 10,
    bio: "Holds a doctorate in Islamic history; delivers the Sunday lecture series.",
  },
  {
    name: "Ustadha Fatima Yusuf",
    role: "Women's Programme Lead",
    focus: "Akhlaq, women's study circle",
    years: 9,
    bio: "Coordinates the women's study circle and the children's weekend Qur'an classes.",
  },
];

export type Program = {
  id: number;
  title: string;
  summary: string;
  level: string;
  duration: string;
  schedule: string;
  classSize: string;
  monthlyFee: number;
  registrationFee: number;
  forWho: string;
  outcomes: string[];
};

export const programs: Program[] = [
  {
    id: 1,
    title: "Qur'an Memorisation (Hifz)",
    summary:
      "Memorise the Qur'an with correct Tajweed, revised daily with a dedicated teacher.",
    level: "All levels",
    duration: "1-3 years",
    schedule: "Mon-Fri, 6:00-8:00 AM",
    classSize: "25 students",
    monthlyFee: 75,
    registrationFee: 50,
    forWho: "Students aged 7 and above committed to daily revision.",
    outcomes: [
      "Accurate Hafs recitation",
      "Structured daily revision plan",
      "Ijazah pathway for completers",
    ],
  },
  {
    id: 2,
    title: "Arabic Language",
    summary:
      "Read, write and speak Arabic, from the alphabet to classical texts.",
    level: "Beginner to advanced",
    duration: "6 months per level",
    schedule: "Tue & Thu, 6:00-8:00 PM",
    classSize: "20 students",
    monthlyFee: 80,
    registrationFee: 50,
    forWho: "Teens and adults, including complete beginners.",
    outcomes: [
      "Read unvowelled Arabic text",
      "Everyday conversation",
      "Grammar (Nahw) foundations",
    ],
  },
  {
    id: 3,
    title: "Islamic Jurisprudence (Fiqh)",
    summary:
      "Study the rulings of worship and daily dealings with their evidence.",
    level: "Intermediate",
    duration: "1 year",
    schedule: "Mon, Wed & Fri, 2:00-4:00 PM",
    classSize: "15 students",
    monthlyFee: 85,
    registrationFee: 50,
    forWho: "Students who can already read Arabic script.",
    outcomes: [
      "Rulings of purification and prayer",
      "Zakat, fasting and Hajj",
      "Introduction to Usul al-Fiqh",
    ],
  },
  {
    id: 4,
    title: "Hadith Sciences",
    summary:
      "Learn the traditions of Prophet Muhammad (SAW) and how they are authenticated.",
    level: "Intermediate to advanced",
    duration: "1 year",
    schedule: "Saturday, 10:00 AM-12:00 PM",
    classSize: "15 students",
    monthlyFee: 85,
    registrationFee: 50,
    forWho: "Senior students and adult learners.",
    outcomes: [
      "Chains of narration and grading",
      "Study of the Forty Nawawi",
      "Applying Hadith to daily life",
    ],
  },
  {
    id: 5,
    title: "Islamic History & Seerah",
    summary:
      "Follow the life of the Prophet (SAW) and the story of the Muslim world.",
    level: "All levels",
    duration: "8 months",
    schedule: "Sunday, 11:00 AM-1:00 PM",
    classSize: "30 students",
    monthlyFee: 60,
    registrationFee: 40,
    forWho: "Open to families and adult learners.",
    outcomes: [
      "Seerah in chronological order",
      "The rightly guided Caliphs",
      "Islam in West Africa",
    ],
  },
  {
    id: 6,
    title: "Islamic Ethics (Akhlaq)",
    summary:
      "Character development grounded in the Qur'an and Prophetic example.",
    level: "All levels",
    duration: "6 months",
    schedule: "Wednesday, 10:00 AM-12:00 PM",
    classSize: "20 students",
    monthlyFee: 60,
    registrationFee: 40,
    forWho: "Children, teens and adults, taught in separate groups.",
    outcomes: [
      "Manners of speech and conduct",
      "Family and neighbour rights",
      "Habits of worship",
    ],
  },
];

export const enrollmentSteps = [
  {
    step: 1,
    title: "Choose a programme",
    detail:
      "Compare duration, schedule and fees on the Programmes page and pick the best fit.",
  },
  {
    step: 2,
    title: "Submit the admission form",
    detail:
      "Fill the form on this page. It takes about five minutes and needs no documents.",
  },
  {
    step: 3,
    title: "Placement conversation",
    detail:
      "A teacher calls within three working days to confirm level and answer questions.",
  },
  {
    step: 4,
    title: "Pay the registration fee",
    detail:
      "Pay at the school office in Itaolokan or by bank transfer to secure the seat.",
  },
  {
    step: 5,
    title: "Start class",
    detail:
      "Collect the timetable and learning materials, then join your first session.",
  },
];

export const testimonials = [
  {
    quote:
      "My son completed his Hifz here in three years. The daily revision and the teachers' patience made the difference.",
    author: "Parent, Osogbo",
    program: "Qur'an Memorisation",
  },
  {
    quote:
      "I started without knowing the Arabic alphabet. Two levels later I read the Qur'an on my own.",
    author: "Adult student",
    program: "Arabic Language",
  },
  {
    quote:
      "The weekend classes fit around school, and my daughter looks forward to them every Saturday.",
    author: "Parent, Itaolokan",
    program: "Children's Weekend Qur'an",
  },
];

export const faqs = [
  {
    q: "What ages do you accept?",
    a: "Children from age five join the weekend and morning classes. Teens and adults are welcome in every programme.",
  },
  {
    q: "Do I need to know Arabic before enrolling?",
    a: "No. The Arabic Language programme starts from the alphabet, and Qur'an classes are grouped by level.",
  },
  {
    q: "Are classes for boys and girls separate?",
    a: "Yes. Teens and adults study in separate groups, and the women's circle is led by a female teacher.",
  },
  {
    q: "Can I pay fees in instalments?",
    a: "Yes. Fees can be paid monthly, quarterly or annually. Quarterly and annual payments cost less overall.",
  },
  {
    q: "Is there support for students who fall behind?",
    a: "Teachers run catch-up sessions, and senior students are paired with beginners for revision.",
  },
  {
    q: "How do I visit the school?",
    a: "Walk in on any weekday between 9:00 AM and 4:00 PM, or call ahead to arrange a tour.",
  },
];
