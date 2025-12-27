import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"

export const uploadAssignmentPdf = async (file: File): Promise<string> => {
    try {
        const storage = getStorage();

        const timestamp = Date.now();
        const fileName = file.name.replace(/\s+/g, "_");
        const storagePath = `assignments/${fileName}-${timestamp}`;

        const fileRef = ref(storage, storagePath);

        await uploadBytes(fileRef, file);

        const downloadURL = await getDownloadURL(fileRef);
        
        return downloadURL
    } catch (error) {
        console.log("Error uploading assignment PDF: ", error);
        throw new Error("Failed to upload PDF");
    }
};