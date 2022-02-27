import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import Listing from "../types/listing.interface";
import User from "../types/user.interface";

export default async function getListingAndUserDocs(listingId: string) {
  const db = getFirestore();

  const listingDocRef = doc(db, "listings", listingId);
  const listingDocSnap = await getDoc(listingDocRef);

  const listingImageStorageRef = ref(getStorage(), listingId);
  const listingImageUrl = await getDownloadURL(listingImageStorageRef);

  const sellerDocRef = doc(db, "users", listingDocSnap.get("ownerId"));
  const sellerDocSnap = await getDoc(sellerDocRef);

  const sellerProfileImagePath = sellerDocSnap.get("profileImagePath");

  const sellerProfilePictureUrl = sellerProfileImagePath
    ? await getDownloadURL(ref(getStorage(), listingDocSnap.get("ownerId")))
    : "/blank.png";

  return {
    listing: listingDocSnap.data() as Listing,
    listingImageUrl,
    seller: sellerDocSnap.data() as User,
    sellerProfilePictureUrl,
  };
}
