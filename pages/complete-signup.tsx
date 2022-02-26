import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ToastContainer } from "react-toastify";
import Select, { MultiValue } from "react-select";

import PrimaryTextInput from "../components/widgets/PrimaryTextInput";
import SignupContainer from "../components/ui/SignupContainer";
import PrimaryButton from "../components/widgets/PrimaryButton";
import ImageDropzone from "../components/widgets/ImageDropzone";
import useUpdateSubjectOptions from "../hooks/useUpdateSubjectOptions";
import useSubmitSignupForm from "../hooks/useSubmitSignupForm";
import useGetUser from "../hooks/useGetUser";
import { yearLevelOptions } from "../data/data";
import { reactSelectStyles } from "../data/reactSelectStyles";
import { Option } from "../data/data";
import useRedirectWhenLoggedOut from "../hooks/useRedirectWhenLoggedOut";

const CompleteSignupPage: React.FC = () => {
  useRedirectWhenLoggedOut();

  const { subjects, subjectOptions, yearLevel, setSubjects, setPreviousYearLevel, setYearLevel } =
    useUpdateSubjectOptions();
  const [image, setImage] = useState<{ url: string; file: File } | null>(null);
  const { userDocSnap } = useGetUser();
  const { isLoading, submit } = useSubmitSignupForm({
    userDocSnap,
    yearLevel,
    subjects: subjects as MultiValue<Option>,
    image,
  });

  return (
    <>
      <SignupContainer>
        <form className="signup-form-content" onSubmit={submit}>
          <h1 className="form-title">Complete your sign up</h1>

          <PrimaryTextInput name={"phoneNumber"} placeholder={"Phone number"} />

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

          <p className="form-field-heading">Profile picture</p>
          <ImageDropzone image={image} setImage={setImage} />

          <PrimaryButton text={"Submit"} disabled={isLoading} mt={"30px"} buttonType={"submit"} />
        </form>
      </SignupContainer>

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
