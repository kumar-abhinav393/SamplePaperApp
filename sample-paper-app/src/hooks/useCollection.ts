import type { QueryParams } from "@/types/types";
import {
  collection,
  onSnapshot,
  query,
  QueryConstraint,
  where,
  orderBy as fbOrderBy,
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

  const queryKey = useMemo(() => JSON.stringify(queryParams ?? {}), [queryParams])

  useEffect(() => {
    setIsPending(true);
    const colRef = collection(db, collectionId);

    const constraints: QueryConstraint[] = [];

    if (queryParams?.where) {
      const wheres = Array.isArray(queryParams.where) ? queryParams.where : [queryParams.where];
      wheres.forEach(w => constraints.push(where(w.fieldPath, w.opStr, w.value)));
    }

    if (queryParams?.orderBy) {
      const orders = Array.isArray(queryParams.orderBy) ? queryParams.orderBy : [queryParams.orderBy];
      orders.forEach(o => constraints.push(fbOrderBy(o.fieldPath, o.direction)));
    }

    const q = constraints.length ? query(colRef, ...constraints) : colRef;

    const unsubscribe = onSnapshot(
      q,
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
