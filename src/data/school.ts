/**
 * Single source of truth for all school content.
 *
 * The website, the MCP tools and the generated Supabase edge function all
 * derive their data from this module. Do not duplicate these values elsewhere.
 *
 * NOTE FOR THE SCHOOL: the founding date, staff list, recognitions, fees and
 * testimonials below are PLACEHOLDERS written to show the layout. Replace
 * every value in this file with the real details before publishing.
 */

export const SCHOOL_NAME = "Darul-Huda Wal-Furquran";
export const SCHOOL_FULL_NAME =
  "Darul-Huda Wal-Furquran School of Arabic and Islamic Studies";
export const SCHOOL_LOCATION = "Itaolokan Area, Osogbo, Osun State, Nigeria";

// PLACEHOLDER: replace this single value with the real office line before going
// live. Every tel: and wa.me link in the site is derived from it.
export const SCHOOL_PHONE = "+234 800 000 0000";
export const SCHOOL_EMAIL = "info@darulhuda.ng";
export const FOUNDED_YEAR = 1998;

/** Digits-only international number used by WhatsApp deep links. */
export const SCHOOL_WHATSAPP_NUMBER = SCHOOL_PHONE.replace(/\D/g, "");

export const OFFICE_HOURS = "Mon–Fri, 9:00 AM – 4:00 PM";
export const OFFICE_HOURS_LONG = "Monday to Friday, 9:00 AM – 4:00 PM";

/** Build a pre-filled WhatsApp deep link without duplicating the number. */
export const whatsappLink = (message: string) =>
  `https://wa.me/${SCHOOL_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

/**
 * Policy text shown in the admission form's terms dialog.
 * PLACEHOLDER: the school should replace this with its approved policy wording.
 */
export const ADMISSION_TERMS = {
  attendance: [
    "Classes run on the published timetable. Regular attendance is required for promotion between levels.",
    "Please notify the office in advance of planned absences. Sustained unexplained absence may affect a student's place.",
    "A teacher will call within three working days of an application to agree the starting level and timetable.",
    "Guardians are responsible for punctual drop-off and collection of younger students.",
  ],
  fees: [
    "Fees are payable monthly, quarterly or annually in advance, as set out on the Fees page.",
    "A non-refundable registration fee secures the seat and is due after the placement conversation.",
    "Fees cover tuition and core learning materials; external examination fees are charged separately where applicable.",
    "The office will confirm current amounts and payment methods before any payment is made.",
  ],
} as const;

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

export type Teacher = {
  id: string;
  name: string;
  shortName: string;
  role: string;
  focus: string;
  years: number;
  bio: string;
};

export const teachers: Teacher[] = [
  {
    id: "abdullah",
    name: "Sheikh Abdullah Adebayo",
    shortName: "Sheikh Abdullah",
    role: "Head of Qur'an Memorisation",
    focus: "Hifz, Tajweed",
    years: 20,
    bio: "Certified in the Hafs recitation with an unbroken chain of transmission; leads the morning Hifz circles.",
  },
  {
    id: "ibrahim",
    name: "Ustadh Ibrahim Salaudeen",
    shortName: "Ustadh Ibrahim",
    role: "Head of Fiqh Studies",
    focus: "Fiqh, Usul al-Fiqh",
    years: 15,
    bio: "Graduate of Arabic and Islamic studies; teaches jurisprudence for intermediate and senior classes.",
  },
  {
    id: "aisha",
    name: "Ustadha Aisha Bello",
    shortName: "Ustadha Aisha",
    role: "Arabic Language Coordinator",
    focus: "Arabic grammar, conversation",
    years: 12,
    bio: "Builds the beginner-to-advanced Arabic curriculum and runs the evening language classes.",
  },
  {
    id: "yusuf",
    name: "Sheikh Yusuf Olawale",
    shortName: "Sheikh Yusuf",
    role: "Hadith Instructor",
    focus: "Hadith sciences",
    years: 18,
    bio: "Teaches the weekend Hadith session and supervises senior student research.",
  },
  {
    id: "muhammad",
    name: "Dr. Muhammad Ali Ogunleye",
    shortName: "Dr. Muhammad Ali",
    role: "Islamic History Lecturer",
    focus: "Seerah, Islamic history",
    years: 10,
    bio: "Holds a doctorate in Islamic history; delivers the Sunday lecture series.",
  },
  {
    id: "fatima",
    name: "Ustadha Fatima Yusuf",
    shortName: "Ustadha Fatima",
    role: "Women's Programme Lead",
    focus: "Akhlaq, women's study circle",
    years: 9,
    bio: "Coordinates the women's study circle and the children's weekend Qur'an classes.",
  },
  {
    id: "ahmad",
    name: "Sheikh Ahmad Oladosu",
    shortName: "Sheikh Ahmad",
    role: "Tafsir Instructor",
    focus: "Qur'anic exegesis, Arabic rhetoric",
    years: 14,
    bio: "Teaches the evening Tafsir class and mentors senior students in Qur'anic interpretation.",
  },
  {
    id: "hamza",
    name: "Ustadh Hamza Adeyemi",
    shortName: "Ustadh Hamza",
    role: "Children's Programme Coordinator",
    focus: "Children's Hifz, Tajweed",
    years: 8,
    bio: "Runs the weekend Qur'an classes for children and supports beginners with daily revision.",
  },
];

export type Program = {
  id: number;
  /** Stable identifier used in links and stored with applications. */
  slug: string;
  title: string;
  summary: string;
  /** Alternative names and search terms used by the MCP tools. */
  keywords: string[];
  level: string;
  duration: string;
  schedule: string;
  classSize: string;
  monthlyFee: number;
  quarterlyFee: number;
  annualFee: number;
  registrationFee: number;
  forWho: string;
  outcomes: string[];
};

export const programs: Program[] = [
  {
    id: 1,
    slug: "hifz",
    title: "Qur'an Memorisation (Hifz)",
    summary:
      "Memorise the Qur'an with correct Tajweed, revised daily with a dedicated teacher.",
    keywords: ["hifz", "quran memorization", "qur'an memorisation", "tajweed"],
    level: "All levels",
    duration: "1-3 years",
    schedule: "Mon-Fri, 6:00-8:00 AM",
    classSize: "25 students",
    monthlyFee: 75,
    quarterlyFee: 200,
    annualFee: 750,
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
    slug: "arabic",
    title: "Arabic Language",
    summary:
      "Read, write and speak Arabic, from the alphabet to classical texts.",
    keywords: ["arabic", "nahw", "conversation"],
    level: "Beginner to advanced",
    duration: "6 months per level",
    schedule: "Tue & Thu, 6:00-8:00 PM",
    classSize: "20 students",
    monthlyFee: 80,
    quarterlyFee: 220,
    annualFee: 800,
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
    slug: "fiqh",
    title: "Islamic Jurisprudence (Fiqh)",
    summary:
      "Study the rulings of worship and daily dealings with their evidence.",
    keywords: ["fiqh", "islamic law", "jurisprudence", "usul al-fiqh"],
    level: "Intermediate",
    duration: "1 year",
    schedule: "Mon, Wed & Fri, 2:00-4:00 PM",
    classSize: "15 students",
    monthlyFee: 85,
    quarterlyFee: 230,
    annualFee: 850,
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
    slug: "hadith",
    title: "Hadith Sciences",
    summary:
      "Learn the traditions of Prophet Muhammad (SAW) and how they are authenticated.",
    keywords: ["hadith", "nawawi", "sunnah"],
    level: "Intermediate to advanced",
    duration: "1 year",
    schedule: "Saturday, 10:00 AM-12:00 PM",
    classSize: "15 students",
    monthlyFee: 85,
    quarterlyFee: 230,
    annualFee: 850,
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
    slug: "seerah",
    title: "Islamic History & Seerah",
    summary:
      "Follow the life of the Prophet (SAW) and the story of the Muslim world.",
    keywords: ["seerah", "islamic history", "sirah"],
    level: "All levels",
    duration: "8 months",
    schedule: "Sunday, 11:00 AM-1:00 PM",
    classSize: "30 students",
    monthlyFee: 60,
    quarterlyFee: 160,
    annualFee: 600,
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
    slug: "akhlaq",
    title: "Islamic Ethics (Akhlaq)",
    summary:
      "Character development grounded in the Qur'an and Prophetic example.",
    keywords: ["akhlaq", "ethics", "character", "manners"],
    level: "All levels",
    duration: "6 months",
    schedule: "Wednesday, 10:00 AM-12:00 PM",
    classSize: "20 students",
    monthlyFee: 60,
    quarterlyFee: 160,
    annualFee: 600,
    registrationFee: 40,
    forWho: "Children, teens and adults, taught in separate groups.",
    outcomes: [
      "Manners of speech and conduct",
      "Family and neighbour rights",
      "Habits of worship",
    ],
  },
];

export type SessionType = "Regular" | "Weekly" | "Weekend";

type SessionRecord = {
  id: number;
  title: string;
  days: string;
  time: string;
  location: string;
  teacherId: string;
  type: SessionType;
};

/** The teacher's display name is derived from `teachers` to prevent drift. */
export type Session = Omit<SessionRecord, "teacherId"> & {
  teacherId: string;
  teacher: string;
};

const sessionRecords: SessionRecord[] = [
  {
    id: 1,
    title: "Morning Qur'an Class",
    days: "Monday to Friday",
    time: "6:00 AM - 8:00 AM",
    location: "Main Hall",
    teacherId: "abdullah",
    type: "Regular",
  },
  {
    id: 2,
    title: "Afternoon Fiqh Studies",
    days: "Monday, Wednesday, Friday",
    time: "2:00 PM - 4:00 PM",
    location: "Room 102",
    teacherId: "ibrahim",
    type: "Regular",
  },
  {
    id: 3,
    title: "Evening Arabic Classes",
    days: "Tuesday and Thursday",
    time: "6:00 PM - 8:00 PM",
    location: "Room 103",
    teacherId: "aisha",
    type: "Regular",
  },
  {
    id: 4,
    title: "Weekend Hadith Session",
    days: "Saturday",
    time: "10:00 AM - 12:00 PM",
    location: "Main Hall",
    teacherId: "yusuf",
    type: "Weekly",
  },
  {
    id: 5,
    title: "Islamic History Lecture",
    days: "Sunday",
    time: "11:00 AM - 1:00 PM",
    location: "Lecture Hall",
    teacherId: "muhammad",
    type: "Weekly",
  },
  {
    id: 6,
    title: "Evening Tafsir Class",
    days: "Monday and Thursday",
    time: "8:00 PM - 9:30 PM",
    location: "Main Hall",
    teacherId: "ahmad",
    type: "Regular",
  },
  {
    id: 7,
    title: "Women's Study Circle",
    days: "Wednesday",
    time: "10:00 AM - 12:00 PM",
    location: "Room 105",
    teacherId: "fatima",
    type: "Weekly",
  },
  {
    id: 8,
    title: "Children's Qur'an Class",
    days: "Saturday and Sunday",
    time: "9:00 AM - 11:00 AM",
    location: "Children's Center",
    teacherId: "hamza",
    type: "Weekend",
  },
];

const teachersById = new Map(teachers.map((teacher) => [teacher.id, teacher]));

export const sessions: Session[] = sessionRecords.map((session) => ({
  ...session,
  teacher: teachersById.get(session.teacherId)?.shortName ?? "To be confirmed",
}));

export const paymentPlans = [
  {
    id: "monthly",
    name: "Monthly",
    period: "monthly",
    detail: "Pay at the start of each month. Most flexible.",
  },
  {
    id: "quarterly",
    name: "Quarterly",
    period: "quarterly",
    detail: "Pay for three months at once and save.",
  },
  {
    id: "annual",
    name: "Annual",
    period: "annual",
    detail: "Best value, includes all learning materials.",
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
    a: `Walk in on any weekday between ${OFFICE_HOURS_LONG.replace("Monday to Friday, ", "")}, or call ahead to arrange a tour.`,
  },
];

/** Resolve a deep link such as `/admission?program=hifz`. */
export const findProgramBySlug = (slug: string) =>
  programs.find((program) => program.slug === slug);

/** Accept the legacy link format that used the programme title as the value. */
export const findProgramByTitle = (title: string) =>
  programs.find((program) => program.title === title);
