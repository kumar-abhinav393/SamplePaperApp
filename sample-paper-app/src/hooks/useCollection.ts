import { collection, onSnapshot, type DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase.config";

export const useCollection = <
  DocumentType extends { id: string; props: DocumentData }
>(
  collectionId: string
): {
  documents: DocumentType[];
  error: string | undefined;
  isPending: boolean;
} => {
  const [error, setError] = useState<string>();
  const [isPending, setIsPending] = useState(false);
  const [documents, setDocuments] = useState<DocumentType[]>([]);

  useEffect(() => {
    setIsPending(true);
    const colRef = collection(db, collectionId);
    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        const results: DocumentType[] = snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              props: { ...doc.data() },
            } as DocumentType)
        );

        setDocuments(results);
        setIsPending(false);
        setError(undefined);
      },
      (e) => {
        setError(e.message);
        console.error(
          `[Firestore] Error fetching ${collectionId}: `,
          e.message
        );
      }
    );

    return () => unsubscribe();
  }, [collectionId]);
  return { documents, error, isPending };
};
