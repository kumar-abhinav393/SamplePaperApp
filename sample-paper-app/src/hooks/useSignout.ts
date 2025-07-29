import { signOut } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";
import { auth } from "../../firebase.config";

export const useSignout = () => {
  const { dispatch, user } = useAuthContext();

  const signout = async () => {
    if (user) {
      try {
        dispatch({ type: "LOGOUT" });
        await signOut(auth);
      } catch (error: unknown) {
        throw error as Error;
      }
    }
  };
  return { signout };
};
