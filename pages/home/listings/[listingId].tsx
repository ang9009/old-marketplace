import React from "react";
import { useRouter } from "next/router";

const ListingPage: React.FC = () => {
  const router = useRouter();
  const listingId = router.query.listingId;

  return (
    <>
      <p>{listingId}</p>
    </>
  );
};

export default ListingPage;
