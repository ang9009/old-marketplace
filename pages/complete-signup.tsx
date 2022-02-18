import React from "react";
import useAuth from "../hooks/useAuth";

const CompleteSignupPage: React.FC = () => {
  useAuth();

  return (
    <>
      <main>
        <div className="container">
          <div className="content">
            <h1>Complete your sign up</h1>
          </div>
        </div>
        <div className="image"></div>
      </main>
    </>
  );
};

export default CompleteSignupPage;
