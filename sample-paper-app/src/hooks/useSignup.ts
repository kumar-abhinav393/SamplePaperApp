import { createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { useAuthContext } from "./useAuthContext"
import { auth } from "../../firebase.config";

export const useSignup = () => {

    const { dispatch } = useAuthContext();

    const signup = async ({
        email,
        password,
        displayName,
    }: {
        email: string,
        password: string,
        displayName: string,
    }) => {
        try {
            dispatch({ type: "IS_PENDING" })
            const response = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )

            await signOut(auth)
            
            await updateProfile(response.user, { displayName: displayName })
            
            dispatch({type: "LOGOUT"})
        } catch (error: unknown) {
            console.log("Signup error: ", error)
        }
    }
    return { signup }
}