import { browserSessionPersistence, GoogleAuthProvider, setPersistence, signInWithPopup, type User } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";
import { auth } from "../../firebase.config";
import { createUserDocument } from "@/helpers/createUserDocument";

export const useGoogleAuthentication = () => {

    const { dispatch } = useAuthContext()

    const googleAuth = async() => {
        const provider = new GoogleAuthProvider()

        dispatch({ type: "IS_PENDING" })
        
        try{
            await setPersistence(auth, browserSessionPersistence)
            const { user } = await signInWithPopup(auth, provider)

            await createUserDocument(user as User)

            dispatch({ type: "LOGIN", payload: user as User })
        } catch(error) {
            console.log(error as Error)
        }
    }

    return { googleAuth }
}