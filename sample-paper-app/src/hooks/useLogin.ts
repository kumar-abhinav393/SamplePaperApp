import { createUserDocument } from "@/helpers/createUserDocument";
import { auth } from "../../firebase.config";
import { useAuthContext } from "./useAuthContext"
import { browserSessionPersistence, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { FirebaseError } from "firebase/app";

type LoginResult = { ok: true } | { ok: false; code: string }

export const useLogin = () => {
    const { dispatch } = useAuthContext();
    const [isPending, setIsPending] = useState(false);

    const login = async ({ email, password }: { email: string, password: string }): Promise<LoginResult> => {
        setIsPending(true);
        try {
            dispatch({ type: "IS_PENDING" })

            await setPersistence(auth, browserSessionPersistence)
            const response = await signInWithEmailAndPassword(auth, email, password)
            
            await createUserDocument(response.user)
            dispatch({ type: "LOGIN", payload: response.user })
            return { ok: true };
        } catch (error: unknown) {
            const code = error instanceof FirebaseError ? error.code : "auth/unknown";
            console.log("login error: ", error)
            return { ok: false, code };
        } finally {
            setIsPending(false);
        }
    };

    return { login, isPending };
}