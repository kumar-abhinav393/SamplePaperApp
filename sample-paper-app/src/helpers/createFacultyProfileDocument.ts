import { db } from "../../firebase.config";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

interface FacultyProfileProps {
    displayName: string;
    email: string;
    assignedClass: string[];
    assignedBoard: string[];
    assignedSubject: string[];
}

export const createFacultyProfileDocument = async ({
    displayName,
    email,
    assignedClass,
    assignedBoard,
    assignedSubject,
}: FacultyProfileProps) => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
        const docRef = doc(db, "Faculties", currentUser.uid);
        await setDoc(docRef, {
            displayName,
            email,
            assignedClass,
            assignedBoard,
            assignedSubject,
            createdAt: serverTimestamp(),
        });
    }
};