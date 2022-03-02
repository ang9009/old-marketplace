import React, { useEffect, useState } from "react";

import Searchbar from "../../components/widgets/Searchbar";
import Hero from "../../components/ui/Hero";
import { GetServerSideProps } from "next";
import useGetCurrUser from "../../hooks/useGetCurrUser";
import Listing from "../../types/listing.interface";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import ListingsSection from "../../components/ui/ListingsSection";

interface Props {
  recommendedListings: Listing[];
}

const Index: React.FC<Props> = ({}) => {
  const db = getFirestore();
  const { userData } = useGetCurrUser();
  const [listings, setListings] = useState(null);

  useEffect(() => {
    if (userData) {
      const listings: Listing[] = [];
      Promise.all(
        userData.subjects.map(async (subject) => {
          const q = query(
            collection(db, "listings"),
            where("yearLevel", "==", parseInt(userData.yearLevel)),
            where("subject", "==", subject),
            where("ownerId", "!=", userData.id),
            where("state", "==", "available")
          );

          const listingQuerySnapshot = await getDocs(q);

          if (listingQuerySnapshot) {
            listingQuerySnapshot.forEach((doc) => {
              listings.push(doc.data() as Listing);
            });
          }
        })
      ).then(() => setListings(listings));
    }
  }, [userData]);

  return (
    <>
      <div className="page-container">
        <Searchbar />
        <Hero />
        <h1 className="heading">Recommended for you</h1>
        {listings && <ListingsSection listings={listings} />}
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
