import { toast } from "react-toastify";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { doc, DocumentData, DocumentSnapshot, getFirestore, setDoc } from "firebase/firestore";
import User from "../types/user.interface";
import { useRouter } from "next/router";
import { useState } from "react";
import { Option } from "../data/data";
import { MultiValue } from "react-select";

interface Props {
  userDocSnap: DocumentSnapshot<DocumentData>;
  yearLevel: Option;
  subjects: MultiValue<Option>;
  image: { url: string; file: File };
}

function useSubmitSignupForm({ userDocSnap, yearLevel, subjects, image }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(null);

  const submit = async (e) => {
    setIsLoading(true);

    try {
      e.preventDefault();

      if (!userDocSnap) {
        setIsLoading(false);
        return;
      }

      if (!yearLevel.value || !subjects || subjects.length === 0) {
        toast.error("One or more fields are empty!", {
          autoClose: 3000,
        });
        setIsLoading(false);
        return;
      }

      //If the user uploads an image, upload it to firebase. If not, then assign them the default profile picture
      const storage = getStorage();
      const snapshot = image
        ? await uploadBytes(ref(storage, userDocSnap.get("id") as string), image.file)
        : null;

      const db = getFirestore();

      const newUser: User = {
        name: userDocSnap.get("name") as string,
        email: userDocSnap.get("email") as string,
        phoneNumber: e.target.phoneNumber.value,
        subjects: subjects.map((subject) => subject.value),
        yearLevel: yearLevel.value,
        id: userDocSnap.get("id") as string,
        profileImagePath: snapshot?.metadata?.fullPath ?? null,
        hasCompletedSignup: true,
      };

      await setDoc(doc(db, "users", newUser.id), newUser);
      await router.push("/home");
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return { isLoading, submit };
}

export default useSubmitSignupForm;
