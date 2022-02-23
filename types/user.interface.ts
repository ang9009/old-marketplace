import BaseUser from "./baseUser.interface";

export default interface User extends BaseUser {
  phoneNumber: string;
  subjects: string[];
  yearLevel: string;
  profileImagePath: string;
  hasCompletedSignup: boolean;
}
