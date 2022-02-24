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
  { label: "Math AI", value: "math ai" },
  { label: "Math AA", value: "math aa" },
  { label: "English L&L", value: "english l&l" },
  { label: "English Lit", value: "english lit" },
  { label: "Economics", value: "economics" },
  { label: "Computer Science", value: "computer science" },
  { label: "Geography", value: "geography" },
  { label: "History", value: "history" },
  { label: "Psychology", value: "psychology" },
  { label: "Physics", value: "physics" },
  { label: "Biology", value: "biology" },
  { label: "Chemistry", value: "chemistry" },
  { label: "Chinese A L&L", value: "chinese a l&l" },
  { label: "Chinese A Lit", value: "chinese a lit" },
  { label: "Chinese B", value: "chinese b" },
].sort((a, b) => a.label.localeCompare(b.label));

export const nonSeniorSubjectOptions: Option[] = [
  { label: "Chinese", value: "chinese" },
  { label: "English", value: "english" },
  { label: "Math", value: "Math" },
  { label: "InSo", value: "InSo" },
  { label: "Science", value: "science" },
  { label: "Spanish", value: "spanish" },
  { label: "French", value: "french" },
].sort((a, b) => a.label.localeCompare(b.label));

export const listingTypeOptions: Option[] = [
  { label: "Textbook", value: "textbook" },
  { label: "Notes", value: "notes" },
  { label: "Subscription", value: "subscription" },
  { label: "Miscellaneous", value: "miscellaneous" },
];
