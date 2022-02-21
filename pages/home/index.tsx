import React from "react";
import useAuth from "../../hooks/useAuth";
import Navbar from "../../components/ui/Navbar";

const index: React.FC = () => {
  useAuth();
  //
  return (
    <>
      <Navbar />
      <h1>deez nuts hah gottem</h1>
    </>
  );
};

export default index;
