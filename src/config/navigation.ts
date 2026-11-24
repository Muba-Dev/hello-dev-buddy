export type NavigationLink = {
  path: string;
  label: string;
};

/** The public site map. Used by the header and when generating routes. */
export const navigationLinks: NavigationLink[] = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/programs", label: "Programs" },
  { path: "/sessions", label: "Timetable" },
  { path: "/fees", label: "Fees" },
  { path: "/gallery", label: "Gallery" },
  { path: "/faq", label: "FAQ" },
  { path: "/contact", label: "Contact" },
];

export const admissionLink: NavigationLink = {
  path: "/admission",
  label: "Admission",
};

/** Footer links: every public page plus admission, but no duplicate "Home". */
export const footerLinks: NavigationLink[] = [
  ...navigationLinks.filter((link) => link.path !== "/"),
  admissionLink,
];
