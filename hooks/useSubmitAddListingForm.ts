import { useState } from "react";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 as uuid } from "uuid";
import Listing from "../types/listing.interface";
import { useRouter } from "next/router";

interface Props {
  listingType: string;
  yearLevel: string;
  subject?: string;
  image: { url: string; file: File };
}

function useSubmitAddListingForm({ listingType, yearLevel, subject, image }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const db = getFirestore();

  const addListing = async (e) => {
    e.preventDefault();

    const listingName = e.target.name.value;
    const listingDescription = e.target.description.value;

    if (
      !listingName ||
      !listingDescription ||
      !listingType ||
      !yearLevel ||
      !image ||
      (!subject && listingType !== "miscellaneous")
    ) {
      toast.error("One or more fields are empty!", {
        autoClose: 3000,
      });
      return;
    }

    setIsLoading(true);

    try {
      const listingId = uuid();

      const storage = getStorage();
      const snapshot = await uploadBytes(ref(storage, listingId), image.file);

      const newListing: Listing = {
        id: listingId,
        name: listingName,
        description: listingDescription,
        type: listingType,
        yearLevel: yearLevel,
        subject: listingType === "miscellaneous" ? null : subject,
        imagePath: snapshot?.metadata?.fullPath,
      };

      console.log(newListing);
      await setDoc(doc(db, "listings", listingId), newListing);

      await router.push(`/home/listings/${listingId}`);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return { isLoading, addListing };
}

export default useSubmitAddListingForm;
