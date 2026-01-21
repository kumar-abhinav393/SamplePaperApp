import type { FirestoreAction, FirestoreState } from "@/types/types";

export const firestoreReducer = (state: FirestoreState, action: FirestoreAction) => {
    switch (action.type) {
        case "IS_PENDING":
            return {
                isPending: true,
                error: null,
                success: false
            }
        case "SUCCESS":
            return {
                isPending: false,
                error: null,
                success: true
            }
        case "ERROR":
            return {
                isPending: false,
                error: action.payload,
                success: false
            }
        default:
            return state
    }
}