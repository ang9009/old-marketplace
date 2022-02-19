import React, { useContext } from "react";
import useAuth from "../hooks/useAuth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { UserContext } from "../components/context/UserContext";
import PrimaryTextInput from "../components/widgets/PrimaryTextInput";
import SignupContainer from "../components/ui/SignupContainer";

const CompleteSignupPage: React.FC = () => {
  // useAuth();
  const { user } = useContext(UserContext);

  const submit = async () => {
    // const db = getFirestore();
    //
    //
    // await setDoc(doc(db, "users", id), );
  };

  return (
    <>
      <SignupContainer>
        <div className="content">
          <h1>Complete your sign up</h1>
          <PrimaryTextInput
            name={"phone-number"}
            placeholder={"Phone number"}
          />
        </div>
      </SignupContainer>

      <style jsx>{`
        .content {
          padding: 50px 100px;
        }

        h1 {
          color: var(--primaryColor);
        }
      `}</style>
    </>
  );
};

export default CompleteSignupPage;
