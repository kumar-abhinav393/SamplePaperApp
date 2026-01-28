import { addDoc, collection, doc, increment, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../firebase.config";

interface AssignmentDocumentprops {
    name: string;
    code: string;
    status: string;
    filePath: string;
    authorId: string;
    topicName: string;
    createdBy: string;
    description: string;
    classLevels: number;
    subjectCode: string;
    boardFilters: string[];
}

export const createAssignmentDocument = async ({
    name, code, status, filePath, authorId, topicName,
    createdBy, description, classLevels, boardFilters,
    subjectCode
}: AssignmentDocumentprops) => {
    const colRef = collection(db, "Papers");
    const assignmentDocs = {
        name: name,
        code: code,
        active: status,
        filePath: filePath,
        authorId: authorId,
        topicName: topicName,
        createdBy: createdBy,
        createdAt: new Date(),
        description: description,
        classLevels: classLevels,
        subjectCode: subjectCode,
        boardFilters: boardFilters,
        year: new Date().getFullYear(),
    }

    const docRef = await addDoc(colRef, assignmentDocs);
    const facultyRef = doc(db, "Faculties", authorId);

    await updateDoc(facultyRef, {
        uploadCount: increment(1),
        lastUploadDate: serverTimestamp(),
    });
    return docRef.id;
}