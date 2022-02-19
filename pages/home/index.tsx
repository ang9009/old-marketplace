import React from "react";
import useAuth from "../../hooks/useAuth";

const index: React.FC = () => {
  useAuth();

  return (
    <>
      <h1>deez nuts hah gottem</h1>
    </>
  );
};

export default index;
