/**
 * Generate a new invite token document in Firestore under the 'Invites' collection.
 *  
 * @param role
 * @param createdAt
 * @param expiresAt
 * @param issuedBy
 * @returns
 */

import { addDoc, collection, type Timestamp } from "firebase/firestore";
import type { UserRole } from "./enum";
import { db } from "../../firebase.config";

export async function createInviteToken(
    role: UserRole,
    createdAt: Timestamp,
    expiresAt: Timestamp,
    issuedBy: string
): Promise<string> {
    try {
        const inviteRef = await addDoc(collection(db, "Invites"), {
            role,
            createdAt,
            expiresAt,
            issuedBy,
            usedBy: ""
        });
        
        return inviteRef.id;
    } catch (error) {
        console.log("Failed to create invite token: ", error);
        throw error;
    }
}