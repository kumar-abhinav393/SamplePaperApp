import { useEffect, useState } from "react"
import { useAuthContext } from "./useAuthContext"
import type { UserDoc } from "../types/types"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../../firebase.config"

export const useUserRole = () => {
    const { user, authIsReady } = useAuthContext();
    const [role, setRole] = useState<UserDoc | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authIsReady || !user) {
            setRole(null);
            setLoading(false);
            return;
        }

        const ref = user?.uid ? doc(db, "users", user.uid) : null;
        if (!ref) {
            setRole(null);
            setLoading(false);
            return;
        }
        const unsub = onSnapshot(
            ref,
            (snap) => {
                if (snap.exists()) {
                    const data = snap.data() as UserDoc;
                    setRole(data);
                } else {
                    setRole(null);
                }
                setLoading(false);
            }
        )
        return unsub;
    }, [authIsReady, user]);

    return { role, loading }
}