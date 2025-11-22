import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.config";

export async function validateInviteToken(token: string) {
    const inviteRef = doc(db, "Invites", token);
    const inviteSnap = await getDoc(inviteRef);
    
    // First check if document exists before accessing its attributes
    if (!inviteSnap.exists()) {
        throw new Error("Invite token does not exist.");
    }

    const invite = inviteSnap.data();
    
    // check if the token is already used
    if (invite.usedBy !== "") {
        throw new Error("Invite token has already been used.")
    }

    // check if the token is expired
    if (invite.expiresAt.toDate() < new Date()) {
        throw new Error("Invite token has expired.")
    }

    // token is valid
    return invite
}