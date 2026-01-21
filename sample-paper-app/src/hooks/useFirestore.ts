import { firestoreReducer } from "@/reducers/firestoreReducer"
import type { FirestoreAction, FirestoreState } from "@/types/types"
import { collection, deleteDoc, doc, type DocumentData} from "firebase/firestore"
import { useEffect, useReducer, useState } from "react"
import { db } from "../../firebase.config"
import { deleteObject, getStorage, ref } from "firebase/storage"

const initialState: FirestoreState = {
    isPending: false,
    error: null,
    success: false,
}

export const useFirestore = <DocumentType extends DocumentData>(collectionId: string) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState);
    const [isCanceled, setIsCanceled] = useState(false);

    const colRef = collection(db, collectionId);
    const dispatchIfNotCanceled = (action: FirestoreAction) => {
        if (!isCanceled) {
            dispatch(action);
        }
    }
    const deleteDocument = async (documentId: string, filePath: string, onSuccess?: () => void) => {
        try {
            dispatch({type: "IS_PENDING"});
            const docRef = doc(colRef, documentId);
            await deleteDoc(docRef);
            if(filePath) {
                const storage = getStorage();
                const fileRef = ref(storage, filePath);
                await deleteObject(fileRef);
                console.log("Deleted PDF file.");
            }
            onSuccess?.();
            dispatchIfNotCanceled({type: "SUCCESS"});
        } catch (error) {
            console.log("Delete failed: ", error);
            dispatchIfNotCanceled({type: "ERROR", payload: "Could not delete the document or file."});
        }
    };

    useEffect(() => {
        return () => setIsCanceled(true)
    }, []);

    return { deleteDocument, response };
}