import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import { auth } from "../../firebase.config";

export const uploadAssignmentPdf = async (file: File): Promise<string> => {
    try {
        const storage = getStorage();
        const userId = auth.currentUser?.uid;
        if (!userId) throw new Error("User not authenticated");

        const timestamp = Date.now();
        const fileName = file.name.replace(/\s+/g, "_");
        const storagePath = `assignments/${userId}/${fileName}-${timestamp}`;

        const fileRef = ref(storage, storagePath);
        await uploadBytes(fileRef, file);
        const downloadURL = await getDownloadURL(fileRef);
        
        return downloadURL
    } catch (error) {
        console.log("Error uploading assignment PDF: ", error);
        throw new Error("Failed to upload PDF");
    }
};