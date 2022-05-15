import { User } from "firebase/auth";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

import ListingState from "../types/listingState.enum";
import Listing from "../types/listing.interface";
import algolia from "../lib/algolia";

type HookProps = {
  updatedListing: Listing;
  authUser: User; // from firebase
};

//Updates listings after user makes edits
function useUpdateListing({ updatedListing, authUser }: HookProps) {
  const db = getFirestore();

  const updateListingState = async () => {
    if (!authUser) return;

    try {
      const listingRef = doc(db, "listings", updatedListing.id);
      const index = algolia.initIndex("listings");

      if (updatedListing.state === "available") {
        index.partialUpdateObject({ objectID: updatedListing.id, state: ListingState.RESERVED });

        await updateDoc(listingRef, {
          state: ListingState.RESERVED,
          buyerId: authUser.uid,
        });
      } else if (updatedListing.state === "reserved") {
        if (updatedListing.buyerId === authUser.uid) {
          index.partialUpdateObject({ objectID: updatedListing.id, state: ListingState.AVAILABLE });

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

export default useUpdateListing;
