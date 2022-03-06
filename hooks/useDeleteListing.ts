import { doc, getFirestore, deleteDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import useGetCurrUser from "../hooks/useGetCurrUser";
import { toast } from "react-toastify";
import { useEffect } from "react";

interface Props {
  listingId: string;
}

function useDeleteListing(props: Props) {
  const db = getFirestore();

  const deleteListing = async () => {
    const docRef = doc(db, "listings", props.listingId);
    await deleteDoc(docRef);
  };

  return { deleteListing };
}

export default useDeleteListing;
