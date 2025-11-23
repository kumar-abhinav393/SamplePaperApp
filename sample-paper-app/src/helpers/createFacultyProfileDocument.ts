import { db } from "../../firebase.config";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

interface FacultyProfileProps {
    displayName: string;
    email: string;
<<<<<<< HEAD
    assignedClass: string[];
    assignedBoard: string[];
    assignedSubject: string[];
=======
    assignedClass: string;
    assignedBoard: string;
    assignedSubject: string;
>>>>>>> 1432c82773dc08086c1357ddd42048ef9778b23c
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