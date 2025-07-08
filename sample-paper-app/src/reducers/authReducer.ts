import type { AuthAction } from "@/types/types";
import type { User } from "firebase/auth";

/**
  
@param {Object} state   - The current state of authentication, which includes
    - user: The authenticated user object or null if not authenticated.
    - authIsReady: A boolean indicating if the authentication state is ready.
    - pending: A boolean indicating if an authentication action is in progress.

@param {Object} action - The action dispatched to the reducer, which must have a type property.

@returns {Object}   - The new state after applying the action.

*/

export const authReducer = (
    state: { user: User | null, authIsReady: boolean, pending: boolean },
    action: AuthAction,
) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                user: action.payload,
                pending: false,
            }
        case "LOGOUT":
            return {
                ...state,
                user: null,
                pending: false,
            }
        case "AUTH_IS_READY":
            return {
                user: action.payload,
                pending: false,
                authIsReady: true
            }
        case "IS_PENDING":
            return {
                ...state,
                pending: true
            }
        default: {
            return state
        }
    }
}