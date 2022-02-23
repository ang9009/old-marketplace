import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ToastContainer } from "react-toastify";
import Select from "react-select";

import useRedirectWhenLoggedOut from "../hooks/useRedirectWhenLoggedOut";
import PrimaryTextInput from "../components/widgets/PrimaryTextInput";
import SignupContainer from "../components/ui/SignupContainer";
import { yearLevelOptions } from "../data/data";
import useUpdateSignupOptions from "../hooks/useUpdateSignupOptions";
import useSubmitSignupForm from "../hooks/useSubmitSignupForm";
import useGetUser from "../hooks/useGetUser";

const CompleteSignupPage: React.FC = () => {
  useRedirectWhenLoggedOut();
  const { subjects, subjectOptions, yearLevel, setSubjects, setPreviousYearLevel, setYearLevel } =
    useUpdateSignupOptions();
  const [image, setImage] = useState<{ url: string; file: File } | null>(null);
  const userDocSnap = useGetUser();
  const { isLoading, submit } = useSubmitSignupForm({ userDocSnap, yearLevel, subjects, image });

  //On drop listener for the image dropzone
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const url = URL.createObjectURL(acceptedFiles[0]);
    setImage({ url, file: acceptedFiles[0] });
  }, []);

  //Dropzone settings
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    minSize: 1024,
    maxSize: 3072000,
    multiple: false,
  });

  return (
    <>
      <SignupContainer>
        <form className="content" onSubmit={submit}>
          <h1 className="form-title">Complete your sign up</h1>

          <PrimaryTextInput name={"phoneNumber"} placeholder={"Phone number"} />

          <p className="form-field-heading">Year level</p>
          <Select
            className="basic-single"
            options={yearLevelOptions}
            placeholder={"Year level"}
            value={yearLevel}
            isSearchable={false}
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
            onChange={(e) => setSubjects(e)}
            isDisabled={!yearLevel}
          />

          <p className="form-field-heading">Profile picture</p>
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p>Drag files here or click to select files</p>
            <img src={image?.url} alt={image?.file?.name} className="profile-picture" />
          </div>

          <button type="submit" disabled={isLoading}>
            Submit
          </button>
        </form>
        <ToastContainer />
      </SignupContainer>

      <style jsx>{`
        .content {
          padding: 100px 80px;
        }

        .profile-picture {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .dropzone {
          width: 400px;
          height: 400px;
          background: var(--secondaryBackgroundColor);
          border: none;
          //border: 2px solid #3c3c3c;
          position: relative;
        }

        .dropzone input {
          position: absolute;
          inset: 0;
        }

        .dropzone img {
          position: absolute;
          inset: 0;
        }

        .dropzone p {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%);
        }

        h1 {
          color: var(--primaryColor);
        }

        button {
          margin-top: 15px;
        }
      `}</style>
    </>
  );
};

export default CompleteSignupPage;
