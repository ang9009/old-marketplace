import { deleteDoc, doc, getFirestore, Unsubscribe, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import algolia from "../lib/algolia";

import ListingState from "../types/listingState.enum";
import Listing from "../types/listing.interface";
import { getStorage, ref, deleteObject } from "firebase/storage";

interface Props {
  unsubscribe: Unsubscribe;
  updatedListing: Listing;
}


function useListingActions(props: Props) {
  const db = getFirestore();
  const router = useRouter();

  const deleteListing = async () => {
    props.unsubscribe();
    const docRef = doc(db, "listings", props.updatedListing.id);
    await deleteDoc(docRef);

    const index = algolia.initIndex("listings");
    await index.deleteObject(props.updatedListing.id);

    //Delete listing image
    const desertRef = ref(getStorage(), props.updatedListing.id);
    deleteObject(desertRef);

    toast.success("Listing successfully deleted.", {
      autoClose: 4000,
    });
    await router.push(`/home/profile/available/${props.updatedListing.ownerId}`);
  };

  const markAsSold = async () => {
    const index = algolia.initIndex("listings");
    index.partialUpdateObject({ objectID: props.updatedListing.id, state: ListingState.SOLD });

    const listingRef = doc(db, "listings", props.updatedListing.id);
    await updateDoc(listingRef, {
      state: ListingState.SOLD,
    });

    toast.success("Listing marked as sold.", {
      autoClose: 4000,
    });
    await router.push(`/home/profile/sold/${props.updatedListing.ownerId}`);
  };

  //Updates algolia and Firebase
  const markAsAvailable = async () => {
    const index = algolia.initIndex("listings");
    index.partialUpdateObject({ objectID: props.updatedListing.id, state: ListingState.AVAILABLE });

    const listingRef = doc(db, "listings", props.updatedListing.id);
    await updateDoc(listingRef, {
      state: ListingState.AVAILABLE,
    });

    toast.success("Listing marked as available.", {
      autoClose: 4000,
    });
    await router.push(`/home/profile/available/${props.updatedListing.ownerId}`);
  };

  return { deleteListing, markAsSold, markAsAvailable };
}

export default useListingActions;
