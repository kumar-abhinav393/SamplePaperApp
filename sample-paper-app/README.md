# Explanation of some important concepts of React and Typescript

## hooks/useCollection.ts

This is a custom React Hook named 'useCollection' used to fetch and listen to live updates from a Firestore collection in Firebase. It allows filtering the data based on specific conditions (where clause).

```
Code - 1:
export const useCollection = <DocumentType extends { id: string; props: DocumentData }>(
  collectionId: string,
  queryParams?: QueryParams
): {
  documents: DocumentType[];
  error: string | undefined;
  isPending: boolean;
}
```

- DocumentType: is the generic type decleration in the custom React Hook 'useCollection'. It means that Whatever type (DocumentType) the user of this hook provides, it must contain two fields: id(a string) and props(which is Firestore document data).
- DocumentData: the actual fields in the firestore document.
- Firestore data has no fixed structure and we want Typescript to know the structure so we get automcomplete and error-checking in our code.

- The above code takes two arguments:
  - collectionId: Name of the Firestore collection.
  - queryParams: Optional filters
and returns
  - documents: fetched documents
  - error: Error message if fetching fails
  - isPending: Boolean to show loading state

```
Code - 2:
const queryParamsValueString = JSON.stringify(queryParams?.value)
  
  const queryKey = useMemo(() => {
    if (!queryParams) return "";
    return `${queryParams.fieldPath}|${queryParams.opStr}|${queryParamsValueString}`;
  }, [queryParams, queryParamsValueString]);
```

- queryParamsValueString: is a stringified version of the value inside the optional 'queryParams' object.
- We use this because React compares values in the dependency array by reference and if we use an object directly then React cannot tell whether the contents are the same -- even if they are. it will treat it as a changed on every render, and the 'useMemo' will re-run.

- 'useMemo()': is a React Hook that allows us to memoize a value -- that means it remembers the result of a calculation until its dependencies change.
- if queryParams passed into the hook then it creates a unique ientifier (query key) based on the contents of the 'queryParams'.
- Dependencies: tells react only re-run the function if either 'queryParams' or 'queryParamsValueString' changes.

## Important Note:
We can also use 'useRef' hook instead of 'useMemo' using a serialized key in a ref and re-subscribing only when it changes. But the memoized-ref pattern above is typically the neatest with 'react-hooks/exhaustive-deps'.