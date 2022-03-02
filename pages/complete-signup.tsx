import React, { useEffect, useState } from "react";
import Select, { MultiValue } from "react-select";

import PrimaryTextInput from "../components/widgets/PrimaryTextInput";
import SignupContainer from "../components/ui/SignupContainer";
import PrimaryButton from "../components/widgets/PrimaryButton";
import ImageDropzone from "../components/widgets/ImageDropzone";
import useUpdateSubjectOptions from "../hooks/useUpdateSubjectOptions";
import useSubmitSignupForm from "../hooks/useSubmitSignupForm";
import useGetCurrUser from "../hooks/useGetCurrUser";
import { yearLevelOptions } from "../data/data";
import { reactSelectStyles } from "../data/reactSelectStyles";
import { Option } from "../data/data";
import useRedirectWhenLoggedOut from "../hooks/useRedirectWhenLoggedOut";
import User from "../types/user.interface";

const CompleteSignupPage: React.FC = () => {
  useRedirectWhenLoggedOut();

  const { subjects, subjectOptions, yearLevel, setSubjects, setPreviousYearLevel, setYearLevel } =
    useUpdateSubjectOptions(null, null);
  const [image, setImage] = useState<{ url: string; file: File } | null>(null);
  const [displayName, setDisplayName] = useState(null);
  const { authUser, userData } = useGetCurrUser();
  const { isLoading, submit } = useSubmitSignupForm({
    userDocSnap: userData as User,
    yearLevel,
    subjects: subjects as MultiValue<Option>,
    image,
  });

  useEffect(() => {
    if (authUser) {
      setDisplayName(authUser.displayName);
    }
  }, [authUser]);

  return (
    <>
      {!isLoading && displayName && (
        <SignupContainer>
          <form className="signup-form-content" onSubmit={submit}>
            <h1 className="form-title">Welcome {displayName}, please complete your sign up</h1>

            <PrimaryTextInput
              name={"phoneNumber"}
              placeholder={"Phone number (optional)"}
              required={false}
              isNumeric={true}
            />

            <p className="form-field-heading">Year level</p>
            <Select
              className="basic-single"
              options={yearLevelOptions}
              placeholder={"Year level"}
              value={yearLevel}
              isSearchable={false}
              styles={reactSelectStyles}
              onChange={(e) => {
                setYearLevel((prev) => {
                  setPreviousYearLevel(prev);
                  return e;
                });
              }}
            />

            <p className="form-field-heading">Subjects taken</p>
            <Select
              isMulti
              className="basic-multi-select"
              options={subjectOptions}
              placeholder={"Subjects taken"}
              value={subjects}
              styles={reactSelectStyles}
              onChange={(e: MultiValue<Option>) => setSubjects(e)}
              isDisabled={!yearLevel}
            />

            <p className="form-field-heading">Profile picture (optional)</p>
            <ImageDropzone image={image} setImage={setImage} />

            <PrimaryButton text={"Submit"} disabled={isLoading} mt={"30px"} buttonType={"submit"} />
          </form>
        </SignupContainer>
      )}

      <style jsx>{`
        .signup-form-content {
          padding: 100px 80px;
        }

        .profile-picture {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        button {
          margin-top: 15px;
        }
      `}</style>
    </>
  );
};

export default CompleteSignupPage;
