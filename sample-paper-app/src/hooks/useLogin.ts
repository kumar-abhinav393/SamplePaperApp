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
            console.log("login response: ", response)
        } catch (error: unknown) {
            throw error as Error
        }
    }
    return { login };
}