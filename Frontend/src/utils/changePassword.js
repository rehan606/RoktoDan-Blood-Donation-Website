import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword
} from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

export const changeUserPassword = async (currentPassword, newPassword) => {
  const user = auth.currentUser;

  if (!user || !user.email) {
    throw new Error("User not logged in");
  }

  const credential = EmailAuthProvider.credential(
    user.email,
    currentPassword
  );

  // 🔐 verify current password
  await reauthenticateWithCredential(user, credential);

  // 🔁 update password
  await updatePassword(user, newPassword);

  return true;
};