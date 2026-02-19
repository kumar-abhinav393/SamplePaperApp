import { db } from "../../firebase.config";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

interface FacultyProfileProps {
    email: string;
    displayName: string;
    assignedClass: string[];
    assignedBoard: string[];
    assignedSubject: string[];
}

export const createFacultyProfileDocument = async ({
    email,
    displayName,
    assignedClass,
    assignedBoard,
    assignedSubject,
}: FacultyProfileProps) => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
        const docRef = doc(db, "Faculties", currentUser.uid);
        await setDoc(docRef, {
            email,
            displayName,
            assignedClass,
            assignedBoard,
            assignedSubject,
            uid: currentUser.uid,
            uploadCount: 0,
            createdAt: serverTimestamp(),
            lastUploadDate: null,
        });
    }
};