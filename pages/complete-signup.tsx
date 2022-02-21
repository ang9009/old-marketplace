import React, { useContext, useState, useCallback, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { UserContext } from "../components/context/UserContext";
import PrimaryTextInput from "../components/widgets/PrimaryTextInput";
import SignupContainer from "../components/ui/SignupContainer";
import Select, { MultiValue } from "react-select";
import { yearLevelOptions } from "../data/data";
import { seniorSubjectOptions, secondarySubjectOptions, SubjectOption, YearLevelOption } from "../data/data";
import { useDropzone } from "react-dropzone";
import User from "../types/user.interface";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { ref, uploadBytes, getStorage } from "firebase/storage";

const CompleteSignupPage: React.FC = () => {
  useAuth();

  const { user } = useContext(UserContext);

  const router = useRouter();

  // const {subjectOptions, previousYear} = useUpdateSignupOptions();
  // const {} = useCompleteSignup();

  const [image, setImage] = useState<{ url: string; file: File } | null>(null);
  const [subjectOptions, setSubjectOptions] = useState<SubjectOption[]>(seniorSubjectOptions);
  const [previousYearLevel, setPreviousYearLevel] = useState<YearLevelOption>(null);
  const [yearLevel, setYearLevel] = useState<YearLevelOption>(null);
  const [subjects, setSubjects] = useState<MultiValue<SubjectOption>>(null);

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

  const submit = async (e) => {
    try {
      e.preventDefault();

      if (!yearLevel.value || !subjects || subjects.length === 0) {
        toast.error("One or more fields are empty!", {
          autoClose: 2000,
        });
        return;
      }

      //If the user uploads an image, upload it to firebase. If not, then assign them the default profile picture
      const storage = getStorage();
      const snapshot = image ? await uploadBytes(ref(storage, user.id), image.file) : null;

      const db = getFirestore();
      const data: User = {
        name: user.name,
        email: user.email,
        phoneNumber: e.target.phoneNumber.value,
        subjects: subjects.map((subject) => subject.value),
        yearLevel: yearLevel.value,
        profileImagePath: snapshot?.metadata?.fullPath ?? null,
      };

      await setDoc(doc(db, "users", user.id), data);
      await router.push("/home");
    } catch (err) {
      console.log(err);
    }
  };

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
          <h1>Complete your sign up</h1>

          <PrimaryTextInput name={"phoneNumber"} placeholder={"Phone number"} />

          <p>Year level</p>
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

          <p>Subjects taken</p>
          <Select
            isMulti
            className="basic-multi-select"
            options={subjectOptions}
            placeholder={"Subjects taken"}
            value={subjects}
            onChange={(e) => setSubjects(e)}
            isDisabled={!yearLevel}
          />

          <p>Profile picture</p>
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
            <img src={image?.url} alt={image?.file?.name} className="profile-picture" />
          </div>

          <button type="submit">Submit</button>
        </form>
        <ToastContainer />
      </SignupContainer>

      <style jsx>{`
        .content {
          padding: 50px 100px;
        }

        .profile-picture {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .dropzone {
          width: 400px;
          height: 400px;
          background: black;
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
      `}</style>
    </>
  );
};

export default CompleteSignupPage;
