import { useEffect, useState } from "react";
import { MultiValue } from "react-select";
import { secondarySubjectOptions, seniorSubjectOptions, SubjectOption, YearLevelOption } from "../data/data";

function useUpdateSignupOptions() {
  const [subjects, setSubjects] = useState<MultiValue<SubjectOption>>(null);
  const [subjectOptions, setSubjectOptions] = useState<SubjectOption[]>(seniorSubjectOptions);
  const [previousYearLevel, setPreviousYearLevel] = useState<YearLevelOption>(null);

  //Updates subject options dropdown menu depending on year level, clears menu when current and previous year level are not both senior/secondary

  useEffect(() => {
    if (yearLevel) {
      const yearLevelValue = parseInt(yearLevel.value);
      const previousYearLevelValue = previousYearLevel?.value && parseInt(previousYearLevel.value);

      if (yearLevelValue < 12) {
        setSubjectOptions(secondarySubjectOptions);
      } else if (yearLevelValue >= 12) {
        setSubjectOptions(seniorSubjectOptions);
      }

      if (
        !(
          (yearLevelValue < 12 && previousYearLevelValue < 12) ||
          (yearLevelValue >= 12 && previousYearLevelValue >= 12)
        )
      ) {
        setSubjects(null);
      }
    }
  }, [yearLevel]);

  return { subjects, previousYearLevel, subjectOptions };
}

export default useUpdateSignupOptions;
