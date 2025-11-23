import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext"
import type { FacultyProfileProps } from "@/types/types";
import { db } from "../../firebase.config";
import { doc, onSnapshot } from "firebase/firestore";

export const useFacultyProfile = () => {
    const { user, authIsReady } = useAuthContext();

    const [profile, setProfile] = useState<FacultyProfileProps | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authIsReady || !user) {
            setProfile(null);
            setLoading(false);
            return;
        }

        const ref = doc(db, "Faculties", user.uid);
        if (!ref) {
            setProfile(null);
            setLoading(false);
            return;
        }
        const unsub = onSnapshot(ref, (snap) => {
            if (snap.exists()) {
                setProfile(snap.data() as FacultyProfileProps);
            } else {
                setProfile(null);
            }
            setLoading(false);
        });
        return unsub;
    }, [authIsReady, user])

    return { profile, loading };
};