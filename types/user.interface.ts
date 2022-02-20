import { UploadResult } from "firebase/storage";

export default interface User {
  email: string;
  name: string;
  phoneNumber: string;
  subjects: string[];
  yearLevel: string;
  profileImagePath: string;
}
