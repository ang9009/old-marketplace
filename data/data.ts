export interface YearLevelOption {
  value: string;
  label: string;
}

export const yearLevelOptions: YearLevelOption[] = [
  { label: "Y7", value: "7" },
  { label: "Y8", value: "8" },
  { label: "Y9", value: "9" },
  { label: "Y10", value: "10" },
  { label: "Y11", value: "11" },
  { label: "Y12", value: "12" },
  { label: "Y13", value: "13" },
];

export interface SubjectOption {
  value: string;
  label: string;
}

export const seniorSubjectOptions: SubjectOption[] = [
  { label: "Math AI", value: "Math AI" },
  { label: "Math AA", value: "Math AA" },
  { label: "English L&L", value: "English L&L" },
  { label: "English LL", value: "English LL" },
];

export const secondarySubjectOptions: SubjectOption[] = [
  { label: "deeznuts", value: "Maqwejrth AI" },
  { label: "qwoerqwer", value: "Maqweoinri" },
];
