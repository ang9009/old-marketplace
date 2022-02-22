import { useCallback, useContext, useState } from "react";
import { toast } from "react-toastify";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import User from "../types/user.interface";
import { useRouter } from "next/router";
import { UserContext } from "../components/context/UserContext";

function useSubmitSignupForm({ yearLevel, subjects, user }) {
  const router = useRouter();
  const [image, setImage] = useState<{ url: string; file: File } | null>(null);

  const submit = async (e) => {
    try {
      e.preventDefault();

      if (!yearLevel.value || !subjects || subjects.length === 0) {
        toast.error("One or more fields are empty!", {
          autoClose: 2000,
        });
        return;
      }

      //If the user uploads an image, upload it to firebase. If not, then assign them the default profile picture
      const storage = getStorage();
      const snapshot = image ? await uploadBytes(ref(storage, user.id), image.file) : null;

      const db = getFirestore();
      const data: User = {
        name: user.name,
        email: user.email,
        phoneNumber: e.target.phoneNumber.value,
        subjects: subjects.map((subject) => subject.value),
        yearLevel: yearLevel.value,
        profileImagePath: snapshot?.metadata?.fullPath ?? null,
      };

      await setDoc(doc(db, "users", user.id), data);
      await router.push("/home");
    } catch (err) {
      console.log(err);
    }
  };

  return { image, setImage, submit };
}

export default useSubmitSignupForm;
