import React, { useContext, useState, useCallback, useEffect } from "react";
import useRedirectWhenLoggedOut from "../hooks/useRedirectWhenLoggedOut";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { UserContext } from "../components/context/UserContext";
import PrimaryTextInput from "../components/widgets/PrimaryTextInput";
import SignupContainer from "../components/ui/SignupContainer";
import Select, { MultiValue } from "react-select";
import { yearLevelOptions } from "../data/data";
import { useDropzone } from "react-dropzone";
import User from "../types/user.interface";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { ref, uploadBytes, getStorage } from "firebase/storage";
import useUpdateSignupOptions from "../hooks/useUpdateSignupOptions";
import useRedirectWhenLoggedIn from "../hooks/useRedirectWhenLoggedIn";

const CompleteSignupPage: React.FC = () => {
  useRedirectWhenLoggedOut();

  const { user } = useContext(UserContext);

  const router = useRouter();

  const {
    subjects,
    previousYearLevel,
    subjectOptions,
    yearLevel,
    setSubjects,
    setPreviousYearLevel,
    setYearLevel,
  } = useUpdateSignupOptions();

  const [image, setImage] = useState<{ url: string; file: File } | null>(null);
  const submit = async (e) => {
    try {
      e.preventDefault();

      if (!yearLevel.value || !subjects || subjects.length === 0) {
        toast.error("One or more fields are empty!", {
          autoClose: 3000,
        });
        return;
      }

      //If the user uploads an image, upload it to firebase. If not, then assign them the default profile picture
      const storage = getStorage();
      const snapshot = image ? await uploadBytes(ref(storage, user.id), image.file) : null;

      const db = getFirestore();

      const newUser: User = {
        name: user.name,
        email: user.email,
        phoneNumber: e.target.phoneNumber.value,
        subjects: subjects.map((subject) => subject.value),
        yearLevel: yearLevel.value,
        id: user.id,
        profileImagePath: snapshot?.metadata?.fullPath ?? null,
        hasCompletedSignup: true,
      };

      await setDoc(doc(db, "users", newUser.id), newUser);
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

          <button type="submit">Submit</button>
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
