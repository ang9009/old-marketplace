import { useState } from "react";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 as uuid } from "uuid";
import * as yup from "yup";

import Listing from "../types/listing.interface";
import { useRouter } from "next/router";
import useGetCurrUser from "./useGetCurrUser";
import ListingState from "../types/listingState.enum";
import Condition from "../types/condition.enum";

interface Props {
  listingType: string;
  yearLevel: number;
  subject?: string;
  image: { url: string; file: File };
  condition: Condition;
  listingId: string;
}

const inputSchema = yup.object().shape({
  type: yup.string().required(),
  yearLevel: yup.number().integer().positive(),
  subject: yup.string(),
  image: yup.object().required(),
  condition: yup.string().required(),
  name: yup.string().required(),
  price: yup.number().positive(),
  description: yup.string().required(),
});

function useSubmitEditListing(props: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const db = getFirestore();
  const { authUser } = useGetCurrUser();

  const addListing = async (e) => {
    e.preventDefault();

    const listingName = e.target.name.value;
    const listingPrice = parseInt(e.target.price.value);
    const listingDescription = e.target.description.value;

    const isValid = await inputSchema.isValid({
      ...props,
      type: props.listingType,
      price: listingPrice,
      description: listingDescription,
      name: listingName,
    });

    console.log(
      inputSchema.cast({
        ...props,
        type: props.listingType,
        price: listingPrice,
        description: listingDescription,
      })
    );

    if (!isValid) {
      toast.error("One or more fields are empty!", {
        autoClose: 3000,
      });
      return;
    }

    setIsLoading(true);

    try {
      const { listingType, yearLevel, subject, image, condition, listingId } = props;

      if (image.file) {
        await uploadBytes(ref(getStorage(), listingId), image.file);
      }

      const newListing: Listing = {
        id: listingId,
        name: listingName,
        ownerId: authUser.uid,
        buyerId: null,
        description: listingDescription,
        type: listingType,
        yearLevel: yearLevel,
        subject: listingType === "miscellaneous" ? null : subject,
        state: ListingState.AVAILABLE,
        condition: condition,
        price: listingPrice,
      };

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

export default useSubmitEditListing;
