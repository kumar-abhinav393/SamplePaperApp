import { browserSessionPersistence, getRedirectResult, GoogleAuthProvider, setPersistence, signInWithPopup, signInWithRedirect, type User } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";
import { auth } from "../../firebase.config";
import { createUserDocument } from "@/helpers/createUserDocument";
import { useBreakpointValue } from "@chakra-ui/react";
import { useEffect } from "react";

export const useGoogleAuthentication = () => {
    const { dispatch } = useAuthContext()

    const preferPopup = useBreakpointValue({ base: false, md: true }) ?? false;

    const userDocument = async (user: User) => {
        await createUserDocument(user);
        dispatch({ type: "LOGIN", payload: user })
    }

    const googleAuth = async () => {
        const provider = new GoogleAuthProvider()

        dispatch({ type: "IS_PENDING" })
        try {
            await setPersistence(auth, browserSessionPersistence)
            if (preferPopup) {
                const { user } = await signInWithPopup(auth, provider)
                await userDocument(user)
            } else {
                await signInWithRedirect(auth, provider)
            }
        } catch (error) {
            console.log(error as Error)
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const result = await getRedirectResult(auth);
                if (result?.user) {
                    await userDocument(result.user);
                }
            } catch (error) {
                console.log(error as Error)
            }
        })();
    });

    return { googleAuth }
}