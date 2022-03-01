import { doc, getDoc, getFirestore } from "firebase/firestore";

import Listing from "../types/listing.interface";

export default async function getListing(listingId: string) {
  const db = getFirestore();

  const docRef = doc(db, "listings", listingId);
  const listingDocSnap = await getDoc(docRef);

  return { listingData: listingDocSnap?.data() as Listing };
}
