import { User } from "firebase/auth";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

import ListingState from "../types/listingState.enum";
import Listing from "../types/listing.interface";

type HookProps = {
  updatedListing: Listing;
  authUser: User; // from firebase
};

function useUpdateListingState({ updatedListing, authUser }: HookProps) {
  const db = getFirestore();

  const updateListingState = async () => {
    if (!authUser) return;

    try {
      const listingRef = doc(db, "listings", updatedListing.id);

      if (updatedListing.state === "available") {
        await updateDoc(listingRef, {
          state: ListingState.RESERVED,
          buyerId: authUser.uid,
        });
      } else if (updatedListing.state === "reserved") {
        if (updatedListing.buyerId === authUser.uid) {
          await updateDoc(listingRef, {
            state: ListingState.AVAILABLE,
            buyerId: null,
          });
        } else {
          toast.error("This listing has already been reserved or has been marked as sold!", {
            autoClose: 3000,
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { updateListingState };
}

export default useUpdateListingState;
