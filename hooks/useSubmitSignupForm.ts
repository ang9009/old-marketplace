import { toast } from "react-toastify";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { doc, DocumentData, DocumentSnapshot, getFirestore, setDoc } from "firebase/firestore";
import { MultiValue } from "react-select";
import * as yup from "yup";

import User from "../types/user.interface";
import { useRouter } from "next/router";
import { useState } from "react";
import { Option } from "../data/data";

interface Props {
  userDocSnap: DocumentSnapshot<DocumentData>;
  yearLevel: Option;
  subjects: MultiValue<Option>;
  image: { url: string; file: File };
}

const inputSchema = yup.object().schema({
  yearLevel: yup.number().integer().positive(),
  subjects: yup.array().min(1).required(),
  image: yup.object().required(),
  phoneNumber: yup.string(),
});

function useSubmitSignupForm({ userDocSnap, yearLevel, subjects, image }: Props) {
  const router = useRouter();
  const db = getFirestore();
  const [isLoading, setIsLoading] = useState(null);

  const submit = async (e) => {
    setIsLoading(true);
    console.log(e);

    try {
      e.preventDefault();

      if (!userDocSnap) {
        setIsLoading(false);
        return;
      }

      const isValid = await inputSchema.isValid({
        yearLevel: yearLevel.value,
        subjects,
        image,
        phoneNumber: e.target.phoneNumber.value,
      });

      if (isValid) {
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

      const newUser: User = {
        name: userDocSnap.get("name") as string,
        email: userDocSnap.get("email") as string,
        phoneNumber: e.target.phoneNumber.value ?? null,
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
