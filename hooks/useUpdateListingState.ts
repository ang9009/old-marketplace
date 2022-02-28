import { Dispatch, SetStateAction, useState } from "react";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { User } from "firebase/auth";
import { toast } from "react-toastify";

import getListingAndUserDocs from "../utils/getListingAndUserDocs";
import ListingState from "../types/listingState.enum";
import Listing from "../types/listing.interface";

type HookProps = {
  listingCache: Listing;
  setListingCache: Dispatch<SetStateAction<Listing>>; // dispatch and set from react
  authUser: User; // from firebase
};

function useUpdateListingState({ listingCache, setListingCache, authUser }: HookProps) {
  const db = getFirestore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateListingState = async () => {
    if (!authUser) return;

    setIsLoading(true);

    try {
      const listingRef = doc(db, "listings", listingCache.id);
      const { listing } = await getListingAndUserDocs(listingCache.id);
      const state = listing.state;

      if (state === "available") {
        await updateDoc(listingRef, {
          state: ListingState.RESERVED,
          buyerId: authUser.uid,
        });

        setListingCache({
          ...listing,
          state: ListingState.RESERVED,
          buyerId: authUser.uid,
        });
      } else if (state === "reserved") {
        if (listing.buyerId === authUser.uid) {
          await updateDoc(listingRef, {
            state: ListingState.AVAILABLE,
            buyerId: null,
          });

          setListingCache({
            ...listing,
            state: ListingState.AVAILABLE,
            buyerId: null,
          });
        } else {
          toast.error("This listing has already been reserved or has been marked as sold!", {
            autoClose: 3000,
          });
          setListingCache({
            ...listing,
            state: ListingState.RESERVED,
          });
        }
      }

      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return { updateListingState, isLoading };
}

export default useUpdateListingState;
