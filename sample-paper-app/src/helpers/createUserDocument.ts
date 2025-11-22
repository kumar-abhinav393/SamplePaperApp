import type { User } from "firebase/auth";
import { collection, doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { validateInviteToken } from "./validateInviteToken";
import { UserRole } from "./enum";

export async function createUserDocument(user: User) {
    const colRef = collection(db, "users")
    const docRef = doc(colRef, user.uid)
    const docSnap = await getDoc(docRef)
    if (!docSnap.exists()) {
        const inviteToken = localStorage.getItem("inviteToken");
        let role = UserRole.STUDENT;

        if (inviteToken) {
            const inviteData = await validateInviteToken(inviteToken);
            role = inviteData.role;
            const inviteRef = doc(db, "Invites", inviteToken);
            await updateDoc(inviteRef, {
                usedBy: user.uid,
            });

            localStorage.removeItem("inviteToken");
        }

        const data = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            role: role,
            createdAt: serverTimestamp(),
        }

        await setDoc(docRef, data);

        const response = await getDoc(docRef);
        console.log("created doc: ", response.data());
    }
}