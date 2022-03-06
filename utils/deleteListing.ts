import { doc, getFirestore, deleteDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import useGetCurrUser from "../hooks/useGetCurrUser";
import { toast } from "react-toastify";

export default async function deleteListing(listingId: string) {
  const db = getFirestore();
  const router = useRouter();
  const { userData } = useGetCurrUser();

  const docRef = doc(db, "listings", listingId);
  await deleteDoc(docRef);
  router.push(`/home/profile/available/${userData.id}`);
  toast.success("Listing successfully deleted.", {
    autoClose: 3000,
  });
}
