import React, { useState } from "react";

import Searchbar from "../../components/widgets/Searchbar";
import Hero from "../../components/ui/Hero";
import { GetServerSideProps } from "next";
import useGetCurrUser from "../../hooks/useGetCurrUser";
import Listing from "../../types/listing.interface";
import { getFirestore } from "firebase/firestore";

interface Props {
  recommendedListings: Listing[];
}

const Index: React.FC<Props> = ({}) => {
  const db = getFirestore();
  const { userData } = useGetCurrUser();
  const [listings, setListings] = useState(null);

  let recommendedListings: Listing[] = [];

  return (
    <>
      <div className="page-container">
        <Searchbar />
        <Hero />
        <h1 className="heading">Recommended for you</h1>
        {/*<ListingsSection listings={listings} />*/}
      </div>

      <style jsx>{`
        .page-container {
          margin: 0 auto;
          width: 80vw;
        }

        .heading {
          margin: 35px 0;
          width: 100%;
          text-align: center;
        }
      `}</style>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return { props: {} };
};

export default Index;
