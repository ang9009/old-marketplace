import { useEffect, useState } from "react";
import { MultiValue } from "react-select";
import { nonSeniorSubjectOptions, seniorSubjectOptions, Option } from "../data/data";

function useUpdateSubjectOptions(
  subjectInitialState: MultiValue<Option> | Option,
  yearLevelInitialState: Option
) {
  const [subjects, setSubjects] = useState<MultiValue<Option> | Option>(subjectInitialState);
  const [subjectOptions, setSubjectOptions] = useState<Option[]>(seniorSubjectOptions);
  const [previousYearLevel, setPreviousYearLevel] = useState<Option>(yearLevelInitialState);
  const [yearLevel, setYearLevel] = useState<Option>(yearLevelInitialState);

  //Updates subject options dropdown menu depending on year level, clears menu when current and previous year level are not both senior/secondary
  useEffect(() => {
    if (yearLevel) {
      const yearLevelValue = parseInt(yearLevel.value);
      const previousYearLevelValue = previousYearLevel?.value && parseInt(previousYearLevel.value);

      //Set subject options accordingly depending on if the student is a senior or a non-senior student.
      if (yearLevelValue < 12) {
        setSubjectOptions(nonSeniorSubjectOptions);
      } else if (yearLevelValue >= 12) {
        setSubjectOptions(seniorSubjectOptions);
      }

      //Clear value field if the previous year level value and the current year level value are not both senior/non-senior
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

  return {
    subjects,
    subjectOptions,
    yearLevel,
    setSubjects,
    setPreviousYearLevel,
    setYearLevel,
  };
}

export default useUpdateSubjectOptions;
