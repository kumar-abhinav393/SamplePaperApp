import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase.config";

export const useResetPassword = () => {
  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: unknown) {
      throw error as Error;
    }
  };
  return { resetPassword };
};
