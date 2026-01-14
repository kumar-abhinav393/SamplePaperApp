import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase.config";

interface AssignmentDocumentprops {
    name: string;
    code: string;
    status: string;
    filePath: string;
    topicName: string;
    createdBy: string;
    description: string;
    classLevels: number;
    boardFilters: string[];
    subjectCode: string;
}

export const createAssignmentDocument = async ({
    name, code, status, filePath, topicName, createdBy,
    description, classLevels, boardFilters, subjectCode
}: AssignmentDocumentprops) => {
    const colRef = collection(db, "Papers");
    const assignmentDocs = {
        name: name,
        code: code,
        active: status,
        filePath: filePath,
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
    return docRef.id;
}