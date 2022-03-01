import Listing from "../types/listing.interface";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";

export default async function getUserListings(userId: string, state: string) {
  const db = getFirestore();
  let userListings: Listing[] = [];

  const q = query(collection(db, "listings"), where("ownerId", "==", userId), where("state", "==", state));
  const listingQuerySnapshot = await getDocs(q);

  if (listingQuerySnapshot) {
    listingQuerySnapshot.forEach((doc) => {
      userListings.push(doc.data() as Listing);
    });
  }

  return userListings;
}
