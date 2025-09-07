import type { QueryParams } from "@/types/types";
import {
  collection,
  onSnapshot,
  query,
  where,
  type DocumentData,
} from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { db } from "../../firebase.config";

export const useCollection = <DocumentType extends { id: string; props: DocumentData }>(
  collectionId: string,
  queryParams?: QueryParams
): {
  documents: DocumentType[];
  error: string | undefined;
  isPending: boolean;
} => {
  const [error, setError] = useState<string>();
  const [isPending, setIsPending] = useState(false);
  const [documents, setDocuments] = useState<DocumentType[]>([]);

  const queryParamsValueString = JSON.stringify(queryParams?.value)
  
  const queryKey = useMemo(() => {
    if (!queryParams) return "";
    return `${queryParams.fieldPath}|${queryParams.opStr}|${queryParamsValueString}`;
  }, [queryParams, queryParamsValueString]);

  useEffect(() => {
    setIsPending(true);
    const colRef = collection(db, collectionId);

    const finalQuery = queryParams
      ? query(
          colRef,
          where(queryParams.fieldPath, queryParams.opStr, queryParams.value)
        )
      : colRef;

    const unsubscribe = onSnapshot(
      finalQuery,
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
        setIsPending(false);
        console.error(
          `[Firestore] Error fetching ${collectionId}: `,
          e.message
        );
      }
    );

    return () => unsubscribe();
  }, [collectionId, queryKey]);
  return { documents, error, isPending };
};
