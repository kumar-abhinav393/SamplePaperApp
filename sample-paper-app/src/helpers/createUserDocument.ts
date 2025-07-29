import type { User } from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase.config";

export async function createUserDocument (user: User) {
    const colRef = collection(db, "Students")
    const docRef = doc(colRef, user.uid)
    const docSnap = await getDoc(docRef)
    if(!docSnap.exists()) {
        const data = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            role: "student",
        }

        await setDoc(docRef, data)
        const response = await getDoc(docRef)
        console.log("created doc: ", response.data())
    }
}