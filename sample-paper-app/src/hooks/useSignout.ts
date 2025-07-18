import { signOut } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";
import { auth } from "../../firebase.config";

export const useSignout = () => {
  const { dispatch, user } = useAuthContext();

  const signout = async () => {
    if (user) {
      try {
        dispatch({ type: "LOGOUT" });
        const response = await signOut(auth);
        console.log("logout response: ", response);
      } catch (error: unknown) {
        throw error as Error;
      }
    }
  };
  return { signout };
};
