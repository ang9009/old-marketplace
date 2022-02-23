import React from "react";
import { useRouter } from "next/router";

const Index: React.FC = () => {
  const router = useRouter();

  const goToAddListingsPage = () => {
    router.push("/home/my-listings/add-listing");
  };

  return (
    <>
      <h1>deez</h1>
      <button onClick={goToAddListingsPage}>Add listing</button>
    </>
  );
};

export default Index;
