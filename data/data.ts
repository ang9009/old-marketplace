export interface Option {
  value: string;
  label: string;
}

export const yearLevelOptions: Option[] = [
  { label: "Y7", value: "7" },
  { label: "Y8", value: "8" },
  { label: "Y9", value: "9" },
  { label: "Y10", value: "10" },
  { label: "Y11", value: "11" },
  { label: "Y12", value: "12" },
  { label: "Y13", value: "13" },
];

export const seniorSubjectOptions: Option[] = [
  { label: "Math AI", value: "Math AI" },
  { label: "Math AA", value: "Math AA" },
  { label: "English L&L", value: "English L&L" },
  { label: "English Lit", value: "English Lit" },
  { label: "Economics", value: "Economics" },
  { label: "Computer Science", value: "Computer Science" },
  { label: "Geography", value: "Geography" },
  { label: "History", value: "History" },
  { label: "Psychology", value: "Psychology" },
  { label: "Physics", value: "Physics" },
  { label: "Biology", value: "Biology" },
  { label: "Chemistry", value: "Chemistry" },
  { label: "Chinese A L&L", value: "Chinese A L&L" },
  { label: "Chinese A Lit", value: "Chinese A Lit" },
  { label: "Chinese B", value: "Chinese B" },
].sort((a, b) => a.label.localeCompare(b.label));

export const nonSeniorSubjectOptions: Option[] = [
  { label: "Chinese", value: "Chinese" },
  { label: "English", value: "English" },
  { label: "Math", value: "Math" },
  { label: "InSo", value: "InSo" },
  { label: "Science", value: "Science" },
  { label: "Spanish", value: "Spanish" },
  { label: "French", value: "French" },
].sort((a, b) => a.label.localeCompare(b.label));

export const listingTypeOptions: Option[] = [
  { label: "Textbook", value: "textbook" },
  { label: "Notes", value: "notes" },
  { label: "Subscription", value: "subscription" },
  { label: "Miscellaneous", value: "miscellaneous" },
];
