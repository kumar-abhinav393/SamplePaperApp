import { createUserDocument } from "@/helpers/createUserDocument";
import { auth } from "../../firebase.config";
import { useAuthContext } from "./useAuthContext"
import { browserSessionPersistence, setPersistence, signInWithEmailAndPassword } from "firebase/auth";

export const useLogin = () => {
    const { dispatch } = useAuthContext();

    const login = async ({ email, password }: { email: string, password: string }) => {
        try {
            dispatch({ type: "IS_PENDING" })

            await setPersistence(auth, browserSessionPersistence)
            const response = await signInWithEmailAndPassword(auth, email, password)
            
            await createUserDocument(response.user)
            dispatch({ type: "LOGIN", payload: response.user })
        } catch (error: unknown) {
            console.log("login error: ", error)
        }
    }
    return { login };
}