import React, { useEffect, useState } from "react";
import nookies from "nookies";
import { GetServerSideProps } from "next";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";

import Searchbar from "../../components/widgets/Searchbar";
import Hero from "../../components/ui/Hero";
import useGetCurrUser from "../../hooks/useGetCurrUser";
import ListingsSection from "../../components/ui/ListingsSection";
import Listing from "../../types/listing.interface";

const Index: React.FC = () => {
  const db = getFirestore();
  const { userData } = useGetCurrUser();
  const [recommendedListings, setRecommendedListings] = useState<Listing[]>(null);

  const getRecommendedListings = (userData) => {
    return new Promise<Listing[][]>(async (resolve) => {
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

          const listings: Listing[] = [];

          if (listingQuerySnapshot) {
            listingQuerySnapshot.forEach((doc) => {
              listings.push(doc.data() as Listing);
            });
          }

          console.log("fetching");
          return listings;
        })
      ).then((listings) => {
        resolve(listings);
      });
    });
  };

  useEffect(() => {
    if (userData) {
      getRecommendedListings(userData).then((listings) => {
        const flattenedListings = listings.flat();
        // setRecommendedListings(flattenedListings);
      });
    }
  }, [userData]);

  return (
    <>
      <div className="page-container">
        <Searchbar />
        <Hero />
        <h1 className="heading">Recommended for you</h1>
        {isLoading ? <></> : <ListingsSection listings={recommendedListings} />}
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

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   try {
//     const cookies = nookies.get(context);
//     const token = await getAuth().verifyIdToken(cookies.token);
//   }
//
//   return { props: {} };
// };

export default Index;
