import React, { useEffect, useState } from "react";

import Searchbar from "../../components/widgets/Searchbar";
import Hero from "../../components/ui/Hero";
import Listing from "../../types/listing.interface";
import { collection, doc, getDoc, getDocs, getFirestore, query, where, orderBy } from "firebase/firestore";
import ListingsSection from "../../components/ui/ListingsSection";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import User from "../../types/user.interface";

interface Props {
  recommendedListings: Listing[];
}

const Index: React.FC<Props> = ({}) => {
  const db = getFirestore();
  const auth = getAuth();
  const [userData, setUserData] = useState<User>(null);
  const [listings, setListings] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        setUserData(docSnap.data() as User);
      } else {
        setUserData(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

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
      ).then(() => {
        listings.sort((a, b) => a.price - b.price);
        setListings(listings);
      });
    }
  }, [userData]);

  return (
    <>
      <div className="page-container">
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

export default Index;
