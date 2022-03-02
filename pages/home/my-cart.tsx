import React, { useEffect, useState } from "react";
import ListingsSection from "../../components/ui/ListingsSection";
import useGetCurrUser from "../../hooks/useGetCurrUser";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import Listing from "../../types/listing.interface";

// interface Props {
//   userListings: Listing[];
// }

const myCart: React.FC = () => {
  const db = getFirestore();
  const [userListings, setUserListings] = useState(null);
  const { authUser } = useGetCurrUser();

  const getCurrUserListings = async (authUser) => {
    const fetchedListings: Listing[] = [];

    const q = query(collection(db, "listings"), where("buyerId", "==", authUser.uid));
    const listingQuerySnapshot = await getDocs(q);

    if (listingQuerySnapshot) {
      listingQuerySnapshot.forEach((doc) => {
        fetchedListings.push(doc.data() as Listing);
      });
    }

    return fetchedListings;
  };

  useEffect(() => {
    if (authUser) {
      getCurrUserListings(authUser).then((userListings) => {
        setUserListings(userListings);
      });
    }
  }, [authUser]);

  console.log(userListings);

  return (
    <>
      {userListings && (
        <div className="page-container">
          <h1>My cart</h1>
          <ListingsSection listings={userListings} />
        </div>
      )}

      <style jsx>{`
        .page-container {
          padding-top: 80px;
        }
      `}</style>
    </>
  );
};

export default myCart;
